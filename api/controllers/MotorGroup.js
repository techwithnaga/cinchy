import MotorGroup from "../models/MotorGroup.js";

export const createMotorGroup = async (req, res) => {
  const newMotorGroup = new MotorGroup(req.body);
  try {
    const savedMotorGroup = await newMotorGroup.save();
    res.status(200).json(savedMotorGroup);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMotorGroups = async (req, res) => {
  try {
    const motorGroups = await MotorGroup.find();
    res.status(200).json(motorGroups);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMotorGroup = async (req, res) => {
  try {
    const motorGroup = await MotorGroup.findById(req.params.id);
    res.status(200).json(motorGroup);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateMotorGroup = async (req, res) => {
  try {
    const updatedGroup = await MotorGroup.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedGroup);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteMotorGroup = async (req, res) => {
  try {
    const deletedUser = await MotorGroup.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
