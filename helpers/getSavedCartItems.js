const getSavedCartItems = () => {
  // seu código aqui
  const getItensHtml = localStorage.getItem('cartItems');
  return getItensHtml;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
