//Declaration variables
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
    infosHTML(result,index);
  });
  totalPanier()
  cartNumber()
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
    <span id="quantite_nombre${index}" class="quantite_produit">${result.quantite}</span>
    <i onclick="quantitePlus(${index})" id="bouton_plus${index}" class="fas fa-caret-square-right"></i>
    </td>
    <td id="prix_unite${index}" class="text-center">${result.price + " €"}</td>
    <td id="sous_total${index}"class="subtotal text-center">${result.subTotal + " €"}</td>
    <td class="text-center"><i id="supp_produit" onclick="annulerArticle()" type="button" class="fas fa-trash-alt" title="Supprimer le produit du panier"></i>
    </td>
    </tr>
    </tbody>`;
}

function totalPanier() {
  let total = 0;
  panier.forEach((result, index) => {
    total = total + (panier[index].price * panier[index].quantite)
    console.log(total)
  }) 
  document.getElementById("prix_total").textContent = total +" €"
  localStorage.setItem("totalPanier", total);
}

//pour faire disparaitre le bouton, le panier, le formulaire lorsque le panier est vide
function tableauVide() {
  document.getElementById(
    "panier_vide"
  ).innerHTML += `<p>Votre panier est vide <br/> <i class="fas fa-shopping-cart fa-1x"></i
></p>`;
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

// Mise à jour du nouveau panier après suppression de l'article
function annulerArticle(i) {
  panier.splice(i, 1);
  localStorage.clear();
  // Mise à jour du nouveau panier avec suppression de l'article
  localStorage.setItem("panier", JSON.stringify(panier));
  //Mise à jour de la page pour affichage de la suppression au client
  window.location.reload();
}

function quantitePlus(index) {
  let quantite = document.getElementById(`quantite_nombre${index}`);
  let ajoutQuantite = ++panier[index].quantite;
  quantite.textContent = ajoutQuantite;
  let sousTotal = document.getElementById(`sous_total${index}`);
  let ajoutTotal = panier[index].price * panier[index].quantite;
  sousTotal.textContent = `${ajoutTotal} €`;
  localStorage.setItem("panier", JSON.stringify(panier));
  totalPanier()
  if (ajoutQuantite > 1) {
    document.getElementById("bouton_moins").style.display = "inline"
  } 
}

function quantiteMoins(index) {
  let quantite = document.getElementById(`quantite_nombre${index}`);
  let retraitQuantite = --panier[index].quantite;
  quantite.textContent = retraitQuantite;
  let sousTotal = document.getElementById(`sous_total${index}`);
  let ajoutTotal = panier[index].price * panier[index].quantite;
  sousTotal.textContent = `${ajoutTotal} €`;
  localStorage.setItem("panier", JSON.stringify(panier));
  totalPanier()
  if (retraitQuantite <= 1) {
    document.getElementById("bouton_moins").style.display = "none"
  } 
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
