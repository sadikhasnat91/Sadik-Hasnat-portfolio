import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPortfolioData, savePortfolioData } from "@/lib/data-store";

const AUTH_COOKIE_NAME = "portfolio_admin_token";

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);
  return token?.value === "authenticated_session_token";
}

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json({
      ...data,
      _storageInfo: {
        isSupabaseConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch data", details: String(err) },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json(
      { error: "অননুমোদিত অ্যাক্সেস! অনুগ্রহ করে লগইন করুন।" },
      { status: 401 }
    );
  }

  try {
    const updatedContent = await request.json();
    const result = await savePortfolioData(updatedContent);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save data", details: String(err) },
      { status: 500 }
    );
  }
}
