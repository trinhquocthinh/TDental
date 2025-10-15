'use strict';



/**
 * addEvent on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (!elem) return;

  if (elem instanceof NodeList || elem instanceof HTMLCollection || Array.isArray(elem)) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  navbarToggler.classList.toggle("active");
}

addEventOnElem(navbarToggler, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  navbarToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNav);



/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * appointment modal
 */

const modalContainer = document.querySelector("[data-modal-container]");

if (modalContainer) {
  const modal = modalContainer.querySelector("[data-modal]");
  const modalOpenButtons = document.querySelectorAll("[data-modal-open]");
  const modalCloseElements = modalContainer.querySelectorAll("[data-modal-close]");
  const modalOverlay = modalContainer.querySelector("[data-modal-overlay]");
  const modalForm = modalContainer.querySelector(".modal-form");
  const feedback = modalForm ? modalForm.querySelector(".form-feedback") : null;
  const focusableSelectors = "a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";
  let lastFocusedElement = null;
  let hideModalTimer = null;

  const setContainerHidden = function (shouldHide) {
    if (shouldHide) {
      hideModalTimer = setTimeout(function () {
        modalContainer.setAttribute("hidden", "");
        hideModalTimer = null;
      }, 400);
    } else {
      if (hideModalTimer) {
        clearTimeout(hideModalTimer);
        hideModalTimer = null;
      }
      modalContainer.removeAttribute("hidden");
    }
  };

  const trapFocus = function (event) {
    if (event.key !== "Tab") return;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(focusableSelectors);
    if (!focusableElements.length) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  };

  const openModal = function () {
    if (!modal) return;

    setContainerHidden(false);
    requestAnimationFrame(function () {
      modalContainer.classList.add("active");
    });
    document.body.classList.add("modal-open");

    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const defaultFocusTarget = modal.querySelector("[data-focus-default]") || modal.querySelector(focusableSelectors);

    if (feedback) {
      feedback.textContent = "";
      delete feedback.dataset.visible;
    }

    if (defaultFocusTarget) {
      defaultFocusTarget.focus({ preventScroll: true });
    }
  };

  const closeModal = function () {
    modalContainer.classList.remove("active");
    document.body.classList.remove("modal-open");
    setContainerHidden(true);

    if (lastFocusedElement) {
      lastFocusedElement.focus({ preventScroll: true });
    }
  };

  addEventOnElem(modalOpenButtons, "click", function (event) {
    event.preventDefault();
    openModal();
  });

  addEventOnElem(modalCloseElements, "click", closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }

  window.addEventListener("keydown", function (event) {
    if (!modalContainer.classList.contains("active")) return;

    if (event.key === "Escape") {
      closeModal();
      return;
    }

    trapFocus(event);
  });

  const dateInput = modal.querySelector("#input-date");
  if (dateInput) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dateInput.min = today.toISOString().split("T")[0];
  }

  if (modalForm) {
  const submitBtn = modalForm.querySelector(".modal-submit");

    modalForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      setTimeout(function () {
        const formData = new FormData(modalForm);
        const rawName = formData.get("full_name");
        const fullName = rawName ? rawName.toString().trim() : "";
        const displayName = fullName || "there";

        modalForm.reset();

        if (dateInput) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          dateInput.min = today.toISOString().split("T")[0];
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Request";
        }

        if (feedback) {
          feedback.textContent = `Thanks ${displayName}, our care team will reach out within 24 hours.`;
          feedback.dataset.visible = "true";
        }

        const focusTarget = modal.querySelector("[data-focus-default]") || modal.querySelector(focusableSelectors);
        if (focusTarget) {
          focusTarget.focus({ preventScroll: true });
        }
      }, 600);
    });
  }
}