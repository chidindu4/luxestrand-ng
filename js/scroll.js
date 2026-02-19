// Scroll animation for customer trust section

const customerTrustSection = document.querySelector(".customer-trust-section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        customerTrustSection.classList.remove("customer-trust-hidden");
      }
    });
  },
  { threshold: 0.2 },
);

if (customerTrustSection) {
  observer.observe(customerTrustSection);
}
