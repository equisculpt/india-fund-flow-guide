import React from 'react';
import { StatementData } from '@/services/statement/types';

interface MetricBoxesProps {
  category: string;
  statementData: StatementData;
}

export const MetricBoxes: React.FC<MetricBoxesProps> = ({ category, statementData }) => {
  const renderTaxMetrics = () => (
    <div className="metrics-grid">
      <div className="metric-card neutral">
        <div className="metric-icon neutral">📋</div>
        <div className="metric-label">80C Investment</div>
        <div className="metric-value neutral">
          ₹{Math.min(statementData.portfolio.totalInvested, 150000).toLocaleString('en-IN')}
        </div>
        <div className="metric-subtext">Out of ₹1,50,000 limit</div>
      </div>

      <div className="metric-card positive">
        <div className="metric-icon positive">💰</div>
        <div className="metric-label">Tax Saved</div>
        <div className="metric-value positive">
          ₹{Math.floor(Math.min(statementData.portfolio.totalInvested, 150000) * 0.3).toLocaleString('en-IN')}
        </div>
        <div className="metric-subtext">30% Tax Benefit</div>
      </div>

      <div className={`metric-card ${statementData.portfolio.totalReturns >= 0 ? 'positive' : 'negative'}`}>
        <div className={`metric-icon ${statementData.portfolio.totalReturns >= 0 ? 'positive' : 'negative'}`}>
          {statementData.portfolio.totalReturns >= 0 ? '📈' : '📉'}
        </div>
        <div className="metric-label">LTCG</div>
        <div className={`metric-value ${statementData.portfolio.totalReturns >= 0 ? 'positive' : 'negative'}`}>
          ₹{Math.abs(statementData.portfolio.totalReturns).toLocaleString('en-IN')}
        </div>
        <div className="metric-subtext">
          {statementData.portfolio.totalReturns > 100000 ? 'Tax Applicable' : 'Tax Free'}
        </div>
      </div>

      <div className="metric-card neutral">
        <div className="metric-icon neutral">🔒</div>
        <div className="metric-label">Remaining 80C</div>
        <div className="metric-value neutral">
          ₹{Math.max(0, 150000 - Math.min(statementData.portfolio.totalInvested, 150000)).toLocaleString('en-IN')}
        </div>
        <div className="metric-subtext">
          {150000 - Math.min(statementData.portfolio.totalInvested, 150000) > 0 ? 'Available' : 'Exhausted'}
        </div>
      </div>
    </div>
  );

  const renderSIPMetrics = () => (
    <div className="metrics-grid">
      <div className="metric-card neutral">
        <div className="metric-icon neutral">📊</div>
        <div className="metric-label">Monthly SIP</div>
        <div className="metric-value neutral">
          ₹{Math.floor(statementData.portfolio.totalInvested / 24).toLocaleString('en-IN')}
        </div>
        <div className="metric-subtext">Average Monthly</div>
      </div>

      <div className="metric-card positive">
        <div className="metric-icon positive">⏳</div>
        <div className="metric-label">SIP Duration</div>
        <div className="metric-value positive">24</div>
        <div className="metric-subtext">Months Completed</div>
      </div>

      <div className="metric-card neutral">
        <div className="metric-icon neutral">🎯</div>
        <div className="metric-label">Goal Achievement</div>
        <div className="metric-value neutral">
          {((statementData.portfolio.currentValue / (statementData.portfolio.totalInvested * 1.5)) * 100).toFixed(0)}%
        </div>
        <div className="metric-subtext">Target Progress</div>
      </div>

      <div className="metric-card positive">
        <div className="metric-icon positive">💎</div>
        <div className="metric-label">Power of Compounding</div>
        <div className="metric-value positive">
          ₹{(statementData.portfolio.totalReturns * 0.4).toFixed(0)}
        </div>
        <div className="metric-subtext">From Compounding</div>
      </div>
    </div>
  );

  const renderTransactionMetrics = () => (
    <div className="metrics-grid">
      <div className="metric-card neutral">
        <div className="metric-icon neutral">📝</div>
        <div className="metric-label">Total Transactions</div>
        <div className="metric-value neutral">{statementData.holdings.length * 3}</div>
        <div className="metric-subtext">Last 12 Months</div>
      </div>

      <div className="metric-card positive">
        <div className="metric-icon positive">✅</div>
        <div className="metric-label">Successful Txns</div>
        <div className="metric-value positive">{statementData.holdings.length * 3}</div>
        <div className="metric-subtext">100% Success Rate</div>
      </div>

      <div className="metric-card neutral">
        <div className="metric-icon neutral">💸</div>
        <div className="metric-label">Avg Transaction</div>
        <div className="metric-value neutral">
          ₹{Math.floor(statementData.portfolio.totalInvested / (statementData.holdings.length * 3)).toLocaleString('en-IN')}
        </div>
        <div className="metric-subtext">Per Transaction</div>
      </div>

      <div className="metric-card positive">
        <div className="metric-icon positive">⚡</div>
        <div className="metric-label">Processing Time</div>
        <div className="metric-value positive">1.2</div>
        <div className="metric-subtext">Days Average</div>
      </div>
    </div>
  );

  const renderPerformanceMetrics = () => (
    <div className="metrics-grid">
      <div className="metric-card positive">
        <div className="metric-icon positive">🏆</div>
        <div className="metric-label">Alpha Generated</div>
        <div className="metric-value positive">
          +{(statementData.portfolio.xirr - 12).toFixed(1)}%
        </div>
        <div className="metric-subtext">vs Benchmark</div>
      </div>

      <div className="metric-card neutral">
        <div className="metric-icon neutral">📊</div>
        <div className="metric-label">Sharpe Ratio</div>
        <div className="metric-value neutral">
          {(statementData.portfolio.xirr / 8).toFixed(2)}
        </div>
        <div className="metric-subtext">Risk-Adj Return</div>
      </div>

      <div className="metric-card positive">
        <div className="metric-icon positive">🎯</div>
        <div className="metric-label">Beta</div>
        <div className="metric-value positive">0.85</div>
        <div className="metric-subtext">Lower Volatility</div>
      </div>

      <div className="metric-card neutral">
        <div className="metric-icon neutral">📈</div>
        <div className="metric-label">Max Drawdown</div>
        <div className="metric-value neutral">-8.5%</div>
        <div className="metric-subtext">Peak to Trough</div>
      </div>
    </div>
  );

  const renderPortfolioMetrics = () => (
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
        <div className="metric-subtext">Annualized Return</div>
      </div>
    </div>
  );

  const renderComprehensiveMetrics = () => (
    <>
      <div className="metrics-grid">
        <div className="metric-card neutral">
          <div className="metric-icon neutral">🏛️</div>
          <div className="metric-label">Total Portfolio</div>
          <div className="metric-value neutral">
            ₹{statementData.portfolio.currentValue.toLocaleString('en-IN')}
          </div>
          <div className="metric-subtext">All Investments</div>
        </div>

        <div className="metric-card positive">
          <div className="metric-icon positive">💰</div>
          <div className="metric-label">Tax Benefits</div>
          <div className="metric-value positive">
            ₹{Math.floor(Math.min(statementData.portfolio.totalInvested, 150000) * 0.3).toLocaleString('en-IN')}
          </div>
          <div className="metric-subtext">Total Saved</div>
        </div>

        <div className="metric-card neutral">
          <div className="metric-icon neutral">📊</div>
          <div className="metric-label">SIP Discipline</div>
          <div className="metric-value neutral">98%</div>
          <div className="metric-subtext">Success Rate</div>
        </div>

        <div className="metric-card positive">
          <div className="metric-icon positive">🏆</div>
          <div className="metric-label">Overall XIRR</div>
          <div className="metric-value positive">
            +{statementData.portfolio.xirr.toFixed(1)}%
          </div>
          <div className="metric-subtext">Outperforming</div>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card neutral">
          <div className="metric-icon neutral">🎯</div>
          <div className="metric-label">Asset Allocation</div>
          <div className="metric-value neutral">Optimal</div>
          <div className="metric-subtext">Risk Balanced</div>
        </div>

        <div className="metric-card positive">
          <div className="metric-icon positive">📈</div>
          <div className="metric-label">Growth Funds</div>
          <div className="metric-value positive">65%</div>
          <div className="metric-subtext">Of Portfolio</div>
        </div>

        <div className="metric-card neutral">
          <div className="metric-icon neutral">🛡️</div>
          <div className="metric-label">Debt Funds</div>
          <div className="metric-value neutral">20%</div>
          <div className="metric-subtext">Stability</div>
        </div>

        <div className="metric-card positive">
          <div className="metric-icon positive">🌍</div>
          <div className="metric-label">International</div>
          <div className="metric-value positive">15%</div>
          <div className="metric-subtext">Diversification</div>
        </div>
      </div>
    </>
  );

  switch (category) {
    case 'tax':
      return renderTaxMetrics();
    case 'sip':
      return renderSIPMetrics();
    case 'transaction':
      return renderTransactionMetrics();
    case 'performance':
      return renderPerformanceMetrics();
    case 'comprehensive':
      return renderComprehensiveMetrics();
    default:
      return renderPortfolioMetrics();
  }
};