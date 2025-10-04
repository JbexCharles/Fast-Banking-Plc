
    const navbarScrollEffect = document.querySelector('.navbar');
    document.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbarScrollEffect.classList.add('bg-light', 'shadow', 'scrolled');
        } else {
            navbarScrollEffect.classList.remove('bg-light', 'shadow');
        }
    })

// Templating header and footers
class myHeader extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-light fixed-top">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"><img src="img/logo/Fast-Bank-Logo1.png" alt=""></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="about.html">About Us</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="services.html">Services</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="help-center.html">Help Center</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="investments.html">Investments</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }
}

class myFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="text-light pt-5 pb-3">
                <div class="container">
                    <div class="row">
    
                    <!-- Logo & About -->
                    <div class="col-md-3 mb-4">
                        <img src="img/logo/Fast-Bank-Logo1.png" alt="">
                        <p class="small">
                        FastBank – providing secure, innovative, and fast financial solutions tailored for you.
                        </p>
                    </div>

                    <!-- Quick Links -->
                    <div class="col-md-3 mb-4">
                        <h6 class="fw-bold text-uppercase mb-3">Quick Links</h6>
                        <ul class="list-unstyled">
                        <li><a href="#" class="text-decoration-none text-light">Find a Branch</a></li>
                        <li><a href="#" class="text-decoration-none text-light">Downloads</a></li>
                        <li><a href="#" class="text-decoration-none text-light">Self Service</a></li>
                        <li><a href="#" class="text-decoration-none text-light">Help Centre</a></li>
                        </ul>
                    </div>

                    <!-- Products -->
                    <div class="col-md-3 mb-4">
                        <h6 class="fw-bold text-uppercase mb-3">Products</h6>
                        <ul class="list-unstyled">
                        <li><a href="#" class="text-decoration-none text-light">Debit Cards</a></li>
                        <li><a href="#" class="text-decoration-none text-light">HabariPay</a></li>
                        <li><a href="#" class="text-decoration-none text-light">Investments</a></li>
                        <li><a href="#" class="text-decoration-none text-light">Pension</a></li>
                        </ul>
                    </div>

                    <!-- Contact & Social -->
                    <div class="col-md-3 mb-4">
                        <h6 class="fw-bold text-uppercase mb-3">Contact</h6>
                        <p class="small mb-1"><i class="fas fa-map-marker-alt me-2"></i> Lagos, Nigeria</p>
                        <p class="small mb-1"><i class="fas fa-envelope me-2"></i> support@fastbank.com</p>
                        <p class="small mb-3"><i class="fas fa-phone me-2"></i> +234 800 123 4567</p>

                        <!-- Social icons -->
                        <div>
                        <a href="#" class="text-light me-3"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="text-light me-3"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-light me-3"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#" class="text-light"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    </div>

                    <!-- Divider -->
                    <hr class="border-light">

                    <!-- Bottom -->
                    <div class="d-flex justify-content-between flex-wrap">
                    <p class="small mb-0">© 2025 FastBank. All rights reserved.</p>
                    <p class="small mb-0">Powered by FastBank Digital</p>
                    </div>
                </div>
    </footer>
        `;
    }
}
customElements.define('my-header', myHeader);
customElements.define('my-footer', myFooter);

// this is for the admin sidebar activator
document.addEventListener("DOMContentLoaded", function() {
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");
  const toggleBtn = document.querySelector(".sidebar-toggle");

  toggleBtn.addEventListener("click", function() {
    sidebar.classList.toggle("active");
    mainContent.classList.toggle("shifted");
  });
});
