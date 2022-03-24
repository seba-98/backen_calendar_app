
const validatePasswords=(value, {req})=>{

    if(value !== req.body.password){
        return false
    }
    return true;
    
}

module.exports={
    validatePasswords
}