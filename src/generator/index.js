import fetch from "node-fetch";

function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();
console.log(g.next().value);
console.log(g.next().value);
console.log(g.next().value);

function* iterate(array) {
  for (let value of array) {
    yield value;
  }
}

const it = iterate(["Óscar", "Omar", "Ana", "Lucia", "Juan"]);
console.log(it.next());
console.log(it.next().value);

// Reto

const API = "https://api.escuelajs.co/api/v1";

/*creamos la funcion de fetchData la cual utiliza la APi y retornamos la informacion en un tipo objeto JSON, implementando la logica de async y await, en este ejemplo
usamos una funcion tradicional*/
const fetchData = async (urlApi) => {
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
};

/*creamos la funcion que realiza las solicitudes en este caso usaremos tambien yield y el "*"" al lado de function para identificar un generator
Tambien usamos async y await para hacer el llamado de los productos y demas */
async function* anotherFunction(urlApi) {
  const products = await fetchData(`${urlApi}/products`);
  const product = await fetchData(`${urlApi}/products/${products[0].id}`);
  const category = await fetchData(
    `${urlApi}/categories/${product.category.id}`
  );

  //Se utiliza yield para dar una pausa a la ejecucion y utilizamos .next() para dar inicio a el codigo
  yield console.log(products);
  yield console.log(product.title);
  yield console.log(category.name);
}

const h = anotherFunction(API);
h.next().value;
h.next().value;
h.next().value;
