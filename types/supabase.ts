export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      materials: {
        Row: {
          brushes: string | null
          brushes_price: number | null
          caulk: string | null
          caulk_price: number | null
          cleaning_supplies: string | null
          cleaning_supplies_price: number | null
          drop_sheets: string | null
          drop_sheets_price: number | null
          material_id: number
          paint: string | null
          paint_price: number | null
          primer: string | null
          primer_price: number | null
          rollers: string | null
          rollers_price: number | null
          tape: string | null
          tape_price: number | null
          user_id: string | null
        }
        Insert: {
          brushes?: string | null
          brushes_price?: number | null
          caulk?: string | null
          caulk_price?: number | null
          cleaning_supplies?: string | null
          cleaning_supplies_price?: number | null
          drop_sheets?: string | null
          drop_sheets_price?: number | null
          material_id?: never
          paint?: string | null
          paint_price?: number | null
          primer?: string | null
          primer_price?: number | null
          rollers?: string | null
          rollers_price?: number | null
          tape?: string | null
          tape_price?: number | null
          user_id?: string | null
        }
        Update: {
          brushes?: string | null
          brushes_price?: number | null
          caulk?: string | null
          caulk_price?: number | null
          cleaning_supplies?: string | null
          cleaning_supplies_price?: number | null
          drop_sheets?: string | null
          drop_sheets_price?: number | null
          material_id?: never
          paint?: string | null
          paint_price?: number | null
          primer?: string | null
          primer_price?: number | null
          rollers?: string | null
          rollers_price?: number | null
          tape?: string | null
          tape_price?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      paint_types: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          client_name: string | null
          needs_cleaning: boolean | null
          paint_type: string | null
          project_address: string | null
          project_id: number
          project_name: string | null
          project_zipcode: number | null
          total_square_feet: number | null
          user_id: string | null
        }
        Insert: {
          client_name?: string | null
          needs_cleaning?: boolean | null
          paint_type?: string | null
          project_address?: string | null
          project_id?: never
          project_name?: string | null
          project_zipcode?: number | null
          total_square_feet?: number | null
          user_id?: string | null
        }
        Update: {
          client_name?: string | null
          needs_cleaning?: boolean | null
          paint_type?: string | null
          project_address?: string | null
          project_id?: never
          project_name?: string | null
          project_zipcode?: number | null
          total_square_feet?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_paint_prices: {
        Row: {
          id: number
          paint_type_id: number | null
          price: number | null
          user_id: string | null
        }
        Insert: {
          id?: number
          paint_type_id?: number | null
          price?: number | null
          user_id?: string | null
        }
        Update: {
          id?: number
          paint_type_id?: number | null
          price?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_paint_prices_paint_type_id_fkey"
            columns: ["paint_type_id"]
            isOneToOne: false
            referencedRelation: "paint_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_paint_prices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_project_and_material: {
        Args: {
          project_name: string
          project_address: string
          material_name: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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
