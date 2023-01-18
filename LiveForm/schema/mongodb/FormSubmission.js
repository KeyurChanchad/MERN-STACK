import mongoose from 'mongoose';

const formSubmissionSchema = new mongoose.Schema({}, {strict: false});
const formSubmissions = new mongoose.model("formSubmissions", formSubmissionSchema);

export default formSubmissions;


