
module.exports = function (joiErrors) {
    //TODO rewrite this function with map and reduce
    /*
    let joiErrorsTransformed = joiErrors.details.map(function(er){
        return {
            "field":er.context.key,
            "massage":er.message
        }
        
    });
    */
   let joiErrorsTransformed = {}
   joiErrors.details.forEach(function(er){
      if(!joiErrorsTransformed.hasOwnProperty(er.context.key)){
        joiErrorsTransformed[er.context.key] = []
      }
      joiErrorsTransformed[er.context.key].push(er.message)
   });

   return joiErrorsTransformed
}


/* example of errors from Joi error reporting 
[{
    message: '"email" is not allowed to be empty',
    path: ['query', 'email'],
    type: 'any.empty',
    context: { value: '', invalids: [Array], key: 'email', label: 'email' }
},
{
    message: '"email" must be a valid email',
    path: ['query', 'email'],
    type: 'string.email',
    context: { value: '', key: 'email', label: 'email' }
},
{
    message: '"password" is not allowed to be empty',
    path: ['query', 'password'],
    type: 'any.empty',
    context:
    {
        value: '',
        invalids: [Array],
        key: 'password',
        label: 'password'
    }
},
{
    message: '"password" with value "" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/',
    path: ['query', 'password'],
    type: 'string.regex.base',
    context:
    {
        name: undefined,
        pattern: /^[a-zA-Z0-9]{3,30}$/,
        value: '',
        key: 'password',
        label: 'password'
    }
},
{
    message: '"username" is not allowed to be empty',
    path: ['query', 'username'],
    type: 'any.empty',
    context:
    {
        value: '',
        invalids: [Array],
        key: 'username',
        label: 'username'
    }
},
{
    message: '"username" must only contain alpha-numeric characters',
    path: ['query', 'username'],
    type: 'string.alphanum',
    context: { value: '', key: 'username', label: 'username' }
},
    {
        message: '"username" length must be at least 3 characters long',
        path: ['query', 'username'],
        type: 'string.min',
        context:
        {
            limit: 3,
            value: '',
            encoding: undefined,
            key: 'username',
            label: 'username'
        }
    }]
*/