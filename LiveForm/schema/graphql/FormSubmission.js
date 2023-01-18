const typeDefsFormSubmission = `
    scalar JSON
    scalar Date
    scalar DateTime
    scalar Time

    type FormSubmission{
        _id: ID,
        formDetails:JSON,
        _appointmentRef: JSON,
        appointmentDate : Date,
        appointmentTime: Time,
        appointmentEndTime: Time,
        ipAddress: String,
        submitLocation: String,
        domainAddress: String,
        _archived: Boolean,
        submittedData: JSON,
        createdAt: DateTime,
        updatedAt: DateTime
    }

    type ResponseFormSubmission {
        data: [FormSubmission]
        message: String
        meta: JSON
        success: Boolean,
        error : [String]
    }

    type ResponseFormSubmissions {
        data: JSON
        message: String
        meta: JSON
        success: Boolean ,
        error : [String]
    }

    type Query {
        getFormSubmission(id: ID!): ResponseFormSubmission,

        getFormSubmissions(formId: ID!, limit: Int, skip: Int): ResponseFormSubmissions

    }

`;

export default typeDefsFormSubmission;