import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    cpf: {type: Number, required: true},
    name: {type: String, required: true}
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByCpf = (cpf: number) => UserModel.findOne({cpf});
export const getUserByName = (name: string) => UserModel.findOne({name});
export const createUser = (cpf: number, name: string) => UserModel.create({cpf, name});
export const deleteUserByCpf = (cpf: number) => UserModel.findOneAndDelete({cpf});
export const updateUserByCpf = (cpf: number, name: string) => UserModel.findByIdAndUpdate({cpf}, {name});