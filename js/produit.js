//création HTML pour chaque item renseignée dans l'API
function ajoutHTML(item) {
  const { name, price, lenses, _id, description, imageUrl } = item;
  return `
    <div class="product-list">
      <img class=” product-illu” src="${imageUrl}"  alt="appareil ${name}">

      <h3 class="ml-4 mt-4">${name}</h3>
      <p><span class="ml-4">${price/100}€</span></p>
      <p class="product-description ml-4">${description}</p>
      <div class="product-quantity ml-4">
        <label for="quantity-wanted">Quantité :</label>
        <input step="number" placeholder="quantité" id="quantite_choisie" class="nbr" type="number" min="1" max="99" value="1"></input>
      </div>

    </div>

  `
}

//ajout lentilles pour chaque item renseignée dans l'API
function ajoutLenses(lenses) {
  for (let i = 0; i < lenses.length; i++) {
    document.getElementById("camera-lenses").innerHTML += `<option value="${lenses[i]}">${lenses[i]}</option>`
  }
}

//ajout contenu pour chaque id sélectionnée
function ajoutContent() {
  let id = new URL(window.location).searchParams.get('id')
  fetch(`${"https://oc-p5-api.herokuapp.com/api/cameras"}/${id}`).then(response => response.json()).then(data => {
    document.getElementById("focus_produit").innerHTML += ajoutHTML(data);
    ajoutLenses(data.lenses)
  })
}

$(document).ready(() => {
  ajoutContent();
})

//Ajout produits dans panier
class panierItem {
  constructor (name, imageUrl, price, lenses, quantité) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price/100;
    this.lenses = lenses;
    this.quantité = quantité;
  }   
}

const panier = JSON.parse(localStorage.getItem('panier')) || [];
const ajoutPanier = document.getElementById("bouton")

ajoutPanier.addEventListener("click", function(e){
  let lentilles = document.querySelector('select').value;

  if (lentilles == "") {
    alert ("Veuillez sélectionner un objectif")
  } else {
    panier.push(panierItem);
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log("Le produit a été ajouté au panier");
    alert ("L'article a été ajouté au panier")
  }
})