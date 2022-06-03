require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  test('Testando se a função fetchProducts é uma função', async () => {
    expect(typeof fetchProducts).toBe('function');
  })

  test('Testando se fetch é chamado ao chamar a função fetchProducts', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  test('Testando se ao chamar a função fetchProducts com o argumento computador o fetch utiliza o endpoint correto', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith(url);
  })

  test('Testando se o retorno da função fetchProducts é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  })

  test('Testando se ao chamar a função fetchProducts sem argumento, ela retorna um erro', async () => {
    const noParam = await fetchProducts();
    expect(noParam).toEqual(new Error('You must provide an url'));
  })
  
});
