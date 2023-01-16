
const getForm = (parent, args, context, info) =>{
    var ResponseForm = {
        success : false,
        data : null,
        message : "Form not found",
        meta : {},
        error: []
    }
    const myform =  context.allForms.find(form =>{
        if (args.formKey === form.formKey) {
            return form;
        }
    })
    // console.log({...ResponseForm, success: true, data: myform, message: "Form found successfully"});

    return myform ? {...ResponseForm, success: true, data: myform, message: "Form found successfully", error : [], meta: {}} : ResponseForm;
}


export default getForm;