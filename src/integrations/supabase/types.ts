export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_sessions: {
        Row: {
          admin_user_id: string | null
          created_at: string | null
          expires_at: string
          id: string
          ip_address: string | null
          session_token: string
          user_agent: string | null
        }
        Insert: {
          admin_user_id?: string | null
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: string | null
          session_token: string
          user_agent?: string | null
        }
        Update: {
          admin_user_id?: string | null
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          session_token?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_sessions_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
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
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          password_hash: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          is_active?: boolean | null
          password_hash: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          password_hash?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_whitelist: {
        Row: {
          created_at: string
          created_by: string | null
          email: string
          id: string
          is_active: boolean
          last_login: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email: string
          id?: string
          is_active?: boolean
          last_login?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
        }
        Relationships: []
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
      amc_list: {
        Row: {
          amc_code: string | null
          amc_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
          updated_at: string | null
        }
        Insert: {
          amc_code?: string | null
          amc_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Update: {
          amc_code?: string | null
          amc_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      amc_portfolio_files: {
        Row: {
          amc_name: string
          created_at: string | null
          error_message: string | null
          file_data: string
          file_name: string
          file_size: number
          file_type: string
          id: string
          portfolio_date: string
          updated_at: string | null
          upload_status: string | null
        }
        Insert: {
          amc_name: string
          created_at?: string | null
          error_message?: string | null
          file_data: string
          file_name: string
          file_size: number
          file_type: string
          id?: string
          portfolio_date: string
          updated_at?: string | null
          upload_status?: string | null
        }
        Update: {
          amc_name?: string
          created_at?: string | null
          error_message?: string | null
          file_data?: string
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          portfolio_date?: string
          updated_at?: string | null
          upload_status?: string | null
        }
        Relationships: []
      }
      amfi_portfolio_data: {
        Row: {
          amc_name: string
          created_at: string | null
          id: string
          portfolio_data: Json
          portfolio_date: string
          scheme_code: string
          scheme_name: string
          scrape_source: string | null
          scrape_status: string | null
          updated_at: string | null
        }
        Insert: {
          amc_name: string
          created_at?: string | null
          id?: string
          portfolio_data: Json
          portfolio_date: string
          scheme_code: string
          scheme_name: string
          scrape_source?: string | null
          scrape_status?: string | null
          updated_at?: string | null
        }
        Update: {
          amc_name?: string
          created_at?: string | null
          id?: string
          portfolio_data?: Json
          portfolio_date?: string
          scheme_code?: string
          scheme_name?: string
          scrape_source?: string | null
          scrape_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      amfi_portfolio_links: {
        Row: {
          amc_name: string
          created_at: string | null
          file_type: string
          id: string
          portfolio_date: string
          portfolio_url: string
          scrape_status: string | null
          updated_at: string | null
        }
        Insert: {
          amc_name: string
          created_at?: string | null
          file_type: string
          id?: string
          portfolio_date: string
          portfolio_url: string
          scrape_status?: string | null
          updated_at?: string | null
        }
        Update: {
          amc_name?: string
          created_at?: string | null
          file_type?: string
          id?: string
          portfolio_date?: string
          portfolio_url?: string
          scrape_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      amfi_scrape_logs: {
        Row: {
          additional_data: Json | null
          amc_name: string | null
          attempt_time: string | null
          error_message: string | null
          file_url: string | null
          id: string
          scheme_code: string | null
          status: string
        }
        Insert: {
          additional_data?: Json | null
          amc_name?: string | null
          attempt_time?: string | null
          error_message?: string | null
          file_url?: string | null
          id?: string
          scheme_code?: string | null
          status: string
        }
        Update: {
          additional_data?: Json | null
          amc_name?: string | null
          attempt_time?: string | null
          error_message?: string | null
          file_url?: string | null
          id?: string
          scheme_code?: string | null
          status?: string
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          moderated_at: string | null
          moderated_by: string | null
          moderation_status: string | null
          parent_id: string | null
          post_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_status?: string | null
          parent_id?: string | null
          post_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_status?: string | null
          parent_id?: string | null
          post_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "blog_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          admin_edited_content: string | null
          admin_edited_title: string | null
          admin_notes: string | null
          author_id: string
          category: string | null
          content: string
          created_at: string | null
          edited_by_admin: boolean | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          moderated_at: string | null
          moderated_by: string | null
          moderation_status: string | null
          published_at: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          admin_edited_content?: string | null
          admin_edited_title?: string | null
          admin_notes?: string | null
          author_id: string
          category?: string | null
          content: string
          created_at?: string | null
          edited_by_admin?: boolean | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_status?: string | null
          published_at?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          admin_edited_content?: string | null
          admin_edited_title?: string | null
          admin_notes?: string | null
          author_id?: string
          category?: string | null
          content?: string
          created_at?: string | null
          edited_by_admin?: boolean | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_status?: string | null
          published_at?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      blog_view_counts: {
        Row: {
          blog_slug: string
          id: string
          last_updated: string
          total_views: number
          unique_views: number
        }
        Insert: {
          blog_slug: string
          id?: string
          last_updated?: string
          total_views?: number
          unique_views?: number
        }
        Update: {
          blog_slug?: string
          id?: string
          last_updated?: string
          total_views?: number
          unique_views?: number
        }
        Relationships: []
      }
      blog_views: {
        Row: {
          blog_slug: string
          id: string
          ip_address: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
          viewed_at: string
        }
        Insert: {
          blog_slug: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
          viewed_at?: string
        }
        Update: {
          blog_slug?: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
          viewed_at?: string
        }
        Relationships: []
      }
      bse_api_logs: {
        Row: {
          api_endpoint: string
          created_at: string
          error_message: string | null
          execution_time_ms: number | null
          id: string
          request_method: string
          request_payload: Json | null
          response_payload: Json | null
          response_status: number | null
          user_id: string | null
        }
        Insert: {
          api_endpoint: string
          created_at?: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          request_method: string
          request_payload?: Json | null
          response_payload?: Json | null
          response_status?: number | null
          user_id?: string | null
        }
        Update: {
          api_endpoint?: string
          created_at?: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          request_method?: string
          request_payload?: Json | null
          response_payload?: Json | null
          response_status?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      bse_clients: {
        Row: {
          bank_account_number: string | null
          client_code: string
          client_name: string
          created_at: string
          email: string
          fatca_status: string | null
          id: string
          ifsc_code: string | null
          kyc_status: string | null
          mobile_number: string
          pan_number: string
          registration_status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bank_account_number?: string | null
          client_code: string
          client_name: string
          created_at?: string
          email: string
          fatca_status?: string | null
          id?: string
          ifsc_code?: string | null
          kyc_status?: string | null
          mobile_number: string
          pan_number: string
          registration_status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bank_account_number?: string | null
          client_code?: string
          client_name?: string
          created_at?: string
          email?: string
          fatca_status?: string | null
          id?: string
          ifsc_code?: string | null
          kyc_status?: string | null
          mobile_number?: string
          pan_number?: string
          registration_status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bse_holdings: {
        Row: {
          available_units: number
          client_code: string
          created_at: string
          folio_number: string
          holding_units: number
          id: string
          invested_value: number | null
          last_transaction_date: string | null
          market_value: number | null
          nav_date: string | null
          pledged_units: number
          price: number | null
          scheme_code: string
          scheme_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          available_units?: number
          client_code: string
          created_at?: string
          folio_number: string
          holding_units?: number
          id?: string
          invested_value?: number | null
          last_transaction_date?: string | null
          market_value?: number | null
          nav_date?: string | null
          pledged_units?: number
          price?: number | null
          scheme_code: string
          scheme_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          available_units?: number
          client_code?: string
          created_at?: string
          folio_number?: string
          holding_units?: number
          id?: string
          invested_value?: number | null
          last_transaction_date?: string | null
          market_value?: number | null
          nav_date?: string | null
          pledged_units?: number
          price?: number | null
          scheme_code?: string
          scheme_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bse_orders: {
        Row: {
          all_redeem: string | null
          amount: number | null
          bse_order_id: string | null
          client_code: string
          created_at: string
          dp_transaction: string | null
          folio_number: string | null
          id: string
          nav: number | null
          order_date: string
          order_number: string | null
          order_status: string | null
          order_type: string
          order_value: number | null
          quantity: number | null
          rejection_reason: string | null
          remarks: string | null
          scheme_code: string
          scheme_name: string | null
          settlement_type: string | null
          transaction_type: string
          units_allotted: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          all_redeem?: string | null
          amount?: number | null
          bse_order_id?: string | null
          client_code: string
          created_at?: string
          dp_transaction?: string | null
          folio_number?: string | null
          id?: string
          nav?: number | null
          order_date?: string
          order_number?: string | null
          order_status?: string | null
          order_type: string
          order_value?: number | null
          quantity?: number | null
          rejection_reason?: string | null
          remarks?: string | null
          scheme_code: string
          scheme_name?: string | null
          settlement_type?: string | null
          transaction_type: string
          units_allotted?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          all_redeem?: string | null
          amount?: number | null
          bse_order_id?: string | null
          client_code?: string
          created_at?: string
          dp_transaction?: string | null
          folio_number?: string | null
          id?: string
          nav?: number | null
          order_date?: string
          order_number?: string | null
          order_status?: string | null
          order_type?: string
          order_value?: number | null
          quantity?: number | null
          rejection_reason?: string | null
          remarks?: string | null
          scheme_code?: string
          scheme_name?: string | null
          settlement_type?: string | null
          transaction_type?: string
          units_allotted?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bse_sips: {
        Row: {
          bank_account_number: string | null
          client_code: string
          created_at: string
          end_date: string | null
          first_order_today: string | null
          folio_number: string | null
          frequency: string
          id: string
          ifsc_code: string | null
          installment_amount: number
          mandate_id: string | null
          registration_date: string | null
          remarks: string | null
          scheme_code: string
          scheme_name: string | null
          sip_amount: number
          sip_date: number
          sip_reg_id: string | null
          sip_status: string | null
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bank_account_number?: string | null
          client_code: string
          created_at?: string
          end_date?: string | null
          first_order_today?: string | null
          folio_number?: string | null
          frequency: string
          id?: string
          ifsc_code?: string | null
          installment_amount: number
          mandate_id?: string | null
          registration_date?: string | null
          remarks?: string | null
          scheme_code: string
          scheme_name?: string | null
          sip_amount: number
          sip_date: number
          sip_reg_id?: string | null
          sip_status?: string | null
          start_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bank_account_number?: string | null
          client_code?: string
          created_at?: string
          end_date?: string | null
          first_order_today?: string | null
          folio_number?: string | null
          frequency?: string
          id?: string
          ifsc_code?: string | null
          installment_amount?: number
          mandate_id?: string | null
          registration_date?: string | null
          remarks?: string | null
          scheme_code?: string
          scheme_name?: string | null
          sip_amount?: number
          sip_date?: number
          sip_reg_id?: string | null
          sip_status?: string | null
          start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bse_transactions: {
        Row: {
          amount: number | null
          balance_units: number | null
          client_code: string
          created_at: string
          folio_number: string | null
          id: string
          nav: number | null
          order_id: string | null
          scheme_code: string
          scheme_name: string | null
          settlement_date: string | null
          source: string | null
          total_amount: number | null
          transaction_date: string
          transaction_type: string
          units: number | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          balance_units?: number | null
          client_code: string
          created_at?: string
          folio_number?: string | null
          id?: string
          nav?: number | null
          order_id?: string | null
          scheme_code: string
          scheme_name?: string | null
          settlement_date?: string | null
          source?: string | null
          total_amount?: number | null
          transaction_date: string
          transaction_type: string
          units?: number | null
          user_id: string
        }
        Update: {
          amount?: number | null
          balance_units?: number | null
          client_code?: string
          created_at?: string
          folio_number?: string | null
          id?: string
          nav?: number | null
          order_id?: string | null
          scheme_code?: string
          scheme_name?: string | null
          settlement_date?: string | null
          source?: string | null
          total_amount?: number | null
          transaction_date?: string
          transaction_type?: string
          units?: number | null
          user_id?: string
        }
        Relationships: []
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
      community_answers: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_accepted: boolean | null
          is_expert_answer: boolean | null
          question_id: string
          updated_at: string | null
          upvotes_count: number | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_accepted?: boolean | null
          is_expert_answer?: boolean | null
          question_id: string
          updated_at?: string | null
          upvotes_count?: number | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_accepted?: boolean | null
          is_expert_answer?: boolean | null
          question_id?: string
          updated_at?: string | null
          upvotes_count?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "community_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      community_questions: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          expert_only: boolean | null
          id: string
          is_answered: boolean | null
          status: string | null
          title: string
          updated_at: string | null
          upvotes_count: number | null
          user_id: string
          views_count: number | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          expert_only?: boolean | null
          id?: string
          is_answered?: boolean | null
          status?: string | null
          title: string
          updated_at?: string | null
          upvotes_count?: number | null
          user_id: string
          views_count?: number | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          expert_only?: boolean | null
          id?: string
          is_answered?: boolean | null
          status?: string | null
          title?: string
          updated_at?: string | null
          upvotes_count?: number | null
          user_id?: string
          views_count?: number | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          admin_notes: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
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
      loyalty_rewards: {
        Row: {
          created_at: string | null
          credited_at: string | null
          id: string
          investment_id: string | null
          platform_commission: number
          reward_amount: number
          reward_percentage: number | null
          reward_year: number
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          credited_at?: string | null
          id?: string
          investment_id?: string | null
          platform_commission: number
          reward_amount: number
          reward_percentage?: number | null
          reward_year: number
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          credited_at?: string | null
          id?: string
          investment_id?: string | null
          platform_commission?: number
          reward_amount?: number
          reward_percentage?: number | null
          reward_year?: number
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_rewards_investment_id_fkey"
            columns: ["investment_id"]
            isOneToOne: false
            referencedRelation: "investments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_rewards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      nav_update_history: {
        Row: {
          created_at: string | null
          id: string
          nav_date: string
          nav_value: number
          scheme_code: string
          update_source: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nav_date: string
          nav_value: number
          scheme_code: string
          update_source?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nav_date?: string
          nav_value?: number
          scheme_code?: string
          update_source?: string | null
          updated_by?: string | null
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
      portfolio_changes: {
        Row: {
          amc_name: string
          change_date: string
          change_type: string
          created_at: string | null
          id: string
          impact_analysis: Json | null
          new_percentage: number | null
          old_percentage: number | null
          percentage_change: number | null
          scheme_code: string
          security_name: string
        }
        Insert: {
          amc_name: string
          change_date: string
          change_type: string
          created_at?: string | null
          id?: string
          impact_analysis?: Json | null
          new_percentage?: number | null
          old_percentage?: number | null
          percentage_change?: number | null
          scheme_code: string
          security_name: string
        }
        Update: {
          amc_name?: string
          change_date?: string
          change_type?: string
          created_at?: string | null
          id?: string
          impact_analysis?: Json | null
          new_percentage?: number | null
          old_percentage?: number | null
          percentage_change?: number | null
          scheme_code?: string
          security_name?: string
        }
        Relationships: []
      }
      portfolio_holdings: {
        Row: {
          amc_name: string
          created_at: string | null
          id: string
          industry: string | null
          isin_code: string | null
          market_value: number | null
          percentage_holding: number
          portfolio_date: string
          quantity: number | null
          scheme_code: string
          scheme_name: string
          sector: string | null
          security_name: string
          updated_at: string | null
        }
        Insert: {
          amc_name: string
          created_at?: string | null
          id?: string
          industry?: string | null
          isin_code?: string | null
          market_value?: number | null
          percentage_holding: number
          portfolio_date: string
          quantity?: number | null
          scheme_code: string
          scheme_name: string
          sector?: string | null
          security_name: string
          updated_at?: string | null
        }
        Update: {
          amc_name?: string
          created_at?: string | null
          id?: string
          industry?: string | null
          isin_code?: string | null
          market_value?: number | null
          percentage_holding?: number
          portfolio_date?: string
          quantity?: number | null
          scheme_code?: string
          scheme_name?: string
          sector?: string | null
          security_name?: string
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
          is_direct_customer: boolean | null
          kyc_status: string | null
          onboarding_source: string | null
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
          is_direct_customer?: boolean | null
          kyc_status?: string | null
          onboarding_source?: string | null
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
          is_direct_customer?: boolean | null
          kyc_status?: string | null
          onboarding_source?: string | null
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
      rate_limit_log: {
        Row: {
          attempt_count: number
          endpoint: string
          id: string
          ip_address: string
          is_blocked: boolean
          window_start: string
        }
        Insert: {
          attempt_count?: number
          endpoint: string
          id?: string
          ip_address: string
          is_blocked?: boolean
          window_start?: string
        }
        Update: {
          attempt_count?: number
          endpoint?: string
          id?: string
          ip_address?: string
          is_blocked?: boolean
          window_start?: string
        }
        Relationships: []
      }
      referral_commissions: {
        Row: {
          commission_amount: number
          commission_rate: number | null
          created_at: string | null
          id: string
          investment_id: string | null
          is_direct_customer: boolean | null
          max_commission: number | null
          paid_at: string | null
          referee_id: string | null
          referrer_id: string | null
          slab_number: number | null
          status: string | null
          wallet_credited: boolean | null
        }
        Insert: {
          commission_amount: number
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          investment_id?: string | null
          is_direct_customer?: boolean | null
          max_commission?: number | null
          paid_at?: string | null
          referee_id?: string | null
          referrer_id?: string | null
          slab_number?: number | null
          status?: string | null
          wallet_credited?: boolean | null
        }
        Update: {
          commission_amount?: number
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          investment_id?: string | null
          is_direct_customer?: boolean | null
          max_commission?: number | null
          paid_at?: string | null
          referee_id?: string | null
          referrer_id?: string | null
          slab_number?: number | null
          status?: string | null
          wallet_credited?: boolean | null
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
      referral_reward_slabs: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          reward_amount: number
          slab_max: number | null
          slab_min: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          reward_amount: number
          slab_max?: number | null
          slab_min: number
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          reward_amount?: number
          slab_max?: number | null
          slab_min?: number
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          created_at: string
          details: Json | null
          event_type: string
          id: string
          ip_address: string | null
          success: boolean
          user_agent: string | null
          user_email: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          success: boolean
          user_agent?: string | null
          user_email?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          success?: boolean
          user_agent?: string | null
          user_email?: string | null
        }
        Relationships: []
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
      uploaded_files: {
        Row: {
          created_at: string
          extracted_content: string | null
          file_path: string
          file_size: number
          file_type: string
          filename: string
          id: string
          is_processed: boolean | null
          original_filename: string
          updated_at: string
          upload_purpose: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          extracted_content?: string | null
          file_path: string
          file_size: number
          file_type: string
          filename: string
          id?: string
          is_processed?: boolean | null
          original_filename: string
          updated_at?: string
          upload_purpose?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          extracted_content?: string | null
          file_path?: string
          file_size?: number
          file_type?: string
          filename?: string
          id?: string
          is_processed?: boolean | null
          original_filename?: string
          updated_at?: string
          upload_purpose?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_consolidated_holdings: {
        Row: {
          id: string
          isin_code: string | null
          last_updated: string | null
          scheme_breakdown: Json
          security_name: string
          total_percentage: number
          total_value: number
          user_id: string | null
        }
        Insert: {
          id?: string
          isin_code?: string | null
          last_updated?: string | null
          scheme_breakdown: Json
          security_name: string
          total_percentage: number
          total_value: number
          user_id?: string | null
        }
        Update: {
          id?: string
          isin_code?: string | null
          last_updated?: string | null
          scheme_breakdown?: Json
          security_name?: string
          total_percentage?: number
          total_value?: number
          user_id?: string | null
        }
        Relationships: []
      }
      user_expert_status: {
        Row: {
          created_at: string | null
          expertise_areas: string[] | null
          id: string
          is_expert: boolean | null
          user_id: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string | null
          expertise_areas?: string[] | null
          id?: string
          is_expert?: boolean | null
          user_id: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string | null
          expertise_areas?: string[] | null
          id?: string
          is_expert?: boolean | null
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      user_wallets: {
        Row: {
          balance: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          total_earned: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          total_earned?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          total_earned?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string | null
          credited_at: string | null
          description: string | null
          id: string
          investment_id: string | null
          referral_id: string | null
          status: string | null
          transaction_type: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          credited_at?: string | null
          description?: string | null
          id?: string
          investment_id?: string | null
          referral_id?: string | null
          status?: string | null
          transaction_type: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          credited_at?: string | null
          description?: string | null
          id?: string
          investment_id?: string | null
          referral_id?: string | null
          status?: string | null
          transaction_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_user_id_fkey"
            columns: ["user_id"]
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
      calculate_proper_irr: {
        Args: { start_nav: number; end_nav: number; days_period: number }
        Returns: number
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
      cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_ai_insights: {
        Args: { target_user_id: string }
        Returns: undefined
      }
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_referral_reward_amount: {
        Args: { referral_count: number }
        Returns: number
      }
      increment_blog_view_count: {
        Args: {
          p_blog_slug: string
          p_user_id?: string
          p_ip_address?: string
          p_user_agent?: string
          p_session_id?: string
        }
        Returns: number
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_security_event: {
        Args: {
          event_type_param: string
          user_email_param?: string
          ip_address_param?: string
          user_agent_param?: string
          success_param?: boolean
          details_param?: Json
        }
        Returns: undefined
      }
      validate_admin_access: {
        Args: { admin_email: string }
        Returns: boolean
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
