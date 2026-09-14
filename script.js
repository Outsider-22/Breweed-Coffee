document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".coffee-card button");

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartButton = document.getElementById("clear-cart");
    const checkoutButton = document.getElementById("checkout");

    let cart = [];
    clearCartButton.addEventListener("click", function() {

    cart = [];

    updateCart();

});

checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) {
        alert("Your cart is empty. Add something first! ☕");
        return;
    }

    alert("Order placed successfully! ☕ Thank you for choosing Brewed.");

});

    buttons.forEach(function(button) {

        button.addEventListener("click", function() {

            const card = button.parentElement;

            const itemName = card.querySelector("h3").textContent;
            const itemPrice = card.querySelector("span").textContent;

            const price = parseFloat(itemPrice.replace("$", ""));

            const existingItem = cart.find(function(item) {
    return item.name === itemName;
});

if (existingItem) {

    existingItem.quantity++;

} else {

    cart.push({
        name: itemName,
        price: price,
        quantity: 1
    });

}


            updateCart();

            button.textContent = "Added ✔️";

            setTimeout(function() {
                button.textContent = "Add to Order";

            }, 1000);

        });

    });

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach(function(item, index) {

        const itemElement = document.createElement("div");

        const itemName = document.createElement("strong");
        itemName.textContent = item.name;

        const itemPrice = document.createElement("span");
        itemPrice.textContent =
            " - $" + (item.price * item.quantity).toFixed(2);

        const minusButton = document.createElement("button");
        minusButton.textContent = "−";

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const plusButton = document.createElement("button");
        plusButton.textContent = "+";

        const removeButton = document.createElement("button");
removeButton.textContent = "🗑️";

removeButton.addEventListener("click", function() {

    cart.splice(index, 1);

    updateCart();

});


        plusButton.addEventListener("click", function() {

            item.quantity++;

            updateCart();

        });


        minusButton.addEventListener("click", function() {

            if (item.quantity > 1) {

                item.quantity--;

            } else {

                cart.splice(index, 1);

            }

            updateCart();

        });


        itemElement.appendChild(itemName);
        itemElement.appendChild(itemPrice);
        itemElement.appendChild(minusButton);
        itemElement.appendChild(quantity);
        itemElement.appendChild(plusButton);
        itemElement.appendChild(removeButton);

        cartItems.appendChild(itemElement);

        total += item.price * item.quantity;

    });


    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    }


    cartTotal.textContent =
        "Total: $" + total.toFixed(2);

}

});
