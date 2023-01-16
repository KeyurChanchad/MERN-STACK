import getAppointment from './Appointment.js';
import  getForm  from './Form.js'
import GraphQLJSON from 'graphql-type-json';
import getFormSubmitted from './FormSubmission.js';
import  { getAllFormSubmitted } from './FormSubmission.js';
import { DateScalar, TimeScalar, DateTimeScalar } from 'graphql-date-scalars';

const resolvers = {
    JSON: GraphQLJSON,
    Date: DateScalar,
    DateTime: DateTimeScalar,

    Query : {
        getForm,
        getAppointment,
        getFormSubmitted,
        getAllFormSubmitted
    }
     
};

export default resolvers;