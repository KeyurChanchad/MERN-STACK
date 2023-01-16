const typeDefsForm = `#graphql
    scalar JSON
    scalar DateTime

    type Form{
        _id : ID,
        name : String!,
        settings : JSON,
        attachments : JSON,
        createdBy : JSON,
        formKey : String,
        _live : Boolean,
        createAt : DateTime,
        updatedAt : DateTime
    }
    
    type ResponeForm {
        success : Boolean,
        data : Form,
        message : String,
        meta : JSON,
        error : [String]
    }

    type Query{
        getForm(formKey : ID!) : ResponeForm
    }
`;

export default typeDefsForm;