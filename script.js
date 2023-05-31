async function updateContent(url) {
  let response = await fetch(url);
  let data = await response.json();

  console.log(data);
  let productsContainer = document.querySelector(".products_container");
  productsContainer.innerHTML = "";
  data.forEach((product) => {
    let element = document.createElement("product");
    element.innerHTML = `
        <img src="${product.image}" alt="${"food"}">
        <h2>${product.nom}</h2>
        <button>${product.prix}</button>
        `;
    productsContainer.append(element);
  });
}

updateContent("http://localhost:8080/api/products");
