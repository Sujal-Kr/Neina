import { BookingModel } from "@/model/booking.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json()
        const bookings = await BookingModel.find({ email }).sort({ date: 1 })
        return NextResponse.json({
            success: true,
            message: "Your bookings retrieved ",
            bookings
        })
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message,

        }, { status: 500 })
    }
}