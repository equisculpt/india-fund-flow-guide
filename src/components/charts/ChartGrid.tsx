
import PerformanceChart from './PerformanceChart';
import SIPPortfolioChart from './SIPPortfolioChart';

interface ChartGridProps {
  chartData: any[];
  fundComparisons: any[];
  sipAmount: number;
}

const ChartGrid = ({ chartData, fundComparisons, sipAmount }: ChartGridProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Percentage Returns</h3>
        <PerformanceChart
          chartData={chartData}
          fundComparisons={fundComparisons}
          showSIPChart={false}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">SIP Portfolio Value</h3>
        <SIPPortfolioChart
          chartData={chartData}
          fundComparisons={fundComparisons}
          sipAmount={sipAmount}
        />
      </div>
    </div>
  );
};

export default ChartGrid;
