import MotorDetail from "../models/Motor.js";

export const createMotor = async (req, res) => {
  // console.log(req.body);
  const newMotorDetail = new MotorDetail(req.body);
  try {
    const savedMotorDetail = await newMotorDetail.save();
    res.status(200).json(savedMotorDetail);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMotor = async (req, res) => {
  try {
    const motor = await MotorDetail.findById(req.params.id);
    res.status(200).json(motor);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMotors = async (req, res) => {
  try {
    const motors = await MotorDetail.find();
    res.status(200).json(motors);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateMotor = async (req, res) => {
  try {
    const updateMotorDetail = await MotorDetail.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateMotorDetail);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteMotor = async (req, res) => {
  try {
    const deletedMotorDetail = await MotorDetail.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(deletedMotorDetail);
  } catch (err) {
    res.status(500).json(err);
  }
};
