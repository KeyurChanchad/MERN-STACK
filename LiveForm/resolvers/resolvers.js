import getAppointment from './Appointment.js';
import  { getForm, getUserForms }  from './Form.js'
import GraphQLJSON from 'graphql-type-json';
import getFormSubmission from './FormSubmission.js';
import  { getFormSubmissions } from './FormSubmission.js';
import { DateScalar, TimeScalar, DateTimeScalar } from 'graphql-date-scalars';

const resolvers = {
    JSON: GraphQLJSON,
    Date: DateScalar,
    DateTime: DateTimeScalar,
    Time: TimeScalar,

    Query : {
        getForm,
        getUserForms,
        getAppointment,
        getFormSubmission,
        getFormSubmissions
    }
     
};

export default resolvers;