import { BookingModel } from "@/model/booking.model";
import { connect } from "@/utils/utility";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await connect();
    try {
        const id = params?.id;
        console.log(id);

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Booking ID is required"
            }, { status: 400 });
        }

        const booking = await BookingModel.findByIdAndDelete(id);
        if (!booking) {
            return NextResponse.json({
                success: false,
                message: "Booking Details not found"
            }, { status: 404 })
        }
        return NextResponse.json({ success: true, message: "Booking Details Destroyed" }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 })
    }
}