import DeliveryFee from "../models/DeliveryFee.js";


export const createDeliveryFee = async (req, res) => {
    const newDeliveryFee = new DeliveryFee (req.body);
    try {
        const savedFee = await newDeliveryFee.save();
        res.status(200).json(savedFee);
    } catch (err){
        res.status(500).json(err);
    }
}

export const getDeliveryFees = async (req, res) => {
    try {
        const fees = await DeliveryFee.find();
        res.status(200).json(fees);
    }catch (err) {
        res.status(500).json(err);
    }
}

export const getDeliveryFee = async (req,res) => {
    try {
        const fee = await DeliveryFee.findById (req.params.id); 
        res.status(200).json(fee);
    }catch (err) {
        res.status(500).json(err);
    }
}

export const updateDeliveryFee = async (req, res) => {
    try {
        const updatedFee = await DeliveryFee.findByIdAndUpdate (
            req.params.id,
            {$set : req.body},
            {new : true}
        );
        res.status(200).json(updatedFee);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteDeliveryFee = async (req,res) => {
    try {
        const deletedFee = await DeliveryFee.findByIdAndDelete (
            req.params.id
        );
        res.status(200).json(deletedFee);
    } catch (err) {
        res.status(500).json(err);
    }
}