import mongoose from 'mongoose';

const formSubmissionSchema = new mongoose.Schema({}, {strict: false});
const formSubmissions = new mongoose.model("formSubmissions", formSubmissionSchema);
const allFormSubmissions = await formSubmissions.find();

export default allFormSubmissions;


