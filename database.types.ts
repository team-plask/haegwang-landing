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
      lawyer_practice_areas: {
        Row: {
          lawyer_id: string
          practice_area_id: string
        }
        Insert: {
          lawyer_id: string
          practice_area_id: string
        }
        Update: {
          lawyer_id?: string
          practice_area_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lawyer_practice_areas_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lawyer_practice_areas_practice_area_id_fkey"
            columns: ["practice_area_id"]
            isOneToOne: false
            referencedRelation: "practice_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      lawyers: {
        Row: {
          awards_publications: Json | null
          created_at: string | null
          education: Json | null
          email: string | null
          experience: Json | null
          fax_number: string | null
          id: string
          introduction: string | null
          lawyer_type: Database["public"]["Enums"]["lawyer_type_enum"] | null
          major_cases_summary: string | null
          name: string
          office_location:
            | Database["public"]["Enums"]["office_location_enum"]
            | null
          phone_number: string | null
          profile_picture_url: string | null
          slug: string | null
          updated_at: string | null
        }
        Insert: {
          awards_publications?: Json | null
          created_at?: string | null
          education?: Json | null
          email?: string | null
          experience?: Json | null
          fax_number?: string | null
          id?: string
          introduction?: string | null
          lawyer_type?: Database["public"]["Enums"]["lawyer_type_enum"] | null
          major_cases_summary?: string | null
          name: string
          office_location?:
            | Database["public"]["Enums"]["office_location_enum"]
            | null
          phone_number?: string | null
          profile_picture_url?: string | null
          slug?: string | null
          updated_at?: string | null
        }
        Update: {
          awards_publications?: Json | null
          created_at?: string | null
          education?: Json | null
          email?: string | null
          experience?: Json | null
          fax_number?: string | null
          id?: string
          introduction?: string | null
          lawyer_type?: Database["public"]["Enums"]["lawyer_type_enum"] | null
          major_cases_summary?: string | null
          name?: string
          office_location?:
            | Database["public"]["Enums"]["office_location_enum"]
            | null
          phone_number?: string | null
          profile_picture_url?: string | null
          slug?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      post_authors: {
        Row: {
          lawyer_id: string
          post_id: string
        }
        Insert: {
          lawyer_id: string
          post_id: string
        }
        Update: {
          lawyer_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_authors_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_authors_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content_payload: Json
          created_at: string | null
          external_link: string | null
          id: string
          post_type: Database["public"]["Enums"]["post_type_enum"]
          practice_area_id: string | null
          published_at: string | null
          slug: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content_payload: Json
          created_at?: string | null
          external_link?: string | null
          id?: string
          post_type: Database["public"]["Enums"]["post_type_enum"]
          practice_area_id?: string | null
          published_at?: string | null
          slug?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content_payload?: Json
          created_at?: string | null
          external_link?: string | null
          id?: string
          post_type?: Database["public"]["Enums"]["post_type_enum"]
          practice_area_id?: string | null
          published_at?: string | null
          slug?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_practice_area_id_fkey"
            columns: ["practice_area_id"]
            isOneToOne: false
            referencedRelation: "practice_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_areas: {
        Row: {
          area_name: string
          created_at: string | null
          display_order: number | null
          icon: string | null
          id: string
          image_url: string | null
          introduction: string | null
          key_services: Json | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          area_name: string
          created_at?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          image_url?: string | null
          introduction?: string | null
          key_services?: Json | null
          slug?: string
          updated_at?: string | null
        }
        Update: {
          area_name?: string
          created_at?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          image_url?: string | null
          introduction?: string | null
          key_services?: Json | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      lawyer_type_enum: "대표변호사" | "소속변호사" | "구성원 변호사"
      office_location_enum: "서울" | "대구" | "부산"
      post_type_enum: "승소사례" | "법인소식" | "블로그" | "언론보도"
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
    Enums: {
      lawyer_type_enum: ["대표변호사", "소속변호사", "구성원 변호사"],
      office_location_enum: ["서울", "대구", "부산"],
      post_type_enum: ["승소사례", "법인소식", "블로그", "언론보도"],
    },
  },
} as const
