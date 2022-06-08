require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  test('Testando se fetchItem é uma função', async () => {
    expect(typeof fetchItem).toBe('function');
  });

  test('Testando se a chamando a função fetchItem a função fetch é executada', async () => {
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });

  test('Testando se ao chamar a função fetchItem com determinado argumento, retorna o endpoint correto', async () => {
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem("MLB1615760527");
    expect(fetch).toBeCalledWith(url);
  });

  test('Testando se ao chamar a função fetchItem com determinado argumento, seu retorno e igual do objeto item', async () => {
    const result = await fetchItem("MLB1615760527");
    expect(result).toEqual(item);
});

  test('Testando se ao chamar a função fetchItem sem argumento a função retorna um erro', async () => {
    const result = await fetchItem();
    expect(result).toEqual(new Error('You must provide an url'));
});
});
