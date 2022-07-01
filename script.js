const recoverH3 = document.querySelector('.total-price');
const recoverSectionItems = document.querySelector('#itens-list');
const recoverItens = document.getElementById('itens-list');
const recoverButtonClear = document.querySelector('.empty-cart');
const recoverItensListCar = document.querySelector('#itens-list-car');
let totalPrice = 0;

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

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
};

const createProductsList = async () => {
  const load = document.createElement('span');
  load.innerHTML = 'carregando...';
  load.className = 'loading';
  document.querySelector('.items').appendChild(load);
  const { results } = await fetchProducts('computador');
  const listResult = results.map(({ id, title, thumbnail }) => ({
      sku: id,
      name: title,
      image: thumbnail,      
  }));
  document.querySelector('.loading').remove();
  listResult.forEach((element) => {
    const product = createProductItemElement(element);
    recoverSectionItems.appendChild(product);
  });
};

const refreshCart = () => {
  const itensHtml = recoverItensListCar.innerHTML;
  saveCartItems(JSON.stringify(itensHtml));
};

const sumPrice = (productPrice) => {
  totalPrice += productPrice;
  recoverH3.innerText = totalPrice;
  localStorage.setItem('price', totalPrice.toFixed(2));
  refreshCart();  
};

const subPrice = (ev) => {
  const productPrice = ev.target.innerHTML.split(' PRICE: $', 2)[1];
  totalPrice -= productPrice;
  recoverH3.innerText = totalPrice;
  localStorage.setItem('price', totalPrice.toFixed(2));
};

const cartItemClickListener = (event) => {
  // coloque seu código aqui
  const ev = event;
  if (ev.target.className === 'cart__item') {
    subPrice(ev);
    ev.target.remove();
    refreshCart();
  }
};

const createObj = async (cod) => {
  const { id, title, price } = await fetchItem(cod);
  const obj = { sku: id, name: title, salePrice: price };
  const productPrice = obj.salePrice;
  const product = createCartItemElement(obj);
  recoverItensListCar.appendChild(product);
  sumPrice(productPrice);
};

const recoverId = (event) => {
  const ev = event;
  if (ev.target.className === 'item__add') {
    const id = ev.target.parentElement.firstElementChild.innerText;
    createObj(id);
  }
};

recoverItens.addEventListener('click', recoverId);

const cartItemClickListener2 = () => {
  const recoverItensListCar2 = document.querySelector('.cart__items');
  recoverItensListCar2.addEventListener('click', cartItemClickListener);
};

const clearCart = () => {
  recoverItensListCar.innerHTML = '';
  localStorage.setItem('price', 0);
  totalPrice = 0;
  recoverH3.innerText = totalPrice;
  saveCartItems('');
};

recoverButtonClear.addEventListener('click', clearCart);

const refreshPrice = () => {
  const getPrice = localStorage.getItem('price');
  if (getPrice !== null) {
    recoverH3.innerText = getPrice;
    totalPrice = parseFloat(getPrice);
  } else {
    recoverH3.innerText = 0;
  }
};

const refreshCartItens = () => {
  const getProducts = getSavedCartItems();
  if (getProducts !== '' && getProducts !== null) {
    recoverItensListCar.innerHTML = JSON.parse(getProducts);
  }  
};

window.onload = () => {
  createProductsList();
  refreshPrice();
  refreshCartItens();
  cartItemClickListener2();
};
