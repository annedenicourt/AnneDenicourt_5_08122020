// Contrôle du courriel en fin de saisie
document.getElementById("mail").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    let mail = document.getElementById("mail");
    let erreurMail = document.getElementById("erreur_mail");
    let regexMail = /.+@.+\..+/;
    let validiteMail = "";
    if (!regexMail.test(e.target.value)) {
        validiteMail = "Adresse mail invalide";
        mail.style.color = "red";
        erreurMail.style.color = "red";
        erreurMail.style.fontSize = "12px";
    }
    document.getElementById("erreur_mail").textContent = validiteMail;

});


// Contrôle du code postal pendant la saisie
document.getElementById("postalcode").addEventListener("input", function (e) {
    // Correspond à une chaîne de nombre
    let postalCode = document.getElementById("postalcode");
    let erreurCode = document.getElementById("erreur_code");
    let regexPostal = /[0-9]/;
    let validitePostal = "";
    if (!regexPostal.test(e.target.value)) {
        validitePostal = "Code postal invalide. Saisir uniquement des chiffres";
        postalCode.style.color = "red";
        erreurCode.style.color = "red";
        erreurCode.style.fontSize = "12px";
    } 
    document.getElementById("erreur_code").textContent = validitePostal;    
});



// Contrôle champs formulaire JQUERY
$(document).ready(function(){

        function verifier(champ) {
          if (champ.val() == 0){
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
            
        });

        });

