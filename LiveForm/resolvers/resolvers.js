import GraphQLJSON from 'graphql-type-json';

const resolvers = {
    JSON: GraphQLJSON,

    Query: {
        getForm : (parent, args, context, info) =>{
            return context.allForms.find(form =>{
                if (args.id === form.data.form.formKey) {
                    return form
                }
            })
        }
    }
}

export default resolvers;