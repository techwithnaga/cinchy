import User from "../models/User.js";
import Booking from "../models/Booking.js";
import { format } from "date-fns";
import MotorGroup from "../models/MotorGroup.js";
import { response } from "express";
import DeliveryFee from "../models/DeliveryFee.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser = async (req, res) => {
  const whatsappNumber = req.body.whatsappNumber;
  try {
    const user = await User.findOne({ whatsappNumber: whatsappNumber });
    if (user) {
      //update user info
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $set: req.body },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } else {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUsersBookings = async (req, res) => {
  const userNumber = req.params.whatsappNumber;
  try {
    const user = await User.findOne({ whatsappNumber: userNumber });
    const bookings = await Booking.find({ user: user._id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMyCurrentBooking = async (req, res) => {
  const whatsappNumber = req.params.whatsappNumber;

  try {
    const bookings = await Booking.find({ whatsappNumber: whatsappNumber });

    let result = await Promise.all(
      bookings.map(async (booking) => {
        let currentBooking = {
          bookingId: "",
          fullBookingId: "",
          deliveryDate: "",
          returnDate: "",
          motorGroupId: "",
          photos: [],
          groupName: "",
          category: "",
          totalRentalPrice: 0,
          deliveryArea: "",
          deliveryURL: "",
          returnArea: "",
          returnURL: "",
          isPaid: false,
        };

        if (booking.deliveryDate > new Date().getTime()) {
          currentBooking.bookingId = booking._id.toString().slice(-5);
          currentBooking.fullBookingId = booking._id;
          currentBooking.deliveryDate = format(
            new Date(booking.deliveryDate),
            "E, d MMM HH:mm"
          );
          currentBooking.returnDate = format(
            new Date(booking.returnDate),
            "E, d MMM HH:mm"
          );

          const motorGroup = await MotorGroup.findById(booking.motorGroup);
          currentBooking.motorGroupId = booking.motorGroup;
          currentBooking.photos = motorGroup.photos;
          currentBooking.groupName = motorGroup.groupName;
          currentBooking.category = motorGroup.category;
          currentBooking.totalRentalPrice = booking.totalRentalPrice;

          const delivery = await DeliveryFee.findById(booking.deliveryLocation);
          currentBooking.deliveryArea = delivery.region;
          currentBooking.deliveryURL = booking.deliveryURL;

          const pickup = await DeliveryFee.findById(booking.returnLocation);
          currentBooking.returnArea = pickup.region;
          currentBooking.returnURL = booking.returnURL;
          currentBooking.isPaid = booking.is_paid;
          // currentBooking.isDelivered = booking.isDelivered;
          // currentBooking.isReturned = booking.isReturned;

          return currentBooking;
        }
      })
    );
    // console.log(result);
    // if (result[0] === undefined) {
    //   result = [];
    // }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
