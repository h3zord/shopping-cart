const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  test('Testando se ao chamar a função getSavedCartItems o localstorage é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled()
  })

  test('Testando se ao executar a função getSavedCartItems, o localstorage é chamado com determinado parâmentro', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalledWith('cartItems')
  })
});
