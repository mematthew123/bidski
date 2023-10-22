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
      estimates: {
        Row: {
          estimate_id: number
          labor_hours: number | null
          material_cost: number | null
          notes: string | null
          room_id: number | null
          total_cost: number | null
        }
        Insert: {
          estimate_id?: number
          labor_hours?: number | null
          material_cost?: number | null
          notes?: string | null
          room_id?: number | null
          total_cost?: number | null
        }
        Update: {
          estimate_id?: number
          labor_hours?: number | null
          material_cost?: number | null
          notes?: string | null
          room_id?: number | null
          total_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "estimates_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "rooms"
            referencedColumns: ["room_id"]
          }
        ]
      }
      paint: {
        Row: {
          brand: string | null
          paint_id: number
          price: number | null
          room_id: number | null
        }
        Insert: {
          brand?: string | null
          paint_id?: number
          price?: number | null
          room_id?: number | null
        }
        Update: {
          brand?: string | null
          paint_id?: number
          price?: number | null
          room_id?: number | null
        }
        Relationships: []
      }
      paints: {
        Row: {
          paint_brand: string
          paint_color: string
          paint_id: number
          paint_type: string
          price_per_gallon: number
        }
        Insert: {
          paint_brand: string
          paint_color: string
          paint_id?: number
          paint_type: string
          price_per_gallon: number
        }
        Update: {
          paint_brand?: string
          paint_color?: string
          paint_id?: number
          paint_type?: string
          price_per_gallon?: number
        }
        Relationships: []
      }
      projects: {
        Row: {
          creation_date: string | null
          last_modified: string | null
          needs_cleaning: boolean | null
          paint_type: string | null
          project_id: number
          project_name: string | null
          project_overview: string | null
          room_count: number | null
          square_footage: number | null
          user_id: string | null
        }
        Insert: {
          creation_date?: string | null
          last_modified?: string | null
          needs_cleaning?: boolean | null
          paint_type?: string | null
          project_id?: number
          project_name?: string | null
          project_overview?: string | null
          room_count?: number | null
          square_footage?: number | null
          user_id?: string | null
        }
        Update: {
          creation_date?: string | null
          last_modified?: string | null
          needs_cleaning?: boolean | null
          paint_type?: string | null
          project_id?: number
          project_name?: string | null
          project_overview?: string | null
          room_count?: number | null
          square_footage?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      rooms: {
        Row: {
          ceiling_area: number | null
          color_choice: string | null
          height: number | null
          length: number | null
          notes: string | null
          paint_needed: number | null
          project_id: number | null
          room_id: number
          room_name: string
          wall_area: number | null
          width: number | null
        }
        Insert: {
          ceiling_area?: number | null
          color_choice?: string | null
          height?: number | null
          length?: number | null
          notes?: string | null
          paint_needed?: number | null
          project_id?: number | null
          room_id?: number
          room_name: string
          wall_area?: number | null
          width?: number | null
        }
        Update: {
          ceiling_area?: number | null
          color_choice?: string | null
          height?: number | null
          length?: number | null
          notes?: string | null
          paint_needed?: number | null
          project_id?: number | null
          room_id?: number
          room_name?: string
          wall_area?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rooms_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
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