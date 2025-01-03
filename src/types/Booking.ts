import { z } from 'zod';
export interface BookingType{
    _id?: string
    name: string
    email: string
    guest: number
    contact: string
    date: Date
    time: string
}


const BookingSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  guest: z.string().min(1,"Number of guests must be greater than 0").max(4, "Number of guests must be greater than 4"),
  contact: z.string().min(10, "Contact number must be at least 10 digits"),
  date: z.date(),
  time: z.string().min(1, "Time is required")
});
export { BookingSchema}
