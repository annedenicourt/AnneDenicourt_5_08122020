class panierItem {
  constructor (name, imageUrl, price, lenses, quantité) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price/100;
    this.lenses = lenses;
    this.quantité = quantité;
  }   
}

const panier = JSON.parse(localStorage.getItem("panier")) || [];

//Vérification du panier

if (localStorage.getItem("panier")) {
  console.log(panier);
} 

function ajoutCamera() {
    let panierVide = document.getElementById("panier_vide")
    let ajoutPanier = document.getElementById("ajout_panier")

    //si le panier ne contient pas de produit, on affiche que le panier est vide
    if (panier.length > -1) {

        panier.forEach(item => {

            ajoutPanier.innerHTML += 
                `
                <div class="order-product">
                    <img src="${panierItem.imageUrl}" alt="appareil ${panierItem.name}" />
                    <div class="infos-product-order">
                        <h4>${panierItem.name}</h4>
                        <p><span>Prix unitaire :</span> ${panierItem.price}€</p>
                        <p><span>Prix total :</span> <span class="orderTotalPrice">${panierItem.quantité * panierItem.price}</span>€</p>
                        <p><span>Objectif :</span> ${panierItem.lenses}</p>
                        <p><span>Quantité :</span> ${panierItem.quantité}</p> 
                    </div>
                </div>
                `
              })
          } else {
            document.getElementById("vider_panier").style.display= "none";
            panierVide.innerHTML = "<div>Votre panier est vide</div>";

          }
}
ajoutCamera();

function viderPanier() {
    localStorage.clear();
    location.reload();
  }



// FORMULAIRE JQUERY
$(document).ready(function(){


// Validation mail       
      $("#mail").blur(function(){

        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var emailaddressVal = $(this).val();
         
        if(!emailReg.test(emailaddressVal)) {
            $('#erreur_mail').text('Adresse email non valide');
        } else {
            $('#erreur_mail').text('');
        }
        });  

// Validation code postal
      $("#postalcode").keyup(function(){

          let value = jQuery(this).val();
                value = value.replace(/[^0-9]+/g, '');
                jQuery(this).val(value);

          if ($("#postalcode").val().length <5) {
            $("#postalcode").css({
              borderColor: "red",
              color:"red"
            });
            $('#erreur_code').text('Code postal non valide');      
          } else {
            $("#postalcode").css({
              borderColor: "green",
              color:"green"
          });
            $('#erreur_code').text('');
          }
        });

// Contrôle champs formulaire       

        function verifier(champ) {
          if (champ.val().length == 0){
            $("#erreur").css({
                display: "block",
                color: "red"
            });
            $(".erreur_mess").css({
                display: "block",
                color: "red"
            });
          } 
        }

        $("#envoi").click (function(e){
          e.preventDefault();
          verifier ($("#name"));
          verifier ($("#firstname"));
          verifier ($("#adress"));
          verifier ($("#mail"));
          verifier ($("#postalcode"));
          verifier ($("#city"));
        });

        $("#rafraichir").click(function(){
          $(".champ").css({
              borderColor: "#ccc",
              color:"#555"
            }); 
            $("#erreur").css("display", "none");
            $(".erreur_mess").css("display", "none");
            $('#erreur_mail').text('');
            $('#erreur_code').text('');
            
        });

        });