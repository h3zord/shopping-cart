const fetchItem = async (id) => {
  // seu código aqui
  try {
    const url = `https://api.mercadolibre.com/items/${id}`;
    const promisse = await fetch(url);
    const data = await promisse.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
