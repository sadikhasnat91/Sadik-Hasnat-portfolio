import { initialDatabase, PortfolioDatabase } from "@/data/initial-data";
import fs from "fs";
import path from "path";
import { isSupabaseConfigured, supabase } from "./supabase";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "portfolio-store.json");

/**
 * Get dynamic portfolio content for server components
 */
export async function getDynamicPortfolioData(): Promise<PortfolioDatabase> {
  // 1. Check Supabase first if available
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("portfolio_content")
        .select("content")
        .eq("id", "main")
        .single();

      if (!error && data?.content) {
        return data.content as PortfolioDatabase;
      }
    } catch {
      // Fall through to local file
    }
  }

  // 2. Check local JSON file
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(content) as PortfolioDatabase;
    }
  } catch {
    // Fall through to bundle
  }

  // 3. Fallback to bundled dataset
  return initialDatabase;
}
