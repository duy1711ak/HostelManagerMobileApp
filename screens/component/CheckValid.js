function haveSpecialChar(str){
    const format = /[^A-Za-z0-9]/
    if (str.length == 0) return false;
    return format.test(str)
}

export default function checkValid(str, callback){
    if (str == '') {
        callback('This field is required');
        return false;
    }
    else if (haveSpecialChar(str)){
        callback('This field must not have special character');
        return false;
    }
    else{
        callback('');
        return true;
    }
}