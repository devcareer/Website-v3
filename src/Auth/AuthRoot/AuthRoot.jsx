import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CreateNewPassword, ForgetPassword, SignIn, SignUp } from '../../Auth';

const AuthRoot = () => {
  // useEffect(() => {
  //   const currentUrl = window.location.href;
  //   const cutIndex = currentUrl.indexOf('/api/resetPassword/');
  //   const extractedUrl = currentUrl.substring(0, cutIndex).replace(/\/$/, '');

  //   if (cutIndex > -1) {
  //     const token = currentUrl.substring(cutIndex + 17);

  //     Cookies.set('resetPasswordToken', token, { expires: 1 / 48 }); // Set the token in a cookie that expires in 30 minutes (1 / 48 of a day)
  //     window.location.href = extractedUrl;
  //   }
  // }, []);

  useEffect(() => {
    const currentUrl = window.location.href;

    // Check for '/api/resetPassword/' in the URL
    const cutIndex = currentUrl.indexOf('/api/resetPassword/');
    const extractedUrl = currentUrl.substring(0, cutIndex).replace(/\/$/, '');

    if (cutIndex > -1) {
      // If '/api/resetPassword/' is found, extract the token part
      const token = currentUrl.substring(cutIndex + 17);

      // Set the token in a cookie that expires in 30 minutes (1 / 48 of a day)
      Cookies.set('resetPasswordToken', token, { expires: 1 / 48 });

      // Redirect to the URL without '/api/resetPassword/'
      window.location.href = extractedUrl;
    }

    // Check for '/verified' in the URL
    const verifiedIndex = currentUrl.indexOf('/verified');

    if (verifiedIndex > -1) {
      

      // Save the 'verified' part to cookies storage
      Cookies.set('verified', true);

      // Redirect to the URL without '/verified'
      const updatedUrl = currentUrl.replace('/verified', '');
      window.location.href = updatedUrl;
    }
  }, []);

  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  if (mode === 'forgetpassword') return <ForgetPassword />;
  if (mode === 'signup') return <SignUp />;
  if (mode === 'signin') return <SignIn />;
  if (mode === 'createnewpassword') return <CreateNewPassword />;
};

export default AuthRoot;

// to get token Cookies.get('resetPasswordToken')
