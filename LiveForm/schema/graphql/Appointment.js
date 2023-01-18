const typeDefsAppointment = `
    scalar JSON
    scalar DateTime

    type Appointment {
        _id : ID,
        name: String,
        timezone: String,
        dateformat: String,
        timeformat: String,
        #slots:Array
        createdBy: JSON,
        _archived: Boolean,
        createdAt: DateTime,
        updatedAt: DateTime,
        _v : Int
        formDetails: JSON
    }

    type ResponseAppointment{
        success : Boolean,
        data : [Appointment],
        message : String,
        meta : JSON,
        error : [String]
    }

    type Query{
        getAppointment(email : String!) : ResponseAppointment
    }
`;

export default typeDefsAppointment;