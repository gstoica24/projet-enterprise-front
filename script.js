// let currentExpandedProduct = null;

// function expandProduct(element) {
//   if (currentExpandedProduct) {
//     currentExpandedProduct.classList.remove("expandProduct");
//     currentExpandedProduct.classList.add("card_small");
//     currentExpandedProduct.classList.remove("card_large");
//   }

//   element.classList.add("expandProduct");
//   element.classList.remove("card_small");
//   element.classList.add("card_large");
//   currentExpandedProduct = element;
// }

// function adjustProducts() {
//   const articles = document.querySelectorAll("article");

//   articles.forEach((article) => {
//     if (article !== currentExpandedProduct) {
//       article.classList.remove("expandProduct");
//       article.classList.add("card_small");
//       article.classList.remove("card_large");
//     }
//   });
// }

async function updateContent(url) {
  let response = await fetch(url);
  let data = await response.json();

  console.log(data);
  let productsContainer = document.querySelector(".products_container");
  productsContainer.innerHTML = "";
  data.forEach((product, index) => {
    let element = document.createElement("article");
    element.classList.add("card");
    element.classList.add("card_small");

    if (index % 4 == 0 || index % 4 == 4) {
      element.classList.add("card_large");
    } else if (index % 4 == 2 || index % 4 == 3) {
      element.classList.add("card_small");
    }

    let image = document.createElement("img");
    image.src = product.image;
    image.alt = product.nom;
    image.classList.add("imageProduct");

    let priceButton = document.createElement("button");
    priceButton.innerText = `${product.prix} €`;
    priceButton.classList.add("buttonProduct");

    let p = document.createElement("p");
    p.textContent = product.descripcion;
    p.classList.add("description");

    if (product.quantite === 0) {
      priceButton.disabled = true;
      priceButton.style.backgroundColor = "red";
      image.style.opacity = "0.5";
    }

    element.append(image, document.createTextNode(product.nom), priceButton, p);
    productsContainer.append(element);

    // image.addEventListener("click", function () {
    //   const isExpanded = element.classList.contains("expandProduct");

    //   if (isExpanded) {
    //     element.classList.remove("expandProduct");
    //     element.classList.add("card_small");
    //     element.classList.remove("card_large");
    //     currentExpandedProduct = null;
    //   } else {
    //     expandProduct(element);
    //   }

    //   adjustProducts();
    // });

    image.addEventListener("click", function (event) {
      // Get <article> that's been clicked
      let clickedArticle = event.target.parentElement;

      // Before toggling, get all articles
      let allArticles = document.querySelectorAll("article");
      // and if it's not the one we clicked, remove the expand
      allArticles.forEach(function (article) {
        if (article != clickedArticle) {
          article.classList.remove("expandProduct");
        }
      });

      // Then, expand or un-expand product that has been clicked
      clickedArticle.classList.toggle("expandProduct");
    });

    priceButton.addEventListener("click", async function () {
      let productId = product.id;
      let quantity = await consume(
        `http://localhost:8080/api/products/consume?id=${productId}`
      );

      if (quantity === "0") {
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
  console.log(data);
  return data.quantite;
}

updateContent("http://localhost:8080/api/products");
