const typeDefsFormSubmission = `
    scalar JSON
    scalar Date
    scalar DateTime

    type FormSubmission{
        _id: ID,
        formDetails:JSON,
        #_appointmentRef: null,
        #appointmentDate :null,
        #appointmentTime: null,
        #appointmentEndTime: null,
        ipAddress: String,
        submitLocation: String,
        domainAddress: String,
        _archived: Boolean,
        submittedData: JSON,
        createdAt: DateTime,
        updatedAt: DateTime,
        #__v: Int
    }

    type ResponseFormSubmission {
        data: FormSubmission
        message: String
        meta: JSON
        success: Boolean,
        error : [String]
    }

    type ResponseAllFormSubmission {
        data: [FormSubmission]
        message: String
        meta: JSON
        success: Boolean ,
        error : [String]
    }

    type Query {
        getFormSubmitted(id: ID!): ResponseFormSubmission,

        getAllFormSubmitted(formId: ID!): ResponseAllFormSubmission
    }

`;

export default typeDefsFormSubmission;