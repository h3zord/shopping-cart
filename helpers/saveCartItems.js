const saveCartItems = (param) => {
  // seu código aqui
    localStorage.setItem('cartItems', param);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
