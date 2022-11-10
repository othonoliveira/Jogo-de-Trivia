const url = 'https://opentdb.com/api_token.php?command=request';

export const getToken = async () => {
  const request = await fetch(url);
  const response = await request.json();
  return response.token;
};

export const fetchAPI = async (amount) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token}`);
  const { results } = await response.json();
  return results;
};
