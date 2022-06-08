const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
 
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
  const ev = event;
  console.log(ev.target);
  ev.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const createProductsList = async () => {
  const recoverSectionItems = document.querySelector('#itens-list'); 
  const { results } = await fetchProducts('computador');
  const listResult = results.map(({ id, title, thumbnail }) => ({
      sku: id,
      name: title,
      image: thumbnail,      
  }));
  
  listResult.forEach((element) => {
    const product = createProductItemElement(element);
    recoverSectionItems.appendChild(product);
  });
};

const createObj = async (cod) => {
  recoverSectionItensCar = document.querySelector('#itens-list-car');
  const { id, title, price } = await fetchItem(cod);
  const obj = {
    sku: id,
    name: title,
    salePrice: price,
  };
  const product = createCartItemElement(obj);
  recoverSectionItensCar.appendChild(product);
};

const recoverId = (event) => {
  const ev = event;
  if (ev.target.className === 'item__add') {
    const id = ev.target.parentElement.firstElementChild.innerText;
    createObj(id);
  }
};

const recoverItens = document.getElementById('itens-list');
recoverItens.addEventListener('click', recoverId);

window.onload = () => {
  createProductsList();
};
