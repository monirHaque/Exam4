// Array of product objects
const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ];

  // Shopping cart object
  const cart = {
    items: [],
    total: 0,
  };

  // Function to add a product to the cart
  function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) {
      console.error('Product not found!');
      return;
    }
    const cartItem = cart.items.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }
    cart.total += product.price * quantity;
    displayCart();
  }

  // Function to display the cart items
  function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    cart.items.forEach(item => {
      const { product, quantity } = item;
      const itemTotal = product.price * quantity;

      const itemElement = document.createElement('div');
      itemElement.innerHTML = `${product.name} (Quantity: ${quantity}) - $${itemTotal}`;

      cartContainer.appendChild(itemElement);
    });

    const totalElement = document.getElementById('cart-total');
    totalElement.innerHTML = `Total: $${cart.total}`;
  }

  // Function to clear the cart
  function clearCart() {
    cart.items = [];
    cart.total = 0;
    displayCart();
  }

  // Event listener for "Add to Cart" buttons
  document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        const productId = parseInt(event.target.dataset.productId);
        const quantity = parseInt(event.target.dataset.quantity);
        addToCart(productId, quantity);
      });
    });

    const clearCartButton = document.getElementById('clear-cart');
    clearCartButton.addEventListener('click', clearCart);
  });