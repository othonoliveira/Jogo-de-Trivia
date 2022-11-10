const url = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const request = await fetch(url);
  const response = await request.json();
  console.log(response.token);
  return response.token;
};

export default getToken;
