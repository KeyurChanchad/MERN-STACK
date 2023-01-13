import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({}, {strict: false});
const formModel = new mongoose.model("liveforms", formSchema);
const allForms = await formModel.find();

export default allForms;