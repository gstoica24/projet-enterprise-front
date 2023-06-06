async function updateContent(url) {
  let response = await fetch(url);
  let data = await response.json();

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
    p.classList.add("description");

    if (product.quantite == 0) {
      priceButton.disabled = true;
      priceButton.style.backgroundColor = "red";
      image.style.opacity = "0.5";
    }

    let elements = document.querySelectorAll("article");

    function adjustProducts(element) {
      let nextElement = element.nextElementSibling;
      while (nextElement) {
        nextElement.classList.toggle("shiftDown");
        nextElement = nextElement.nextElementSibling;
      }
    }

    elements.forEach((element) => {
      const image = element.querySelector(".imageProduct");

      image.addEventListener("click", function (event) {
        const currentArticle = event.target.closest("article");
        const isExpanded = currentArticle.classList.contains("expandProduct");

        if (isExpanded) {
          currentArticle.classList.remove("expandProduct");
        } else {
          currentArticle.classList.add("expandProduct");
        }

        adjustProducts(currentArticle);
      });
    });

    element.append(
      image,
      document.createTextNode(`${product.nom}`),
      priceButton,
      p
    );
    productsContainer.append(element);

    priceButton.addEventListener("click", async function () {
      let productId = product.id;
      let quantity = await consume(
        "http://localhost:8080/api/products/consume?id=" + productId
      );

      if (quantity == "0") {
        priceButton.disabled = true;
        priceButton.style.backgroundColor = "red";
        image.style.opacity = "0.5";
      }
    });
  });
}

async function consume(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data.quantite;
}

updateContent("http://localhost:8080/api/products");
