import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://aejtjzfrmrkixowcefxg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlanRqemZybXJraXhvd2NlZnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0NzQ4NjUsImV4cCI6MjAzNDA1MDg2NX0.pUbS768oOJ4_Lg_FkTTKwNdDDuhTFkUye-vAIU1_e5U";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
