// main.js

document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product");
  const buyButtons = document.querySelectorAll(".btnBuy");
  const popup = document.getElementById("popup");
  const popupImg = document.getElementById("popup-img");
  const popupTitle = document.getElementById("popup-title");
  const popupPrice = document.getElementById("popup-price");
  const closeBtn = document.querySelector(".close-btn");
  const cartIcon = document.getElementById("cart-icon");
  const popupBuyBtn = document.getElementById("popup-btnBuy");
  const buyNum = document.getElementById("buyNum");

  let num = 0;

  // Load cart count from localStorage if available
  const savedNum = localStorage.getItem("cartCount");
  if (savedNum) {
    num = parseInt(savedNum);
    if (buyNum) buyNum.textContent = num;
  }

  if (popupBuyBtn) {
    popupBuyBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Get current product details
      const myData = {
        popupImg: popupImg ? popupImg.src : "",
        popupTitle: popupTitle ? popupTitle.textContent : "",
        popupPrice: popupPrice ? popupPrice.textContent : "",
      };

      // Save product to cart
      let currentItems = JSON.parse(localStorage.getItem("myItems")) || [];
      currentItems.push(myData);
      localStorage.setItem("myItems", JSON.stringify(currentItems));

      // Increase cart count
      num++;
      if (buyNum) buyNum.textContent = num;
      localStorage.setItem("cartCount", num);

      // Close popup
      if (popup) popup.style.display = "none";
    });
  }

  // Remove saving to cart from cartIcon click — just open cart page
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      window.location.href = "item.html"; // no counting, no saving here
    });
  }

  products.forEach((product) => {
    product.addEventListener("click", (e) => {
      if (!e.target.classList.contains("btnBuy")) {
        const imgSrc = product.querySelector("img").src;
        const title = product.querySelector("h3").innerText;
        const price = product.querySelector("p").innerText;

        if (popupImg) popupImg.src = imgSrc;
        if (popupTitle) popupTitle.innerText = title;
        if (popupPrice) popupPrice.innerText = price;

        if (popup) popup.style.display = "flex";
      }
    });
  });

  buyButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const product = button.closest(".product");
      const imgSrc = product.querySelector("img").src;
      const title = product.querySelector("h3").innerText;
      const price = product.querySelector("p").innerText;

      if (popupImg) popupImg.src = imgSrc;
      if (popupTitle) popupTitle.innerText = title;
      if (popupPrice) popupPrice.innerText = price;

      if (popup) popup.style.display = "flex";
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (popup) popup.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      if (popup) popup.style.display = "none";
    }
  });
});

document.getElementById("hamburger").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("active");
  document.querySelector(".myItem").classList.toggle("active");
});
