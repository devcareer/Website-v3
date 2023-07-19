import Cookies from 'js-cookie';

export const getResetToken=()=>{
   if(Cookies.get('resetPasswordToken')){
    const token = Cookies.get('resetPasswordToken');
     const cleanedToken = token.substring(2);
     return cleanedToken
   }else{
    return 
   }
}