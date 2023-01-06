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

    motorGroups.forEach((mg) => {
      if (mg.brand === "Vespa") {
        return (mg.isAvailable = false);
      } else {
        let startTimeToSearch = req.params.startTime;
        let endTimeToSearch = req.params.endTime;
        let requiredMotor = 1;

        mg.bookedTime.forEach((bt) => {
          if (
            bt.endTime >= startTimeToSearch &&
            bt.startTime <= endTimeToSearch
          ) {
            requiredMotor += 1;
          }
        });

        if (requiredMotor > mg.count) {
          return (mg.isAvailable = false);
        }
      }
    });
    console.log(motorGroups);
    res.status(200).json(motorGroups);
  } catch (err) {
    res.status(500).json(err);
  }
};

// export const isAvailable = (bookedTime) => {
//   const arr = bookedTime.sort((a, b));
// };

export const getMotorGroup = async (req, res) => {
  try {
    if (req.params.id === "") {
      res.status(500).json("invalid ID");
    }
    const motorGroup = await MotorGroup.findById(req.params.id);
    res.status(200).json(motorGroup);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateMotorGroup = async (req, res) => {
  console.log("updating");
  try {
    const updatedGroup = await MotorGroup.findByIdAndUpdate(req.params.id, {
      $push: { bookedTime: req.body },
    });
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
