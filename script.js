// Produits de la boutique avec gestion de stock améliorée
        const products = [
            {
                id: 1,
                name: "Anti-parasitaire pour chien",
                category: "medicaments",
                price: 7500,
                originalPrice: 9000,
                stock: 15,
                image: "https://www.purepara.com/20602-thickbox_default/vetoform-antiparasitaire-petit-chien-15kg-3-pipettes.jpg",
                description: "Protège contre les puces et les tiques pendant 3 mois. Formulaire longue durée.",
                badge: "promo"
            },
            {
                id: 2,
                name: "Vermifuge pour chat",
                category: "medicaments",
                price: 4500,
                originalPrice: 5500,
                stock: 8,
                image: "https://tse2.mm.bing.net/th/id/OIP.5ppIAqZzcSJKEgUj8mUySwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
                description: "Élimine les vers intestinaux, une dose suffit. Pour chatons et chats adultes.",
                badge: "promo"
            },
            {
                id: 3,
                name: "Nourriture pour chien",
                category: "alimentation",
                price: 12500,
                originalPrice: 15000,
                stock: 25,
                image: "https://tse2.mm.bing.net/th/id/OIP.TNhiUPv-MgoLN7V08bIMsQHaNK?rs=1&pid=ImgDetMain&o=7&rm=3",
                description: "15kg, formule complète pour chien adulte. Riche en protéines et vitamines.",
                badge: "new"
            },
            {
                id: 4,
                name: "Shampoing antiparasitaire",
                category: "hygiene",
                price: 3500,
                originalPrice: 4500,
                stock: 30,
                image: "https://media.riashop.fr/e14e053dae793e9b9eb58fa5d48262c5/images/1980x1980/614726.jpg",
                description: "Nettoie en profondeur et éloigne les parasites. pH adapté aux animaux.",
                badge: null        
            },
            {
                id: 5,
                name: "Laisse réfléchissante",
                category: "accessoires",
                price: 2500,
                originalPrice: 3000,
                stock: 40,
                image: "https://tse3.mm.bing.net/th/id/OIP.80SnVSqvsiM2HlHqW1WGTQHaGZ?rs=1&pid=ImgDetMain&o=7&rm=3",
                description: "5m, sécurité nocturne, résistante. Avec mousqueton renforcé.",
                badge: null
            },
            {
                id: 6,
                name: "Eurican",
                category: "medicaments",
                price: 18000,
                originalPrice: 22000,
                stock: 5,
                image: "https://www.boehringer-ingelheim.com/sites/default/files/2024-09/EURICAN-L4_vial_2024.png",
                description: "Protection contre 6 maladies canines. Administration par un vétérinaire.",
                badge: "stock"
            },
            {
                id: 7,
                name: "Croquettes pour chat stérilisé",
                category: "alimentation",
                price: 8500,
                originalPrice: 9500,
                stock: 20,
                image: "https://m.media-amazon.com/images/I/81CWMJhWJNL._AC_SL1500_.jpg",
                description: "3kg, formule spéciale chat stérilisé. Contrôle du poids et santé urinaire.",
                badge: null
            },
            {
                id: 8,
                name: "Gamelle double",
                category: "accessoires",
                price: 3000,
                originalPrice: 4000,
                stock: 0,
                image: "https://tse1.mm.bing.net/th/id/OIP.Uvgsw9FOxymRLcrQV4m88QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
                description: "Pour eau et nourriture, anti-bascule. Matériau alimentaire sécuritaire.",
                badge: "stock"
            }
        ];

        // Panier
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartCount = document.getElementById('cartCount');
        let cartItems = document.getElementById('cartItems');
        let cartTotal = document.getElementById('cartTotal');
        let cartModal = document.getElementById('cartModal');
        let modalOverlay = document.getElementById('modalOverlay');
        let cartButton = document.getElementById('cartButton');
        let closeCart = document.getElementById('closeCart');
        let checkoutBtn = document.getElementById('checkoutBtn');
        let productsGrid = document.getElementById('productsGrid');
        let filterButtons = document.querySelectorAll('.filter-btn');
        let summaryItems = document.getElementById('summaryItems');
        let summaryTotal = document.getElementById('summaryTotal');
        let paymentMethods = document.querySelectorAll('.payment-method');
        let paymentMethodInput = document.getElementById('payment-method');
        let mobileMoneyDetails = document.getElementById('mobile-money-details');
        let deliveryCost = document.getElementById('deliveryCost');
        let notification = document.getElementById('notification');
        let notificationMessage = document.getElementById('notificationMessage');

        // Initialisation
        document.addEventListener('DOMContentLoaded', function() {
            updateCartCount();
            renderProducts('all');
            renderCartItems();
            updateSummary();
            initMap();
            
            // Set minimum date for appointment to today
            const today = new Date().toISOString().split('T')[0];
            const dateInput = document.getElementById('date');
            dateInput.setAttribute('min', today);
            
            // Set default date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
            dateInput.value = tomorrowFormatted;
            
            // Check for low stock products
            checkLowStock();
        });

        // Afficher les produits
        function renderProducts(filter) {
            productsGrid.innerHTML = '';
            
            const filteredProducts = filter === 'all' 
                ? products 
                : products.filter(product => product.category === filter);
            
            filteredProducts.forEach(product => {
                const isOutOfStock = product.stock === 0;
                const isLowStock = product.stock > 0 && product.stock <= 5;
                
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                if (isOutOfStock) {
                    productCard.style.opacity = '0.7';
                }
                
                let badgeHTML = '';
                if (product.badge === 'promo') {
                    badgeHTML = '<div class="product-badge badge-promo">Promo</div>';
                } else if (product.badge === 'new') {
                    badgeHTML = '<div class="product-badge badge-new">Nouveau</div>';
                } else if (product.badge === 'stock' && isLowStock) {
                    badgeHTML = '<div class="product-badge badge-stock">Stock limité</div>';
                }
                
                let stockHTML = '';
                if (isOutOfStock) {
                    stockHTML = '<div class="product-stock stock-out"><i class="fas fa-times-circle"></i> Rupture de stock</div>';
                } else if (isLowStock) {
                    stockHTML = `<div class="product-stock stock-low"><i class="fas fa-exclamation-circle"></i> Plus que ${product.stock} en stock</div>`;
                } else {
                    stockHTML = '<div class="product-stock stock-available"><i class="fas fa-check-circle"></i> En stock</div>';
                }
                
                productCard.innerHTML = `
                    ${badgeHTML}
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        ${stockHTML}
                        <div class="product-price">
                            <span class="current-price">${product.price.toLocaleString()} FCFA</span>
                            ${product.originalPrice > product.price ? 
                                `<span class="original-price">${product.originalPrice.toLocaleString()} FCFA</span>` : ''}
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-outline ${isOutOfStock ? 'btn-disabled' : ''}" 
                                    onclick="addToCart(${product.id})" 
                                    ${isOutOfStock ? 'disabled' : ''}>
                                <i class="fas fa-cart-plus"></i> ${isOutOfStock ? 'Rupture' : 'Ajouter'}
                            </button>
                            <button class="btn btn-cart ${isOutOfStock ? 'btn-disabled' : ''}" 
                                    onclick="addToCart(${product.id}, true)" 
                                    ${isOutOfStock ? 'disabled' : ''}>
                                <i class="fas fa-bolt"></i> Acheter
                            </button>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });
        }

        // Filtrage des produits
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                renderProducts(this.dataset.filter);
                
                // Smooth scroll to top of products
                document.querySelector('#boutique').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Gestion du panier
        function addToCart(productId, showCart = false) {
            const product = products.find(p => p.id === productId);
            
            // Vérifier le stock
            if (product.stock === 0) {
                showNotification('Ce produit est en rupture de stock', 'error');
                return;
            }
            
            // Vérifier si le produit est déjà dans le panier
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                // Vérifier si on ne dépasse pas le stock
                if (existingItem.quantity >= product.stock) {
                    showNotification('Stock insuffisant pour ce produit', 'warning');
                    return;
                }
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                    stock: product.stock
                });
            }
            
            saveCart();
            updateCartCount();
            renderCartItems();
            updateSummary();
            
            showNotification(`${product.name} ajouté au panier`, 'success');
            
            if (showCart) {
                openCart();
            }
            
            // Animation de confirmation
            const cartIcon = document.querySelector('.nav-cart i');
            cartIcon.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 300);
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            saveCart();
            updateCartCount();
            renderCartItems();
            updateSummary();
            
            showNotification('Produit retiré du panier', 'warning');
        }

        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                const product = products.find(p => p.id === productId);
                
                // Vérifier le stock avant d'augmenter la quantité
                if (change > 0 && item.quantity >= product.stock) {
                    showNotification('Stock insuffisant pour augmenter la quantité', 'warning');
                    return;
                }
                
                item.quantity += change;
                if (item.quantity < 1) {
                    removeFromCart(productId);
                } else {
                    saveCart();
                    updateCartCount();
                    renderCartItems();
                    updateSummary();
                }
            }
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function updateCartCount() {
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = count;
        }

        function renderCartItems() {
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Votre panier est vide</p>
                        <a href="#boutique" class="btn" onclick="closeCartModal()">Découvrir la boutique</a>
                    </div>
                `;
                document.getElementById('cartTotal').textContent = '0 FCFA';
                checkoutBtn.style.display = 'none';
                return;
            }
            
            checkoutBtn.style.display = 'block';
            let total = 0;
            
            cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const isLowStock = product && item.quantity > product.stock;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        ${isLowStock ? '<div style="color: var(--warning); font-size: 0.8rem;">Quantité limitée par le stock</div>' : ''}
                        <div class="cart-item-price">${item.price.toLocaleString()} FCFA</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)" ${isLowStock ? 'disabled' : ''}>
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                cartItems.appendChild(cartItem);
            });
            
            document.getElementById('cartTotal').textContent = `${total.toLocaleString()} FCFA`;
        }

        function updateSummary() {
            summaryItems.innerHTML = '';
            
            if (cart.length === 0) {
                summaryItems.innerHTML = '<p style="text-align: center; color: #666;">Aucun article dans le panier</p>';
                summaryTotal.textContent = '0 FCFA';
                deliveryCost.textContent = '0 FCFA';
                return;
            }
            
            let subtotal = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                const summaryItem = document.createElement('div');
                summaryItem.className = 'summary-item';
                summaryItem.innerHTML = `
                    <span>${item.name} x ${item.quantity}</span>
                    <span>${itemTotal.toLocaleString()} FCFA</span>
                `;
                summaryItems.appendChild(summaryItem);
            });
            
            // Calcul des frais de livraison
            const delivery = subtotal > 20000 ? 0 : 2000;
            const total = subtotal + delivery;
            
            deliveryCost.textContent = `${delivery.toLocaleString()} FCFA`;
            summaryTotal.textContent = `${total.toLocaleString()} FCFA`;
        }

        // Gestion du modal du panier
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
        });

        closeCart.addEventListener('click', closeCartModal);
        modalOverlay.addEventListener('click', closeCartModal);
        checkoutBtn.addEventListener('click', closeCartModal);

        function openCart() {
            cartModal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            renderCartItems();
        }

        function closeCartModal() {
            cartModal.classList.remove('active');
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Gestion des méthodes de paiement
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                paymentMethods.forEach(m => m.classList.remove('active'));
                this.classList.add('active');
                
                const methodType = this.dataset.method;
                paymentMethodInput.value = methodType;
                
                // Afficher/masquer les détails selon la méthode
                if (methodType === 'mobile') {
                    mobileMoneyDetails.style.display = 'block';
                    document.getElementById('mobile-number').required = true;
                } else {
                    mobileMoneyDetails.style.display = 'none';
                    document.getElementById('mobile-number').required = false;
                }
            });
        });

        // Formulaire de commande
        const checkoutForm = document.getElementById('checkoutForm');
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (cart.length === 0) {
                showNotification('Votre panier est vide. Veuillez ajouter des produits avant de commander.', 'error');
                return;
            }
            
            // Vérifier le stock avant validation
            let stockIssue = false;
            cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                if (product && item.quantity > product.stock) {
                    stockIssue = true;
                    showNotification(`Stock insuffisant pour "${item.name}"`, 'error');
                }
            });
            
            if (stockIssue) {
                return;
            }
            
            const formData = {
                name: document.getElementById('checkout-name').value,
                phone: document.getElementById('checkout-phone').value,
                email: document.getElementById('checkout-email').value,
                address: document.getElementById('checkout-address').value,
                city: document.getElementById('checkout-city').value,
                paymentMethod: document.getElementById('payment-method').value,
                mobileNumber: document.getElementById('mobile-number').value,
                cart: cart,
                total: summaryTotal.textContent,
                date: new Date().toISOString()
            };
            
            // Simuler l'envoi de la commande
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Commande confirmée ! Nous vous contacterons sous peu.', 'success');
                
                // Sauvegarder la commande dans localStorage (simulation)
                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(formData);
                localStorage.setItem('orders', JSON.stringify(orders));
                
                // Réinitialiser le panier
                cart = [];
                saveCart();
                updateCartCount();
                renderCartItems();
                updateSummary();
                
                // Réinitialiser le formulaire
                checkoutForm.reset();
                
                // Réinitialiser le bouton
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Fermer le panier si ouvert
                closeCartModal();
                
                // Rediriger vers l'accueil
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2000);
        });

        // Formulaire de rendez-vous
        const appointmentForm = document.getElementById('appointmentForm');
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Demande de rendez-vous envoyée ! Nous vous contacterons pour confirmation.', 'success');
                
                // Sauvegarder le rendez-vous dans localStorage (simulation)
                const appointmentData = {
                    name: document.getElementById('name').value,
                    phone: document.getElementById('phone').value,
                    email: document.getElementById('email').value,
                    animal: document.getElementById('animal').value,
                    service: document.getElementById('service').value,
                    date: document.getElementById('date').value,
                    time: document.getElementById('time').value,
                    message: document.getElementById('message').value,
                    submitted: new Date().toISOString()
                };
                
                const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointmentData);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                appointmentForm.reset();
                
                // Réinitialiser la date à demain
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
                document.getElementById('date').value = tomorrowFormatted;
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });

        // Initialisation de la carte
        function initMap() {
            const map = L.map('map').setView([5.7, -6.6], 13);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            const customIcon = L.divIcon({
                className: 'custom-map-marker',
                html: '<div style="background: var(--primary); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;"><i class="fas fa-paw"></i></div>',
                iconSize: [40, 40],
                iconAnchor: [20, 40]
            });
            
            L.marker([5.7, -6.6], { icon: customIcon })
                .addTo(map)
                .bindPopup('<strong>Cabinet Vétérinaire CAVENA</strong><br>Région de la Nawa, Côte d\'Ivoire<br><em>Près du marché central de Soubré</em>')
                .openPopup();
        }

        // Système de notification
        function showNotification(message, type = 'success') {
            notification.className = `notification notification-${type}`;
            notificationMessage.textContent = message;
            
            // Changer l'icône selon le type
            const icon = notification.querySelector('.notification-icon i');
            if (type === 'success') {
                icon.className = 'fas fa-check';
            } else if (type === 'error') {
                icon.className = 'fas fa-exclamation-circle';
            } else if (type === 'warning') {
                icon.className = 'fas fa-exclamation-triangle';
            }
            
            notification.classList.add('active');
            
            // Masquer après 5 secondes
            setTimeout(() => {
                notification.classList.remove('active');
            }, 5000);
        }

        // Vérifier les produits en stock limité
        function checkLowStock() {
            const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5);
            if (lowStockProducts.length > 0) {
                console.log(`${lowStockProducts.length} produit(s) en stock limité`);
            }
        }

        // Gestion du menu mobile
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        const body = document.body;
        
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Fermer le menu mobile en cliquant sur un lien
        document.querySelectorAll('#navMenu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = 'auto';
            });
        });

        // Gestion du défilement de l'en-tête
        const header = document.getElementById('header');
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        // Loading animation
        window.addEventListener('load', function() {
            const loading = document.getElementById('loading');
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 800);
        });

        const slides = document.querySelectorAll('.slide');
    let index = 0;

    function showSlide() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        index = (index + 1) % slides.length;
    }

    showSlide();
    setInterval(showSlide, 5000); // change toutes les 5 secondes