const sliding = document.querySelector(".slider");
const heading = document.querySelector(".slider__content-heading");
const desc = document.querySelector(".slider__content-description");
const header = document.querySelector(".header");
const menuBtn = document.querySelector(".header__menu-btn");
const modal = document.querySelector(".modal");
const subnav = document.querySelector(".header__subnav");
const navLinks = document.querySelectorAll(".header__nav-link");
const navLinkHasSubNav = document.querySelector(".header__nav-link-has-sub");
const subnavLinks = document.querySelectorAll(".header__subnav-link");
const btnBuyTickets = document.querySelectorAll(".tour__places-buy-btn");
const imgs = [
  {
    img: "la.jpg",
    heading: "Los Angeles",
    desc: "We had the best time playing at Venice Beach!",
  },

  {
    img: "chicago.jpg",
    heading: "Chicago",
    desc: "Thank you, Chicago - A night we won't forget.",
  },
  {
    img: "ny.jpg",
    heading: "New York",
    desc: "The atmosphere in New York is lorem ipsum.",
  },
];

/* Handle slider */
function slider(imgs, index = 0) {
  sliding.style.background = `url(./assets/imgs/${imgs[index++].img}) top center / cover no-repeat`;
  setInterval(() => {
    sliding.style.background = `url(./assets/imgs/${imgs[index].img}) top center / cover no-repeat`;
    heading.innerHTML = imgs[index].heading;
    desc.innerHTML = imgs[index].desc;
    index++;
    index %= imgs.length;
  }, 3000);
}
slider(imgs);

/* Handle event click*/
menuBtn.onclick = () => toggleMobileMenu();

modal.addEventListener("click", e => {
  const modalContent = document.querySelector(".modal__content");
  const closeIcon = document.querySelector(".modal__content-close-icon");
  if (!modalContent.contains(e.target)) {
    hideMobileMenu();
    return;
  }
  if (closeIcon.contains(e.target)) {
    hideMobileMenu();
  }
});

navLinks.forEach(navLink => {
  if (!navLink.classList.contains("header__nav-link-has-sub")) {
    navLink.onclick = () => hideMobileMenu();
    return;
  }
  navLink.onclick = () => subnav.classList.toggle("header__subnav--active");
});

document.addEventListener("click", e => {
  if (!navLinkHasSubNav.contains(e.target)) {
    subnav.classList.remove("header__subnav--active");
  }
});

subnavLinks.forEach(subnavLink => (subnavLink.onclick = () => hideMobileMenu()));

/* Handle buy tickets */
btnBuyTickets.forEach(btn => {
  btn.onclick = () => {
    modal.classList.add("modal--active");
    let htmls = `
    <div class="modal__content">
      <i class="ri-close-fill modal__content-close-icon"></i>
      <div class="modal__content-header">
        <i class="ri-briefcase-fill modal__content-header-icon"></i>
        <h2 class="modal__content-header-title">Tickets</h2>
      </div>
      <div class="modal__content-body">
        <div class="modal__content-body-label">
          <i class="ri-shopping-cart-fill modal__content-body-icon"></i>
          <span>Tickets, $15 per person</span> 
        </div>
        <input type="text" class="modal__content-body-input" placeholder="How many ?">
        <div class="modal__content-body-label">
          <i class="ri-user-fill modal__content-body-icon"></i>
          <span>Send To</span>  
        </div>
        <input type="text" class="modal__content-body-input" placeholder="Enter email...">
        <button class="modal__content-body-btn">PAY<i class="ri-check-line modal__content-body-icon"></i></button>
      </div>
      <div class="modal__content-footer">
      <i class="ri-question-fill modal__content-footer-icon"></i>
        <span>Need <a href="#" class="modal__content-footer-link">help?</a> </span>
      </div>
    </div>`;
    modal.innerHTML = htmls;
  };
});

function toggleMobileMenu() {
  header.classList.toggle("header__mobile--active");
  modal.classList.toggle("modal--active");
}
function hideMobileMenu() {
  header.classList.remove("header__mobile--active");
  modal.classList.remove("modal--active");
  subnav.classList.remove("header__subnav--active");
}
