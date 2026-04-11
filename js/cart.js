const addButtons = document.querySelectorAll(".add-btn");
const miniCart = document.getElementById("miniCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const orderBtn = document.getElementById("orderBtn");
const navCartCount = document.getElementById("cart-count");
const navCart = document.querySelector(".nav-cart");
const currentYear = document.getElementById("year");

let cart = [];

function scrollToMiniCart() {
  if (!miniCart) return;

  miniCart.classList.remove("hidden");
  miniCart.classList.add("show");

  miniCart.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

if (navCart) {
  navCart.addEventListener("click", scrollToMiniCart);
}

addButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const card = this.closest(".product-card");

    const name = this.dataset.name;
    const price = parseInt(this.dataset.price);

    const length =
      card.querySelector(".pill-options button.active")?.innerText ||
      "Not selected";
    const lace =
      card.querySelector("input[type='radio']:checked")?.parentElement
        .innerText || "Not selected";
    const texture = card.querySelector(".texture-select").value;

    const item = { name, price, length, lace, texture };

    cart.push(item);
    updateCart();
    resetProductCard(card);

    button.classList.add("added");
    button.textContent = "Added ✓";

    setTimeout(() => {
      button.classList.remove("added");
      button.textContent = "Add to Selection";
    }, 2000);
  });
});

function updateCart() {
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <span class="remove-btn" onclick="removeItem(${index})">✕</span>
        <p>${item.name}</p>
        <ul>
          <li>${item.length}</li>
          <li>${item.lace}</li>
          <li>${item.texture}</li>
        </ul>
      </div>
    `;
  });

  cartCount.innerText = cart.length;
  navCartCount.innerText = cart.length;
  cartTotal.innerText = total.toLocaleString();
  document.body.classList.toggle("cart-active", cart.length > 0);
  window.dispatchEvent(new Event("cartstatechange"));

  if (cart.length > 0) {
    miniCart.classList.remove("hidden");
    miniCart.classList.add("show");
  } else {
    miniCart.classList.add("hidden");
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

/* ===== ORDER NOW REDIRECTS TO WHATSAPP ===== */

orderBtn.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Please select at least one product.");
    return;
  }

  let message = "Hello, I would like to order:%0A%0A";

  cart.forEach((item) => {
    message += `${item.name}%0A`;
    message += `- ${item.length}%0A`;
    message += `- ${item.lace}%0A`;
    message += `- ${item.texture}%0A%0A`;
  });

  message += `Total: ₦${cartTotal.innerText}`;

  const phoneNumber = "2349036189836"; // REPLACE WITH YOUR NUMBER
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  cart = [];
  updateCart();
});

function resetProductCard(card) {
  //reset length
  const activeBtn = card.querySelector(".pill-options button.active");
  if (activeBtn) activeBtn.classList.remove("active");

  //uncheck lace type

  const checkedRadio = card.querySelector("input[type='radio']:checked");
  if (checkedRadio) checkedRadio.checked = false;

  //reset texture

  const select = card.querySelector(".texture-select");
  if (select) select.selectedIndex = 0;
}

currentYear.innerText = new Date().getFullYear();
