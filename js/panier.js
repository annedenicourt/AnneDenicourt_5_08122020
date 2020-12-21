//Declaration variables
let panier = localStorage.getItem("panier");
let products;
let infosProduit;

function ligneTableau() {
  for (let i = 0; i < products.length; i++) {
    infosProduit = products[i]; //Récupère les infos pour chaque élément du panier
  }
}

function infosHTML() {
  //On ajoute du html pour chaque produit importé dans le panier
  document.getElementById("ajout_panier").innerHTML += `
    <tbody id="products-tablebody">
    <tr id="ligne_tableau">
    <td class="text-center"><img src="${infosProduit.imageUrl}"  alt="appareil ${
      infosProduit.name}"> <br/>${infosProduit.name} <br/> Objectif : ${infosProduit.lenses
  } </td>
    <td class="text-center">
    <button type="button" onclick="quantiteMoins()" id="bouton_moins" class="btn btn-secondary btn-sm">-</button>
    <span id="quantite_nombre" class="quantite_produit">${
      infosProduit.quantite
    }</span>
    <button type="button" onclick="quantitePlus()" id="bouton_plus" class="btn btn-secondary btn-sm">+</button>
    </td>
    <td id="prix_unite" class="text-center">${infosProduit.price + " €"}</td>
    <td class="text-center"><i id="supp_produit" onclick="annulerArticle()" type="button" class="fas fa-trash-alt" title="Supprimer le produit du panier"></i>
    </td>
    </tr>
    
    </tbody>`;
}

function sousTotal() {
  let sousTotal = document.getElementById("prix_total")
  let totalPrice = infosProduit.totalPrice + "€"
  sousTotal.innerhtml += totalPrice
}

function tableauVide() {
  //on efface le bouton, le panier, le formulaire lorsque le panier est vide
  document.getElementById(
    "panier_vide"
).innerHTML += `<p>Votre panier est vide <br/> <i class="fas fa-shopping-cart fa-1x"></i
></p>`;
  document.getElementById("tableau_panier").style.display = "none";
  document.getElementById("vider_panier").style.display = "none";
  document.getElementById("formulaire").style.display = "none";
}

function quantiteMoins() {
  let quantiteNombre = document.getElementById("quantite_nombre");
  let retraitQuantite = --infosProduit.quantite;
  quantiteNombre.textContent = retraitQuantite;
  let sousTotal = document.getElementById("prix_total");
  let ajoutTotal = infosProduit.price * infosProduit.quantite;
  sousTotal.textContent = `${ajoutTotal} €`;
  if (retraitQuantite <= 1) {
    document.getElementById("bouton_moins").style.display = "none"
  } 
}

function quantitePlus() {
  let quantiteNombre = document.getElementById("quantite_nombre");
  let ajoutQuantite = ++infosProduit.quantite;
  quantiteNombre.textContent = ajoutQuantite;
  let sousTotal = document.getElementById("prix_total");
  let ajoutTotal = infosProduit.price * infosProduit.quantite;
  sousTotal.textContent = `${ajoutTotal} €`;
  if (ajoutQuantite >1) {
    document.getElementById("bouton_moins").style.display = "inline"
  } 
}

function annulerArticle (i) {
  products.splice(i, 1);
   localStorage.clear();
   // Mise à jour du nouveau panier avec suppression de l'article
   localStorage.setItem("panier", JSON.stringify(panier));
   //Mise à jour de la page pour affichage de la suppression au client
   window.location.reload();
 };

//Conditions pour afficher et utiliser notre panier
if (!panier) {
  //On vérifie si le panier existe
  //Si non
  panier = {
    products: [], //Créé un tableau vide
  };
  if (panier.products.length <= 0 || localStorage.order) {
    tableauVide();
  }
} else {
  //si oui
  //On extrait notre json
  panier = JSON.parse(panier);
  products = panier.products; //Un tableau avec un index = une ligne/items
  //Condition pour afficher notre panier
  if (
    products.length >= 1 &&
    (localStorage.order == undefined || localStorage.order)
  ) {
    ligneTableau();
    products.forEach((result) => {
      //Boucle pour incrémenter le tableau
      infosProduit = result;
      infosHTML();
      sousTotal();
    });
  } else if (products.length >= 1 && localStorage.order) {
    tableauVide();
  }
}

function viderPanier() {
  localStorage.clear();
  location.reload();
}

// FORMULAIRE JQUERY
$(document).ready(function () {
  // Validation mail
  $("#mail").blur(function () {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var emailaddressVal = $(this).val();

    if (!emailReg.test(emailaddressVal)) {
      $("#erreur_mail").text("Adresse email non valide");
    } else {
      $("#erreur_mail").text("");
    }
  });

  // Validation code postal
  $("#postalcode").keyup(function () {
    let value = jQuery(this).val();
    value = value.replace(/[^0-9]+/g, "");
    jQuery(this).val(value);

    if ($("#postalcode").val().length < 5) {
      $("#postalcode").css({
        borderColor: "red",
        color: "red",
      });
      $("#erreur_code").text("Code postal non valide");
    } else {
      $("#postalcode").css({
        borderColor: "green",
        color: "green",
      });
      $("#erreur_code").text("");
    }
  });

  // Contrôle champs formulaire
  function verifier(champ) {
    if (champ.val() == 0) {
      $("#erreur").css({
        display: "block",
        color: "red",
      });
      $(".erreur_mess").css({
        display: "block",
        color: "red",
      });
    }
  }

  $("#envoi").click(function (e) {
    e.preventDefault();
    verifier($("#name"));
    verifier($("#firstname"));
    verifier($("#adress"));
    verifier($("#mail"));
    verifier($("#postalcode"));
    verifier($("#city"));
  });

  $("#rafraichir").click(function () {
    $(".champ").css({
      borderColor: "#ccc",
      color: "#555",
    });
    $("#erreur").css("display", "none");
    $(".erreur_mess").css("display", "none");
    $("#erreur_mail").text("");
    $("#erreur_code").text("");
  });
});
