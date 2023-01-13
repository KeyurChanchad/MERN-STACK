const typeDefs = `#graphql
    scalar JSON

    type Form{
        _id : ID
        data: JSON,
        message:String,     
        meta: JSON,
        success: Boolean
    }
    
    type Query{
        getForm(id : ID!) : Form
    }
`;

export default typeDefs;