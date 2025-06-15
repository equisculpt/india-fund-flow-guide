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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
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
