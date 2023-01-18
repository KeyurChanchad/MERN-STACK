import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({}, {strict: false});
const forms = new mongoose.model("forms", formSchema);

export default forms;