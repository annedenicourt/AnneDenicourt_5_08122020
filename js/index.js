function renderItem(item) {
  const {
    name,
    price,
    lenses,
    _id,
    description,
    imageUrl
  } = item;
  return `
    <div class="container col-md-6 col-lg-4">
               <div class="product-list mt-4 card ">
                  <img class=”card-img-top product-illu” src="${imageUrl}"  alt="appareil ${name}">
                  <div class="card-body">
                     <h3 class="card-title">${name}</h3>
                     <span>${price/100}€</span></p>
                     <p class="card-text product-description">${description}</p>
                  </div>
                  <button id="bouton" type="button" class="btn" onclick="window.location.href = 'produit.html?id=${_id}';">Voir le produit</button>
               </div>
               </div>

  `
}

function addContent() {
  fetch(`${"https://oc-p5-api.herokuapp.com/api/cameras"}`).then(response => response.json()).then(data => {
    $.each(data, function () {
      console.log(this)
      document.getElementById("produits").innerHTML += renderItem(this);
    })
  })
}

$(document).ready(() => {
  addContent();
})