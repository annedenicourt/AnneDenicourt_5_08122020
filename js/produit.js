// PRODUITS
let camera; //Declaration de variable

//Appel URL + API
let id = new URL(window.location).searchParams.get("id");
fetch(`${"https://oc-p5-api.herokuapp.com/api/cameras"}/${id}`) //Rappel notre api + l'id de notre produit
  .then(async (result_) => {
    //Récupère le tableau json
    const result = await result_.json(); //Donne un nom au tableau json récupéré
    camera = result; //Result deviens camera
    //Appel de nos functions
    ajoutLenses();
    ajoutHTML();
  });

//ajout lentilles pour chaque item renseignée dans l'API
function ajoutLenses() {
  for (let i = 0; i < camera.lenses.length; i++) {
    document.getElementById(
      "lense_select"
    ).innerHTML += `<option value="${camera.lenses[i]}">${camera.lenses[i]}</option>`;
  }
}

// Présentation produit HTML
function ajoutHTML() {
  document.querySelector("#focus_produit").innerHTML += `
    <div class="affichage_produit">
      <img class=”image_produit” src="${camera.imageUrl}"  alt="appareil ${
    camera.name
  }">
      <h3 class="ml-4 mt-4">${camera.name}</h3>
      <p class="description_produit ml-4 mr-2">${camera.description}</p>
      <label for="quantite_choisie" class="ml-4">Quantité : </label>
      <input step="number" placeholder="quantité" id="quantite_choisie" class="nbr" type="number" min="1" max="99" value="1"></input>
      <p class="prix_produit mt-4 ml-4"><span>Prix : ${camera.price / 100}€</span></p>
    </div>
  `;
}

/*function prixQuantite() {
  let $cameraPrice = document.querySelector(".prix_produit");
  let quantite = document.querySelector("#quantite_choisie").value;
  $cameraPrice.innerHTML = `${(camera.price / 100) * quantite} €`;
}*/

//Ajout produit au panier
function ajoutPanier() {
  let lentilles = document.querySelector("select").value; //Récupère la valeur de l'objectif choisi
  const quantite = document.getElementById("quantite_choisie").value; //Récupère la valeur de la quantité
  let panier = window.localStorage.getItem("panier"); //Créer notre stockage de panier
  if (lentilles == "") {
    swal("Oups!", "Vous devez choisir un objectif", "warning");
  } else if (!panier) {
    panier = {
      products: [],
    };
  } else {
    panier = JSON.parse(panier); //On extrait notre json
  }
  panier.products.push({
    name: camera.name,
    _id: camera._id,
    quantite: quantite,
    price: camera.price / 100,
    totalPrice: (camera.price / 100) * quantite,
    imageUrl: camera.imageUrl,
    lenses: lense_select.value,
  });
  window.localStorage.setItem("panier", JSON.stringify(panier));
  console.log("Le produit a été ajouté au panier");
  swal("Super !", "L'article a été ajouté au panier", "success");
}
