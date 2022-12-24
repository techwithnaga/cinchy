import Booking from "../models/Booking.js";
import DeliveryFee from "../models/DeliveryFee.js";
import MotorGroup from "../models/MotorGroup.js";

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);

  //calculate delivery fee
  const fees = await calculateDeliveryFee(newBooking);
  newBooking.deliveryPickupFee = fees;

  //calculate total Price
  const rentPrice = await calculateRentalPrice(newBooking);
  newBooking.totalRentalPrice = fees + rentPrice;

  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const calculateDeliveryFee = async (booking) => {
  const deliveryLoc = await DeliveryFee.findById(booking.deliveryLocation);
  const pickupLoc = await DeliveryFee.findById(booking.returnLocation);
  return deliveryLoc.fee + pickupLoc.fee;
};

export const calculateRentalPrice = async (booking) => {
  const motorGroup = await MotorGroup.findById(booking.motorGroup);
  const pricePerDay = motorGroup.price;
  const milisecondsPerDay = 24 * 60 * 60 * 1000;
  const duration = Math.ceil(
    (booking.returnDate.getTime() - booking.deliveryDate.getTime()) /
      milisecondsPerDay
  );
  booking.rentalDuration = duration;
  return duration * pricePerDay;
};

export const getBookings = async (req, res) => {
  try {
    const Bookings = await Booking.find();
    res.status(200).json(Bookings);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getBooking = async (req, res) => {
  try {
    const fee = await Booking.findById(req.params.id);
    res.status(200).json(fee);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
};
