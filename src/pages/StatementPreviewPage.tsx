import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { StatementData } from '@/services/statement/types';
import { MockDataGenerator } from '@/services/statement/mockDataGenerator';
import { PDFDownloadService } from '@/services/pdf/PDFDownloadService';
import { DirectPDFService } from '@/services/pdf/DirectPDFService';

// Statement Preview Page - This is what gets converted to PDF
const StatementPreviewPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [statementData, setStatementData] = useState<StatementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  const pdfDownloadService = new PDFDownloadService(toast);
  const directPDFService = new DirectPDFService(toast);
  
  const statementType = searchParams.get('type') || 'comprehensive';
  const clientCode = searchParams.get('client') || 'SB123456';
  const reportCategory = searchParams.get('category') || 'portfolio';
  const reportName = searchParams.get('reportName') || 'comprehensive';
  
  useEffect(() => {
    // Generate mock data for preview
    const mockData = MockDataGenerator.generateCompleteStatementData(clientCode);
    setStatementData(mockData);
    setLoading(false);

    // Check if this page was opened for auto-capture
    const autoCapture = searchParams.get('autoCapture');
    if (autoCapture === 'true') {
      // Listen for capture command from parent window
      const handleMessage = (event: MessageEvent) => {
        if (event.data.action === 'startCapture') {
          setTimeout(() => {
            directPDFService.captureCurrentPageAsPDF();
          }, 1000);
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Cleanup listener on unmount
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [clientCode, searchParams, directPDFService]);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Check if we should use direct capture or legacy system
      const autoCapture = searchParams.get('autoCapture');
      if (autoCapture === 'true') {
        // Use direct capture for auto-opened windows
        await directPDFService.captureCurrentPageAsPDF();
      } else {
        // Use legacy system for manual downloads
        await pdfDownloadService.downloadPDFStatement(statementType);
        toast({
          title: "PDF Downloaded!",
          description: "Your statement has been generated and downloaded successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading || !statementData) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Inter, sans-serif'
      }}>
        Loading statement...
      </div>
    );
  }

  return (
    <div className="statement-container">
      {/* Floating Action Buttons - Hidden in print */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="bg-primary hover:bg-primary/90 text-white shadow-lg"
          size="sm"
        >
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? 'Generating...' : 'Download PDF'}
        </Button>
        <Button
          onClick={handlePrint}
          variant="outline"
          className="bg-white hover:bg-gray-50 shadow-lg"
          size="sm"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print
        </Button>
      </div>
      {/* Print-specific styles */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm 15mm 20mm 15mm;
            @bottom-center {
              content: "Page " counter(page) " of " counter(pages);
              font-size: 10px;
              color: #666;
            }
            @bottom-left {
              content: "SIP Brewery - Confidential";
              font-size: 8px;
              color: #999;
            }
            @bottom-right {
              content: "Generated: " attr(data-date);
              font-size: 8px;
              color: #999;
            }
          }
          
          .page-break { 
            page-break-before: always; 
            break-before: page;
          }
          .no-print { display: none !important; }
          .avoid-break { 
            page-break-inside: avoid; 
            break-inside: avoid;
          }
          
          body { 
            margin: 0; 
            padding: 0; 
            font-size: 11px;
            line-height: 1.3;
          }
          .statement-container { 
            margin: 0; 
            padding: 0; 
            max-width: none;
            width: 100%;
          }
          
          /* Ensure header doesn't break */
          .header {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          /* Force table rows to stay together */
          .holdings-table tr {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          /* Keep sections together */
          .section {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 25px;
          }
          
          .metrics-grid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .ai-insights {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          /* Page counter */
          body {
            counter-reset: page;
          }
          
          .print-page-number::after {
            content: "Page " counter(page);
          }
        }
        
        .statement-container {
          background: white;
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #1F2937;
          line-height: 1.4;
          max-width: 210mm;
          margin: 0 auto;
          padding: 15mm 15mm 20mm 15mm;
          box-sizing: border-box;
        }
        
        .watermark {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 120px;
          font-weight: 100;
          color: rgba(37, 99, 235, 0.05);
          z-index: -1;
          pointer-events: none;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          margin-bottom: 30px;
          border-bottom: 3px solid #F59E0B;
        }
        
        .logo-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .logo {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #F59E0B, #EA580C);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 18px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }
        
        .logo::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #EA580C, transparent);
          opacity: 0.5;
        }
        
        .logo::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(to right, #FCD34D, #F59E0B);
          opacity: 0.7;
        }
        
        .beer-icon {
          font-size: 24px;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
        }
        
        .company-info h1 {
          font-size: 32px;
          font-weight: 700;
          color: #1F2937;
          margin: 0;
          letter-spacing: 1px;
        }
        
        .company-info p {
          font-size: 14px;
          color: #F59E0B;
          margin: 4px 0 0 0;
          font-weight: 600;
        }
        
        .document-meta {
          text-align: right;
        }
        
        .document-meta h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1F2937;
          margin: 0 0 8px 0;
        }
        
        .document-meta p {
          font-size: 12px;
          color: #6B7280;
          margin: 2px 0;
        }
        
        .ai-badge {
          background: linear-gradient(135deg, #3B82F6, #1D4ED8);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        
        .user-info {
          background: #F8FAFC;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 30px;
          border: 1px solid #E2E8F0;
        }
        
        .user-info h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1F2937;
          margin: 0 0 15px 0;
        }
        
        .user-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        
        .user-field label {
          font-size: 11px;
          color: #6B7280;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .user-field span {
          font-size: 14px;
          color: #1F2937;
          font-weight: 500;
          display: block;
          margin-top: 4px;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .metric-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .metric-card.positive {
          background: linear-gradient(135deg, #F0FDF4, #DCFCE7);
          border-color: #16A34A;
        }
        
        .metric-card.negative {
          background: linear-gradient(135deg, #FEF2F2, #FEE2E2);
          border-color: #DC2626;
        }
        
        .metric-card.neutral {
          background: linear-gradient(135deg, #F0F9FF, #DBEAFE);
          border-color: #0284C7;
        }
        
        .metric-icon {
          width: 40px;
          height: 40px;
          margin: 0 auto 12px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        
        .metric-icon.positive { background: #16A34A; color: white; }
        .metric-icon.negative { background: #DC2626; color: white; }
        .metric-icon.neutral { background: #0284C7; color: white; }
        
        .metric-label {
          font-size: 12px;
          color: #6B7280;
          font-weight: 500;
          margin-bottom: 8px;
        }
        
        .metric-value {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        
        .metric-value.positive { color: #16A34A; }
        .metric-value.negative { color: #DC2626; }
        .metric-value.neutral { color: #0284C7; }
        
        .metric-subtext {
          font-size: 10px;
          color: #9CA3AF;
          font-weight: 500;
        }
        
        .section {
          margin-bottom: 40px;
        }
        
        .section-header {
          background: #1F2937;
          color: white;
          padding: 15px 20px;
          border-radius: 8px 8px 0 0;
          margin-bottom: 0;
        }
        
        .section-title {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
        }
        
        .holdings-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 0 0 12px 12px;
          overflow: hidden;
          border: 2px solid #E5E7EB;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin-top: 0;
        }
        
        .holdings-table th {
          background: linear-gradient(135deg, #F8FAFC, #F1F5F9);
          padding: 16px 12px;
          font-size: 12px;
          font-weight: 700;
          color: #1F2937;
          text-align: left;
          border-bottom: 3px solid #D1D5DB;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .holdings-table td {
          padding: 14px 12px;
          font-size: 11px;
          border-bottom: 1px solid #E5E7EB;
          vertical-align: middle;
          background: white;
        }
        
        .holdings-table tr:nth-child(even) td {
          background: #FAFBFC;
        }
        
        .holdings-table tr:hover td {
          background: #F0F9FF;
        }
        
        .fund-name {
          font-weight: 700;
          color: #1F2937;
          font-size: 12px;
          margin-bottom: 4px;
          line-height: 1.3;
        }
        
        .fund-details {
          font-size: 10px;
          color: #6B7280;
          line-height: 1.2;
        }
        
        .positive-return { 
          color: #059669; 
          font-weight: 700;
          background: #ECFDF5;
          padding: 2px 6px;
          border-radius: 4px;
          display: inline-block;
        }
        
        .negative-return { 
          color: #DC2626; 
          font-weight: 700;
          background: #FEF2F2;
          padding: 2px 6px;
          border-radius: 4px;
          display: inline-block;
        }
        
        .risk-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          text-align: center;
          display: inline-block;
          min-width: 50px;
        }
        
        .risk-high {
          background: #FEE2E2;
          color: #DC2626;
          border: 1px solid #FECACA;
        }
        
        .risk-medium {
          background: #FEF3C7;
          color: #D97706;
          border: 1px solid #FDE68A;
        }
        
        .risk-low {
          background: #DCFCE7;
          color: #059669;
          border: 1px solid #BBF7D0;
        }
        
        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid #E5E7EB;
          font-size: 9px;
          color: #6B7280;
          line-height: 1.4;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 20px;
          margin-bottom: 15px;
        }
        
        .disclaimer {
          text-align: center;
          font-size: 8px;
          color: #9CA3AF;
          margin-bottom: 10px;
        }
        
        .warning {
          text-align: center;
          font-size: 9px;
          color: #DC2626;
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        .ai-insights {
          background: linear-gradient(135deg, #EEF2FF, #E0E7FF);
          border: 1px solid #8B5CF6;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 30px;
        }
        
        .ai-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        
        .ai-icon {
          width: 35px;
          height: 35px;
          background: #8B5CF6;
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }
        
        .ai-title {
          font-size: 18px;
          font-weight: 600;
          color: #5B21B6;
        }
        
        .insight-text {
          font-size: 13px;
          color: #4C1D95;
          line-height: 1.5;
          margin-bottom: 15px;
        }
        
        .key-insight {
          background: #F0FDF4;
          border-left: 4px solid #16A34A;
          padding: 15px;
          border-radius: 6px;
          margin-top: 15px;
        }
        
        .performance-badge {
          display: inline-block;
          background: #FEF3C7;
          color: #92400E;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          margin-left: 8px;
        }
      `}</style>

      {/* Watermark */}
      <div className="watermark">SIP BREWERY</div>

      {/* Header */}
      <div className="header">
        <div className="logo-section">
          <div className="logo">
            <span className="beer-icon" style={{ position: 'relative', zIndex: 2 }}>🍺</span>
          </div>
          <div className="company-info">
            <h1>SIP BREWERY</h1>
            <p>Brewing Wealth</p>
          </div>
        </div>
        <div className="document-meta">
          <h2>{
            reportCategory === 'tax' ? 'Tax Statement' :
            reportCategory === 'sip' ? 'SIP Statement' :
            reportCategory === 'transaction' ? 'Transaction Statement' :
            reportCategory === 'performance' ? 'Performance Report' :
            'Portfolio Statement'
          }</h2>
          <p>Generated: {new Date().toLocaleDateString('en-IN', { 
            year: 'numeric', month: 'long', day: 'numeric' 
          })}</p>
          <p>Type: {reportName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          <div className="ai-badge">AI POWERED</div>
        </div>
      </div>

      {/* User Information */}
      <div className="user-info">
        <h3>Account Information</h3>
        <div className="user-grid">
          <div className="user-field">
            <label>Client Name</label>
            <span>{statementData.userInfo.name}</span>
          </div>
          <div className="user-field">
            <label>Client Code</label>
            <span>{statementData.userInfo.clientCode}</span>
          </div>
          <div className="user-field">
            <label>Email</label>
            <span>{statementData.userInfo.email}</span>
          </div>
          <div className="user-field">
            <label>Mobile</label>
            <span>{statementData.userInfo.mobile}</span>
          </div>
          <div className="user-field">
            <label>PAN</label>
            <span>{statementData.userInfo.panMasked}</span>
          </div>
          <div className="user-field">
            <label>Statement Period</label>
            <span>01-Jan-2024 to {new Date().toLocaleDateString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Portfolio Metrics */}
      <div className="metrics-grid">
        <div className="metric-card neutral">
          <div className="metric-icon neutral">₹</div>
          <div className="metric-label">Total Invested</div>
          <div className="metric-value neutral">
            ₹{statementData.portfolio.totalInvested.toLocaleString('en-IN')}
          </div>
          <div className="metric-subtext">Principal Amount</div>
        </div>

        <div className="metric-card neutral">
          <div className="metric-icon neutral">📊</div>
          <div className="metric-label">Current Value</div>
          <div className="metric-value neutral">
            ₹{statementData.portfolio.currentValue.toLocaleString('en-IN')}
          </div>
          <div className="metric-subtext">Market Value</div>
        </div>

        <div className={`metric-card ${statementData.portfolio.totalReturns >= 0 ? 'positive' : 'negative'}`}>
          <div className={`metric-icon ${statementData.portfolio.totalReturns >= 0 ? 'positive' : 'negative'}`}>
            {statementData.portfolio.totalReturns >= 0 ? '📈' : '📉'}
          </div>
          <div className="metric-label">Total Returns</div>
          <div className={`metric-value ${statementData.portfolio.totalReturns >= 0 ? 'positive' : 'negative'}`}>
            {statementData.portfolio.totalReturns >= 0 ? '+' : ''}₹{Math.abs(statementData.portfolio.totalReturns).toLocaleString('en-IN')}
          </div>
          <div className="metric-subtext">
            {statementData.portfolio.returnsPercentage >= 0 ? '+' : ''}{statementData.portfolio.returnsPercentage.toFixed(2)}%
          </div>
        </div>

        <div className={`metric-card ${statementData.portfolio.xirr >= 0 ? 'positive' : 'negative'}`}>
          <div className={`metric-icon ${statementData.portfolio.xirr >= 0 ? 'positive' : 'negative'}`}>🎯</div>
          <div className="metric-label">XIRR</div>
          <div className={`metric-value ${statementData.portfolio.xirr >= 0 ? 'positive' : 'negative'}`}>
            {statementData.portfolio.xirr >= 0 ? '+' : ''}{statementData.portfolio.xirr.toFixed(2)}%
          </div>
          <div className="metric-subtext">
            Annualized Return
            <span className="performance-badge">
              {statementData.portfolio.xirr >= 15 ? 'Excellent ★★★' : 
               statementData.portfolio.xirr >= 12 ? 'Good ★★' : 
               statementData.portfolio.xirr >= 8 ? 'Average ★' : 'Below Avg'}
            </span>
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="ai-insights">
        <div className="ai-header">
          <div className="ai-icon">AI</div>
          <div className="ai-title">AI-Powered Portfolio Analysis</div>
        </div>
        <div className="insight-text">
          <strong>Performance Insight:</strong> Your portfolio has generated{' '}
          {statementData.portfolio.totalReturns >= 0 ? 'positive' : 'negative'} returns of{' '}
          ₹{Math.abs(statementData.portfolio.totalReturns).toLocaleString('en-IN')} with an annualized XIRR of{' '}
          {statementData.portfolio.xirr.toFixed(2)}%. This places your portfolio in the{' '}
          {statementData.portfolio.xirr >= 15 ? 'top 20%' : 
           statementData.portfolio.xirr >= 12 ? 'top 35%' : 
           statementData.portfolio.xirr >= 8 ? 'top 60%' : 'bottom 40%'} of investors on our platform.
        </div>
        <div className="insight-text">
          <strong>Next Best Action:</strong> {
            statementData.portfolio.xirr >= 15 
              ? 'Consider systematic step-ups in your SIPs to accelerate wealth creation while maintaining this momentum.'
              : statementData.portfolio.xirr >= 12
              ? 'Explore adding international diversification or increasing allocation to small-cap funds for potential alpha generation.'
              : 'Consider reviewing your fund choices and increasing exposure to growth-oriented equity funds for better long-term returns.'
          }
        </div>
        <div className="key-insight">
          <strong>💡 Key Insight:</strong> {
            statementData.portfolio.xirr >= 15 
              ? `You are beating inflation by ${(statementData.portfolio.xirr - 6).toFixed(1)}% annually!`
              : statementData.portfolio.xirr >= 12
              ? `Your returns are ${(statementData.portfolio.xirr - 10).toFixed(1)}% above market average!`
              : 'Small changes could boost your returns by 2-4% annually.'
          }
        </div>
      </div>

      {/* Dynamic Content Based on Report Category */}
      {reportCategory === 'tax' && (
        <>
          {/* Tax-specific content */}
          <div className="section avoid-break">
            <div className="section-header">
              <div className="section-title">Tax Saving Analysis - FY 2024-25</div>
            </div>
            <div className="ai-insights">
              <div className="ai-header">
                <div className="ai-icon">🎯</div>
                <div className="ai-title">Tax Benefits Summary</div>
              </div>
              <div className="insight-text">
                <strong>80C Investments:</strong> You have invested ₹{statementData.portfolio.totalInvested.toLocaleString('en-IN')} 
                in ELSS funds, saving ₹{Math.floor(statementData.portfolio.totalInvested * 0.3).toLocaleString('en-IN')} in taxes.
              </div>
              <div className="insight-text">
                <strong>Capital Gains:</strong> Your long-term capital gains are ₹{Math.abs(statementData.portfolio.totalReturns).toLocaleString('en-IN')}, 
                which is {statementData.portfolio.totalReturns > 100000 ? 'above' : 'below'} the exempt limit of ₹1 lakh.
              </div>
            </div>
            <table className="holdings-table">
              <thead>
                <tr>
                  <th>ELSS Fund Details</th>
                  <th>Investment</th>
                  <th>Current Value</th>
                  <th>Tax Benefit</th>
                  <th>Lock-in Status</th>
                </tr>
              </thead>
              <tbody>
                {statementData.holdings.filter(h => h.category?.includes('ELSS') || h.isELSS).map((holding, index) => (
                  <tr key={index}>
                    <td>
                      <div className="fund-name">{holding.schemeName}</div>
                      <div className="fund-details">{holding.amcName}</div>
                    </td>
                    <td style={{ textAlign: 'right' }}>₹{(holding.marketValue * 0.8).toFixed(0)}</td>
                    <td style={{ textAlign: 'right' }}>₹{holding.marketValue.toLocaleString('en-IN')}</td>
                    <td style={{ textAlign: 'right', color: '#16A34A' }}>₹{(holding.marketValue * 0.24).toFixed(0)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="risk-badge risk-low">Completed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {reportCategory === 'sip' && (
        <>
          {/* SIP-specific content */}
          <div className="section avoid-break">
            <div className="section-header">
              <div className="section-title">SIP Performance Analysis</div>
            </div>
            <div className="ai-insights">
              <div className="ai-header">
                <div className="ai-icon">💰</div>
                <div className="ai-title">SIP Investment Summary</div>
              </div>
              <div className="insight-text">
                <strong>SIP Discipline:</strong> You have maintained consistent SIP investments across {statementData.holdings.length} funds 
                with an average monthly commitment of ₹{Math.floor(statementData.portfolio.totalInvested / 24).toLocaleString('en-IN')}.
              </div>
            </div>
            <table className="holdings-table">
              <thead>
                <tr>
                  <th>SIP Details</th>
                  <th>Monthly SIP</th>
                  <th>Duration</th>
                  <th>Total Invested</th>
                  <th>Current Value</th>
                  <th>SIP Returns</th>
                </tr>
              </thead>
              <tbody>
                {statementData.holdings.map((holding, index) => (
                  <tr key={index}>
                    <td>
                      <div className="fund-name">{holding.schemeName}</div>
                      <div className="fund-details">Active SIP • {holding.amcName}</div>
                    </td>
                    <td style={{ textAlign: 'right' }}>₹{Math.floor(holding.marketValue / 24).toLocaleString('en-IN')}</td>
                    <td style={{ textAlign: 'center' }}>24 months</td>
                    <td style={{ textAlign: 'right' }}>₹{(holding.marketValue * 0.85).toFixed(0)}</td>
                    <td style={{ textAlign: 'right' }}>₹{holding.marketValue.toLocaleString('en-IN')}</td>
                    <td style={{ textAlign: 'right' }} className={holding.pnlPercentage >= 0 ? 'positive-return' : 'negative-return'}>
                      {holding.pnlPercentage >= 0 ? '+' : ''}{holding.pnlPercentage.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {reportCategory === 'transaction' && (
        <>
          {/* Transaction-specific content */}
          <div className="section avoid-break">
            <div className="section-header">
              <div className="section-title">Transaction History Report</div>
            </div>
            <table className="holdings-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transaction Type</th>
                  <th>Fund Name</th>
                  <th>Amount</th>
                  <th>Units</th>
                  <th>NAV</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {statementData.holdings.map((holding, index) => (
                  <tr key={index}>
                    <td>{new Date(Date.now() - index * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}</td>
                    <td>
                      <span className="risk-badge risk-low">Purchase</span>
                    </td>
                    <td>
                      <div className="fund-name">{holding.schemeName}</div>
                      <div className="fund-details">{holding.amcName}</div>
                    </td>
                    <td style={{ textAlign: 'right' }}>₹{Math.floor(holding.marketValue / 10).toLocaleString('en-IN')}</td>
                    <td style={{ textAlign: 'right' }}>{(holding.units / 10).toFixed(3)}</td>
                    <td style={{ textAlign: 'right' }}>₹{holding.currentNav.toFixed(2)}</td>
                    <td>
                      <span className="risk-badge risk-low">Completed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {reportCategory === 'performance' && (
        <>
          {/* Performance-specific content */}
          <div className="section avoid-break">
            <div className="section-header">
              <div className="section-title">Performance Analysis Report</div>
            </div>
            <div className="ai-insights">
              <div className="ai-header">
                <div className="ai-icon">📊</div>
                <div className="ai-title">Performance Insights</div>
              </div>
              <div className="insight-text">
                <strong>XIRR Analysis:</strong> Your portfolio XIRR of {statementData.portfolio.xirr.toFixed(2)}% 
                {statementData.portfolio.xirr >= 15 ? 'significantly outperforms' : 
                 statementData.portfolio.xirr >= 12 ? 'outperforms' : 'is below'} the market benchmark.
              </div>
            </div>
            <table className="holdings-table">
              <thead>
                <tr>
                  <th>Fund Performance</th>
                  <th>1Y Return</th>
                  <th>3Y Return</th>
                  <th>5Y Return</th>
                  <th>XIRR</th>
                  <th>Risk Rating</th>
                </tr>
              </thead>
              <tbody>
                {statementData.holdings.map((holding, index) => (
                  <tr key={index}>
                    <td>
                      <div className="fund-name">{holding.schemeName}</div>
                      <div className="fund-details">{holding.category}</div>
                    </td>
                    <td style={{ textAlign: 'right' }} className="positive-return">
                      +{(Math.random() * 20 + 5).toFixed(1)}%
                    </td>
                    <td style={{ textAlign: 'right' }} className="positive-return">
                      +{(Math.random() * 15 + 10).toFixed(1)}%
                    </td>
                    <td style={{ textAlign: 'right' }} className="positive-return">
                      +{(Math.random() * 12 + 8).toFixed(1)}%
                    </td>
                    <td style={{ textAlign: 'right' }} className={holding.pnlPercentage >= 0 ? 'positive-return' : 'negative-return'}>
                      {holding.pnlPercentage >= 0 ? '+' : ''}{holding.pnlPercentage.toFixed(1)}%
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`risk-badge ${
                        holding.category?.includes('Large') ? 'risk-low' : 
                        holding.category?.includes('Mid') ? 'risk-medium' : 'risk-high'
                      }`}>
                        {holding.category?.includes('Large') ? 'Low' : 
                         holding.category?.includes('Mid') ? 'Medium' : 'High'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {reportCategory === 'portfolio' && (
        <>
          {/* Default Portfolio Holdings */}
          <div className="section avoid-break">
            <div className="section-header">
              <div className="section-title">Portfolio Holdings Breakdown</div>
            </div>
            <table className="holdings-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>Fund Details</th>
                  <th style={{ width: '10%' }}>Units</th>
                  <th style={{ width: '10%' }}>NAV (₹)</th>
                  <th style={{ width: '15%' }}>Market Value</th>
                  <th style={{ width: '10%' }}>Returns</th>
                  <th style={{ width: '10%' }}>% Portfolio</th>
                  <th style={{ width: '10%' }}>Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {statementData.holdings.map((holding, index) => {
                  const totalValue = statementData.holdings.reduce((sum, h) => sum + h.marketValue, 0);
                  const portfolioPercent = totalValue > 0 ? (holding.marketValue / totalValue) * 100 : 0;
                  
                  return (
                    <tr key={index} className="avoid-break">
                      <td>
                        <div className="fund-name">{holding.schemeName}</div>
                        <div className="fund-details">
                          {holding.amcName} • {holding.category}
                          {holding.isELSS && ' • ELSS (Tax Saver)'}
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>{holding.units.toFixed(3)}</td>
                      <td style={{ textAlign: 'right' }}>₹{holding.currentNav.toFixed(2)}</td>
                      <td style={{ textAlign: 'right', fontWeight: '600' }}>
                        ₹{holding.marketValue.toLocaleString('en-IN')}
                      </td>
                      <td style={{ textAlign: 'right' }} className={holding.pnlPercentage >= 0 ? 'positive-return' : 'negative-return'}>
                        {holding.pnlPercentage >= 0 ? '↗' : '↘'} {Math.abs(holding.pnlPercentage).toFixed(1)}%
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '700', fontSize: '11px' }}>
                        {portfolioPercent.toFixed(1)}%
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`risk-badge ${
                          holding.category?.includes('Large') ? 'risk-low' : 
                          holding.category?.includes('Mid') ? 'risk-medium' : 'risk-high'
                        }`}>
                          {holding.category?.includes('Large') ? 'Low' : 
                           holding.category?.includes('Mid') ? 'Medium' : 'High'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Footer - Will appear on each page in print */}
      <div className="footer avoid-break">
        <div className="footer-grid">
          <div>
            <strong>SIP Brewery Pvt. Ltd.</strong><br />
            www.sipbrewery.com<br />
            support@sipbrewery.com
          </div>
          <div style={{ textAlign: 'center' }}>
            <strong>AMFI Registered Mutual Fund Distributor | ARN-XXXXXX</strong><br />
            Registered with BSE & NSE | SEBI Registered Investment Advisor<br />
            SEBI Registration No: INH000000000
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="print-page-number"></span><br />
            {new Date().toLocaleDateString('en-IN')}<br />
            Client: {statementData.userInfo.clientCode}
          </div>
        </div>
        
        <div className="disclaimer">
          This statement is computer generated and does not require signature. Past performance is not indicative of future results. 
          Mutual fund investments are subject to market risks, read all scheme related documents carefully. 
          For any queries, please contact your relationship manager or visit our website.
        </div>
        
        <div className="warning">
          MUTUAL FUNDS INVESTMENTS ARE SUBJECT TO MARKET RISKS
        </div>
        
        <div style={{ textAlign: 'center', fontSize: '8px', color: '#9CA3AF' }}>
          Copyright {new Date().getFullYear()} SIP Brewery Pvt. Ltd. All rights reserved. 
          This document is confidential and intended solely for the addressee.
        </div>
      </div>
    </div>
  );
};

export default StatementPreviewPage;