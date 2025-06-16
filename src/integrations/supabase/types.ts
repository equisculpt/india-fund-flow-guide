export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_settings: {
        Row: {
          description: string | null
          id: string
          setting_key: string
          setting_value: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          setting_key: string
          setting_value?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_portfolio_insights: {
        Row: {
          action_required: boolean | null
          created_at: string | null
          data_points: Json | null
          expires_at: string | null
          id: string
          insight_type: string
          is_read: boolean | null
          is_sent: boolean | null
          message: string
          priority: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          action_required?: boolean | null
          created_at?: string | null
          data_points?: Json | null
          expires_at?: string | null
          id?: string
          insight_type: string
          is_read?: boolean | null
          is_sent?: boolean | null
          message: string
          priority?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          action_required?: boolean | null
          created_at?: string | null
          data_points?: Json | null
          expires_at?: string | null
          id?: string
          insight_type?: string
          is_read?: boolean | null
          is_sent?: boolean | null
          message?: string
          priority?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_portfolio_insights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          agent_id: string | null
          agent_share_percentage: number | null
          base_commission_rate: number | null
          calculated_commission: number | null
          commission_type: string | null
          created_at: string | null
          fund_id: string | null
          id: string
          investment_amount: number | null
          investment_id: string | null
          payment_date: string | null
          status: string | null
        }
        Insert: {
          agent_id?: string | null
          agent_share_percentage?: number | null
          base_commission_rate?: number | null
          calculated_commission?: number | null
          commission_type?: string | null
          created_at?: string | null
          fund_id?: string | null
          id?: string
          investment_amount?: number | null
          investment_id?: string | null
          payment_date?: string | null
          status?: string | null
        }
        Update: {
          agent_id?: string | null
          agent_share_percentage?: number | null
          base_commission_rate?: number | null
          calculated_commission?: number | null
          commission_type?: string | null
          created_at?: string | null
          fund_id?: string | null
          id?: string
          investment_amount?: number | null
          investment_id?: string | null
          payment_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commissions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_investment_id_fkey"
            columns: ["investment_id"]
            isOneToOne: false
            referencedRelation: "investments"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_fund_analysis: {
        Row: {
          ai_score: number
          amc_name: string
          analysis_date: string
          category: string
          confidence: number
          created_at: string
          historical_3month_data: Json | null
          id: string
          nav: number
          nav_date: string
          performance_rank: number
          predicted_3month_return: number
          risk_level: string
          scheme_code: string
          scheme_name: string
          sharpe_ratio: number
          sub_category: string | null
          total_schemes_in_category: number
          updated_at: string
          volatility_score: number
        }
        Insert: {
          ai_score: number
          amc_name: string
          analysis_date?: string
          category: string
          confidence: number
          created_at?: string
          historical_3month_data?: Json | null
          id?: string
          nav: number
          nav_date: string
          performance_rank: number
          predicted_3month_return: number
          risk_level: string
          scheme_code: string
          scheme_name: string
          sharpe_ratio: number
          sub_category?: string | null
          total_schemes_in_category: number
          updated_at?: string
          volatility_score: number
        }
        Update: {
          ai_score?: number
          amc_name?: string
          analysis_date?: string
          category?: string
          confidence?: number
          created_at?: string
          historical_3month_data?: Json | null
          id?: string
          nav?: number
          nav_date?: string
          performance_rank?: number
          predicted_3month_return?: number
          risk_level?: string
          scheme_code?: string
          scheme_name?: string
          sharpe_ratio?: number
          sub_category?: string | null
          total_schemes_in_category?: number
          updated_at?: string
          volatility_score?: number
        }
        Relationships: []
      }
      extended_nav_history: {
        Row: {
          created_at: string
          id: string
          nav_date: string
          nav_value: number
          scheme_code: string
        }
        Insert: {
          created_at?: string
          id?: string
          nav_date: string
          nav_value: number
          scheme_code: string
        }
        Update: {
          created_at?: string
          id?: string
          nav_date?: string
          nav_value?: number
          scheme_code?: string
        }
        Relationships: []
      }
      investments: {
        Row: {
          agent_id: string | null
          amount: number
          created_at: string | null
          current_value: number | null
          frequency: string | null
          fund_id: string | null
          id: string
          investment_type: string | null
          nav_price: number | null
          next_installment_date: string | null
          start_date: string | null
          status: string | null
          total_invested: number | null
          units_allotted: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          agent_id?: string | null
          amount: number
          created_at?: string | null
          current_value?: number | null
          frequency?: string | null
          fund_id?: string | null
          id?: string
          investment_type?: string | null
          nav_price?: number | null
          next_installment_date?: string | null
          start_date?: string | null
          status?: string | null
          total_invested?: number | null
          units_allotted?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          agent_id?: string | null
          amount?: number
          created_at?: string | null
          current_value?: number | null
          frequency?: string | null
          fund_id?: string | null
          id?: string
          investment_type?: string | null
          nav_price?: number | null
          next_installment_date?: string | null
          start_date?: string | null
          status?: string | null
          total_invested?: number | null
          units_allotted?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investments_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investments_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      investor_reviews: {
        Row: {
          ai_enhanced_text: string | null
          created_at: string
          id: string
          investment_amount: number | null
          is_featured: boolean | null
          monthly_sip_amount: number | null
          rating: number
          review_text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_enhanced_text?: string | null
          created_at?: string
          id?: string
          investment_amount?: number | null
          is_featured?: boolean | null
          monthly_sip_amount?: number | null
          rating: number
          review_text: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_enhanced_text?: string | null
          created_at?: string
          id?: string
          investment_amount?: number | null
          is_featured?: boolean | null
          monthly_sip_amount?: number | null
          rating?: number
          review_text?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      investor_stats: {
        Row: {
          average_rating: number | null
          id: string
          last_updated: string | null
          total_amount_invested: number | null
          total_investors: number | null
          total_reviews: number | null
        }
        Insert: {
          average_rating?: number | null
          id?: string
          last_updated?: string | null
          total_amount_invested?: number | null
          total_investors?: number | null
          total_reviews?: number | null
        }
        Update: {
          average_rating?: number | null
          id?: string
          last_updated?: string | null
          total_amount_invested?: number | null
          total_investors?: number | null
          total_reviews?: number | null
        }
        Relationships: []
      }
      mutual_fund_nav_history: {
        Row: {
          created_at: string
          fund_id: string | null
          id: string
          nav_date: string
          nav_value: number
        }
        Insert: {
          created_at?: string
          fund_id?: string | null
          id?: string
          nav_date: string
          nav_value: number
        }
        Update: {
          created_at?: string
          fund_id?: string | null
          id?: string
          nav_date?: string
          nav_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "mutual_fund_nav_history_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["id"]
          },
        ]
      }
      mutual_funds: {
        Row: {
          amc_name: string
          category: string | null
          commission_rate: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          min_lumpsum_amount: number | null
          min_sip_amount: number | null
          nav: number | null
          returns_1y: number | null
          returns_3y: number | null
          returns_5y: number | null
          risk_level: string | null
          scheme_code: string
          scheme_name: string
          sub_category: string | null
          updated_at: string | null
        }
        Insert: {
          amc_name: string
          category?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          min_lumpsum_amount?: number | null
          min_sip_amount?: number | null
          nav?: number | null
          returns_1y?: number | null
          returns_3y?: number | null
          returns_5y?: number | null
          risk_level?: string | null
          scheme_code: string
          scheme_name: string
          sub_category?: string | null
          updated_at?: string | null
        }
        Update: {
          amc_name?: string
          category?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          min_lumpsum_amount?: number | null
          min_sip_amount?: number | null
          nav?: number | null
          returns_1y?: number | null
          returns_3y?: number | null
          returns_5y?: number | null
          risk_level?: string | null
          scheme_code?: string
          scheme_name?: string
          sub_category?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      peer_comparisons: {
        Row: {
          analysis_date: string
          bottom_10_percent_returns: number
          comparison_period: string
          created_at: string | null
          id: string
          peer_average_returns: number
          risk_category: string
          top_10_percent_returns: number
          total_peers: number
          user_id: string | null
          user_rank: number
          user_returns: number
        }
        Insert: {
          analysis_date?: string
          bottom_10_percent_returns: number
          comparison_period: string
          created_at?: string | null
          id?: string
          peer_average_returns: number
          risk_category: string
          top_10_percent_returns: number
          total_peers: number
          user_id?: string | null
          user_rank: number
          user_returns: number
        }
        Update: {
          analysis_date?: string
          bottom_10_percent_returns?: number
          comparison_period?: string
          created_at?: string | null
          id?: string
          peer_average_returns?: number
          risk_category?: string
          top_10_percent_returns?: number
          total_peers?: number
          user_id?: string | null
          user_rank?: number
          user_returns?: number
        }
        Relationships: [
          {
            foreignKeyName: "peer_comparisons_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_analytics: {
        Row: {
          analysis_date: string
          benchmark_comparison: number
          created_at: string | null
          id: string
          peer_percentile: number
          portfolio_value: number
          return_percentage: number
          risk_score: number
          sharpe_ratio: number
          total_returns: number
          user_id: string | null
          volatility: number
        }
        Insert: {
          analysis_date?: string
          benchmark_comparison: number
          created_at?: string | null
          id?: string
          peer_percentile: number
          portfolio_value: number
          return_percentage: number
          risk_score: number
          sharpe_ratio: number
          total_returns: number
          user_id?: string | null
          volatility: number
        }
        Update: {
          analysis_date?: string
          benchmark_comparison?: number
          created_at?: string | null
          id?: string
          peer_percentile?: number
          portfolio_value?: number
          return_percentage?: number
          risk_score?: number
          sharpe_ratio?: number
          total_returns?: number
          user_id?: string | null
          volatility?: number
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          agent_id: string | null
          commission_rate: number | null
          created_at: string | null
          full_name: string
          id: string
          is_active: boolean | null
          kyc_status: string | null
          pan_number: string | null
          phone: string | null
          referral_code: string | null
          referred_by: string | null
          total_referral_earnings: number | null
          updated_at: string | null
          user_type: string
        }
        Insert: {
          agent_id?: string | null
          commission_rate?: number | null
          created_at?: string | null
          full_name: string
          id: string
          is_active?: boolean | null
          kyc_status?: string | null
          pan_number?: string | null
          phone?: string | null
          referral_code?: string | null
          referred_by?: string | null
          total_referral_earnings?: number | null
          updated_at?: string | null
          user_type: string
        }
        Update: {
          agent_id?: string | null
          commission_rate?: number | null
          created_at?: string | null
          full_name?: string
          id?: string
          is_active?: boolean | null
          kyc_status?: string | null
          pan_number?: string | null
          phone?: string | null
          referral_code?: string | null
          referred_by?: string | null
          total_referral_earnings?: number | null
          updated_at?: string | null
          user_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_commissions: {
        Row: {
          commission_amount: number
          commission_rate: number | null
          created_at: string | null
          id: string
          investment_id: string | null
          max_commission: number | null
          paid_at: string | null
          referee_id: string | null
          referrer_id: string | null
          status: string | null
        }
        Insert: {
          commission_amount: number
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          investment_id?: string | null
          max_commission?: number | null
          paid_at?: string | null
          referee_id?: string | null
          referrer_id?: string | null
          status?: string | null
        }
        Update: {
          commission_amount?: number
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          investment_id?: string | null
          max_commission?: number | null
          paid_at?: string | null
          referee_id?: string | null
          referrer_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_commissions_investment_id_fkey"
            columns: ["investment_id"]
            isOneToOne: false
            referencedRelation: "investments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_commissions_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_commissions_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sip_transactions: {
        Row: {
          created_at: string
          fund_id: string | null
          id: string
          nav_on_date: number
          sip_amount: number
          transaction_date: string
          units_allocated: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          fund_id?: string | null
          id?: string
          nav_on_date: number
          sip_amount: number
          transaction_date: string
          units_allocated: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          fund_id?: string | null
          id?: string
          nav_on_date?: number
          sip_amount?: number
          transaction_date?: string
          units_allocated?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sip_transactions_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_fund_irr: {
        Args: { p_fund_id: string; p_start_date: string; p_end_date: string }
        Returns: number
      }
      calculate_irr_for_period: {
        Args: { start_nav: number; end_nav: number; days_period: number }
        Returns: number
      }
      calculate_portfolio_analytics: {
        Args: { target_user_id: string }
        Returns: undefined
      }
      calculate_sip_irr: {
        Args: {
          scheme_code_param: string
          start_date_param: string
          end_date_param: string
          monthly_sip_amount?: number
        }
        Returns: {
          total_invested: number
          final_value: number
          absolute_return: number
          irr_percentage: number
        }[]
      }
      calculate_sip_returns: {
        Args: {
          p_user_id: string
          p_fund_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: {
          total_invested: number
          total_units: number
          current_value: number
          absolute_returns: number
          percentage_returns: number
          xirr: number
        }[]
      }
      generate_ai_insights: {
        Args: { target_user_id: string }
        Returns: undefined
      }
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
