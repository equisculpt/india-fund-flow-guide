
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ConsolidatedSEOHead from '@/components/seo/ConsolidatedSEOHead';

const IndogulfIPOBlog = () => {
  // Updated financial data based on restated consolidated financials INCLUDING 9M FY25 data from uploaded image
  const financialData = [
    { year: 'FY22', revenue: 490.23, ebitda: 47.24, pat: 26.36, ebitdaMargin: 9.6, netMargin: 5.4, assets: 413.59, netWorth: 180.51 },
    { year: 'FY23', revenue: 552.19, ebitda: 49.04, pat: 22.42, ebitdaMargin: 8.9, netMargin: 4.1, assets: 517.51, netWorth: 203.25 },
    { year: 'FY24', revenue: 555.79, ebitda: 55.74, pat: 28.23, ebitdaMargin: 10.0, netMargin: 5.1, assets: 542.25, netWorth: 231.65 },
    { year: '9M FY25', revenue: 466.31, ebitda: 44.78, pat: 21.68, ebitdaMargin: 9.6, netMargin: 4.6, assets: 597.81, netWorth: 265.43 }
  ];

  const revenueBreakdown = [
    { name: 'Domestic Sales', value: 40, color: '#3b82f6' },
    { name: 'Exports', value: 60, color: '#10b981' }
  ];

  const productMix = [
    { name: 'Insecticides', value: 42.5, color: '#ef4444' },
    { name: 'Herbicides', value: 22.8, color: '#f59e0b' },
    { name: 'Technicals', value: 18.2, color: '#8b5cf6' },
    { name: 'Fungicides', value: 11.1, color: '#06b6d4' },
    { name: 'PGRs & Bio Products', value: 5.4, color: '#84cc16' }
  ];

  const peerComparison = [
    { company: 'Indogulf Cropsciences', revenue: 555.79, pat: 28.23, pe: 24.3, margin: 5.1, roe: 12.2 },
    { company: 'India Pesticides', revenue: 889.3, pat: 151.3, pe: 25.0, margin: 17.0, roe: 18.5 },
    { company: 'Bharat Rasayan', revenue: 1011.7, pat: 180.2, pe: 22.0, margin: 17.8, roe: 22.1 },
    { company: 'Heranba Industries', revenue: 1425.0, pat: 109.3, pe: 13.0, margin: 7.7, roe: 15.8 }
  ];

  const useOfProceeds = [
    { purpose: 'Working Capital', amount: 65.0, percentage: 40.6 },
    { purpose: 'Debt Prepayment', amount: 34.12, percentage: 21.3 },
    { purpose: 'Dry Flowable Plant Setup', amount: 14.0, percentage: 8.8 },
    { purpose: 'General Corporate Purposes', amount: 46.88, percentage: 29.3 }
  ];

  // Updated balance sheet strength indicators with correct 9M FY25 data
  const balanceSheetData = [
    { year: 'FY22', totalBorrowing: 101.38, netWorth: 180.51, debtToEquity: 0.56, reserves: 160.21 },
    { year: 'FY23', totalBorrowing: 189.22, netWorth: 203.25, debtToEquity: 0.93, reserves: 183.15 },
    { year: 'FY24', totalBorrowing: 154.56, netWorth: 231.65, debtToEquity: 0.67, reserves: 211.45 },
    { year: '9M FY25', totalBorrowing: 206.30, netWorth: 265.43, debtToEquity: 0.78, reserves: 216.64 }
  ];

  // Annualized projections based on 9M FY25 performance
  const annualizedFY25Projections = {
    revenue: (466.31 * 12) / 9, // ~621.75 Cr
    pat: (21.68 * 12) / 9, // ~28.91 Cr
    ebitda: (44.78 * 12) / 9 // ~59.71 Cr
  };

  return (
    <>
      <ConsolidatedSEOHead
        title="Indogulf Cropsciences IPO Analysis 2025 | Complete Financial Review & Investment Guide"
        description="Comprehensive analysis of Indogulf Cropsciences IPO - ₹200 crore mainboard offering. Detailed insights on financials, valuation, sectoral analysis, and investment recommendations."
        keywords="Indogulf Cropsciences IPO 2025, agrochemicals IPO, mainboard IPO, crop protection IPO, investment analysis, IPO review"
        ogType="article"
        articleAuthor="SIP Brewery Research Team"
        articlePublisher="SIP Brewery"
        publishedTime="2025-06-25T12:00:00Z"
        modifiedTime={new Date().toISOString()}
        isNewsArticle={true}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                🧪 Indogulf Cropsciences Limited IPO (2025)
              </h1>
              <p className="text-2xl mb-4 text-green-100">Complete In-Depth Analysis & Investment Guide</p>
              <p className="text-xl text-green-200 mb-8">
                Analyzing the ₹200 Crore Mainboard Offering in India's Growing Agrochemical Sector
              </p>
              <div className="flex items-center justify-center gap-6 text-green-100">
                <span className="flex items-center gap-2">
                  <span>📅</span>
                  Opens June 26, 2025
                </span>
                <span className="flex items-center gap-2">
                  <span>👤</span>
                  SIP Brewery Research Team
                </span>
                <span className="flex items-center gap-2">
                  <span>📖</span>
                  45-minute read
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Quick Summary Box with updated financial data */}
          <Card className="mb-12 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 text-2xl">
                <span>⚡</span>
                IPO Quick Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">₹200 Cr</div>
                  <div className="text-sm text-blue-700 mt-1">Total Issue Size</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600">₹105-111</div>
                  <div className="text-sm text-green-700 mt-1">Price Band</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-purple-600">135</div>
                  <div className="text-sm text-purple-700 mt-1">Lot Size</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-orange-600">₹14,985</div>
                  <div className="text-sm text-orange-700 mt-1">Min Investment</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IPO Timeline */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>📅</span>
                IPO Timeline & Key Dates (2025)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-50">
                    <TableHead className="font-semibold">Event</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Anchor Allotment</TableCell>
                    <TableCell className="font-semibold text-blue-600">June 25, 2025</TableCell>
                    <TableCell><span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Upcoming</span></TableCell>
                    <TableCell>Institutional investors</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">IPO Opens</TableCell>
                    <TableCell className="font-semibold text-green-600">June 26, 2025</TableCell>
                    <TableCell><span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Upcoming</span></TableCell>
                    <TableCell>Subscription begins</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">IPO Closes</TableCell>
                    <TableCell className="font-semibold text-red-600">June 30, 2025</TableCell>
                    <TableCell><span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Upcoming</span></TableCell>
                    <TableCell>Last day for bids</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Allotment Finalization</TableCell>
                    <TableCell>July 1, 2025</TableCell>
                    <TableCell><span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Scheduled</span></TableCell>
                    <TableCell>Share allocation finalised</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Listing Date</TableCell>
                    <TableCell>July 3, 2025</TableCell>
                    <TableCell><span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Scheduled</span></TableCell>
                    <TableCell>NSE & BSE Mainboard</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Issue Structure */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>💰</span>
                Issue Structure & Pricing Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead>Component</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Price Band</TableCell>
                        <TableCell>₹105–₹111 per share</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Face Value</TableCell>
                        <TableCell>₹10</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fresh Issue</TableCell>
                        <TableCell>₹160 crore (~1.44 Cr shares)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Offer for Sale (OFS)</TableCell>
                        <TableCell>~36.03 lakh shares, ~₹40 crore</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Total Issue Size</TableCell>
                        <TableCell className="font-semibold text-green-600">₹200 crore</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Lot Size</TableCell>
                        <TableCell>135 shares</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-green-800">OFS Sellers</h3>
                  <ul className="space-y-3 text-green-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Om Prakash Aggarwal (HUF): up to 15.41 lakh shares</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Sanjay Aggarwal (HUF): ~23.14 lakh shares</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Pre-IPO Shareholding:</strong> Promoters hold ~96.9% of the company. 
                      Post-IPO, public float will increase to ~20-25%.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Overview */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>🏢</span>
                Company Overview & Business Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-green-800">About Indogulf Cropsciences Limited</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Based in New Delhi since the 1990s, Indogulf Cropsciences Limited is a vertically integrated 
                    agrochemical company specializing in the formulation, manufacturing, and marketing of crop protection 
                    chemicals. The company has established itself as a significant player in both domestic and international markets.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">🌱 Core Business Areas</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Formulation of crop protection chemicals</li>
                        <li>• Insecticides, herbicides, fungicides production</li>
                        <li>• Plant Growth Regulators (PGRs)</li>
                        <li>• Bio-products manufacturing</li>
                        <li>• Backward integration with technical-grade production</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">🌍 Global Presence</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Registered formulations in 30+ countries</li>
                        <li>• Strong export focus (60% of revenue)</li>
                        <li>• In-house R&D capabilities</li>
                        <li>• Global regulatory registrations</li>
                        <li>• Diversified geographic revenue base</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Performance with updated 9M FY25 data */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>💰</span>
                Financial Performance Analysis (Restated Consolidated)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Updated Financial Metrics Table with 9M FY25 data */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Financial Metrics (Restated Consolidated)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Metric</TableHead>
                        <TableHead>FY22</TableHead>
                        <TableHead>FY23</TableHead>
                        <TableHead>FY24</TableHead>
                        <TableHead>9M FY25*</TableHead>
                        <TableHead>Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Revenue (₹ Cr)</TableCell>
                        <TableCell>490.23</TableCell>
                        <TableCell>552.19</TableCell>
                        <TableCell>555.79</TableCell>
                        <TableCell className="font-semibold text-green-600">466.31</TableCell>
                        <TableCell className="text-green-600 font-semibold">Steady</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">EBITDA (₹ Cr)</TableCell>
                        <TableCell>47.24</TableCell>
                        <TableCell>49.04</TableCell>
                        <TableCell>55.74</TableCell>
                        <TableCell className="font-semibold text-green-600">44.78</TableCell>
                        <TableCell className="text-green-600 font-semibold">Growing</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">PAT (₹ Cr)</TableCell>
                        <TableCell>26.36</TableCell>
                        <TableCell>22.42</TableCell>
                        <TableCell>28.23</TableCell>
                        <TableCell className="font-semibold text-blue-600">21.68</TableCell>
                        <TableCell className="text-blue-600 font-semibold">Recovering</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">EBITDA Margin (%)</TableCell>
                        <TableCell>9.6%</TableCell>
                        <TableCell>8.9%</TableCell>
                        <TableCell>10.0%</TableCell>
                        <TableCell>9.6%</TableCell>
                        <TableCell className="text-blue-600">Stable</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Net Margin (%)</TableCell>
                        <TableCell>5.4%</TableCell>
                        <TableCell>4.1%</TableCell>
                        <TableCell>5.1%</TableCell>
                        <TableCell>4.6%</TableCell>
                        <TableCell className="text-blue-600">Consistent</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Total Assets (₹ Cr)</TableCell>
                        <TableCell>413.59</TableCell>
                        <TableCell>517.51</TableCell>
                        <TableCell>542.25</TableCell>
                        <TableCell className="font-semibold text-green-600">597.81</TableCell>
                        <TableCell className="text-green-600 font-semibold">Growing</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Net Worth (₹ Cr)</TableCell>
                        <TableCell>180.51</TableCell>
                        <TableCell>203.25</TableCell>
                        <TableCell>231.65</TableCell>
                        <TableCell className="font-semibold text-green-600">265.43</TableCell>
                        <TableCell className="text-green-600 font-semibold">Strengthening</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Total Borrowing (₹ Cr)</TableCell>
                        <TableCell>101.38</TableCell>
                        <TableCell>189.22</TableCell>
                        <TableCell>154.56</TableCell>
                        <TableCell className="font-semibold text-orange-600">206.30</TableCell>
                        <TableCell className="text-orange-600 font-semibold">Elevated</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Reserves & Surplus (₹ Cr)</TableCell>
                        <TableCell>160.21</TableCell>
                        <TableCell>183.15</TableCell>
                        <TableCell>211.45</TableCell>
                        <TableCell className="font-semibold text-green-600">216.64</TableCell>
                        <TableCell className="text-green-600 font-semibold">Growing</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <p className="text-sm text-gray-600 mt-2">
                    *9M FY25 data is for 9 months ended December 31, 2024 (unaudited)
                  </p>
                </div>

                {/* Annualized Projections */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">📊 FY25 Annualized Projections (Based on 9M Performance)</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">₹{annualizedFY25Projections.revenue.toFixed(0)} Cr</div>
                      <div className="text-sm text-blue-700 mt-1">Projected Revenue</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-green-600">₹{annualizedFY25Projections.pat.toFixed(1)} Cr</div>
                      <div className="text-sm text-green-700 mt-1">Projected PAT</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">₹{annualizedFY25Projections.ebitda.toFixed(1)} Cr</div>
                      <div className="text-sm text-purple-700 mt-1">Projected EBITDA</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    Note: These are mathematical projections based on 9M performance and may not reflect actual FY25 results due to seasonal variations.
                  </p>
                </div>

                {/* Valuation Metrics */}
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">24.3x</div>
                    <div className="text-sm text-blue-700 mt-1">P/E Ratio</div>
                    <div className="text-xs text-gray-600 mt-1">At upper band ₹111</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">₹555.79 Cr</div>
                    <div className="text-sm text-green-700 mt-1">Revenue (FY24)</div>
                    <div className="text-xs text-gray-600 mt-1">Latest full year</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">₹28.23 Cr</div>
                    <div className="text-sm text-purple-700 mt-1">PAT (FY24)</div>
                    <div className="text-xs text-gray-600 mt-1">Latest full year</div>
                  </div>
                  <div className="text-center p-6 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">10.0%</div>
                    <div className="text-sm text-orange-700 mt-1">EBITDA Margin</div>
                    <div className="text-xs text-gray-600 mt-1">FY24 performance</div>
                  </div>
                </div>

                {/* Revenue and Profitability Chart */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Financial Trends Over Time</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => {
                        const nameStr = String(name);
                        if (['revenue', 'ebitda', 'pat'].includes(nameStr)) return [`₹${value} Cr`, nameStr.toUpperCase()];
                        return [`${value}%`, nameStr];
                      }} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue" />
                      <Line type="monotone" dataKey="ebitda" stroke="#10b981" strokeWidth={3} name="EBITDA" />
                      <Line type="monotone" dataKey="pat" stroke="#ef4444" strokeWidth={3} name="PAT" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Balance Sheet Strength with updated data */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Balance Sheet Strength Analysis</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={balanceSheetData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value} Cr`, 'Amount']} />
                      <Legend />
                      <Bar dataKey="netWorth" fill="#10b981" name="Net Worth" />
                      <Bar dataKey="totalBorrowing" fill="#ef4444" name="Total Borrowing" />
                      <Bar dataKey="reserves" fill="#8b5cf6" name="Reserves & Surplus" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-700">
                      <strong>Key Observation:</strong> Total borrowing increased to ₹206.30 Cr in 9M FY25 from ₹154.56 Cr in FY24, 
                      pushing D/E ratio to 0.78x. However, reserves & surplus continued growing to ₹216.64 Cr, indicating 
                      healthy internal accruals.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Use of IPO Proceeds */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>💼</span>
                Use of IPO Proceeds (₹160 Cr Fresh Issue)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-green-50">
                      <TableHead>Purpose</TableHead>
                      <TableHead>Amount (₹ Cr)</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Strategic Impact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {useOfProceeds.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.purpose}</TableCell>
                        <TableCell>₹{item.amount}</TableCell>
                        <TableCell>{item.percentage}%</TableCell>
                        <TableCell>
                          {item.purpose === 'Working Capital' && 'Support business growth and operations'}
                          {item.purpose === 'Debt Prepayment' && 'Improve balance sheet strength'}
                          {item.purpose === 'Dry Flowable Plant Setup' && 'Enhance production capabilities'}
                          {item.purpose === 'General Corporate Purposes' && 'Strategic flexibility and growth'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Proceeds Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={useOfProceeds}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="percentage"
                          label={({ purpose, percentage }) => `${purpose}: ${percentage}%`}
                        >
                          {useOfProceeds.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][index]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">💡 Proceeds Analysis</h4>
                    <ul className="space-y-2 text-green-700">
                      <li>• Majority (40.6%) allocated to working capital - supports immediate growth</li>
                      <li>• Debt prepayment (21.3%) will strengthen balance sheet</li>
                      <li>• Capex for Dry Flowable plant (8.8%) enhances production capacity</li>
                      <li>• Strategic allocation provides operational flexibility</li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded">
                      <p className="text-sm text-gray-700">
                        <strong>Impact on D/E:</strong> With ₹34.12 Cr debt reduction from current ₹206.30 Cr, 
                        debt-to-equity should improve from 0.78x to approximately 0.65x.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Peer Comparison */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>🔍</span>
                Peer Comparison & Valuation Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Company</TableHead>
                      <TableHead>Revenue (₹ Cr)</TableHead>
                      <TableHead>PAT (₹ Cr)</TableHead>
                      <TableHead>P/E Ratio</TableHead>
                      <TableHead>Net Margin (%)</TableHead>
                      <TableHead>ROE (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {peerComparison.map((company, index) => (
                      <TableRow key={index} className={company.company === 'Indogulf Cropsciences' ? 'bg-blue-50' : ''}>
                        <TableCell className="font-medium">{company.company}</TableCell>
                        <TableCell>{company.revenue}</TableCell>
                        <TableCell>{company.pat}</TableCell>
                        <TableCell>{company.pe}x</TableCell>
                        <TableCell>{company.margin}%</TableCell>
                        <TableCell>{company.roe}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">💡 Valuation Insights</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Indogulf's P/E of 24.3x is in line with quality peers like India Pesticides (25x)</li>
                    <li>• However, net margins at 5.1% are significantly lower than industry leaders (17-18%)</li>
                    <li>• ROE at 12.2% is below peer average, indicating room for improvement in capital efficiency</li>
                    <li>• Smaller scale provides higher growth potential but also higher execution risk</li>
                    <li>• Valuation premium may be justified by export focus and integrated model</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SWOT Analysis */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>⚖️</span>
                SWOT Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-800 mb-4">✅ Strengths</h4>
                    <ul className="space-y-3 text-green-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Integrated supply chain from technical to formulation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Strong export presence in 30+ countries (60% revenue)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Consistent asset growth (₹413 Cr to ₹598 Cr over 3 years)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Growing net worth base providing financial stability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>In-house R&D capabilities and regulatory expertise</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-4">📈 Opportunities</h4>
                    <ul className="space-y-3 text-blue-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>China+1 strategy benefiting Indian agrochemical manufacturers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Growing global demand for sustainable crop protection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Margin improvement potential through operational efficiencies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Capacity expansion through Dry Flowable plant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Government support for agricultural productivity enhancement</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
                    <h4 className="font-semibold text-orange-800 mb-4">⚠️ Weaknesses</h4>
                    <ul className="space-y-3 text-orange-700">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Lower net margins (5.1%) compared to industry leaders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Fluctuating profitability and revenue patterns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Moderate debt levels with D/E at 0.78x</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Smaller scale compared to industry leaders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Working capital intensive operations</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
                    <h4 className="font-semibold text-red-800 mb-4">🛑 Threats</h4>
                    <ul className="space-y-3 text-red-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Raw material price volatility and supply chain risks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Increasing regulatory compliance costs across markets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Competition from global agrochemical giants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Foreign exchange fluctuation risks from export focus</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Seasonal agricultural patterns affecting demand</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Verdict */}
          <Card className="mb-12 bg-gradient-to-r from-blue-50 to-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>🎯</span>
                Investment Verdict & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-green-100 p-6 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-800 mb-4">👍 Why It Might Appeal</h4>
                    <ul className="space-y-3 text-green-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Integrated operations with backward integration advantages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Strong export diversification reducing domestic dependency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Growing asset base and strengthening balance sheet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Strategic fund utilization for debt reduction and capacity expansion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Beneficiary of China+1 strategy and global supply chain shifts</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-orange-100 p-6 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-800 mb-4">👎 Points of Caution</h4>
                    <ul className="space-y-3 text-orange-700">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Premium valuation at 24.3x P/E vs sector fundamentals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Lower margins compared to industry leaders indicate operational challenges</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Fluctuating revenue and profitability patterns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Working capital intensive business model</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Cyclical nature of agricultural business</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-100 p-8 rounded-lg border-2 border-blue-300">
                  <h4 className="text-2xl font-bold text-blue-800 mb-4 text-center">🎯 Final Recommendation</h4>
                  <div className="space-y-4 text-blue-700">
                    <p className="text-lg font-semibold text-center">
                      <span className="bg-orange-200 px-4 py-2 rounded-full">SUBSCRIBE WITH SELECTIVE CAUTION</span>
                    </p>
                    <p className="text-center leading-relaxed">
                      Indogulf Cropsciences presents a mixed investment proposition. While the integrated model, 
                      export focus, and strategic fund utilization are positives, the lower margins, fluctuating 
                      performance, and premium valuation warrant careful consideration. Best suited for investors 
                      with sector expertise and medium to long-term investment horizon.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-xl font-bold text-blue-600">3-5 Years</div>
                        <div className="text-sm">Investment Horizon</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-xl font-bold text-orange-600">10-15%</div>
                        <div className="text-sm">Expected Returns</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-xl font-bold text-red-600">Medium-High</div>
                        <div className="text-sm">Risk Level</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Disclosure */}
          <div className="bg-red-50 p-8 rounded-lg border-l-4 border-red-400 mb-12">
            <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2 text-xl">
              <span>⚖️</span>
              Important Risk Disclosure & Disclaimer
            </h4>
            <div className="text-red-700 space-y-3 text-sm leading-relaxed">
              <p>
                <strong>Investment Risks:</strong> This IPO analysis is for informational purposes only and does not constitute investment advice. 
                Investing in IPOs carries significant risks including high volatility, market fluctuations, and potential loss of capital. 
                Past performance does not guarantee future results.
              </p>
              <p>
                <strong>Due Diligence:</strong> Investors must conduct their own research, read the complete Red Herring Prospectus (RHP), 
                and consult with qualified financial advisors before making investment decisions. Consider your risk tolerance, 
                investment horizon, and financial goals.
              </p>
              <p>
                <strong>Data Accuracy:</strong> Financial data is based on company's restated consolidated financials as available in public domain. 
                Investors should verify all information from official company documents and regulatory filings.
              </p>
              <p>
                <strong>Regulatory Notice:</strong> SIP Brewery and its affiliates are not SEBI-registered investment advisors. 
                This analysis is based on publicly available information and our research. Market conditions, company performance, 
                and regulatory changes can significantly impact investment outcomes.
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 mb-3 font-medium">Related Topics:</p>
            <div className="flex flex-wrap gap-3 mb-6">
              {['IPO Analysis 2025', 'Indogulf Cropsciences', 'Agrochemicals', 'Mainboard IPO', 'Export Business', 'Crop Protection', 'Investment Guide', 'China+1 Strategy', 'Technical Manufacturing', 'Agricultural Sector'].map((tag, index) => (
                <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>
                <span className="font-medium">Published:</span> June 25, 2025 | 
                <span className="font-medium ml-2">Updated:</span> {new Date().toLocaleDateString('en-IN')}
              </div>
              <div>
                <span className="font-medium">Reading Time:</span> 45 minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndogulfIPOBlog;
