/// <reference path="jquery-3.6.0.js" />

//first api call
$(function () { // Document Ready
  $.ajax({
    url: "https://fakestoreapi.com/products",
    success: products => insertProductsToArray(products),
    error: err => alert("Error: " + err.status)
  });

  //insert first to an array
  let productsArr = [];
  function insertProductsToArray(products) {
    for (let i = 0; i < products.length; i++) {
      const proVal = {
        id: products[i].id,
        image: products[i].image,
        title: products[i].title,
        price: products[i].price,
      }
      productsArr.push(proVal);
      displayShoppingCart(proVal);

    }
    localStorage.setItem("productsArr", JSON.stringify(productsArr))

  }

  //displaying products to html
  function displayShoppingCart(product) {
    const content = `<div class="card" >
            <img class="card-img-top" src=${product.image} alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p>price: ${product.price}$</p>
              <input class="quantity" type="number" placeholder="0" min="1">
              <button class="addProduct"  id="${product.id}" name="${product.title}">add</button>
            
          
          </div>`;
    $("#displayStore").append(content);
  }

  //adding products to cost
  let productsToCartArr = [];
  let finalPay = 0;
  $("#displayStore").on("click", ".card-body > .addProduct", function () {
    let count = $(this).siblings("input").val();
    let productName = $(this).attr("name");
    let cost = productsArr[this.id - 1].price;
    let totalCost = cost * count;
    finalPay += totalCost;
    let itemsToArr = {
      count: count,
      productName: productName,
      totalCost: totalCost
    }
    productsToCartArr.push(itemsToArr);
    displayCart(itemsToArr);
   
  })
  function displayCart(product){
    $("#content").append(`<hr><p> <h6>${product.productName} </h6> Count-${product.count} <br>
    Total price- ${product.totalCost}$ <br>
    <button class="removeBtn" id="${this.id}">remove</button> </hr></p>`)

  }

  //final cost
  $("#paybtn").on("click", function () {
    $("#cartDiv").html(`<h4>Payment</h4>
    Total cost: `+ finalPay);

  })

  //
  $("#cartDiv").on("click", ".removeBtn", function () {
    productsToCartArr.pop(this.id);
    $("#content").html("");
    for(let i=0; i<productsToCartArr.length; i++){
    displayCart(productsToCartArr[i])
    }
    
    
  

  })



});
