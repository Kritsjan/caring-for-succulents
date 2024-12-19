// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Determine if we're in a subdirectory
    const path = window.location.pathname;
    const isSubdir = path.includes('/tools/') || path.includes('/blog/');
    const baseUrl = isSubdir ? '..' : '.';

    // Load the header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <header class="main-header">
                <div class="nav-container">
                    <a href="${baseUrl}/index.html" class="logo">
                        <h1>Caring For Succulents</h1>
                    </a>
                    <button class="mobile-menu-btn" aria-label="Toggle navigation menu" aria-expanded="false">
                        <i class="fas fa-bars"></i>
                    </button>
                    <nav class="nav-links">
                        <a href="${baseUrl}/index.html" data-page="home">Home</a>
                        <a href="${baseUrl}/tools/plant-watering-calculator.html" data-page="watering">Watering Calculator</a>
                        <a href="${baseUrl}/tools/pot-volume-calculator.html" data-page="pot">Pot Calculator</a>
                        <a href="${baseUrl}/tools/leaf-propagation-guide.html" data-page="propagation">Propagation Guide</a>
                        <a href="${baseUrl}/blog/index.html" data-page="blog">Blog</a>
                    </nav>
                </div>
            </header>
        `;
    }

    // Load the footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer class="main-footer">
                <div class="footer-nav">
                    <div class="footer-section">
                        <h3>Tools</h3>
                        <ul>
                            <li><a href="${baseUrl}/tools/plant-watering-calculator.html">Watering Calculator</a></li>
                            <li><a href="${baseUrl}/tools/pot-volume-calculator.html">Pot Calculator</a></li>
                            <li><a href="${baseUrl}/tools/leaf-propagation-guide.html">Propagation Guide</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Blog Posts</h3>
                        <ul>
                            <li><a href="${baseUrl}/blog/caring-for-succulents.html">Caring for Succulents</a></li>
                            <li><a href="${baseUrl}/blog/common-watering-mistakes.html">Common Watering Mistakes</a></li>
                            <li><a href="${baseUrl}/blog/propagating-succulents.html">Propagating Succulents</a></li>
                            <li><a href="${baseUrl}/blog/planting-propagated-succulents.html">Planting Propagated Succulents</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Sitemap</h3>
                        <ul>
                            <li><a href="${baseUrl}/index.html">Home</a></li>
                            <li><a href="${baseUrl}/blog/index.html">Blog</a></li>
                            <li><a href="${baseUrl}/tools/index.html">Tools</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 Caring For Succulents. All rights reserved.</p>
                </div>
            </footer>
        `;
    }

    // Set active navigation link
    const currentPage = document.body.dataset.page;
    if (currentPage) {
        const activeLink = document.querySelector(`[data-page="${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Add mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navLinks.classList.contains('active') && 
                !event.target.closest('.nav-links') && 
                !event.target.closest('.mobile-menu-btn')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
