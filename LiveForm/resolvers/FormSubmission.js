const getFormSubmitted = (parent, args, context, info)=>{
    const ResponseFormSubmission = {
        data: null,
        message: "Details not found!",
        meta: {},
        success: false 
    }

    const myformSubmission = context.allFormSubmissions.find(formSubmission =>{
        if (args.id === formSubmission._id.toString()) {
            return formSubmission;
        }
    })

    return myformSubmission ? {...ResponseFormSubmission, data: myformSubmission, message: "Details found successfully.", success: true} : ResponseFormSubmission;
}

const getAllFormSubmitted = (parent, args, context, info)=>{
    const ResponseAllFormSubmission = {
        data: null,
        message: "Appointments not found!",
        meta: {},
        success: false,
        error: [] 
    }
    const appointments = context.allFormSubmissions.filter(formSubmission =>{
        if (args.formId === formSubmission.formDetails._id.toString()) {
            return formSubmission
        }
    });

    return appointments ? {...ResponseAllFormSubmission, data: appointments, message: "Appointments found successfully.", success: true, error : [], meta: {}} : ResponseAllFormSubmission;
}

export default getFormSubmitted;
export { getAllFormSubmitted };