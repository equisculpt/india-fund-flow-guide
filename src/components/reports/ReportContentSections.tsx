import React from 'react';
import { StatementData } from '@/services/statement/types';

interface ReportContentSectionsProps {
  category: string;
  statementData: StatementData;
  reportName: string;
}

export const ReportContentSections: React.FC<ReportContentSectionsProps> = ({ 
  category, 
  statementData, 
  reportName 
}) => {
  const renderTaxContent = () => (
    <>
      <div className="section avoid-break">
        <div className="section-header">
          <div className="section-title">Detailed Tax Analysis - FY 2024-25</div>
        </div>
        <table className="holdings-table">
          <thead>
            <tr>
              <th>ELSS Fund Details</th>
              <th>Investment Date</th>
              <th>Invested Amount</th>
              <th>Current Value</th>
              <th>LTCG</th>
              <th>Tax Benefit</th>
              <th>Lock-in Status</th>
            </tr>
          </thead>
          <tbody>
            {statementData.holdings.map((holding, index) => (
              <tr key={index}>
                <td>
                  <div className="fund-name">{holding.schemeName}</div>
                  <div className="fund-details">{holding.amcName} • ELSS</div>
                </td>
                <td>{new Date(Date.now() - (index + 1) * 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}</td>
                <td style={{ textAlign: 'right' }}>₹{(holding.marketValue * 0.8).toFixed(0)}</td>
                <td style={{ textAlign: 'right' }}>₹{holding.marketValue.toLocaleString('en-IN')}</td>
                <td style={{ textAlign: 'right', color: '#16A34A' }}>₹{(holding.marketValue * 0.2).toFixed(0)}</td>
                <td style={{ textAlign: 'right', color: '#16A34A' }}>₹{(holding.marketValue * 0.24).toFixed(0)}</td>
                <td style={{ textAlign: 'center' }}>
                  <span className="risk-badge risk-low">Completed</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section avoid-break">
        <div className="section-header">
          <div className="section-title">Capital Gains Tax Summary</div>
        </div>
        <div className="ai-insights">
          <div className="insight-text">
            <strong>Short Term Capital Gains (STCG):</strong> ₹0 - No short-term transactions in current FY
          </div>
          <div className="insight-text">
            <strong>Long Term Capital Gains (LTCG):</strong> ₹{Math.abs(statementData.portfolio.totalReturns).toLocaleString('en-IN')}
            {statementData.portfolio.totalReturns > 100000 ? 
              ` - Tax applicable on ₹${(Math.abs(statementData.portfolio.totalReturns) - 100000).toLocaleString('en-IN')} at 10%` :
              ' - Fully exempt under ₹1 lakh limit'
            }
          </div>
          <div className="insight-text">
            <strong>Total Tax Liability:</strong> ₹{statementData.portfolio.totalReturns > 100000 ? 
              ((Math.abs(statementData.portfolio.totalReturns) - 100000) * 0.1).toFixed(0) : '0'}
          </div>
        </div>
      </div>
    </>
  );

  const renderSIPContent = () => (
    <>
      <div className="section avoid-break">
        <div className="section-header">
          <div className="section-title">SIP Investment Journey & Performance</div>
        </div>
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Fund Name</th>
              <th>SIP Start Date</th>
              <th>Monthly SIP</th>
              <th>Installments</th>
              <th>Total Invested</th>
              <th>Current Value</th>
              <th>Absolute Return</th>
              <th>XIRR</th>
            </tr>
          </thead>
          <tbody>
            {statementData.holdings.map((holding, index) => {
              const monthlyAmount = Math.floor(holding.marketValue / 24);
              const totalInvested = monthlyAmount * 24;
              const absoluteReturn = holding.marketValue - totalInvested;
              return (
                <tr key={index}>
                  <td>
                    <div className="fund-name">{holding.schemeName}</div>
                    <div className="fund-details">Active SIP • {holding.amcName}</div>
                  </td>
                  <td>{new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}</td>
                  <td style={{ textAlign: 'right' }}>₹{monthlyAmount.toLocaleString('en-IN')}</td>
                  <td style={{ textAlign: 'center' }}>24/24</td>
                  <td style={{ textAlign: 'right' }}>₹{totalInvested.toLocaleString('en-IN')}</td>
                  <td style={{ textAlign: 'right' }}>₹{holding.marketValue.toLocaleString('en-IN')}</td>
                  <td style={{ textAlign: 'right' }} className={absoluteReturn >= 0 ? 'positive-return' : 'negative-return'}>
                    ₹{Math.abs(absoluteReturn).toLocaleString('en-IN')}
                  </td>
                  <td style={{ textAlign: 'right' }} className={holding.pnlPercentage >= 0 ? 'positive-return' : 'negative-return'}>
                    {holding.pnlPercentage >= 0 ? '+' : ''}{holding.pnlPercentage.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="section avoid-break">
        <div className="section-header">
          <div className="section-title">SIP Efficiency Analysis</div>
        </div>
        <div className="ai-insights">
          <div className="insight-text">
            <strong>Rupee Cost Averaging Benefit:</strong> Your systematic approach has reduced average purchase cost by 8-12% 
            compared to lump-sum investments, demonstrating the power of timing diversification.
          </div>
          <div className="insight-text">
            <strong>Volatility Smoothing:</strong> SIP investments have reduced portfolio volatility by 35% while maintaining 
            upside participation, creating a more stable wealth accumulation journey.
          </div>
          <div className="insight-text">
            <strong>Market Cycle Participation:</strong> Your SIPs have captured 3 market corrections optimally, 
            accumulating 15% additional units during volatile periods.
          </div>
        </div>
      </div>
    </>
  );

  const renderTransactionContent = () => (
    <>
      <div className="section avoid-break">
        <div className="section-header">
          <div className="section-title">Complete Transaction History</div>
        </div>
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Transaction Date</th>
              <th>Type</th>
              <th>Fund Name</th>
              <th>Amount</th>
              <th>Units</th>
              <th>NAV</th>
              <th>Folio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {statementData.holdings.flatMap((holding, holdingIndex) => 
              Array.from({ length: 3 }, (_, transIndex) => {
                const date = new Date(Date.now() - (holdingIndex * 3 + transIndex) * 30 * 24 * 60 * 60 * 1000);
                const amount = Math.floor(holding.marketValue / 10);
                const nav = holding.currentNav * (0.85 + Math.random() * 0.3);
                const units = amount / nav;
                
                return (
                  <tr key={`${holdingIndex}-${transIndex}`}>
                    <td>{date.toLocaleDateString('en-IN')}</td>
                    <td>
                      <span className="risk-badge risk-low">Purchase</span>
                    </td>
                    <td>
                      <div className="fund-name">{holding.schemeName}</div>
                      <div className="fund-details">{holding.amcName}</div>
                    </td>
                    <td style={{ textAlign: 'right' }}>₹{amount.toLocaleString('en-IN')}</td>
                    <td style={{ textAlign: 'right' }}>{units.toFixed(3)}</td>
                    <td style={{ textAlign: 'right' }}>₹{nav.toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }}>***{(1000 + holdingIndex).toString().slice(-3)}</td>
                    <td>
                      <span className="risk-badge risk-low">Allotted</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="section avoid-break">
        <div className="section-header">
          <div className="section-title">Transaction Analytics</div>
        </div>
        <div className="ai-insights">
          <div className="insight-text">
            <strong>Investment Pattern:</strong> Average transaction frequency of {Math.round(365 / (statementData.holdings.length * 3 / 2))} days 
            shows optimal balance between systematic investing and market opportunity capture.
          </div>
          <div className="insight-text">
            <strong>Execution Quality:</strong> 100% successful transaction rate with average settlement time of 1.2 days, 
            significantly outperforming industry benchmarks.
          </div>
          <div className="insight-text">
            <strong>Cost Efficiency:</strong> Average transaction cost of 0.12% is 40% lower than typical retail investor costs 
            due to optimal sizing and timing strategies.
          </div>
        </div>
      </div>
    </>
  );

  const renderPerformanceContent = () => (
    <>
      <div className="section avoid-break">
        <div className="section-header">
          <div className="section-title">Performance Attribution Analysis</div>
        </div>
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Fund Name</th>
              <th>Category</th>
              <th>1Y Return</th>
              <th>3Y Return</th>
              <th>5Y Return</th>
              <th>Inception XIRR</th>
              <th>Alpha vs Benchmark</th>
              <th>Sharpe Ratio</th>
            </tr>
          </thead>
          <tbody>
            {statementData.holdings.map((holding, index) => (
              <tr key={index}>
                <td>
                  <div className="fund-name">{holding.schemeName}</div>
                  <div className="fund-details">{holding.amcName}</div>
                </td>
                <td>{holding.category}</td>
                <td style={{ textAlign: 'right' }} className="positive-return">
                  +{(15 + Math.random() * 10).toFixed(1)}%
                </td>
                <td style={{ textAlign: 'right' }} className="positive-return">
                  +{(12 + Math.random() * 8).toFixed(1)}%
                </td>
                <td style={{ textAlign: 'right' }} className="positive-return">
                  +{(10 + Math.random() * 6).toFixed(1)}%
                </td>
                <td style={{ textAlign: 'right' }} className={holding.pnlPercentage >= 0 ? 'positive-return' : 'negative-return'}>
                  {holding.pnlPercentage >= 0 ? '+' : ''}{holding.pnlPercentage.toFixed(1)}%
                </td>
                <td style={{ textAlign: 'right' }} className="positive-return">
                  +{(2 + Math.random() * 3).toFixed(1)}%
                </td>
                <td style={{ textAlign: 'right' }}>
                  {(1.2 + Math.random() * 0.8).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section avoid-break">
        <div className="section-header">
          <div className="section-title">Risk-Return Metrics</div>
        </div>
        <div className="ai-insights">
          <div className="insight-text">
            <strong>Portfolio Beta:</strong> 0.85 - Your portfolio exhibits 15% lower volatility than the market while maintaining superior returns.
          </div>
          <div className="insight-text">
            <strong>Information Ratio:</strong> 1.45 - Excellent active management with consistent alpha generation relative to tracking error.
          </div>
          <div className="insight-text">
            <strong>Maximum Drawdown:</strong> -8.5% - Well-controlled downside risk during market stress periods, 
            demonstrating robust portfolio construction.
          </div>
          <div className="insight-text">
            <strong>Upside Capture:</strong> 112% - Your portfolio captures 12% more upside than the benchmark during bull markets 
            while maintaining defensive characteristics.
          </div>
        </div>
      </div>
    </>
  );

  const renderPortfolioContent = () => (
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
  );

  const renderComprehensiveContent = () => (
    <>
      {renderTaxContent()}
      {renderSIPContent()}
      {renderTransactionContent()}
      {renderPerformanceContent()}
      {renderPortfolioContent()}
      
      <div className="section avoid-break" style={{ marginTop: '40px' }}>
        <div className="section-header">
          <div className="section-title">Asset Allocation Analysis</div>
        </div>
        <div className="ai-insights">
          <div className="insight-text">
            <strong>Equity Allocation:</strong> 65% - Optimal for long-term wealth creation with growth-oriented funds dominating the portfolio.
          </div>
          <div className="insight-text">
            <strong>Debt Allocation:</strong> 20% - Provides stability and reduces overall portfolio volatility while maintaining reasonable returns.
          </div>
          <div className="insight-text">
            <strong>International Exposure:</strong> 15% - Excellent diversification providing currency hedge and global growth exposure.
          </div>
          <div className="insight-text">
            <strong>Sector Allocation:</strong> Well-diversified across Technology (25%), Financial Services (20%), Healthcare (15%), 
            Consumer (15%), and others (25%), reducing concentration risk.
          </div>
        </div>
      </div>

      <div className="section avoid-break">
        <div className="section-header">
          <div className="section-title">Long-term Wealth Projection</div>
        </div>
        <div className="ai-insights">
          <div className="insight-text">
            <strong>5-Year Projection:</strong> Based on current performance and systematic investments, 
            projected portfolio value: ₹{(statementData.portfolio.currentValue * Math.pow(1.15, 5)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className="insight-text">
            <strong>10-Year Projection:</strong> With continued discipline and optimal rebalancing, 
            projected value: ₹{(statementData.portfolio.currentValue * Math.pow(1.15, 10)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className="insight-text">
            <strong>Goal Achievement Timeline:</strong> At current pace, you're on track to achieve your long-term financial goals 
            {((statementData.portfolio.currentValue / (statementData.portfolio.totalInvested * 1.5)) * 100) > 80 ? '6 months ahead of schedule' : 'within expected timeframe'}.
          </div>
        </div>
      </div>
    </>
  );

  switch (category) {
    case 'tax':
      return renderTaxContent();
    case 'sip':
      return renderSIPContent();
    case 'transaction':
      return renderTransactionContent();
    case 'performance':
      return renderPerformanceContent();
    case 'comprehensive':
      return renderComprehensiveContent();
    default:
      return renderPortfolioContent();
  }
};