const signUpApi = async (data) => {
  const response = await fetch(
    'https://website-v3-znmt.onrender.com/api/v1/auth/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  const responseData = await response.json();
  return responseData;
};

export default signUpApi;
