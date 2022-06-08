const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  test('Testando se ao chamar a função saveCartItems com determinado argumento o localstorage é chamado', () => {
    const param = '<ol><li>Item</li></ol>'
    saveCartItems(param);
    expect(localStorage.setItem).toBeCalled();
  })

  test('Testando se a função saveCartItems executada com determinado argumento, o localstorage é chamado com dois parâmetros', () => {
    const param = '<ol><li>Item</li></ol>'
    saveCartItems(param);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', param);
  })
});
