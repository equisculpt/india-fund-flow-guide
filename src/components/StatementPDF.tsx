import React, { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import BreweryLogo from './BreweryLogo';

// Register Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

interface Props {
  name: string;
  clientCode: string;
  totalInvested: number;
  currentValue: number;
  returnsPercentage: number;
  xirr: number;
  months: string[];
  values: number[];
}

const StatementPDF: React.FC<Props> = ({
  name,
  clientCode,
  totalInvested,
  currentValue,
  returnsPercentage,
  xirr,
  months,
  values
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Portfolio Value',
          data: values,
          borderColor: 'hsl(var(--primary))',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
          backgroundColor: 'hsl(var(--primary) / 0.1)',
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    return () => chart.destroy();
  }, [months, values]);

  const downloadPDF = async () => {
    try {
      console.log('🧪 Generating PDF using Puppeteer service...');
      
      // Call the Supabase Edge Function for PDF generation
      const response = await fetch('https://pvtrwvvcgkppjlbyvflv.supabase.co/functions/v1/generate-statement-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dHJ3dnZjZ2twcGpsYnl2Zmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDE0NTYsImV4cCI6MjA2NTQ3NzQ1Nn0.PW1tXy6_aKnbBj5vXEvtYYoClLJClLYbuVJiw9paEco`,
        },
        body: JSON.stringify({
          name,
          clientCode,
          totalInvested,
          currentValue,
          returnsPercentage,
          xirr,
          months,
          values
        }),
      });

      if (!response.ok) {
        throw new Error(`PDF generation failed: ${response.status}`);
      }

      // Get the PDF blob and trigger download
      const pdfBlob = await response.blob();
      const url = window.URL.createObjectURL(pdfBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `SIP-Brewery-Statement-${clientCode}-${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
      
      console.log('✅ PDF downloaded successfully');
    } catch (error) {
      console.error('❌ PDF generation error:', error);
      
      // Fallback to client-side generation if server fails
      console.log('🔄 Falling back to client-side PDF generation...');
      if (!captureRef.current) return;
      
      const canvas = await html2canvas(captureRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = 210;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SIPBrewery-Statement-${clientCode}.pdf`);
    }
  };

  // Emoji Insights
  const insight = xirr > 15
    ? { emoji: '🚀', title: 'Excellent Growth', comment: 'You are in the top 20% investors!' }
    : xirr > 10
      ? { emoji: '📈', title: 'Solid Performance', comment: 'Keep investing steadily.' }
      : { emoji: '🧐', title: 'Scope for Growth', comment: 'Consider reviewing your fund mix.' };

  return (
    <div className="p-6 bg-background min-h-screen font-sans">
      <div ref={captureRef} className="bg-card shadow-xl p-8 rounded-xl max-w-3xl mx-auto border">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">SIP Brewery 📄</h1>
          <p className="text-sm text-muted-foreground">Brewing Wealth, One SIP at a Time</p>
          <hr className="my-4 border-border" />
        </div>

        {/* User Info */}
        <div className="grid grid-cols-2 gap-4 text-foreground text-sm mb-6">
          <div><strong>Name:</strong> {name}</div>
          <div><strong>Client Code:</strong> {clientCode}</div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-secondary/50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h3 className="text-muted-foreground text-sm">Total Invested</h3>
            <p className="text-xl font-bold text-foreground">₹{totalInvested.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="text-muted-foreground text-sm">Current Value</h3>
            <p className="text-xl font-bold text-foreground">₹{currentValue.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-muted-foreground text-sm">Returns</h3>
            <p className="text-xl font-bold text-foreground">{returnsPercentage.toFixed(2)}%</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border-l-4 border-purple-500">
            <h3 className="text-muted-foreground text-sm">XIRR</h3>
            <p className="text-xl font-bold text-foreground">{xirr.toFixed(2)}%</p>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary mb-8">
          <h3 className="font-bold text-lg text-foreground">{insight.emoji} {insight.title}</h3>
          <p className="text-sm text-muted-foreground">{insight.comment}</p>
        </div>

        {/* Chart Section */}
        <div className="bg-card border rounded-xl shadow p-4 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Portfolio Trend (Last 6 Months)</h2>
          <canvas ref={chartRef} width="500" height="300" />
        </div>

        {/* Footer */}
        <div className="text-xs text-center text-muted-foreground mt-12">
          <hr className="my-2 border-border" />
          <p>SIP Brewery is a trademark of Equisculpt Ventures • AMFI ARN-XXXXX • BSE Member</p>
          <p className="mt-1">This report is for informational purposes only. Not financial advice.</p>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-6">
        <button
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          onClick={downloadPDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default StatementPDF;