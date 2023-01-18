const typeDefsForm = `#graphql
    scalar JSON
    scalar DateTime

    type Form{
        _id : ID,
        name : String!,
        fields : [JSON]
        settings : JSON,
        attachments : JSON,
        _templateRef : String,
        _appointmentRef: JSON,
        createdBy : JSON,
        formKey : String,
        _cloned : Boolean,
        originalFormDetails: String,
        _archived: Boolean,
        _live : Boolean,
        createdAt : DateTime,
        updatedAt : DateTime
    }
    
    type ResponeForm {
        success : Boolean,
        data : [Form],
        message : String,
        meta : JSON,
        error : [JSON]
    }


    type Query{
        getForm(formKey : ID!) : ResponeForm,
        getUserForms(userId : ID!) : ResponeForm
    }
`;

export default typeDefsForm;