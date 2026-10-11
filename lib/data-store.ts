import fs from "fs";
import path from "path";
import { initialDatabase, PortfolioDatabase } from "@/data/initial-data";
import { isSupabaseConfigured, supabase } from "./supabase";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "portfolio-store.json");

/**
 * Get current portfolio data from Supabase (if configured) or local JSON store
 */
export async function getPortfolioData(): Promise<PortfolioDatabase> {
  // 1. Try Supabase if env vars are present
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
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local store:", err);
    }
  }

  // 2. Fall back to local JSON file store
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(fileContent) as PortfolioDatabase;
    }
  } catch (err) {
    console.warn("Failed reading local portfolio-store.json:", err);
  }

  // 3. Fall back to initial bundled data
  return initialDatabase;
}

/**
 * Save updated portfolio data to Supabase and/or local JSON store
 */
export async function savePortfolioData(
  newData: PortfolioDatabase
): Promise<{ success: boolean; message: string; target: string }> {
  let target = "local-file";

  // 1. If Supabase is configured, save to Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("portfolio_content").upsert({
        id: "main",
        content: newData,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Supabase upsert error:", error);
      } else {
        target = "supabase-cloud";
      }
    } catch (err) {
      console.error("Supabase save exception:", err);
    }
  }

  // 2. Always persist locally to JSON file store as well
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(newData, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed writing local JSON backup:", err);
  }

  return {
    success: true,
    message: `Data successfully saved to ${target}`,
    target,
  };
}
