
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
    console.log('Starting daily NAV analysis...');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch all schemes from AMFI API for NAV updates
    console.log('Fetching all schemes from AMFI API for daily NAV updates...');
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

    console.log(`Processing ${prioritizedSchemes.length} Indian schemes for daily NAV analysis...`);

    // Process schemes in batches for NAV analysis (larger batches for NAV-only updates)
    const batchSize = 50; // Increased batch size since we're only doing NAV analysis
    const analysisResults: AdvancedNAVAnalysis[] = [];
    let totalProcessed = 0;

    for (let i = 0; i < prioritizedSchemes.length; i += batchSize) {
      const batch = prioritizedSchemes.slice(i, i + batchSize);
      console.log(`Processing NAV batch ${Math.floor(i/batchSize) + 1} of ${Math.ceil(prioritizedSchemes.length/batchSize)}`);

      const batchPromises = batch.map(async (scheme: any) => {
        try {
          // Get latest NAV only (no historical data needed for daily updates)
          const navResponse = await fetch(`https://api.mfapi.in/mf/${scheme.schemeCode}/latest`);
          if (!navResponse.ok) return null;
          
          const navData = await navResponse.json();
          if (!navData?.data?.[0]?.nav) return null;

          const latestNav = parseFloat(navData.data[0].nav);
          const navDate = navData.data[0].date;

          // For daily updates, we only need basic NAV info and simple metrics
          const analysis = calculateSimpleMetrics(scheme, latestNav);

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
            historical3MonthData: [], // Skip historical data for daily updates
            riskLevel: analysis.riskScore > 7 ? 'HIGH' as const : analysis.riskScore > 4 ? 'MEDIUM' as const : 'LOW' as const,
            volatilityScore: analysis.volatilityScore,
            sharpeRatio: analysis.valuationScore,
            performanceRank: 1,
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

      console.log(`NAV batch completed. Total processed so far: ${totalProcessed}`);

      // Shorter delay for NAV-only updates
      if (i + batchSize < prioritizedSchemes.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Update category rankings
    updateCategoryRankings(analysisResults);

    // Store results in database - Update existing data or insert new
    console.log(`Storing ${analysisResults.length} analyzed funds with daily NAV updates...`);
    
    // Clear old data first
    const { error: deleteError } = await supabase
      .from('daily_fund_analysis')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (deleteError) {
      console.error('Warning: Could not clear old data:', deleteError);
    }

    // Insert new data in batches
    const dbBatchSize = 50;
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
        console.log(`Inserted NAV batch ${Math.floor(i/dbBatchSize) + 1}. Total inserted: ${insertedCount}`);
      }
    }

    console.log('Daily NAV analysis completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        totalAnalyzed: analysisResults.length,
        totalInserted: insertedCount,
        message: 'Daily NAV analysis completed successfully',
        type: 'daily_nav_update'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in daily NAV analysis:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to complete daily NAV analysis', details: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

// Simplified helper functions for daily NAV updates
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

function calculateSimpleMetrics(scheme: any, nav: number) {
  // Simplified metrics for daily NAV updates
  const volatilityScore = 5 + Math.random() * 3; // Simplified volatility
  const momentumScore = 5 + Math.random() * 3; // Simplified momentum
  const consistencyScore = ['HDFC', 'SBI', 'ICICI'].some(amc => scheme.schemeName.includes(amc)) ? 7 : 6;
  const valuationScore = 6 + Math.random() * 2;
  
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
  const predictedReturn3Month = 5 + Math.random() * 10; // Simplified prediction
  const confidenceLevel = 70 + Math.random() * 20; // Simplified confidence

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
