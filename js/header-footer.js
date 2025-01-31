document.addEventListener('DOMContentLoaded', function() {
    // Determine if we're in a subdirectory
    const path = window.location.pathname;
    const isInSubdirectory = path.includes('/blog/') || path.includes('/tools/');
    const basePath = isInSubdirectory ? '../' : '';

    // Insert header HTML
    const headerHtml = `
        <header class="main-header">
            <div class="nav-container">
                <a href="${basePath}index.html" class="logo">
                    <h1>Caring For Succulents</h1>
                </a>
                <button class="mobile-menu-btn" aria-label="Toggle navigation menu" aria-expanded="false">
                    <i class="fas fa-bars"></i>
                </button>
                <nav class="nav-links">
                    <a href="${basePath}index.html" data-page="home">Home</a>
                    <a href="${basePath}tools/plant-watering-calculator.html" data-page="watering">Watering Calculator</a>
                    <a href="${basePath}tools/pot-volume-calculator.html" data-page="pot">Pot Calculator</a>
                    <a href="${basePath}tools/leaf-propagation-guide.html" data-page="propagation">Propagation Guide</a>
                    <a href="${basePath}blog/index.html" data-page="blog">Blog</a>
                </nav>
            </div>
        </header>
    `;
    document.getElementById('header-placeholder').innerHTML = headerHtml;
    initializeMobileMenu();

    // Insert footer HTML
    const footerHtml = `
        <footer class="main-footer">
            <div class="footer-nav">
                <div class="footer-section">
                    <h3>Tools</h3>
                    <ul>
                        <li><a href="${basePath}tools/plant-watering-calculator.html">Watering Calculator</a></li>
                        <li><a href="${basePath}tools/pot-volume-calculator.html">Pot Calculator</a></li>
                        <li><a href="${basePath}tools/leaf-propagation-guide.html">Propagation Guide</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Blog Posts</h3>
                    <ul>
                        <li><a href="${basePath}blog/caring-for-succulents.html">Caring for Succulents</a></li>
                        <li><a href="${basePath}blog/common-watering-mistakes.html">Common Watering Mistakes</a></li>
                        <li><a href="${basePath}blog/propagating-succulents.html">Propagating Succulents</a></li>
                        <li><a href="${basePath}blog/planting-propagated-succulents.html">Planting Propagated Succulents</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Sitemap</h3>
                    <ul>
                        <li><a href="${basePath}index.html">Home</a></li>
                        <li><a href="${basePath}blog/index.html">Blog</a></li>
                        <li><a href="${basePath}tools/index.html">Tools</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Caring For Succulents. All rights reserved.</p>
            </div>
        </footer>
    `;
    document.getElementById('footer-placeholder').innerHTML = footerHtml;
});

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
    }
}
