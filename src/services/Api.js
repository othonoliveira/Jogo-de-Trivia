export const fetchToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await response.json();
  return token;
};

export const fetchAPI = async (amount) => {
  const token = await fetchToken(); // TODO: remover fetchToken e usar localStorage

  const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token}`);
  const { results } = await response.json();
  return results;
};
