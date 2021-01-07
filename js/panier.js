const panier = JSON.parse(localStorage.getItem("panier"));

//Condition pour afficher le panier
if (panier) {
  ligneTableau();
} else {
  tableauVide();
}
//Boucle pour importer données de chaque article panier
function ligneTableau() {
  article = panier;
  article.forEach((result, index) => {
    infosHTML(result, index);
  });
  totalPanier();
  cartNumber();
}
//Ajout html pour chaque produit importé dans le panier
function infosHTML(result, index) {
  document.getElementById("ajout_panier").innerHTML += `
    <tbody id="products-tablebody">
    <tr id="ligne_tableau${index}">
    <td class="text-center"><img src="${result.image}"  alt="appareil ${
    result.name
  }"> <br/> ${result.name} <br/> Objectif : ${result.lenses}</td>
    <td class="text-center">
    <i onclick="quantiteMoins(${index})" id="bouton_moins" class="fas fa-caret-square-left"></i>
    <span id="quantite_nombre${index}" class="quantite_produit">${
    result.quantite
  }</span>
    <i onclick="quantitePlus(${index})" id="bouton_plus${index}" class="fas fa-caret-square-right"></i>
    </td>
    <td id="prix_unite${index}" class="text-center">${result.price + " €"}</td>
    <td id="sous_total${index}"class="subtotal text-center">${
    result.subTotal + " €"
  }</td>
    <td class="text-center"><i id="supp_produit" onclick="annulerArticle()" type="button" class="fas fa-trash-alt" title="Supprimer le produit du panier"></i>
    </td>
    </tr>
    </tbody>`;
}
//calcul et affichage du prix total panier
function totalPanier() {
  let total = 0;
  panier.forEach((result, index) => {
    total = total + panier[index].price * panier[index].quantite;
    console.log(total);
  });
  document.getElementById("prix_total").textContent = total + " €";
  localStorage.setItem("totalPanier", total);
}
//pour afficher le nombre de produits panier dans le menu nav
function cartNumber() {
  let inCart = 0;
  panier.forEach((result, index) => {
    inCart = inCart + 1;
  });
  localStorage.setItem("inCart", inCart);
  document.getElementById("cart_number").textContent = inCart;
}
//pour faire disparaitre le bouton, le panier, le formulaire lorsque le panier est vide
function tableauVide() {
  document.getElementById(
    "panier_vide"
  ).innerHTML += `
    <div class="container col-10 text-center border shadow bg-white rounded p-4 ">
      <h3 class="mb-4">Votre panier est vide</h3>
      <i class="fas fa-shopping-cart fa-1x"></i>
    </div>`
  ;
  document.getElementById("tableau_panier").style.display = "none";
  document.getElementById("vider_panier").style.display = "none";
  document.getElementById("formulaire").style.display = "none";
  document.getElementById("valid_commande").style.display = "none";
}
//pour vider le panier et le localStorage
function viderPanier() {
  localStorage.clear();
  location.reload();
}
// pour retirer article du panier
function annulerArticle(i) {
  panier.splice(i, 1);
  localStorage.clear();
  // Mise à jour du nouveau panier après suppression de l'article
  localStorage.setItem("panier", JSON.stringify(panier));
  //Mise à jour de la page pour affichage de la suppression au client
  window.location.reload();
}
//pour ajouter quantite dans le panier
function quantitePlus(index) {
  let quantite = document.getElementById(`quantite_nombre${index}`);
  let ajoutQuantite = ++panier[index].quantite;
  quantite.textContent = ajoutQuantite;
  let sousTotal = document.getElementById(`sous_total${index}`);
  let ajoutTotal = panier[index].price * panier[index].quantite;
  sousTotal.textContent = `${ajoutTotal} €`;
  localStorage.setItem("panier", JSON.stringify(panier));
  totalPanier();
  if (ajoutQuantite > 1) {
    document.getElementById("bouton_moins").style.display = "inline";
  }
}
//pour retirer quantite dans le panier
function quantiteMoins(index) {
  let quantite = document.getElementById(`quantite_nombre${index}`);
  let retraitQuantite = --panier[index].quantite;
  quantite.textContent = retraitQuantite;
  let sousTotal = document.getElementById(`sous_total${index}`);
  let ajoutTotal = panier[index].price * panier[index].quantite;
  sousTotal.textContent = `${ajoutTotal} €`;
  localStorage.setItem("panier", JSON.stringify(panier));
  totalPanier();
  if (retraitQuantite <= 1) {
    document.getElementById("bouton_moins").style.display = "none";
  }
}

// FORMULAIRE + REQUETE POST

//Evenement pour vérifier le champ mail
document.querySelector("#mail").addEventListener("blur", () => {
  const mail = document.querySelector("#mail").value;
  const regexEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; //Utilisation de regex
  if (!regexEmail.test(mail)) {
    document.querySelector("#erreur_mail").textContent =
      "Adresse email non valide";
  }
});

//Evenement pour vérifier le champ postalcode
document.querySelector("#postalcode").addEventListener("blur", () => {
  const postalCode = document.querySelector("#postalcode").value;
  const regexEmail = /[0-9]{5}/; //Utilisation de regex
  if (!regexEmail.test(postalCode)) {
    document.querySelector("#erreur_code").textContent =
      "Code postal non valide. 5 chiffres obligatoires";
  }
});

//Evenement pour effacer le formulaire
document.querySelector("#rafraichir").addEventListener("click", () => {
  document.querySelector("#erreur_mail").textContent = "";
  document.querySelector("#erreur_code").textContent = "";
});

//Evenement pour valider le formulaire et envoyer la requete POST
document.querySelector("#formulaire").addEventListener("submit", (event) => {
  event.preventDefault();
  let input = document.getElementsByTagName("input");

  for (let i = 0; i < input.length; i++) { //boucle pour vérifier si chaque champ a été renseigné
    if (input[i].value == "") { //si un des champs est vide, envoi message erreur 
      swal("Oups!","Formulaire non valide ! Merci de renseigner correctement le formulaire","warning")
      return false;
    }
  }
  requestPost()
  confirmCommand()
  localStorage.clear()
  totalPanier()
});

//pour créer la requete POST avec numero commande et infos contact
function requestPost() {
  const idTableau = panier.map(function (product) {return product.id;});
  let order = {
    contact: {
      firstName: document.querySelector("#firstname").value.trim(),
      lastName: document.querySelector("#name").value.trim(),
      address: document.querySelector("#adress").value.trim(),
      city: document.querySelector("#city").value.trim(),
      email: document.querySelector("#mail").value.trim(),
    },
    products: idTableau,
  };
  console.log(order);

  const request = new Request(
    "https://oc-p5-api.herokuapp.com/api/cameras/order",
    {
      method: "POST",
      body: JSON.stringify(order),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    }
  );

  fetch(request)
    .then((response) => response.json())
    .then((response) => {
      let numCommand = response.orderId;
      localStorage.setItem("idCommand", JSON.stringify(numCommand));
    });
}

// CONFIRMATION DE COMMANDE
function confirmCommand() {
  swal("Votre commande a bien été validée, vous allez être redirigé", "", "success");
  setTimeout(function() {window.location = 'confirmation.html'; }, 3000);
}


