
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SEOHead from '@/components/SEOHead';

const IndogulfIPOBlog = () => {
  // Financial data for charts
  const financialData = [
    { year: 'FY22', revenue: 137.2, ebitda: 20.9, pat: 10.3, ebitdaMargin: 15.2, netMargin: 7.5 },
    { year: 'FY23', revenue: 174.1, ebitda: 25.8, pat: 12.9, ebitdaMargin: 14.8, netMargin: 7.4 },
    { year: '9M FY24*', revenue: 192.5, ebitda: 31.2, pat: 16.2, ebitdaMargin: 16.2, netMargin: 8.4 }
  ];

  const revenueBreakdown = [
    { name: 'Domestic Sales', value: 45, color: '#3b82f6' },
    { name: 'Exports', value: 55, color: '#10b981' }
  ];

  const productMix = [
    { name: 'Insecticides', value: 44.23, color: '#ef4444' },
    { name: 'Herbicides', value: 21.65, color: '#f59e0b' },
    { name: 'Technicals', value: 16.08, color: '#8b5cf6' },
    { name: 'Fungicides', value: 10.84, color: '#06b6d4' },
    { name: 'PGRs & Bio Products', value: 7.20, color: '#84cc16' }
  ];

  const peerComparison = [
    { company: 'Indogulf Cropsciences', revenue: 174.1, pat: 12.9, pe: 17.9, margin: 7.4 },
    { company: 'Heranba Industries', revenue: 1425.0, pat: 109.3, pe: 13.4, margin: 7.7 },
    { company: 'India Pesticides', revenue: 889.3, pat: 151.3, pe: 25.2, margin: 17.0 },
    { company: 'Bharat Rasayan', revenue: 1011.7, pat: 180.2, pe: 22.0, margin: 17.8 }
  ];

  const sectoralAnalysis = [
    { segment: 'Crop Protection', marketSize: 3.2, growth: 8.3, keyDrivers: 'Food security, declining arable land' },
    { segment: 'Bio-pesticides', marketSize: 0.8, growth: 15.2, keyDrivers: 'Sustainable agriculture, export demand' },
    { segment: 'Herbicides', marketSize: 1.1, growth: 12.5, keyDrivers: 'Labor shortage, mechanization' },
    { segment: 'Technical Grade', marketSize: 2.1, growth: 10.8, keyDrivers: 'China+1 strategy, backward integration' }
  ];

  const exportCountries = [
    { region: 'Latin America', countries: 8, revenue: 35, growth: 22 },
    { region: 'Africa', countries: 12, revenue: 28, growth: 18 },
    { region: 'Southeast Asia', countries: 10, revenue: 25, growth: 15 },
    { region: 'Others', countries: 5, revenue: 12, growth: 8 }
  ];

  return (
    <>
      <SEOHead
        title="Indogulf Cropsciences IPO Analysis 2024 | Complete Financial Review & Investment Guide"
        description="Comprehensive analysis of Indogulf Cropsciences IPO. Get detailed insights on financials, sectoral analysis, risks, and investment recommendations for this ₹56.72 crore offering."
        keywords="Indogulf Cropsciences IPO, agrochemicals IPO, crop protection IPO, SME IPO 2024, investment analysis"
        ogType="article"
        articleAuthor="SIP Brewery Research Team"
        articlePublisher="SIP Brewery"
        publishedTime={new Date('2024-06-21').toISOString()}
        modifiedTime={new Date().toISOString()}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                🧪 Indogulf Cropsciences Limited IPO
              </h1>
              <p className="text-2xl mb-4 text-green-100">Complete In-Depth Analysis & Investment Guide (2024)</p>
              <p className="text-xl text-green-200 mb-8">
                Analyzing the ₹56.72 Crore SME IPO in India's Growing Agrochemical Sector
              </p>
              <div className="flex items-center justify-center gap-6 text-green-100">
                <span className="flex items-center gap-2">
                  <span>📅</span>
                  {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="flex items-center gap-2">
                  <span>👤</span>
                  SIP Brewery Research Team
                </span>
                <span className="flex items-center gap-2">
                  <span>📖</span>
                  60-minute read
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Quick Summary Box */}
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
                  <div className="text-3xl font-bold text-blue-600">₹56.72 Cr</div>
                  <div className="text-sm text-blue-700 mt-1">Total Issue Size</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600">₹84-88</div>
                  <div className="text-sm text-green-700 mt-1">Price Band</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-purple-600">1600</div>
                  <div className="text-sm text-purple-700 mt-1">Lot Size</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-orange-600">₹1.41L</div>
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
                IPO Timeline & Key Dates
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
                    <TableCell className="font-medium">IPO Opens</TableCell>
                    <TableCell className="font-semibold text-green-600">June 21, 2024</TableCell>
                    <TableCell><span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span></TableCell>
                    <TableCell>Subscription begins</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">IPO Closes</TableCell>
                    <TableCell className="font-semibold text-red-600">June 25, 2024</TableCell>
                    <TableCell><span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Completed</span></TableCell>
                    <TableCell>Last day for bids</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Basis of Allotment</TableCell>
                    <TableCell>June 28, 2024</TableCell>
                    <TableCell><span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Process</span></TableCell>
                    <TableCell>Share allocation finalised</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Listing Date</TableCell>
                    <TableCell>July 1, 2024</TableCell>
                    <TableCell><span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Scheduled</span></TableCell>
                    <TableCell>NSE SME Platform</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
                    Incorporated in 1993, Indogulf Cropsciences Limited is a prominent player in India's agrochemical sector, 
                    specializing in the formulation, manufacturing, and marketing of crop protection chemicals. With over 30 years 
                    of legacy, the company has established itself as a trusted partner for farmers and distributors alike.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">🌱 Product Portfolio</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Insecticides (Primary segment)</li>
                        <li>• Herbicides & Fungicides</li>
                        <li>• Plant Growth Regulators (PGRs)</li>
                        <li>• Bio-products & Technical grade chemicals</li>
                        <li>• Over 100+ registered products</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">🌍 Global Presence</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Exports to 30+ countries</li>
                        <li>• Strong presence in Latin America & Africa</li>
                        <li>• 80+ products registered globally</li>
                        <li>• In-house R&D and regulatory capabilities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sectoral Analysis */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>📊</span>
                Indian Agrochemical Sector Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
                  <h3 className="text-xl font-semibold mb-4 text-yellow-800">Sector Highlights</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600">#4</div>
                      <div className="text-sm text-yellow-700">Global Producer</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600">$13B</div>
                      <div className="text-sm text-yellow-700">Market by 2027</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600">8.3%</div>
                      <div className="text-sm text-yellow-700">Expected CAGR</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Segment-wise Market Analysis</h3>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Market Segment</TableHead>
                        <TableHead>Market Size (USD Bn)</TableHead>
                        <TableHead>Growth Rate (%)</TableHead>
                        <TableHead>Key Growth Drivers</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sectoralAnalysis.map((segment, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{segment.segment}</TableCell>
                          <TableCell>${segment.marketSize}</TableCell>
                          <TableCell className="text-green-600 font-semibold">{segment.growth}%</TableCell>
                          <TableCell>{segment.keyDrivers}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-4">🚀 Growth Catalysts</h4>
                    <ul className="space-y-3 text-green-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Rising food demand due to population growth (1.4B+ people)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Decreasing arable land requiring higher productivity per hectare</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>China+1 strategy boosting Indian manufacturers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Government initiatives: PM-KISAN, Soil Health Cards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Increasing adoption of precision agriculture</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-4">📈 Market Opportunities</h4>
                    <ul className="space-y-3 text-blue-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Bio-pesticides market growing at 15%+ CAGR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Export opportunities to Latin America & Africa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Technical grade manufacturing for backward integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Digital agriculture and data-driven solutions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Specialty chemicals and custom formulations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Performance */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>💰</span>
                Financial Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Revenue and Profitability Chart */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Revenue & Profitability Trends</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => {
                        if (name === 'revenue' || name === 'ebitda' || name === 'pat') return [`₹${value} Cr`, name.toUpperCase()];
                        return [`${value}%`, name];
                      }} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue" />
                      <Line type="monotone" dataKey="ebitda" stroke="#10b981" strokeWidth={3} name="EBITDA" />
                      <Line type="monotone" dataKey="pat" stroke="#ef4444" strokeWidth={3} name="PAT" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Key Financial Metrics Table */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Financial Metrics</h3>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Metric</TableHead>
                        <TableHead>FY22</TableHead>
                        <TableHead>FY23</TableHead>
                        <TableHead>9M FY24 (Ann.)</TableHead>
                        <TableHead>CAGR</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Revenue (₹ Cr)</TableCell>
                        <TableCell>137.2</TableCell>
                        <TableCell>174.1</TableCell>
                        <TableCell>192.5</TableCell>
                        <TableCell className="text-green-600 font-semibold">17.2%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">EBITDA (₹ Cr)</TableCell>
                        <TableCell>20.9</TableCell>
                        <TableCell>25.8</TableCell>
                        <TableCell>31.2</TableCell>
                        <TableCell className="text-green-600 font-semibold">20.1%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">PAT (₹ Cr)</TableCell>
                        <TableCell>10.3</TableCell>
                        <TableCell>12.9</TableCell>
                        <TableCell>16.2</TableCell>
                        <TableCell className="text-green-600 font-semibold">25.3%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">EBITDA Margin (%)</TableCell>
                        <TableCell>15.2%</TableCell>
                        <TableCell>14.8%</TableCell>
                        <TableCell>16.2%</TableCell>
                        <TableCell className="text-blue-600">Improving</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Net Margin (%)</TableCell>
                        <TableCell>7.5%</TableCell>
                        <TableCell>7.4%</TableCell>
                        <TableCell>8.4%</TableCell>
                        <TableCell className="text-blue-600">Stable+</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Key Ratio Analysis */}
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">17.9x</div>
                    <div className="text-sm text-blue-700 mt-1">P/E Ratio</div>
                    <div className="text-xs text-gray-600 mt-1">At upper band ₹88</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">25.1%</div>
                    <div className="text-sm text-green-700 mt-1">ROCE</div>
                    <div className="text-xs text-gray-600 mt-1">Strong returns</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">17.1%</div>
                    <div className="text-sm text-purple-700 mt-1">ROE</div>
                    <div className="text-xs text-gray-600 mt-1">Healthy returns</div>
                  </div>
                  <div className="text-center p-6 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">0.43x</div>
                    <div className="text-sm text-orange-700 mt-1">Debt/Equity</div>
                    <div className="text-xs text-gray-600 mt-1">Conservative leverage</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue & Product Breakdown */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>📈</span>
                Revenue & Product Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-center">Revenue Split (FY23)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={revenueBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {revenueBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-center">Product Mix (FY23)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={productMix}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                      >
                        {productMix.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Export Footprint Analysis</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-green-50">
                      <TableHead>Region</TableHead>
                      <TableHead>Countries</TableHead>
                      <TableHead>Revenue Share (%)</TableHead>
                      <TableHead>Growth Rate (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exportCountries.map((region, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{region.region}</TableCell>
                        <TableCell>{region.countries}</TableCell>
                        <TableCell>{region.revenue}%</TableCell>
                        <TableCell className="text-green-600 font-semibold">{region.growth}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Peer Comparison */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>🔍</span>
                Peer Comparison Analysis
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">💡 Peer Comparison Insights</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Indogulf trades at reasonable valuation (17.9x P/E) compared to larger peers</li>
                    <li>• Net margins are healthy at 7.4%, room for improvement vs industry leaders</li>
                    <li>• Smaller size provides higher growth potential in expanding markets</li>
                    <li>• Strong export orientation (55%) provides geographic diversification</li>
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
                        <span>Strong export orientation (55% of revenue) with global registrations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Backward integration with technical grade manufacturing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>30+ years of experience and established market presence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>In-house R&D capabilities and regulatory expertise</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Diversified product portfolio across multiple segments</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-4">📈 Opportunities</h4>
                    <ul className="space-y-3 text-blue-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>China+1 strategy benefiting Indian manufacturers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Growing demand for bio-pesticides and sustainable solutions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Expansion opportunities in Latin America and Africa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Government support for agricultural productivity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Digital agriculture and precision farming adoption</span>
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
                        <span>Seasonal and monsoon-dependent business cycles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Working capital intensive operations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Smaller scale compared to industry leaders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Limited liquidity in SME platform trading</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Dependence on key export markets</span>
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
                        <span>Increasing regulatory compliance and environmental norms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Competition from global agrochemical giants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Foreign exchange fluctuation risks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Climate change affecting agricultural patterns</span>
                      </li>
                    </ul>
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
                Use of IPO Proceeds
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
                    <TableRow>
                      <TableCell className="font-medium">Working Capital Requirements</TableCell>
                      <TableCell>₹34.00</TableCell>
                      <TableCell>60.0%</TableCell>
                      <TableCell>Support business growth and operations</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Capex for Manufacturing Facility</TableCell>
                      <TableCell>₹12.00</TableCell>
                      <TableCell>21.2%</TableCell>
                      <TableCell>Enhance technical grade production capacity</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">General Corporate Purposes</TableCell>
                      <TableCell>₹10.72</TableCell>
                      <TableCell>18.8%</TableCell>
                      <TableCell>Strategic flexibility and growth initiatives</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">💡 Proceeds Analysis</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Majority (60%) allocated to working capital - supports immediate growth</li>
                    <li>• Capex investment (21%) will enhance backward integration capabilities</li>
                    <li>• Reasonable allocation provides operational flexibility</li>
                    <li>• Focus on technical grade manufacturing should improve margins</li>
                  </ul>
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
                    <h4 className="font-semibold text-green-800 mb-4">👍 Positives</h4>
                    <ul className="space-y-3 text-green-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Strong financial performance with consistent growth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Attractive valuation at 17.9x P/E compared to peers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Beneficial from China+1 strategy and sector tailwinds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Strong export business provides geographic diversification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Experienced management with 30+ years track record</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-orange-100 p-6 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-800 mb-4">👎 Concerns</h4>
                    <ul className="space-y-3 text-orange-700">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>SME platform has limited liquidity and higher volatility</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Cyclical business dependent on agricultural cycles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Raw material price volatility can impact margins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Working capital intensive business model</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Smaller scale compared to established industry players</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-100 p-8 rounded-lg border-2 border-blue-300">
                  <h4 className="text-2xl font-bold text-blue-800 mb-4 text-center">🎯 Final Recommendation</h4>
                  <div className="space-y-4 text-blue-700">
                    <p className="text-lg font-semibold text-center">
                      <span className="bg-blue-200 px-4 py-2 rounded-full">SUBSCRIBE FOR LONG-TERM</span>
                    </p>
                    <p className="text-center leading-relaxed">
                      Indogulf Cropsciences presents a compelling investment opportunity for long-term investors 
                      looking to participate in India's growing agrochemical sector. The company's strong fundamentals, 
                      global presence, and reasonable valuation make it attractive despite SME platform risks.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-xl font-bold text-blue-600">2-3 Years</div>
                        <div className="text-sm">Investment Horizon</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-xl font-bold text-green-600">15-20%</div>
                        <div className="text-sm">Expected Returns</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-xl font-bold text-orange-600">Medium</div>
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
                Investing in IPOs, especially on SME platforms, carries significant risks including high volatility, limited liquidity, 
                and potential loss of capital. Past performance does not guarantee future results.
              </p>
              <p>
                <strong>Due Diligence:</strong> Investors must conduct their own research, read the complete Red Herring Prospectus (RHP), 
                and consult with qualified financial advisors before making investment decisions. Consider your risk tolerance, 
                investment horizon, and financial goals.
              </p>
              <p>
                <strong>Regulatory Notice:</strong> SIP Brewery and its affiliates are not SEBI-registered investment advisors. 
                This analysis is based on publicly available information and our research. Market conditions, company performance, 
                and regulatory changes can significantly impact investment outcomes.
              </p>
              <p>
                <strong>SME Platform Risks:</strong> SME platform stocks have lower liquidity, higher volatility, and different 
                regulatory requirements compared to main board listings. Exit opportunities may be limited, especially in adverse market conditions.
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 mb-3 font-medium">Related Topics:</p>
            <div className="flex flex-wrap gap-3 mb-6">
              {['IPO Analysis', 'Agrochemicals', 'Crop Protection', 'SME IPO', 'Export Business', 'Technical Manufacturing', 'Indian Agriculture', 'China+1 Strategy', 'Bio-pesticides', 'Investment Research'].map((tag, index) => (
                <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>
                <span className="font-medium">Published:</span> June 21, 2024 | 
                <span className="font-medium ml-2">Updated:</span> {new Date().toLocaleDateString('en-IN')}
              </div>
              <div>
                <span className="font-medium">Reading Time:</span> 60 minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndogulfIPOBlog;
