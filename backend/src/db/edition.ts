import mongoose, { Schema } from "mongoose";

const EditionsSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    winners: [{type: mongoose.Types.ObjectId, ref: 'Bets'}],
    prize: {type: Number, required: true}
});

export const EditionsModel = mongoose.model('Editions', EditionsSchema);

export const getEditions = () => EditionsModel.find();
export const getEditionById = (id: number) => EditionsModel.findOne({id});
export const getEditionByWinner = (winner: mongoose.Types.ObjectId) => EditionsModel.find({winner});
export const createEdition = (id: Number, prize:Number) => EditionsModel.create({id, prize});
export const deleteEditionById = (id: number) => EditionsModel.findOneAndDelete({id});
export const updateEditionWinnersById = (id: number, winners: mongoose.Types.ObjectId[], ) => EditionsModel.findByIdAndUpdate({id}, {winners});