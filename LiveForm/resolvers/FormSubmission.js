import formSubmissions from '../schema/mongodb/FormSubmission.js';
import mongoose, { Mongoose } from 'mongoose';

const getFormSubmission = async (parent, args, context, info)=>{
    const ResponseFormSubmission = {
        data: null,
        message: "Appointments not found!",
        meta: {},
        success: false,
        error: [{}]
    }

    const myformSubmission = await formSubmissions.find({_id: mongoose.Types.ObjectId(args.id)});
    console.log(myformSubmission);
    return myformSubmission ? {...ResponseFormSubmission, data: myformSubmission, message: "Appointments found successfully.", success: true, error: [], meta: {}} : ResponseFormSubmission;
}

const getFormSubmissions = async (parent, args, context, info)=>{
    const ResponseFormSubmissions = {
        data: null,
        message: "Appointments not found!",
        meta: {},
        success: false,
        error: [] 
    }

    const appointments = await formSubmissions.find({"formDetails._id": mongoose.Types.ObjectId(args.formId)}).limit(args.limit).skip(args.skip);
    
    return appointments ? {...ResponseFormSubmissions, data: {appointments: appointments}, message: "Appointments found successfully.", success: true, error : []} : ResponseFormSubmissions;
}


export default getFormSubmission;
export { getFormSubmissions };