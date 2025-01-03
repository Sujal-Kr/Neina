import { BookingModel } from "@/model/booking.model";
import { connect } from "@/utils/utility";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connect()
        const booking = await req.json();
        const data=await BookingModel.create(booking);
        return NextResponse.json({
            success: true,
            message: "Booked Slot Successfully",
            booking:data
        }, { status: 201 })

    } catch (err: any) {
        return NextResponse.json({
            success: true,
            message: err.message
        }, { status: 500 })
    }
}