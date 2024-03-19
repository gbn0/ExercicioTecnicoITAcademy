import mongoose, { Schema, Types } from "mongoose";

const BetsSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    numbers: [{type: Number, required: true}],
    better: {type: Number, ref: 'User', required: true},
    edition: {type: Number, ref: 'Editions', required: true}
});

export const BetsModel = mongoose.model('Bets', BetsSchema);

export const getBets = () => BetsModel.find();
export const getBetById = (id: number) => BetsModel.findOne({id});
export const getBetBy_Id = (_id: Types.ObjectId) => BetsModel.findOne({_id});
export const getBetByBetter = (better: Number) => BetsModel.find({better});
export const getBetsByEdition = (edition: Number) => BetsModel.find({edition});
export const createBet = (id: number, numbers: Array<Number>, better:Number, edition:Number) => BetsModel.create({id, numbers, better, edition});
export const deleteBetById = (id: number) => BetsModel.findOneAndDelete({id});