export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          role: 'parent' | 'child'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          role?: 'parent' | 'child'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          role?: 'parent' | 'child'
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          theme: string
          age_range: string
          duration_weeks: number
          disciplines: string[]
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          materials: string[]
          description: string
          category: 'pyp' | 'myp'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          theme: string
          age_range: string
          duration_weeks: number
          disciplines: string[]
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          materials: string[]
          description: string
          category: 'pyp' | 'myp'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          theme?: string
          age_range?: string
          duration_weeks?: number
          disciplines?: string[]
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          materials?: string[]
          description?: string
          category?: 'pyp' | 'myp'
          created_at?: string
        }
      }
      user_projects: {
        Row: {
          id: string
          user_id: string
          project_id: string
          status: 'not_started' | 'in_progress' | 'completed'
          started_at: string | null
          completed_at: string | null
          current_day: number
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          status?: 'not_started' | 'in_progress' | 'completed'
          started_at?: string | null
          completed_at?: string | null
          current_day?: number
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          status?: 'not_started' | 'in_progress' | 'completed'
          started_at?: string | null
          completed_at?: string | null
          current_day?: number
        }
      }
      daily_tasks: {
        Row: {
          id: string
          user_project_id: string
          day_number: number
          title: string
          description: string
          status: 'pending' | 'in_progress' | 'completed'
          materials: string[]
          tips: string | null
        }
        Insert: {
          id?: string
          user_project_id: string
          day_number: number
          title: string
          description: string
          status?: 'pending' | 'in_progress' | 'completed'
          materials?: string[]
          tips?: string | null
        }
        Update: {
          id?: string
          user_project_id?: string
          day_number?: number
          title?: string
          description?: string
          status?: 'pending' | 'in_progress' | 'completed'
          materials?: string[]
          tips?: string | null
        }
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
  }
}
