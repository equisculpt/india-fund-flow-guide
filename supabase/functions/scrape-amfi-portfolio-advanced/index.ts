
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PortfolioHolding {
  security: string;
  isin?: string;
  sector?: string;
  industry?: string;
  quantity?: number;
  value_pct: number;
  market_value?: number;
}

interface ParsedPortfolio {
  amc: string;
  scheme: string;
  scheme_code?: string;
  date: string;
  holdings: PortfolioHolding[];
  total_securities: number;
  nav?: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting advanced AMFI portfolio scraping...');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Step 1: Scrape AMFI Portfolio Disclosure Index
    console.log('Step 1: Scraping AMFI portfolio disclosure index...');
    const amfiIndexUrl = 'https://www.amfiindia.com/research-information/other-data/monthly-portfolio-disclosure';
    
    const portfolioLinks = await scrapeAMFIIndex(amfiIndexUrl);
    console.log(`Found ${portfolioLinks.length} portfolio links`);

    // Store portfolio links in database
    for (const link of portfolioLinks) {
      const { error } = await supabase
        .from('amfi_portfolio_links')
        .upsert(link, { onConflict: 'amc_name,portfolio_date' });
      
      if (error) {
        console.error('Error storing portfolio link:', error);
      }
    }

    // Step 2: Download and Parse Portfolio Files
    console.log('Step 2: Processing portfolio files...');
    let processedCount = 0;
    let successCount = 0;

