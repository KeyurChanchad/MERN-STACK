import mongoose from 'mongoose';
import forms from '../schema/mongodb/Form.js';

const getForm = (parent, args, context, info) =>{
    let ResponseForm = {
        success : false,
        data : null,
        message : "Form not found",
        meta : {},
        error: []
    }

    const myform = forms.find({formKey : args.formKey});

    // console.log({...ResponseForm, success: true, data: myform, message: "Form found successfully"});
    return myform ? {...ResponseForm, success: true, data: myform, message: "Form found successfully", error : [], meta: {}} : ResponseForm;
}

const getUserForms = (parent, args, context, info) =>{
    let ResponseForm = {
        success : false,
        data : null,
        message : "Form not found",
        meta : {},
        error: []
    }

    const myforms = forms.find({"createdBy._id" : mongoose.Types.ObjectId(args.userId)});

    return myforms ? {...ResponseForm, success: true, data: myforms, message: "Form found successfully", error: [], meta: {}} : ResponseForm;
}


export { getForm, getUserForms }