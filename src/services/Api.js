const url = 'https://opentdb.com/api_token.php?command=request';

export const getToken = async () => {
  const request = await fetch(url);
  const response = await request.json();
  return response.token;
};

export const fetchAPI = async (amount, settings) => {
  const { category, difficulty, type } = settings;

  const token = localStorage.getItem('token');

  let URL = `https://opentdb.com/api.php?amount=${amount}&token=${token}`;

  if (category) URL += `&category=${category}`;
  if (difficulty) URL += `&difficulty=${difficulty}`;
  if (type) URL += `&type=${type}`;

  const response = await fetch(URL);
  const { results } = await response.json();
  return results;
};

export const fetchCategories = async () => {
  const response = await fetch('https://opentdb.com/api_category.php');
  const { trivia_categories: categories } = await response.json();
  return categories;
};
