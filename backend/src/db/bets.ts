import mongoose, { Schema } from "mongoose";

const BetsSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    numbers: {type: Array<Number>, required: true},
    better: {type: Number, required: true}
});

export const BetsModel = mongoose.model('Bets', BetsSchema);

export const getBets = () => BetsModel.find();
export const getBetById = (id: number) => BetsModel.findOne({id});
export const getBetBy_Id = (_id: string) => BetsModel.findOne({_id});
export const getBetByBetter = (better: Number) => BetsModel.find({better});
export const createBet = (id: number, numbers: Array<Number>, better:Number) => BetsModel.create({id, numbers, better});
export const deleteBetById = (id: number) => BetsModel.findOneAndDelete({id});