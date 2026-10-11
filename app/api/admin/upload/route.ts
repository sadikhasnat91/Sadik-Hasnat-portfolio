import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("portfolio_admin_token");
  if (!token || token.value !== "authenticated_session_token") {
    return NextResponse.json({ error: "অননুমোদিত এক্সেস (Unauthorized)" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "কোনো ফাইল সিলেক্ট করা হয়নি" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "শুধুমাত্র ছবি (Image) আপলোড করা যাবে" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.name) || ".jpg";
    const cleanFileName = `profile-${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, cleanFileName);

    fs.writeFileSync(filePath, buffer);

    const publicPath = `/uploads/${cleanFileName}`;
    return NextResponse.json({ success: true, url: publicPath });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "ফাইল সেভ করতে সমস্যা হয়েছে";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
