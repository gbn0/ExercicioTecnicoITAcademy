import mongoose from "mongoose";


interface User {
    cpf: number,
    name: string
}

const BetsSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    numbers: {type: Array, required: true},
    better: {type: Number, required: true}
});

export const BetsModel = mongoose.model('Bets', BetsSchema);

export const getBets = () => BetsModel.find();
export const getBetById = (id: number) => BetsModel.findOne({id});
export const getBetByBetter = (cpf: number) => BetsModel.find({cpf});
export const createBet = (id: number, numbers: Array<number>, better:number) => BetsModel.create({id, numbers, better});
export const deleteBetById = (id: number) => BetsModel.findOneAndDelete({id});
export const updateBetById = (id: number, name: string) => BetsModel.findByIdAndUpdate({id}, {name});