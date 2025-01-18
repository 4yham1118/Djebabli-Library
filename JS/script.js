document.addEventListener("DOMContentLoaded", function () {
    // Create navbar
    const navbar = document.createElement('nav');
    navbar.innerHTML = `
    <!-- Title Section -->
    <div class="title">
        <h1>Djebabli Library</h1>
    </div>

    <!-- Navbar Section -->
    <div class="navbar">
        <div class="logo">
            <img src="Media/Djebabli_Library_Logo.png" alt="Logo" id="logo">
            <label for="logo">Djebabli Library</label>
        </div>
        <ul>
            <li><a href="index.html">Accueil</a></li>
            <li><a href="about-us.html">À propos de nous</a></li>
            <li><a href="contact-us.html">Contactez-nous</a></li>
        </ul>
    </div>
    `;
    document.body.insertBefore(navbar, document.body.firstChild);

    // Create footer
    const footer = document.createElement('footer');
    footer.innerHTML = `
    <footer>
        <div class="footer-container">
            <div class="footer-content">
                <p>&copy; 2024 Djebabli Library. Tous droits réservés.</p>
                <ul class="footer-links">
                    <li><a href="Terms and services/privacy.html">Politique de confidentialité</a></li>
                    <li><a href="Terms and services/terms.html">Conditions générales</a></li>
                    <li><a href="contact-us.html">Contactez-nous</a></li>
                </ul>
            </div>
        </div>
    </footer>
    `;
    document.body.appendChild(footer);
});