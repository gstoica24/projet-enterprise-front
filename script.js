async function updateContent(url) {
  let response = await fetch(url);
  let data = await response.json();

  console.log(data);
  let productsContainer = document.querySelector(".products_container");
  productsContainer.innerHTML = "";
  data.forEach((product, index) => {
    let element = document.createElement("article");
    element.classList.add("card");
    if (index % 4 == 0) {
      element.classList.add("card_large");
    } else if (index % 4 == 1) {
      element.classList.add("card_small");
    } else if (index % 4 == 2) {
      element.classList.add("card_small");
      element.style.order = "4";
    } else if (index % 4 == 3) {
      element.classList.add("card_large");
      element.style.order = "3";
    }

    let image = document.createElement("img");
    image.src = `${product.image}`;
    image.alt = `${product.nom}`;
    image.classList.add("imageProduct");

    let priceButton = document.createElement("button");
    priceButton.innerText = `${product.prix} €`;
    priceButton.classList.add("buttonProduct");
    let p = document.createElement("p");
    p.textContent = `${product.descripcion}`;

    image.onclick = function () {
      // let articles = document.querySelectorAll("article");
      // articles.forEach(function (a) {
      //   a.classList.remove("expandProduct");
      // });
      selectProduct(element);
    };

    function selectProduct(element) {
      element.classList.toggle("expandProduct");
      productsContainer.classList.toggle("changeOnClick");
      element.classList.toggle("card_small");
      element.classList.toggle("card_large");
      image.classList.toggle("expandImage");
    }

    element.append(
      image,
      document.createTextNode(`${product.nom}`),
      priceButton,
      p
    );
    productsContainer.append(element);

    priceButton.addEventListener("click", async function () {
      let productId = product.id;

      consume("http://localhost:8080/api/products/consume?id=" + productId);
    });
  });
}

async function consume(url) {
  let response = await fetch(url);
  let data = await response.json();

  console.log(data);
}

updateContent("http://localhost:8080/api/products");
