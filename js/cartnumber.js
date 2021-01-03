function cartNumber() {
    const panier = JSON.parse(localStorage.getItem("panier"));
    let inCart = 0;
    console.log(typeof inCart)
    panier.forEach((result, index) => {
      inCart = inCart + 1
      console.log(inCart)
    })
    localStorage.setItem("inCart", inCart);
    document.getElementById("cart_number").textContent = inCart
  }