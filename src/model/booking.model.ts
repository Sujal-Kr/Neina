import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
        min: [10, "Contact no. must be 10 characters"],
        max: [10, "Contact no. must be 10 characters"]
    },
    guest: {
        type: String,
        required: true,
        default: 1
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    }
})

const BookingModel = mongoose.models.booking || mongoose.model('booking', BookingSchema)
export { BookingModel } 