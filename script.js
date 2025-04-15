// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu slider functionality
const slider = document.getElementById('menuSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const menuItems = document.querySelectorAll('.menu-item');

let slideIndex = 0;
const itemWidth = menuItems[0].offsetWidth + 30; // width + gap
const itemsToShow = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;

// Set initial positions
function updateSlider() {
    slider.style.transform = `translateX(-${slideIndex * itemWidth}px)`;
}

// Navigation buttons
prevBtn.addEventListener('click', () => {
    slideIndex = Math.max(0, slideIndex - 1);
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    const maxIndex = menuItems.length - itemsToShow;
    slideIndex = Math.min(maxIndex, slideIndex + 1);
    updateSlider();
});

// Auto-slide
let autoSlideInterval = setInterval(() => {
    const maxIndex = menuItems.length - itemsToShow;
    if (slideIndex >= maxIndex) {
        slideIndex = 0;
    } else {
        slideIndex++;
    }
    updateSlider();
}, 4000);

// Pause auto-slide on hover
slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

slider.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        const maxIndex = menuItems.length - itemsToShow;
        if (slideIndex >= maxIndex) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        updateSlider();
    }, 4000);
});

// Handle window resize
window.addEventListener('resize', () => {
    const newItemsToShow = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const maxIndex = menuItems.length - newItemsToShow;

    // Adjust current slide index if needed
    if (slideIndex > maxIndex) {
        slideIndex = maxIndex;
    }

    updateSlider();
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

 // Cart functionality
 let cart = JSON.parse(localStorage.getItem('cart')) || [];
 const cartCount = document.querySelector('.cart-count');

 function updateCartCount() {
     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
     cartCount.textContent = totalItems;
 }

 function addToCart(name, price, image) {
     const existingItem = cart.find(item => item.name === name);
     
     if (existingItem) {
         existingItem.quantity += 1;
     } else {
         cart.push({
             name: name,
             price: price,
             image: image,
             quantity: 1
         });
     }
     
     localStorage.setItem('cart', JSON.stringify(cart));
     updateCartCount();
     
     // Show added to cart message
     const message = document.createElement('div');
     message.textContent = 'Added to cart!';
     message.style.cssText = `
         position: fixed;
         top: 20px;
         right: 20px;
         background-color: #e67e22;
         color: white;
         padding: 10px 20px;
         border-radius: 5px;
         z-index: 1000;
     `;
     document.body.appendChild(message);
     setTimeout(() => message.remove(), 2000);
 }

 // Initialize cart count
 updateCartCount();