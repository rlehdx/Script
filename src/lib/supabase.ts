import { createClient } from "@supabase/supabase-js";
import type { PlanType } from "./stripe";

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_user_id: string;
          email: string;
          plan_type: PlanType;
          scripts_used_this_month: number;
          billing_cycle_start: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          brand_voice: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          clerk_user_id: string;
          email: string;
          plan_type: PlanType;
          scripts_used_this_month: number;
          billing_cycle_start: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          brand_voice?: string | null;
        };
        Update: {
          id?: string;
          clerk_user_id?: string;
          email?: string;
          plan_type?: PlanType;
          scripts_used_this_month?: number;
          billing_cycle_start?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          brand_voice?: string | null;
        };
      };
      scripts: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          script_type: string;
          content: string;
          tone: string;
          language: string;
          tokens_used: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          script_type: string;
          content: string;
          tone: string;
          language: string;
          tokens_used?: number;
        };
        Update: {
          user_id?: string;
          title?: string;
          script_type?: string;
          content?: string;
          tone?: string;
          language?: string;
          tokens_used?: number;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

export const SUPABASE_ENABLED =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Browser client (for client components)
export const supabase = SUPABASE_ENABLED
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  : (null as unknown as ReturnType<typeof createClient>);

// Server client with service role (for API routes — bypasses RLS)
export const supabaseAdmin =
  SUPABASE_ENABLED && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : (null as unknown as ReturnType<typeof createClient>);
