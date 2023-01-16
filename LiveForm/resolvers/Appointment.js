
const getAppointment = (parent, args, context, info)=>{
    var ResponseAppointment = {
            success : false,
            data : null,
            message : "Form not found",
            meta : {},
            error : []
    }

    const myappointment = context.allAppointments.find(appointment =>{
            if (appointment.createdBy.email === args.email) {
                return appointment
            }
    })

    return myappointment ? {...ResponseAppointment, success: true, data : myappointment, message: "Form found successfully", error : [], meta: {}} : ResponseAppointment;
}
    

export default getAppointment;