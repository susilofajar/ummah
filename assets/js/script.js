document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("pageLoader");
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const backTop = document.getElementById("backTop");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const year = document.getElementById("year");

  // Page loader
  window.addEventListener("load", () => {
    setTimeout(() => loader?.classList.add("loaded"), 450);
  });

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });

  // Header + active navigation + back-to-top
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 30);
    backTop.classList.toggle("show", y > 600);

    let current = "home";
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (y >= top) current = section.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Reveal animations
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // Counter animation
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const duration = 1400;
      const start = performance.now();

      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString("id-ID");
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: .7 });

  counters.forEach(counter => counterObserver.observe(counter));

  // FAQ accordion
  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach(item => {
    const trigger = item.querySelector(".accordion-trigger");
    trigger.addEventListener("click", () => {
      const wasActive = item.classList.contains("active");
      accordionItems.forEach(other => other.classList.remove("active"));
      if (!wasActive) item.classList.add("active");
    });
  });

  // WhatsApp CTA
  const whatsappNumber = "6282113932434";
  const createWhatsappUrl = (message) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const whatsappUrl = createWhatsappUrl(
    "Assalamu'alaikum, saya ingin berkonsultasi mengenai program Umrah/Haji UMMAH Tour & Travel."
  );

  const whatsappCta = document.getElementById("whatsappCta");
  const whatsappText = document.getElementById("whatsappText");
  if (whatsappCta) whatsappCta.href = whatsappUrl;
  if (whatsappText) whatsappText.href = whatsappUrl;

  document.querySelectorAll(".package-cta[data-package]").forEach(link => {
    const packageName = link.dataset.package;
    link.href = createWhatsappUrl(
      `Assalamu'alaikum, saya ingin bertanya tentang ${packageName} di UMMAH Tour & Travel. Mohon informasi jadwal, harga, fasilitas, dan ketentuan program yang tersedia.`
    );
    link.target = "_blank";
    link.rel = "noopener";
  });

  // Current year
  if (year) year.textContent = new Date().getFullYear();

  // Smooth anchor fallback for browsers that need it
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
