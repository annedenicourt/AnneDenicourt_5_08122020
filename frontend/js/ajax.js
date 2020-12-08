fetch("https://oc-p5-api.herokuapp.com/api/cameras")
.then(response => response.json())
.then(json=> console.log(json))
