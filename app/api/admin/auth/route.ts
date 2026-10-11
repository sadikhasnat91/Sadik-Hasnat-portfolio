import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sadik2026";
const AUTH_COOKIE_NAME = "portfolio_admin_token";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিয়ে চেষ্টা করুন।" },
        { status: 401 }
      );
    }

    // Set secure auth cookie
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, "authenticated_session_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Login successful" });
  } catch {
    return NextResponse.json(
      { error: "অনাকাঙ্ক্ষিত সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  return NextResponse.json({ success: true, message: "Logged out" });
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);
  const isAuthenticated = token?.value === "authenticated_session_token";

  return NextResponse.json({ isAuthenticated });
}
