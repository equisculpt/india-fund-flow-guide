
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  useRewardWalletSummary, 
  useMonthlyCommissionHistory, 
  useAnnualPayoutHistory,
  useCommissionRates 
} from '@/hooks/useTrailCommissionRewards';
import { Calendar, IndianRupee, TrendingUp, FileText, Info, Gift } from 'lucide-react';

const TrailCommissionRewards = () => {
  const { data: walletSummary, isLoading: walletLoading } = useRewardWalletSummary();
  const { data: commissionHistory, isLoading: historyLoading } = useMonthlyCommissionHistory();
  const { data: payoutHistory, isLoading: payoutLoading } = useAnnualPayoutHistory();
  const { data: commissionRates, isLoading: ratesLoading } = useCommissionRates();

  if (walletLoading) {
    return <div className="text-center py-8">Loading reward wallet...</div>;
  }

  return (
    <div className="space-y-6">
      {/* SEBI Compliance Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-amber-600 mt-0.5" />
          <div className="text-sm text-amber-800">
            <h3 className="font-semibold mb-2">Platform Loyalty Rewards Program</h3>
            <p>
              This is a loyalty bonus program where you receive a share of the trail commission 
              actually earned by our platform from AMCs, only for investments that remain invested. 
              Rewards are paid annually as festival bonuses. This is not investment advice or 
              guaranteed returns on your investments.
            </p>
          </div>
        </div>
      </div>

      {/* Wallet Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Pending Rewards</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{walletSummary?.total_pending_rewards?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Lifetime Rewards</p>
                <p className="text-2xl font-bold">
                  ₹{walletSummary?.total_lifetime_rewards?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm text-gray-600">Last Payout</p>
                <p className="text-2xl font-bold">
                  ₹{walletSummary?.last_payout_amount?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Next Payout</p>
                <p className="text-sm font-medium">
                  {walletSummary?.next_payout_eligible_date 
                    ? new Date(walletSummary.next_payout_eligible_date).toLocaleDateString()
                    : 'Annual (Diwali)'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="commission-history" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="commission-history">Monthly Commission</TabsTrigger>
          <TabsTrigger value="payout-history">Payout History</TabsTrigger>
          <TabsTrigger value="rates">Commission Rates</TabsTrigger>
        </TabsList>

        <TabsContent value="commission-history">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trail Commission History</CardTitle>
              <p className="text-sm text-gray-600">
                Shows actual commission earned by platform and your 30% loyalty share
              </p>
            </CardHeader>
            <CardContent>
              {historyLoading ? (
                <p className="text-center py-4">Loading commission history...</p>
              ) : commissionHistory && commissionHistory.length > 0 ? (
                <div className="space-y-3">
                  {commissionHistory.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{record.fund_name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(record.commission_month).toLocaleDateString('en-IN', { 
                            month: 'long', year: 'numeric' 
                          })}
                        </p>
                        <p className="text-xs text-gray-500">
                          Investment Value: ₹{record.outstanding_investment_value.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Platform: ₹{record.monthly_commission_earned.toFixed(2)}
                        </p>
                        <p className="font-bold text-green-600">
                          Your Share: ₹{record.user_reward_amount.toFixed(2)}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {record.user_reward_percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No commission history yet</p>
                  <p className="text-sm text-gray-400">
                    Start investing to earn monthly loyalty rewards!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payout-history">
          <Card>
            <CardHeader>
              <CardTitle>Annual Payout History</CardTitle>
              <p className="text-sm text-gray-600">
                Festival loyalty bonuses paid out annually
              </p>
            </CardHeader>
            <CardContent>
              {payoutLoading ? (
                <p className="text-center py-4">Loading payout history...</p>
              ) : payoutHistory && payoutHistory.length > 0 ? (
                <div className="space-y-3">
                  {payoutHistory.map((payout) => (
                    <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Diwali Bonus {payout.payout_year}</p>
                        <p className="text-sm text-gray-600">
                          Paid on {new Date(payout.payout_date).toLocaleDateString()}
                        </p>
                        {payout.tds_deducted > 0 && (
                          <p className="text-xs text-orange-600">
                            TDS Deducted: ₹{payout.tds_deducted.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          ₹{payout.net_payout_amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Gross: ₹{payout.user_reward_amount.toLocaleString()}
                        </p>
                        {payout.statement_generated && (
                          <Badge variant="outline" className="text-xs mt-1">
                            Statement Available
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Gift className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No payouts yet</p>
                  <p className="text-sm text-gray-400">
                    Your first annual bonus will be processed next Diwali
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rates">
          <Card>
            <CardHeader>
              <CardTitle>Current Commission Rates</CardTitle>
              <p className="text-sm text-gray-600">
                Trail commission rates for transparency (you get 30% of platform's earnings)
              </p>
            </CardHeader>
            <CardContent>
              {ratesLoading ? (
                <p className="text-center py-4">Loading commission rates...</p>
              ) : commissionRates && commissionRates.length > 0 ? (
                <div className="grid gap-3">
                  {commissionRates.map((rate) => (
                    <div key={rate.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {rate.scheme_code.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <p className="text-sm text-gray-600">
                          Effective from {new Date(rate.effective_from).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{rate.annual_commission_rate}% p.a.</p>
                        <p className="text-sm text-green-600">
                          Your share: {(rate.annual_commission_rate * 0.3).toFixed(2)}% p.a.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No commission rates available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrailCommissionRewards;
