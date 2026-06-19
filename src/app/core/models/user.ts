import { User } from "@supabase/supabase-js"

export interface AppUser extends User {
    user_roles?: string[];
}

export interface CustomJwt {
    user_roles?: string[];
    sub: string;
}
