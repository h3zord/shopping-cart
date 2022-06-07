const fetchProducts = async (query) => {
  // seu código aqui
  try {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const promisse = await fetch(url);
  const data = await promisse.json();
  return data;
 } catch (error) {
  return error;
 }
};



if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
