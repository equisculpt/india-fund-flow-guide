import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cog, TrendingUp, Users, Building, Calculator, ChartBar } from 'lucide-react';

const HowMutualFundsWorkBlog = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How Do Mutual Funds Work? Detailed Explanation with Examples 2025",
    "description": "Complete explanation of how mutual funds work in India. Learn about NAV, fund managers, investment process, returns calculation with real examples.",
    "author": {
      "@type": "Organization",
      "name": "SIP Brewery"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SIP Brewery",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png"
      }
    },
    "datePublished": "2025-06-19",
    "dateModified": "2025-06-19"
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Deep Dive Explanation</Badge>
              <h1 className="text-4xl font-bold mb-4">How Do Mutual Funds Work? Detailed Explanation with Examples</h1>
              <p className="text-xl text-gray-600 mb-6">Understanding the complete mechanism behind mutual fund operations, NAV calculation, and investment process</p>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
                <span>Published: June 19, 2025</span>
                <span>•</span>
                <span>18 min read</span>
                <span>•</span>
                <span>By SIP Brewery Team</span>
              </div>
            </div>

            {/* The Complete Mutual Fund Process */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cog className="h-6 w-6 text-blue-600" />
                  The Complete Mutual Fund Ecosystem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-gray-700">
                    A mutual fund is like a well-orchestrated financial symphony where multiple players work together to create wealth for investors. Let's understand each component:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Building className="h-5 w-5 text-blue-600" />
                        Asset Management Company (AMC)
                      </h4>
                      <p className="text-sm text-gray-700">The company that creates and manages mutual fund schemes (e.g., SBI Mutual Fund, HDFC AMC)</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-600" />
                        Fund Manager
                      </h4>
                      <p className="text-sm text-gray-700">Professional who decides where to invest the pooled money based on research and market analysis</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-purple-600" />
                        Custodian
                      </h4>
                      <p className="text-sm text-gray-700">Bank that safely holds all the securities bought by the mutual fund (like a security guard for investments)</p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <ChartBar className="h-5 w-5 text-orange-600" />
                        Registrar & Transfer Agent
                      </h4>
                      <p className="text-sm text-gray-700">Maintains records of all investors, processes transactions, and handles communications</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step by Step Process */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Step-by-Step: How Your Money Flows in a Mutual Fund</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-blue-200"></div>
                    
                    <div className="flex items-start gap-4 pb-8">
                      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">You Invest Money</h4>
                        <p className="text-gray-700 mb-2">You invest ₹5,000 in "XYZ Large Cap Fund" through SIP or lump sum</p>
                        <div className="bg-blue-50 p-3 rounded">
                          <p className="text-sm text-blue-800">Example: NAV today is ₹50. You get 5000 ÷ 50 = 100 units</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 pb-8">
                      <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">Money Gets Pooled</h4>
                        <p className="text-gray-700 mb-2">Your ₹5,000 + thousands of other investors' money = Large investment pool</p>
                        <div className="bg-green-50 p-3 rounded">
                          <p className="text-sm text-green-800">Example: 10,000 investors × ₹5,000 each = ₹50 crore to invest</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 pb-8">
                      <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">Fund Manager Invests</h4>
                        <p className="text-gray-700 mb-2">Professional fund manager researches and buys stocks of different companies</p>
                        <div className="bg-purple-50 p-3 rounded">
                          <p className="text-sm text-purple-800">Example: Buys shares of Reliance (10%), TCS (8%), HDFC Bank (7%), etc.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 pb-8">
                      <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold">4</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">Portfolio Value Changes</h4>
                        <p className="text-gray-700 mb-2">As stock prices fluctuate, the total value of fund's investments changes daily</p>
                        <div className="bg-orange-50 p-3 rounded">
                          <p className="text-sm text-orange-800">Example: If portfolio grows by 10%, NAV increases from ₹50 to ₹55</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold">5</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">You Benefit Proportionally</h4>
                        <p className="text-gray-700 mb-2">Your investment value changes based on your share of the fund</p>
                        <div className="bg-red-50 p-3 rounded">
                          <p className="text-sm text-red-800">Example: Your 100 units × ₹55 new NAV = ₹5,500 (₹500 profit!)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NAV Explanation */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Understanding NAV (Net Asset Value) - The Heart of Mutual Funds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-xl mb-4">What is NAV?</h4>
                    <p className="text-gray-700 mb-4">
                      NAV is like the "price per share" of a mutual fund. It tells you how much one unit of the mutual fund costs today.
                    </p>
                    
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      <h5 className="font-semibold mb-2">NAV Formula:</h5>
                      <div className="text-center text-lg">
                        <strong>NAV = (Total Fund Value - Expenses) ÷ Total Units Outstanding</strong>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-3 text-green-600">Real Example Calculation:</h5>
                      <div className="space-y-2 text-sm">
                        <p><strong>Total Portfolio Value:</strong> ₹100 crores</p>
                        <p><strong>Fund Expenses:</strong> ₹1 crore</p>
                        <p><strong>Net Assets:</strong> ₹99 crores</p>
                        <p><strong>Total Units:</strong> 1.98 crore units</p>
                        <p className="border-t pt-2"><strong>NAV = ₹99 crores ÷ 1.98 crore = ₹50</strong></p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-3 text-blue-600">Key NAV Facts:</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• NAV is calculated daily after market closes</li>
                        <li>• All transactions happen at closing NAV</li>
                        <li>• Higher NAV doesn't mean expensive fund</li>
                        <li>• NAV reflects per-unit value, not performance</li>
                        <li>• New funds start with NAV of ₹10</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SIP Mechanism */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>How SIP (Systematic Investment Plan) Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-gray-700">
                    SIP is like a monthly savings plan, but instead of keeping money in a savings account, you're buying mutual fund units every month.
                  </p>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">SIP Journey Example:</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Month</th>
                            <th className="text-left p-2">Investment</th>
                            <th className="text-left p-2">NAV</th>
                            <th className="text-left p-2">Units Bought</th>
                            <th className="text-left p-2">Total Units</th>
                            <th className="text-left p-2">Investment Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">Jan</td>
                            <td className="p-2">₹5,000</td>
                            <td className="p-2">₹50</td>
                            <td className="p-2">100</td>
                            <td className="p-2">100</td>
                            <td className="p-2">₹5,000</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Feb</td>
                            <td className="p-2">₹5,000</td>
                            <td className="p-2">₹45</td>
                            <td className="p-2">111.11</td>
                            <td className="p-2">211.11</td>
                            <td className="p-2">₹9,500</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Mar</td>
                            <td className="p-2">₹5,000</td>
                            <td className="p-2">₹55</td>
                            <td className="p-2">90.91</td>
                            <td className="p-2">302.02</td>
                            <td className="p-2">₹16,611</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      Notice how you buy more units when NAV is low (Feb) and fewer when NAV is high (Mar). This is called Rupee Cost Averaging!
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">SIP Benefits:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Disciplined investing</li>
                        <li>• Rupee cost averaging</li>
                        <li>• Power of compounding</li>
                        <li>• No market timing needed</li>
                        <li>• Flexible amounts</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">SIP vs Lump Sum:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• SIP: Lower risk, consistent investing</li>
                        <li>• Lump sum: Higher risk, timing matters</li>
                        <li>• SIP: Better for beginners</li>
                        <li>• Lump sum: Good when markets are low</li>
                        <li>• Most experts recommend SIP</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Returns Calculation */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>How Mutual Fund Returns Are Calculated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-3 text-purple-600">Absolute Returns (Simple)</h5>
                      <p className="text-sm text-gray-700 mb-3">Used for investments less than 1 year</p>
                      <div className="bg-purple-50 p-3 rounded">
                        <p className="text-sm font-mono">Return % = ((Current Value - Invested Amount) / Invested Amount) × 100</p>
                        <p className="text-sm mt-2"><strong>Example:</strong> Invested ₹10,000, current value ₹11,500</p>
                        <p className="text-sm">Return = (11,500 - 10,000) / 10,000 × 100 = 15%</p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-3 text-green-600">Annualized Returns (CAGR)</h5>
                      <p className="text-sm text-gray-700 mb-3">Used for investments more than 1 year</p>
                      <div className="bg-green-50 p-3 rounded">
                        <p className="text-sm font-mono">CAGR = ((Final Value / Initial Value)^(1/Years)) - 1</p>
                        <p className="text-sm mt-2"><strong>Example:</strong> ₹10,000 became ₹15,000 in 3 years</p>
                        <p className="text-sm">CAGR = (15,000/10,000)^(1/3) - 1 = 14.47%</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">💡 Understanding Different Return Metrics:</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>1-day return:</strong> How much fund gained/lost yesterday</li>
                      <li><strong>1-week return:</strong> Performance over last 7 days</li>
                      <li><strong>1-year return:</strong> Most commonly looked at metric</li>
                      <li><strong>3-year return:</strong> Shows consistency through market cycles</li>
                      <li><strong>5-year return:</strong> Best indicator of long-term performance</li>
                      <li><strong>Since inception:</strong> Returns since fund was launched</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fund Manager Role */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>The Role of Fund Manager - Your Investment Captain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-gray-700">
                    A fund manager is like the captain of a ship, navigating your money through the turbulent waters of financial markets.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <h5 className="font-semibold mb-2">Research & Analysis</h5>
                      <p className="text-sm text-gray-700">Studies company financials, market trends, economic indicators</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <h5 className="font-semibold mb-2">Investment Decisions</h5>
                      <p className="text-sm text-gray-700">Decides which stocks to buy, sell, or hold based on analysis</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <h5 className="font-semibold mb-2">Risk Management</h5>
                      <p className="text-sm text-gray-700">Ensures portfolio doesn't take excessive risks</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-3">A Day in the Life of a Fund Manager:</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Morning (7-9 AM):</strong> Review global markets, overnight news</p>
                        <p><strong>Pre-market (9-9:15 AM):</strong> Plan day's trades, check portfolio</p>
                        <p><strong>Market Hours (9:15 AM-3:30 PM):</strong> Execute trades, monitor positions</p>
                      </div>
                      <div>
                        <p><strong>Post-market (3:30-6 PM):</strong> Review day's performance, research</p>
                        <p><strong>Evening (6-8 PM):</strong> Meet company management, attend calls</p>
                        <p><strong>Night:</strong> Read research reports, plan strategy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regulatory Framework */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Regulatory Framework - How Your Money is Protected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Mutual funds in India operate under strict regulatory oversight to protect investor interests:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h5 className="font-semibold">SEBI (Securities and Exchange Board of India)</h5>
                        <p className="text-sm text-gray-700">Main regulator that sets rules and monitors all mutual funds</p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h5 className="font-semibold">AMFI (Association of Mutual Funds in India)</h5>
                        <p className="text-sm text-gray-700">Self-regulatory body that promotes best practices</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h5 className="font-semibold">Custodian Banks</h5>
                        <p className="text-sm text-gray-700">Safely hold all securities, separate from AMC</p>
                      </div>

                      <div className="border-l-4 border-orange-500 pl-4">
                        <h5 className="font-semibold">Regular Audits</h5>
                        <p className="text-sm text-gray-700">Independent auditors verify all fund operations</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Your Money is Safe Because:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• All securities held by independent custodian</li>
                    <li>• Daily NAV calculation and disclosure</li>
                    <li>• Monthly portfolio disclosure</li>
                    <li>• Strict investment guidelines</li>
                    <li>• Regular SEBI inspections</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conclusion */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Key Takeaways</h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">How Mutual Funds Work - In Simple Terms:</h4>
                  <ol className="space-y-2 text-gray-700">
                    <li><strong>1.</strong> You give money to professional fund manager</li>
                    <li><strong>2.</strong> Your money is pooled with thousands of other investors</li>
                    <li><strong>3.</strong> Fund manager invests in diversified portfolio</li>
                    <li><strong>4.</strong> You get units based on NAV</li>
                    <li><strong>5.</strong> As investments grow, your unit value increases</li>
                    <li><strong>6.</strong> You can sell units anytime to get money back</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-yellow-800 font-medium">🎯 Remember: Mutual funds are not get-rich-quick schemes. They work best when you invest regularly for long periods and let the power of compounding work its magic!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HowMutualFundsWorkBlog;
