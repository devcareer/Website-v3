import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ForgetPassword, SignUp, CreateNewPassword, SignIn } from '../../Auth';

const AuthRoot = () => {
  useEffect(() => {
    const currentUrl = window.location.href;
    const cutIndex = currentUrl.indexOf('/api/resetPassword/');
    const extractedUrl = currentUrl.substring(0, cutIndex).replace(/\/$/, '');

    if (cutIndex > -1) {
      const token = currentUrl.substring(cutIndex + 17);

      Cookies.set('resetPasswordToken', token, { expires: 1 / 48 }); // Set the token in a cookie that expires in 30 minutes (1 / 48 of a day)
      window.location.href = extractedUrl;
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
