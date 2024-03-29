import Booking from "../models/Booking.js";
import DeliveryFee from "../models/DeliveryFee.js";
import MotorGroup from "../models/MotorGroup.js";
import fetch from "node-fetch";

export const createBooking = async (req, res) => {
  let newBooking = new Booking(req.body);

  //calculate delivery fee
  const fees = await calculateDeliveryFee(newBooking);
  newBooking.deliveryPickupFee = fees;

  //calculate total Price
  const rentPrice = await calculateRentalPrice(newBooking);
  newBooking.subtotal = rentPrice;
  newBooking.discount = 0.3 * (fees + rentPrice);
  newBooking.totalRentalPrice = fees + rentPrice - newBooking.discount;

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
    (booking.returnDate - booking.deliveryDate) / milisecondsPerDay
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
  const motorGroupId = req.params.motorGroupId;
  const bookingId = req.params.bookingId;
  // console.log("in delete booking...");
  // console.log(motorGroupId + " " + bookingId);
  try {
    const deletedBooking = await Booking.findByIdAndDelete(
      req.params.bookingId
    );

    await MotorGroup.findByIdAndUpdate(
      motorGroupId,
      { $pull: { bookedTime: { bookingId: bookingId } } },
      { safe: true, multi: true }
    );
    //   res.status(200).json("success");
    // } catch (err) {
    //   res.status(500).json(err);
    // }

    res.status(200).json(deletedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const sendBookingConfirmation = async (req, res) => {
  const firstName = req.body.firstName;
  const phoneNumber = req.body.phoneNumber;
  const reservationNumber = req.body.reservationNumber;
  const groupName = req.body.groupName;
  const deliveryDate = req.body.deliveryDate;
  const deliveryLocation = req.body.deliveryLocation;
  const returnDate = req.body.returnDate;
  const returnLocation = req.body.returnLocation;

  const body = {
    messaging_product: "whatsapp",
    to: `${phoneNumber}`,
    type: "template",
    template: {
      name: "booking_confirmation",
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: firstName,
            },
            {
              type: "text",
              text: reservationNumber,
            },
            {
              type: "text",
              text: groupName,
            },
            {
              type: "text",
              text: deliveryDate,
            },
            {
              type: "text",
              text: deliveryLocation,
            },
            {
              type: "text",
              text: returnDate,
            },
            {
              type: "text",
              text: returnLocation,
            },
          ],
        },
      ],
    },
  };

  try {
    const response = await fetch(
      "https://graph.facebook.com/v15.0/114548434858579/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.FBTOKEN,
        },
        body: JSON.stringify(body),
      }
    );

    if (response.status === 200) {
      res.status(response.status).json("Confirmation message sent");
    } else {
      res.status(response.status).json(response.statusText);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
