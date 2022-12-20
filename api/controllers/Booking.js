import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
    const newBooking = new Booking (req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
    } catch (err){
        res.status(500).json(err);
    }
}

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    }catch (err) {
        res.status(500).json(err);
    }
}

export const getBooking = async (req,res) => {
    try {
        const booking = await DeliveryFee.findById (req.params.id); 
        res.status(200).json(booking);
    }catch (err) {
        res.status(500).json(err);
    }
}

export const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate (
            req.params.id,
            {$set : req.body},
            {new : true}
        );
        res.status(200).json(updatedBooking);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteBooking = async (req,res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete (
            req.params.id
        );
        res.status(200).json(deletedBooking);
    } catch (err) {
        res.status(500).json(err);
    }
}