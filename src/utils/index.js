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

export const useAuth = () => {
   const accessToken = Cookies.get('accessToken');
 
   const isAuthenticated = !!accessToken;
 
   return { accessToken, isAuthenticated };
 };