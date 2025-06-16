
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AdvancedNAVAnalysis {
  schemeCode: string;
  schemeName: string;
  nav: number;
  date: string;
  category: string;
  subCategory: string;
  amcName: string;
  aiScore: number;
  confidence: number;
  predicted3MonthReturn: number;
  historical3MonthData: Array<{date: string, nav: number}>;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  volatilityScore: number;
  sharpeRatio: number;
  performanceRank: number;
  totalSchemes: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting daily fund analysis...');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch all schemes from AMFI API
    console.log('Fetching all schemes from AMFI API...');
    const response = await fetch('https://api.mfapi.in/mf');
    const allSchemes = await response.json();
    console.log(`Fetched ${allSchemes.length} total schemes`);

    // Filter Indian schemes and prioritize popular AMCs
    const indianSchemes = allSchemes.filter((scheme: any) => {
      const name = scheme.schemeName.toLowerCase();
      return !name.includes('international') && 
             !name.includes('global') && 
             !name.includes('overseas') && 
             !name.includes('foreign') &&
             !name.includes('us ') &&
             !name.includes('china') &&
             !name.includes('japan') &&
             !name.includes('europe') &&
             !name.includes('usd') &&
             !name.includes('world');
    });

    const popularAMCs = [
      'SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'Aditya', 'UTI', 
      'Nippon', 'Franklin', 'DSP', 'Mirae', 'Invesco'
    ];

    // Prioritize schemes from popular AMCs
    const prioritizedSchemes = indianSchemes.sort((a: any, b: any) => {
      const aName = a.schemeName;
      const bName = b.schemeName;
      
      const aPopular = popularAMCs.some(amc => aName.startsWith(amc));
      const bPopular = popularAMCs.some(amc => bName.startsWith(amc));
      
      if (aPopular && !bPopular) return -1;
      if (!aPopular && bPopular) return 1;
      
      const aGrowth = aName.toLowerCase().includes('growth');
      const bGrowth = bName.toLowerCase().includes('growth');
      
      if (aGrowth && !bGrowth) return -1;
      if (!aGrowth && bGrowth) return 1;
      
      return 0;
    });

    console.log(`Processing ${prioritizedSchemes.length} Indian schemes...`);

    // Process schemes in batches
    const batchSize = 20; // Reduced batch size for more stability
    const analysisResults: AdvancedNAVAnalysis[] = [];
    let totalProcessed = 0;

    for (let i = 0; i < prioritizedSchemes.length; i += batchSize) {
      const batch = prioritizedSchemes.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i/batchSize) + 1} of ${Math.ceil(prioritizedSchemes.length/batchSize)}`);

      const batchPromises = batch.map(async (scheme: any) => {
        try {
          // Get latest NAV
          const navResponse = await fetch(`https://api.mfapi.in/mf/${scheme.schemeCode}/latest`);
          if (!navResponse.ok) return null;
          
          const navData = await navResponse.json();
          if (!navData?.data?.[0]?.nav) return null;

          const latestNav = parseFloat(navData.data[0].nav);
          const navDate = navData.data[0].date;

          // Get historical data (up to 10 years for extended charts)
          const histResponse = await fetch(`https://api.mfapi.in/mf/${scheme.schemeCode}`);
          const histData = histResponse.ok ? await histResponse.json() : null;
          const fullHistoricalData = histData?.data || [];
          
          // Store extended NAV history for charts
          if (fullHistoricalData.length > 0) {
            const extendedNavData = fullHistoricalData.slice(0, 3650).map((record: any) => ({
              scheme_code: scheme.schemeCode.toString(),
              nav_date: record.date,
              nav_value: parseFloat(record.nav)
            }));

            // Insert extended NAV history in smaller batches
            const navBatchSize = 100;
            for (let j = 0; j < extendedNavData.length; j += navBatchSize) {
              const navBatch = extendedNavData.slice(j, j + navBatchSize);
              try {
                await supabase.from('extended_nav_history').upsert(navBatch, {
                  onConflict: 'scheme_code,nav_date',
                  ignoreDuplicates: true
                });
              } catch (navError) {
                console.log(`Warning: Could not insert NAV history batch for ${scheme.schemeCode}:`, navError);
              }
            }
          }

          const historical3MonthData = fullHistoricalData.slice(0, 90).map((record: any) => ({
            date: record.date,
            nav: parseFloat(record.nav)
          }));

          // Calculate analysis metrics
          const analysis = calculateAdvancedMetrics(scheme, batch, latestNav, historical3MonthData);

          return {
            schemeCode: scheme.schemeCode.toString(),
            schemeName: scheme.schemeName,
            nav: latestNav,
            date: navDate,
            category: categorizeScheme(scheme.schemeName),
            subCategory: categorizeScheme(scheme.schemeName),
            amcName: extractAMCName(scheme.schemeName),
            aiScore: analysis.aiScore,
            confidence: analysis.confidenceLevel / 100,
            predicted3MonthReturn: analysis.predictedReturn3Month,
            historical3MonthData,
            riskLevel: analysis.riskScore > 7 ? 'HIGH' as const : analysis.riskScore > 4 ? 'MEDIUM' as const : 'LOW' as const,
            volatilityScore: analysis.volatilityScore,
            sharpeRatio: analysis.valuationScore,
            performanceRank: 1, // Will be updated later
            totalSchemes: batch.length
          };
        } catch (error) {
          console.error(`Error processing scheme ${scheme.schemeCode}:`, error);
          return null;
        }
      });

      const batchResults = await Promise.all(batchPromises);
      const validResults = batchResults.filter(result => result !== null) as AdvancedNAVAnalysis[];
      analysisResults.push(...validResults);
      totalProcessed += validResults.length;

      console.log(`Batch completed. Total processed so far: ${totalProcessed}`);

      // Add delay between batches to avoid rate limiting
      if (i + batchSize < prioritizedSchemes.length) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Increased delay
      }
    }

    // Update category rankings
    updateCategoryRankings(analysisResults);

    // Store results in database - Clear old data first, then insert new
    console.log(`Storing ${analysisResults.length} analyzed funds in database...`);
    
    // Clear old data
    const { error: deleteError } = await supabase
      .from('daily_fund_analysis')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (deleteError) {
      console.error('Warning: Could not clear old data:', deleteError);
    }

    // Insert new data in batches
    const dbBatchSize = 50; // Smaller batch size for reliability
    let insertedCount = 0;
    
    for (let i = 0; i < analysisResults.length; i += dbBatchSize) {
      const dbBatch = analysisResults.slice(i, i + dbBatchSize).map(fund => ({
        scheme_code: fund.schemeCode,
        scheme_name: fund.schemeName,
        nav: fund.nav,
        nav_date: fund.date,
        category: fund.category,
        sub_category: fund.subCategory,
        amc_name: fund.amcName,
        ai_score: fund.aiScore,
        confidence: fund.confidence,
        predicted_3month_return: fund.predicted3MonthReturn,
        historical_3month_data: fund.historical3MonthData,
        risk_level: fund.riskLevel,
        volatility_score: fund.volatilityScore,
        sharpe_ratio: fund.sharpeRatio,
        performance_rank: fund.performanceRank,
        total_schemes_in_category: fund.totalSchemes
      }));

      const { error } = await supabase.from('daily_fund_analysis').insert(dbBatch);
      if (error) {
        console.error('Error inserting batch:', error);
      } else {
        insertedCount += dbBatch.length;
        console.log(`Inserted batch ${Math.floor(i/dbBatchSize) + 1}. Total inserted: ${insertedCount}`);
      }
    }

    console.log('Daily fund analysis completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        totalAnalyzed: analysisResults.length,
        totalInserted: insertedCount,
        message: 'Daily fund analysis completed successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in daily fund analysis:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to complete daily analysis', details: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

// Helper functions
function categorizeScheme(schemeName: string): string {
  const name = schemeName.toLowerCase();
  if (name.includes('large cap') || name.includes('bluechip')) return 'Large Cap';
  if (name.includes('mid cap') || name.includes('midcap')) return 'Mid Cap';
  if (name.includes('small cap') || name.includes('smallcap')) return 'Small Cap';
  if (name.includes('elss') || name.includes('tax')) return 'ELSS';
  if (name.includes('hybrid') || name.includes('balanced')) return 'Hybrid';
  if (name.includes('debt') || name.includes('bond')) return 'Debt';
  return 'Large Cap';
}

function extractAMCName(schemeName: string): string {
  const words = schemeName.split(' ');
  const firstWord = words[0];
  
  const amcMap: Record<string, string> = {
    'Aditya': 'Aditya Birla',
    'HDFC': 'HDFC',
    'SBI': 'SBI',
    'ICICI': 'ICICI Prudential',
    'Axis': 'Axis',
    'Kotak': 'Kotak',
    'DSP': 'DSP',
    'UTI': 'UTI',
    'Nippon': 'Nippon India',
    'Franklin': 'Franklin Templeton'
  };
  
  return amcMap[firstWord] || firstWord || 'Unknown';
}

function calculateAdvancedMetrics(scheme: any, categorySchemes: any[], nav: number, historicalData: any[]) {
  const volatilityScore = calculateVolatilityScore(scheme, historicalData);
  const momentumScore = calculateMomentumScore(scheme, historicalData);
  const consistencyScore = calculateConsistencyScore(scheme);
  const valuationScore = calculateValuationScore(scheme, categorySchemes, nav);
  
  const weights = {
    volatility: 0.20,
    momentum: 0.30,
    consistency: 0.25,
    valuation: 0.25
  };
  
  const rawScore = (
    volatilityScore * weights.volatility +
    momentumScore * weights.momentum +
    consistencyScore * weights.consistency +
    valuationScore * weights.valuation
  );
  
  const aiScore = Math.max(1, Math.min(10, rawScore));
  const predictedReturn3Month = predictThreeMonthReturn(scheme, historicalData);
  const confidenceLevel = calculateConfidenceLevel(scheme, { volatilityScore, consistencyScore });

  return {
    aiScore: Number(aiScore.toFixed(1)),
    predictedReturn3Month: Number(predictedReturn3Month.toFixed(2)),
    riskScore: Number((10 - volatilityScore).toFixed(1)),
    volatilityScore: Number(volatilityScore.toFixed(1)),
    consistencyScore: Number(consistencyScore.toFixed(1)),
    momentumScore: Number(momentumScore.toFixed(1)),
    valuationScore: Number(valuationScore.toFixed(1)),
    confidenceLevel: Number(confidenceLevel.toFixed(1))
  };
}

function calculateVolatilityScore(scheme: any, historicalData: any[]): number {
  if (historicalData.length < 10) return 5;
  
  const returns = [];
  for (let i = 1; i < Math.min(30, historicalData.length); i++) {
    const todayNav = historicalData[i-1].nav;
    const yesterdayNav = historicalData[i].nav;
    if (yesterdayNav > 0) {
      returns.push((todayNav - yesterdayNav) / yesterdayNav);
    }
  }
  
  if (returns.length < 5) return 5;
  
  const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length;
  const volatility = Math.sqrt(variance) * Math.sqrt(252) * 100;
  
  return Math.max(1, Math.min(10, volatility / 2));
}

function calculateMomentumScore(scheme: any, historicalData: any[]): number {
  if (historicalData.length < 10) return 5;
  
  const recent = historicalData[0].nav;
  const monthAgo = historicalData[Math.min(22, historicalData.length - 1)].nav;
  
  if (monthAgo <= 0) return 5;
  
  const monthlyReturn = (recent - monthAgo) / monthAgo * 100;
  return Math.max(1, Math.min(10, 5 + monthlyReturn / 2));
}

function calculateConsistencyScore(scheme: any): number {
  const amcConsistency = ['HDFC', 'SBI', 'ICICI'].some(amc => scheme.schemeName.includes(amc)) ? 1.2 : 1;
  const categoryConsistency = scheme.schemeName.toLowerCase().includes('large cap') ? 1.3 : 1;
  
  const baseConsistency = 6;
  return Math.max(1, Math.min(10, baseConsistency * amcConsistency * categoryConsistency));
}

function calculateValuationScore(scheme: any, categorySchemes: any[], nav: number): number {
  const avgNAV = categorySchemes.reduce((sum, s) => sum + 1, 0) / categorySchemes.length * 100;
  const relativeValuation = nav / avgNAV;
  
  if (relativeValuation < 0.8) return 7.5;
  if (relativeValuation < 1.2) return 6.5;
  return 5.5;
}

function predictThreeMonthReturn(scheme: any, historicalData: any[]): number {
  if (historicalData.length < 22) return 0;
  
  const recent = historicalData[0].nav;
  const monthAgo = historicalData[21].nav;
  
  if (monthAgo <= 0) return 0;
  
  const monthlyReturn = (recent - monthAgo) / monthAgo * 100;
  return Math.max(-15, Math.min(25, monthlyReturn * 3));
}

function calculateConfidenceLevel(scheme: any, metrics: any): number {
  const { volatilityScore, consistencyScore } = metrics;
  
  const consistencyFactor = consistencyScore / 10;
  const volatilityFactor = 1 - Math.abs(volatilityScore - 5) / 5;
  const amcFactor = ['HDFC', 'SBI', 'ICICI', 'Axis'].some(amc => scheme.schemeName.includes(amc)) ? 1.1 : 1;
  
  const confidence = (consistencyFactor + volatilityFactor) * 50 * amcFactor;
  return Math.max(50, Math.min(95, confidence));
}

function updateCategoryRankings(funds: AdvancedNAVAnalysis[]): void {
  const categoryGroups = funds.reduce((groups, fund) => {
    if (!groups[fund.category]) {
      groups[fund.category] = [];
    }
    groups[fund.category].push(fund);
    return groups;
  }, {} as Record<string, AdvancedNAVAnalysis[]>);

  Object.values(categoryGroups).forEach(categoryFunds => {
    categoryFunds.sort((a, b) => b.aiScore - a.aiScore);
    categoryFunds.forEach((fund, index) => {
      fund.performanceRank = index + 1;
      fund.totalSchemes = categoryFunds.length;
    });
  });
}
