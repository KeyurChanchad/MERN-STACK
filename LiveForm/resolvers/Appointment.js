import appointments from '../schema/mongodb/Appointment.js';

const getAppointment = (parent, args, context, info)=>{
    var ResponseAppointment = {
            success : false,
            data : null,
            message : "Form not found",
            meta : {},
            error : []
    }

    const myappointment = appointments.find({"createdBy.email" : args.email});

    return myappointment ? {...ResponseAppointment, success: true, data : myappointment, message: "Form found successfully", error : [], meta: {}} : ResponseAppointment;
}
    

export default getAppointment;