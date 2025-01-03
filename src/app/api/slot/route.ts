import { slots } from "@/constants/data";
import { BookingModel } from "@/model/booking.model";
import { connect } from "@/utils/utility";
import { NextResponse } from "next/server";

export async function GET() {
    await connect()
    try {
        const booked = await BookingModel.find({
            time: { $in: slots }
        }).select("time");

        const bookedSlots = booked.map(item => item.time);
        const availableSlots = slots.filter(slot => !bookedSlots.includes(slot));

        return NextResponse.json({
            success: true,
            message: "retrieved slots available",
            slots: availableSlots
        }, { status: 200 });

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message
        }, { status: 500 });
    }
}
