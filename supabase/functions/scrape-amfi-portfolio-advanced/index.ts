
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PortfolioHolding {
  stockName: string;
  isin: string;
  percentage: number;
  marketValue: number;
  quantity: number;
  industry: string;
}

interface AMFIPortfolioData {
  schemeCode: string;
  schemeName: string;
  aum: number;
  portfolioDate: string;
  holdings: PortfolioHolding[];
  sectorAllocation: Array<{
    sector: string;
    percentage: number;
  }>;
  portfolioTurnover: number;
  totalEquityPercentage: number;
  totalDebtPercentage: number;
  totalCashPercentage: number;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { schemeCode, forceRefresh = false } = await req.json();
    
    if (!schemeCode) {
      return new Response(
        JSON.stringify({ error: 'Scheme code is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Processing portfolio data request for scheme: ${schemeCode}`);

    // Check if we have recent data (less than 24 hours old) unless force refresh
    if (!forceRefresh) {
      const { data: existingData } = await supabase
        .from('amfi_portfolio_data')
        .select('*')
        .eq('scheme_code', schemeCode)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(1);

      if (existingData && existingData.length > 0) {
        console.log('Returning cached portfolio data');
        return new Response(
          JSON.stringify({ success: true, data: existingData[0].portfolio_data, cached: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // For SBI Small Cap Fund, return the real data you provided
    if (schemeCode === '120601') {
      const realPortfolioData: AMFIPortfolioData = {
        schemeCode: '120601',
        schemeName: 'SBI Small Cap Fund - Regular Plan - Growth',
        aum: 3402.81,
        portfolioDate: '2024-12-15',
        holdings: [
          {
            stockName: 'SBFC Finance Ltd.',
            isin: 'INE423Y01016',
            percentage: 2.96,
            marketValue: 100858.09,
            quantity: 89318180,
            industry: 'Finance'
          },
          {
            stockName: 'Kalpataru Projects International Ltd.',
            isin: 'INE220B01022',
            percentage: 2.64,
            marketValue: 89961.25,
            quantity: 7900000,
            industry: 'Construction'
          },
          {
            stockName: 'Chalet Hotels Ltd.',
            isin: 'INE427F01016',
            percentage: 2.62,
            marketValue: 89172.83,
            quantity: 9716991,
            industry: 'Leisure Services'
          },
          {
            stockName: 'E.I.D-Parry (India) Ltd.',
            isin: 'INE126A01031',
            percentage: 2.60,
            marketValue: 88592.45,
            quantity: 9324049,
            industry: 'Food Products'
          },
          {
            stockName: 'K.P.R. Mill Ltd.',
            isin: 'INE930H01031',
            percentage: 2.55,
            marketValue: 86740.50,
            quantity: 7700000,
            industry: 'Textiles & Apparels'
          },
          {
            stockName: 'Krishna Institute of Medical Sciences Ltd.',
            isin: 'INE967H01025',
            percentage: 2.48,
            marketValue: 84326.90,
            quantity: 12323990,
            industry: 'Healthcare Services'
          },
          {
            stockName: 'City Union Bank Ltd.',
            isin: 'INE491A01021',
            percentage: 2.40,
            marketValue: 81538.41,
            quantity: 41665000,
            industry: 'Banks'
          },
          {
            stockName: 'Doms Industries Ltd.',
            isin: 'INE321T01012',
            percentage: 2.37,
            marketValue: 80777.40,
            quantity: 33000000,
            industry: 'Household Products'
          },
          {
            stockName: 'Deepak Fertilizers and Petrochemicals Corporation Ltd.',
            isin: 'INE501A01019',
            percentage: 2.29,
            marketValue: 78060.47,
            quantity: 5261203,
            industry: 'Chemicals & Petrochemicals'
          },
          {
            stockName: 'Finolex Industries Ltd.',
            isin: 'INE183A01024',
            percentage: 2.22,
            marketValue: 75473.98,
            quantity: 34595699,
            industry: 'Industrial Products'
          }
        ],
        sectorAllocation: [
          { sector: 'Finance', percentage: 9.47 },
          { sector: 'Industrial Products', percentage: 6.47 },
          { sector: 'Construction', percentage: 2.64 },
          { sector: 'Leisure Services', percentage: 2.62 },
          { sector: 'Food Products', percentage: 2.60 },
          { sector: 'Textiles & Apparels', percentage: 2.55 },
          { sector: 'Healthcare Services', percentage: 2.48 },
          { sector: 'Banks', percentage: 2.40 },
          { sector: 'Household Products', percentage: 2.37 },
          { sector: 'Chemicals & Petrochemicals', percentage: 2.29 },
          { sector: 'Others', percentage: 62.11 }
        ],
        portfolioTurnover: 45.2,
        totalEquityPercentage: 81.75,
        totalDebtPercentage: 0.16,
        totalCashPercentage: 18.09
      };

      // Store in database
      await supabase.from('amfi_portfolio_data').insert({
        scheme_code: schemeCode,
        scheme_name: realPortfolioData.schemeName,
        portfolio_data: realPortfolioData,
        scrape_status: 'success',
        scrape_source: 'manual_data'
      });

      console.log('Stored real AMFI portfolio data for SBI Small Cap Fund');
      return new Response(
        JSON.stringify({ success: true, data: realPortfolioData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For other schemes, attempt web scraping (placeholder for now)
    console.log('Attempting web scraping for scheme:', schemeCode);
    
    // Implement rate limiting
    await delay(2000); // 2 second delay between requests

    try {
      // TODO: Implement actual Puppeteer scraping here
      // This is a placeholder that will be replaced with real scraping logic
      
      const scrapedData = await attemptWebScraping(schemeCode);
      
      if (scrapedData) {
        // Store successful scrape in database
        await supabase.from('amfi_portfolio_data').insert({
          scheme_code: schemeCode,
          scheme_name: scrapedData.schemeName,
          portfolio_data: scrapedData,
          scrape_status: 'success',
          scrape_source: 'web_scraping'
        });

        return new Response(
          JSON.stringify({ success: true, data: scrapedData }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } catch (scrapeError) {
      console.error('Web scraping failed:', scrapeError);
      
      // Log failed attempt
      await supabase.from('amfi_scrape_logs').insert({
        scheme_code: schemeCode,
        status: 'failed',
        error_message: scrapeError.message,
        attempt_time: new Date().toISOString()
      });
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Portfolio data not available for scheme ${schemeCode}. Web scraping implementation in progress.` 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in portfolio scraping function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Failed to process portfolio data: ${error.message}` 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function attemptWebScraping(schemeCode: string): Promise<AMFIPortfolioData | null> {
  // This is a placeholder for the actual Puppeteer implementation
  // In a real implementation, this would:
  // 1. Launch Puppeteer browser
  // 2. Navigate to AMFI portfolio disclosure page
  // 3. Search for the specific scheme
  // 4. Parse the portfolio data
  // 5. Return structured data
  
  console.log(`Web scraping not yet implemented for scheme ${schemeCode}`);
  return null;
}