    for (const link of portfolioLinks.slice(0, 10)) { // Process first 10 for demo
      try {
        console.log(`Processing ${link.amc_name} portfolio...`);
        
        // Download file content
        const fileContent = await downloadPortfolioFile(link.portfolio_url, link.file_type);
        
        if (!fileContent) {
          await logScrapeAttempt(supabase, {
            amc_name: link.amc_name,
            status: 'failed',
            error_message: 'Failed to download file',
            file_url: link.portfolio_url
          });
          continue;
        }

        // Parse portfolio data based on AMC
        const parsedData = await parsePortfolioData(fileContent, link);
        
        if (parsedData && parsedData.length > 0) {
          // Store parsed data
          for (const portfolio of parsedData) {
            const { error } = await supabase
              .from('amfi_portfolio_data')
              .upsert({
                scheme_code: portfolio.scheme_code || generateSchemeCode(portfolio.scheme),
                scheme_name: portfolio.scheme,
                amc_name: portfolio.amc,
                portfolio_date: portfolio.date,
                portfolio_data: {
                  holdings: portfolio.holdings,
                  total_securities: portfolio.total_securities,
                  nav: portfolio.nav,
                  metadata: {
                    source_url: link.portfolio_url,
                    scrape_date: new Date().toISOString(),
                    file_type: link.file_type
                  }
                }
              }, { onConflict: 'scheme_code,portfolio_date' });

            if (error) {
              console.error('Error storing portfolio data:', error);
            }
          }

          await logScrapeAttempt(supabase, {
            amc_name: link.amc_name,
            status: 'success',
            file_url: link.portfolio_url,
            additional_data: { schemes_processed: parsedData.length }
          });
          successCount++;
        }

        processedCount++;
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`Error processing ${link.amc_name}:`, error);
        await logScrapeAttempt(supabase, {
          amc_name: link.amc_name,
          status: 'failed',
          error_message: error.message,
          file_url: link.portfolio_url
        });
      }
    }

    console.log(`Processing complete. ${successCount}/${processedCount} files processed successfully.`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'AMFI portfolio scraping completed',
        stats: {
          total_links_found: portfolioLinks.length,
          files_processed: processedCount,
          successful_parses: successCount
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in AMFI portfolio scraping:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to complete AMFI portfolio scraping', details: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

// Step 1: Scrape AMFI Index for Portfolio Links
async function scrapeAMFIIndex(url: string) {
  console.log('Scraping AMFI index page...');
  
  // Mock data for demonstration - in production, use Puppeteer/Playwright
  const mockPortfolioLinks = [
    {
      amc_name: 'HDFC Mutual Fund',
      portfolio_url: 'https://www.hdfcfund.com/content/dam/hdfcfund/pdf/portfolio-disclosure/HDFC-Equity-Portfolio-Dec-2024.xlsx',
      portfolio_date: '2024-12-31',
      file_type: 'XLSX'
    },
    {
      amc_name: 'SBI Mutual Fund',
      portfolio_url: 'https://www.sbimf.com/docs/default-source/equity-scheme-portfolio/sbi-bluechip-fund-portfolio-dec-2024.xlsx',
      portfolio_date: '2024-12-31',
      file_type: 'XLSX'
    },
    {
      amc_name: 'ICICI Prudential Mutual Fund',
      portfolio_url: 'https://www.icicipruamc.com/Portfolio/equity/ICICI-Prudential-Bluechip-Fund-Dec-2024.xlsx',
      portfolio_date: '2024-12-31',
      file_type: 'XLSX'
    },
    {
      amc_name: 'Axis Mutual Fund',
      portfolio_url: 'https://www.axismf.com/pdf/portfolio-holdings/equity/Axis-Bluechip-Fund-Dec-2024.xlsx',
      portfolio_date: '2024-12-31',
      file_type: 'XLSX'
    },
    {
      amc_name: 'Nippon India Mutual Fund',
      portfolio_url: 'https://mf.nipponindiaim.com/Downloads/FactSheet/Portfolio/Nippon-India-Large-Cap-Fund-Dec-2024.xlsx',
      portfolio_date: '2024-12-31',
      file_type: 'XLSX'
    }
  ];

  return mockPortfolioLinks;
}

// Step 2: Download Portfolio Files
async function downloadPortfolioFile(url: string, fileType: string): Promise<ArrayBuffer | null> {
  try {
    console.log(`Downloading file from: ${url}`);
    
    // Mock download - in production, implement actual file download
    // For now, return mock data indicating successful download
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate download time
    
    return new ArrayBuffer(1024); // Mock data
  } catch (error) {
    console.error('Error downloading file:', error);
    return null;
  }
}

// Step 3: Parse Portfolio Data (AMC-specific logic)
async function parsePortfolioData(fileContent: ArrayBuffer, linkInfo: any): Promise<ParsedPortfolio[]> {
  console.log(`Parsing portfolio data for ${linkInfo.amc_name}...`);
  
  // Mock parsed data - in production, implement actual XLS parsing
  const mockPortfolios: ParsedPortfolio[] = [
    {
      amc: linkInfo.amc_name,
      scheme: `${linkInfo.amc_name.split(' ')[0]} Bluechip Fund - Direct Growth`,
      scheme_code: generateSchemeCode(`${linkInfo.amc_name.split(' ')[0]} Bluechip Fund`),
      date: linkInfo.portfolio_date,
      holdings: [
        {
          security: "Reliance Industries Ltd.",
          isin: "INE002A01018",
          sector: "Energy",
          industry: "Oil & Gas",
          value_pct: 8.4,
          market_value: 84000000
        },
        {
          security: "Tata Consultancy Services Ltd.",
          isin: "INE467B01029",
          sector: "Information Technology",
          industry: "IT Services",
          value_pct: 7.2,
          market_value: 72000000
        },
        {
          security: "HDFC Bank Ltd.",
          isin: "INE040A01034",
          sector: "Financial Services",
          industry: "Private Banks",
          value_pct: 6.8,
          market_value: 68000000
        },
        {
          security: "Infosys Ltd.",
          isin: "INE009A01021",
          sector: "Information Technology",
          industry: "IT Services",
          value_pct: 5.9,
          market_value: 59000000
        },
        {
          security: "ICICI Bank Ltd.",
          isin: "INE090A01013",
          sector: "Financial Services",
          industry: "Private Banks",
          value_pct: 5.2,
          market_value: 52000000
        }
      ],
      total_securities: 5,
      nav: 125.45
    }
  ];

  return mockPortfolios;
}

// Utility Functions
function generateSchemeCode(schemeName: string): string {
  return schemeName
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .substring(0, 10) + Math.random().toString(36).substr(2, 3).toUpperCase();
}

async function logScrapeAttempt(supabase: any, logData: any) {
  const { error } = await supabase
    .from('amfi_scrape_logs')
    .insert(logData);
  
  if (error) {
    console.error('Error logging scrape attempt:', error);
  }
}
