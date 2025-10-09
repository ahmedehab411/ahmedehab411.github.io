// ==================== CONFIGURATION ====================
const CONFIG = {
  testimonialAPI: "data/testimonials.json",
  projectsAPI: "data/projects.json",
  skillsAPI: "data/skills.json",
  resumePath: "assets/pdf/Ahmed Ehab (R&D Product Engineer).pdf",
};

// ==================== DATA INTEGRATION ====================
async function loadPortfolioData() {
  try {
    const [setRes, expRes, projRes, skillRes, testRes] = await Promise.all([
      fetch("data/settings.json"),
      fetch("data/experience.json"),
      fetch("data/projects.json"),
      fetch("data/skills.json"),
      fetch("data/testimonials.json"),
    ]);

    const settings = setRes.ok ? await setRes.json() : getDefaultSettings();
    const experiences = expRes.ok ? await expRes.json() : [];
    const projects = projRes.ok ? await projRes.json() : [];
    const skillTree = skillRes.ok ? await skillRes.json() : { skills: {} };
    const testimonials = testRes.ok ? await testRes.json() : [];

    updateHeroSection(settings);
    updateAboutSection(settings);
    updateExperienceSection(experiences);
    updatePortfolioStats(settings);
    renderSkills(skillTree.skills || skillTree);
    displayProjects(projects, "all");
    window.testimonials = testimonials;
    initTestimonialCarousel();
  } catch (err) {
    console.error("❌ loadPortfolioData failed:", err);
  }
}

function getDefaultSettings() {
  return {
    currentPosition: "R&D Product Engineer",
    currentCompany: "FEDIS",
    companyUrl: "https://fedis.com.eg",
    tagline: "R&D | Robotics | Embedded | AI/ML",
    typingPhrases: [
      "Building Autonomous Robots",
      "Developing Embedded Systems",
      "Training AI Models",
    ],
    aboutDesc1:
      "I'm an R&D Product Engineer with extensive experience in developing autonomous robotic systems using ROS1 (Noetic) and ROS2 (Humble/Jazzy), C/C++, and Python.",
    aboutDesc2:
      "My work focuses on firmware development on STM32, implementation of motion control algorithms (PD/PID), and integration of embedded systems with navigation and perception modules.",
    location: "Cairo, Egypt",
    email: "ahmedehab1232@gmail.com",
    availableForWork: true,
    Projects: 50,
    trainingSessions: 80,
    studentsTrained: 3000,
    yearsExperience: 2,
  };
}

function updateHeroSection(settings) {
  const currentRole = document.querySelector(".current-role strong");
  if (currentRole) {
    currentRole.textContent = settings.currentPosition;
  }

  const companyLink = document.querySelector(".current-role a");
  if (companyLink) {
    companyLink.textContent = settings.currentCompany;
    if (settings.companyUrl) {
      companyLink.href = settings.companyUrl;
    }
  }

  const tagline = document.querySelector(".tagline");
  if (tagline) {
    tagline.textContent = settings.tagline;
  }

  if (settings.typingPhrases && settings.typingPhrases.length > 0) {
    window.typingPhrases = settings.typingPhrases;
  }
}

function updateAboutSection(settings) {
  const aboutContent = document.querySelector(".about-content");
  if (!aboutContent) return;

  const paragraphs = aboutContent.querySelectorAll("p");
  if (paragraphs.length >= 2) {
    paragraphs[0].textContent = settings.aboutDesc1;
    paragraphs[1].textContent = settings.aboutDesc2;
  }

  const locationSpan = document.querySelector(
    ".info-item:has(.fa-map-marker-alt) span:last-child"
  );
  if (locationSpan) locationSpan.textContent = settings.location;

  const positionSpan = document.querySelector(
    ".info-item:has(.fa-briefcase) span:last-child"
  );
  if (positionSpan)
    positionSpan.textContent = `${settings.currentPosition} @ ${settings.currentCompany}`;

  const emailSpan = document.querySelector(
    ".info-item:has(.fa-envelope) span:last-child"
  );
  if (emailSpan) emailSpan.textContent = settings.email;

  const availability = document.querySelector(".status-available");
  if (availability) {
    availability.textContent = settings.availableForWork
      ? "Available for Projects"
      : "Currently Unavailable";
    availability.style.color = settings.availableForWork
      ? "#4ecdc4"
      : "#ff6b6b";
  }
}

function updateExperienceSection(experiences) {
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;

  experiences.sort((a, b) => a.order - b.order);

  timeline.innerHTML = experiences
    .map(
      (exp) => `
        <div class="timeline-item" data-aos="fade-up">
            <div class="timeline-dot ${exp.current ? "current-dot" : ""}"></div>
            <div class="timeline-content">
                <div class="timeline-date">${formatExperienceDate(exp)}</div>
                <h3>${exp.position}</h3>
                <h4>${exp.company}</h4>
                <p class="location">
                    <i class="fas fa-map-marker-alt"></i> ${exp.location}
                </p>
                <ul class="achievements">
                    ${exp.achievements
                      .map((achievement) => `<li>${achievement}</li>`)
                      .join("")}
                </ul>
                <div class="tech-tags">
                    ${exp.technologies
                      .map((tech) => `<span class="tag">${tech}</span>`)
                      .join("")}
                </div>
            </div>
        </div>
    `
    )
    .join("");

  if (typeof AOS !== "undefined") AOS.refresh();
}

function updatePortfolioStats(settings) {
  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach((card) => {
    const counter = card.querySelector(".counter");
    if (counter) {
      const label = card
        .querySelector(".stat-label")
        ?.textContent.toLowerCase();

      if (label?.includes("Projects")) {
        counter.setAttribute("data-target", settings.Projects || 50);
      } else if (label?.includes("training")) {
        counter.setAttribute("data-target", settings.trainingSessions || 120);
      } else if (label?.includes("students")) {
        counter.setAttribute("data-target", settings.studentsTrained || 3000);
      } else if (label?.includes("yearsExperience")) {
        counter.setAttribute("data-target", settings.yearsExperience || 2);
      }
    }
  });

  initCounters();
}

function formatExperienceDate(exp) {
  const startDate = new Date(exp.startDate + "-01");
  const startFormatted = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  if (exp.current) {
    return `${startFormatted} – Present`;
  }

  const endDate = new Date(exp.endDate + "-01");
  const endFormatted = endDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return `${startFormatted} – ${endFormatted}`;
}

async function loadVolunteering() {
  try {
    const res = await fetch("data/volunteering.json");
    const data = res.ok ? await res.json() : [];
    renderVolunteeringTimeline(data);
  } catch (e) {
    console.warn("⚠️ volunteering.json not found – section skipped");
  }
}

function renderVolunteeringTimeline(list) {
  const container = document.getElementById("volunteeringTimeline");
  if (!container) return;

  list.sort((a, b) => a.order - b.order);

  container.innerHTML = list
    .map(
      (item) => `
    <div class="timeline-item" data-aos="fade-up">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-date">${formatExperienceDate(item)}</div>
        <h3>${item.position}</h3>
        <h4>${item.company}</h4>
        <p class="location"><i class="fas fa-map-marker-alt"></i> ${
          item.location
        }</p>
        <ul class="achievements">
          ${item.achievements.map((a) => `<li>${a}</li>`).join("")}
        </ul>
        <div class="tech-tags">
          ${item.technologies
            .map((t) => `<span class="tag">${t}</span>`)
            .join("")}
        </div>
      </div>
    </div>
  `
    )
    .join("");

  if (typeof AOS !== "undefined") AOS.refresh();
}

// ==================== CONTACT FORM ====================
document
  .getElementById("contactForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formStatus = document.getElementById("formStatus");
    formStatus.textContent = "Sending message...";
    formStatus.className = "form-status";
    formStatus.style.display = "block";

    const form = e.target;

    try {
      const response = await fetch("https://formspree.io/f/xzzjarjg", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formStatus.textContent =
          "✅ Message sent successfully! I'll get back to you soon.";
        formStatus.classList.add("success");
        form.reset();
        setTimeout(() => {
          formStatus.style.display = "none";
        }, 5000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("❌ Error submitting contact form:", error);
      formStatus.textContent =
        "⚠️ Failed to send message. Please try again or email ahmedehab1232@gmail.com directly.";
      formStatus.classList.add("error");
      setTimeout(() => {
        formStatus.style.display = "none";
      }, 5000);
    }
  });

// ==================== TESTIMONIAL FORM ====================
function openTestimonialForm() {
  const modal = document.createElement("div");
  modal.className = "testimonial-modal";
  modal.innerHTML = `
    <div>
      <h3>Add Your Feedback</h3>
      <p>Your testimonial will be sent to Ahmed for review and won't appear publicly.</p>
      <form id="testimonialForm" action="https://formspree.io/f/xyzndwnw" method="POST">
        <div style="margin-bottom: 1rem;">
          <label for="tName">Name *</label>
          <input type="text" id="tName" name="name" required>
        </div>
        <div style="margin-bottom: 1rem;">
          <label for="tCompany">Company</label>
          <input type="text" id="tCompany" name="company">
        </div>
        <div style="margin-bottom: 1rem;">
          <label for="tPosition">Position</label>
          <input type="text" id="tPosition" name="position">
        </div>
        <div style="margin-bottom: 1rem;">
          <label for="tRating">Rating (1-5) *</label>
          <input type="number" id="tRating" name="rating" min="1" max="5" required>
        </div>
        <div style="margin-bottom: 1rem;">
          <label for="tText">Testimonial *</label>
          <textarea id="tText" name="text" required style="min-height: 100px;"></textarea>
        </div>
        <input type="hidden" name="_subject" value="New Testimonial Submission">
        <input type="hidden" name="_cc" value="ahmedehab1232@gmail.com">
        <div style="margin-bottom: 1rem; display: flex; gap: 1rem;">
          <button type="submit">Submit</button>
          <button type="button" onclick="this.closest('.testimonial-modal').remove()">Cancel</button>
        </div>
        <p id="testimonialFormStatus" style="display: none;"></p>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  document
    .getElementById("testimonialForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const status = document.getElementById("testimonialFormStatus");
      status.style.display = "block";
      status.textContent = "Submitting testimonial...";

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          status.textContent =
            "✅ Testimonial submitted successfully! Thank you for your feedback.";
          status.style.color = "#4ecdc4";
          form.reset();
          setTimeout(() => modal.remove(), 2000);
        } else {
          throw new Error("Submission failed");
        }
      } catch (error) {
        console.error("❌ Error submitting testimonial:", error);
        status.textContent =
          "⚠️ Failed to submit testimonial. Please try again or email ahmedehab1232@gmail.com.";
        status.style.color = "#ff6b6b";
      }
    });
}

// ==================== TESTIMONIALS DATA ====================
let testimonials = [];
let currentTestimonial = 0;
let swipeLocked = false;
let transitionFired = false;

async function loadTestimonials() {
  try {
    const res = await fetch("data/testimonials.json");
    if (res.ok) {
      testimonials = await res.json();
      window.testimonialsCount = testimonials.length;
      updateTestimonialCounts();
      console.log("✅ Testimonials loaded:", testimonials.length, "items");
    } else {
      console.warn("⚠️ testimonials.json not found – using defaults");
      testimonials = getDefaultTestimonials();
    }
  } catch (e) {
    console.error("❌ Error loading testimonials:", e);
    testimonials = getDefaultTestimonials();
  }

  initTestimonialCarousel();
}

function updateTestimonialCounts() {
  const count = window.testimonialsCount;
  const avg = (
    testimonials.reduce((s, t) => s + (t.rating || 5), 0) / count
  ).toFixed(1);

  /*  update counters  */
  document
    .querySelectorAll(".testimonial-count")
    .forEach((el) => (el.textContent = count));

  /*  update average  */
  document
    .querySelectorAll(".average-rating")
    .forEach((el) => (el.textContent = avg));
}

function getDefaultTestimonials() {
  return [
    {
      id: 1,
      name: "Dr. Mohamed Hassan",
      position: "Technical Director",
      company: "ITIDA",
      image: "https://placehold.co/100x100/4ECDC4/ffffff?text=MH",
      text: "Ahmed is an exceptional instructor. His deep knowledge in robotics and embedded systems, combined with his ability to explain complex concepts clearly, makes him invaluable to our training programmes.",
      rating: 5,
      date: "2024-09-01",
    },
    {
      id: 2,
      name: "Eng. Sarah Ahmed",
      position: "Project Manager",
      company: "FEDIS",
      image: "https://placehold.co/100x100/FF6B6B/ffffff?text=SA",
      text: "Working with Ahmed on product development has been outstanding. His attention to detail and innovative solutions consistently exceed expectations.",
      rating: 5,
      date: "2024-11-01",
    },
    {
      id: 3,
      name: "John Smith",
      position: "Robotics Lead",
      company: "Tech Innovations",
      image: "https://placehold.co/100x100/4ECDC4/ffffff?text=JS",
      text: "Ahmed's expertise in ROS and embedded systems helped us complete our autonomous robot project ahead of schedule. Highly recommended!",
      rating: 5,
      date: "2024-08-01",
    },
  ];
}

function initTestimonialCarousel() {
  const wrapper = document.getElementById("testimonialWrapper");
  const dotsContainer = document.getElementById("testimonialDots");

  if (!wrapper || !dotsContainer) return;

  const featuredTestimonials =
    testimonials.filter((t) => t.featured) || testimonials.slice(0, 5);

  if (!featuredTestimonials || featuredTestimonials.length === 0) {
    featuredTestimonials = getDefaultTestimonials();
  }

  wrapper.innerHTML = "";
  dotsContainer.innerHTML = "";

  const countElement = document.getElementById("testimonialCount");
  if (countElement) {
    countElement.textContent = testimonials.length + "+";
  }

  featuredTestimonials.forEach((testimonial, index) => {
    const testimonialCard = document.createElement("div");
    testimonialCard.className =
      index === 0 ? "testimonial-card active" : "testimonial-card";
    testimonialCard.innerHTML = `
      <div class="testimonial-header">
        <img src="${
          testimonial.image ||
          "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(testimonial.name)
        }" 
             alt="${testimonial.name}" 
             onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
               testimonial.name
             )}&background=4ecdc4&color=fff'">
        <div class="testimonial-info">
          <h4>${testimonial.name}</h4>
          <p>${testimonial.position} at ${testimonial.company}</p>
          <div class="rating">
            ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating || 5)}
          </div>
        </div>
      </div>
      <p class="testimonial-text">${testimonial.text}</p>
      <span class="testimonial-date">${formatTestimonialDate(
        testimonial.date
      )}</span>
    `;
    wrapper.appendChild(testimonialCard);

    const dot = document.createElement("button");
    dot.className = index === 0 ? "dot active" : "dot";
    dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);
    dot.onclick = () => goToTestimonial(index);

    // Add touch support for dots
    dot.addEventListener("touchend", (e) => {
      e.preventDefault();
      goToTestimonial(index);
    });

    dotsContainer.appendChild(dot);
  });

  currentTestimonial = 0;
  window.featuredTestimonials = featuredTestimonials;

  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }

  addSwipeSupport(wrapper);
}

function addSwipeSupport(element) {
  let touchStartX = 0;
  let touchEndX = 0;

  element.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  element.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    if (swipeLocked) return;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) < 50) return;

    swipeLocked = true;
    diff < 0 ? nextTestimonial() : prevTestimonial();

    if (!transitionFired) {
      const activeCard = element.querySelector(".testimonial-card.active");
      activeCard?.addEventListener(
        "transitionend",
        () => {
          swipeLocked = false;
          transitionFired = false;
        },
        { once: true }
      );
      transitionFired = true;
    }
  }
}

function formatTestimonialDate(dateString) {
  if (!dateString) return "Recent";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  } catch (e) {
    return "Recent";
  }
}

function nextTestimonial() {
  const featured = window.featuredTestimonials || testimonials.slice(0, 5);
  if (featured.length === 0) return;

  const cards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".testimonial-dots .dot");

  if (cards.length === 0 || dots.length === 0) return;

  cards[currentTestimonial]?.classList.remove("active");
  dots[currentTestimonial]?.classList.remove("active");

  currentTestimonial = (currentTestimonial + 1) % featured.length;

  cards[currentTestimonial]?.classList.add("active");
  dots[currentTestimonial]?.classList.add("active");
}

function prevTestimonial() {
  const featured = window.featuredTestimonials || testimonials.slice(0, 5);
  if (featured.length === 0) return;

  const cards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".testimonial-dots .dot");

  if (cards.length === 0 || dots.length === 0) return;

  cards[currentTestimonial]?.classList.remove("active");
  dots[currentTestimonial]?.classList.remove("active");

  currentTestimonial =
    (currentTestimonial - 1 + featured.length) % featured.length;

  cards[currentTestimonial]?.classList.add("active");
  dots[currentTestimonial]?.classList.add("active");
}

function goToTestimonial(index) {
  if (testimonials.length === 0 || index < 0 || index >= testimonials.length)
    return;

  const cards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".testimonial-dots .dot");

  if (cards.length === 0 || dots.length === 0) return;

  cards[currentTestimonial]?.classList.remove("active");
  dots[currentTestimonial]?.classList.remove("active");

  currentTestimonial = index;

  cards[currentTestimonial]?.classList.add("active");
  dots[currentTestimonial]?.classList.add("active");
}

function openAllTestimonials() {
  const modal = document.createElement("div");
  modal.className = "all-testimonials-modal active";
  modal.id = "allTestimonialsModal";

  // Calculate average rating
  const avgRating =
    testimonials.length > 0
      ? (
          testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) /
          testimonials.length
        ).toFixed(1)
      : "5.0";

  modal.innerHTML = `
    <div class="all-testimonials-content">
      <div class="all-testimonials-header">
        <div>
          <h3>All Testimonials (${testimonials.length})</h3>
          <p style="color: var(--text-secondary); margin-top: 0.5rem;">
            <i class="fas fa-star" style="color: #ffd700;"></i> 
            Average Rating: <strong style="color: var(--accent-primary);">${avgRating}/5.0</strong>
          </p>
        </div>
        <button class="modal-close-btn" onclick="closeAllTestimonials()" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="testimonial-filters">
        <button class="filter-rating-btn active" onclick="filterTestimonials('all')">
          All (${testimonials.length})
        </button>
        <button class="filter-rating-btn" onclick="filterTestimonials(5)">
          <i class="fas fa-star"></i> 5 Stars
        </button>
        <button class="filter-rating-btn" onclick="filterTestimonials(4)">
          <i class="fas fa-star"></i> 4 Stars
        </button>
      </div>
      
      <div class="testimonials-grid" id="allTestimonialsGrid">
        ${testimonials.map((t) => createCompactTestimonialCard(t)).join("")}
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeAllTestimonials();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", handleModalEscape);
}

function closeAllTestimonials() {
  const modal = document.getElementById("allTestimonialsModal");
  if (modal) {
    modal.remove();
    document.body.style.overflow = "auto";
    document.removeEventListener("keydown", handleModalEscape);
  }
}

function handleModalEscape(e) {
  if (e.key === "Escape") {
    closeAllTestimonials();
  }
}

function createCompactTestimonialCard(testimonial) {
  return `
    <div class="testimonial-card-compact" data-rating="${
      testimonial.rating || 5
    }">
      <div class="testimonial-header">
        <img src="${
          testimonial.image ||
          "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(testimonial.name)
        }" 
             alt="${testimonial.name}"
             onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
               testimonial.name
             )}&background=4ecdc4&color=fff'">
        <div class="testimonial-info">
          <h4>${testimonial.name}</h4>
          <p>${testimonial.position} at ${testimonial.company}</p>
          <div class="rating">
            ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating || 5)}
          </div>
        </div>
      </div>
      <p class="testimonial-text">${testimonial.text}</p>
      <span class="testimonial-date">${formatTestimonialDate(
        testimonial.date
      )}</span>
    </div>
  `;
}

function filterTestimonials(rating) {
  const cards = document.querySelectorAll(".testimonial-card-compact");
  const buttons = document.querySelectorAll(".filter-rating-btn");

  // Update active button
  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.closest(".filter-rating-btn").classList.add("active");

  // Filter cards
  cards.forEach((card) => {
    if (rating === "all") {
      card.style.display = "block";
    } else {
      const cardRating = parseInt(card.getAttribute("data-rating"));
      card.style.display = cardRating === rating ? "block" : "none";
    }
  });
}

// ==================== GLOBAL STATE ====================
let currentCarouselImage = 0;
let visitorData = { live: 0, total: 0 };
let userRole = null;

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function () {
  initializePortfolio();
  loadPortfolioData();
});

function initializePortfolio() {
  AOS.init({ duration: 1000, once: true, offset: 100 });

  const lastVisit = localStorage.getItem("lastQuizTime");
  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
  const now = Date.now();

  if (!lastVisit || now - parseInt(lastVisit) > oneHour) {
    setTimeout(() => showEntranceQuiz(), 2000);
  } else {
    hideLoadingScreen();
  }

  initNavbar();
  initThemeToggle();
  initMobileMenu();
  initCustomCursor();
  initTypingAnimation();
  initParticles();
  initCounters();
  initCarousel();
  initVisitorCounter();
  setTimeout(() => {
    const liveEl = document.getElementById("liveVisitors");
    if (liveEl && liveEl.textContent === "...") {
      console.error("❌ Live visitors not updating!");
      liveEl.textContent = "3"; // Fallback
    }
  }, 2000);

  loadTestimonials();
  initSmoothScroll();
  initBackToTop();
  initScrollProgress();
  loadProjects();
  loadVolunteering();
  loadSkills();
  setupSecretCommands();
  initMoodBasedTheme();
}

// ==================== ENTRANCE QUIZ ====================
function showEntranceQuiz() {
  const quiz = document.getElementById("entranceQuiz");
  quiz.style.display = "flex";

  setTimeout(() => {
    const firstOption = quiz.querySelector(".quiz-option");
    if (firstOption) firstOption.focus();
  }, 100);

  const options = quiz.querySelectorAll(".quiz-option");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      handleQuizSelection(option);
    });

    option.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleQuizSelection(option);
      }
    });
  });

  document.addEventListener("keydown", handleQuizEscape);
}

function handleQuizSelection(option) {
  const role = option.getAttribute("data-role");
  userRole = role;

  // Add selection animation
  option.style.transform = "scale(1.1)";
  option.style.borderColor = "var(--accent-primary)";

  setTimeout(() => {
    localStorage.setItem("userRole", role);
    localStorage.setItem("hasSeenQuiz", "true");
    localStorage.setItem("lastQuizTime", Date.now());

    handleUserRole(role);
    document.getElementById("entranceQuiz").style.display = "none";
    document.removeEventListener("keydown", handleQuizEscape);
    hideLoadingScreen();
  }, 300);
}

function handleQuizEscape(e) {
  if (e.key === "Escape") {
    skipQuiz();
  }
}

function skipQuiz() {
  localStorage.setItem("hasSeenQuiz", "true");
  localStorage.setItem("lastQuizTime", Date.now());
  document.getElementById("entranceQuiz").style.display = "none";
  document.removeEventListener("keydown", handleQuizEscape);
  hideLoadingScreen();
  showToast("👋 Welcome! Feel free to explore at your own pace.");
}

function handleUserRole(role) {
  switch (role) {
    case "recruiter":
      showToast("Welcome Recruiter! Highlighting experience and skills...");
      setTimeout(() => {
        document.querySelector('a[href="#experience"]')?.click();
      }, 1500);
      break;
    case "client":
      showToast("Welcome! Let me show you my recent projects...");
      setTimeout(() => {
        document.querySelector('a[href="#projects"]')?.click();
      }, 1500);
      break;
    case "visitor":
      showToast("Welcome! Feel free to explore at your own pace.");
      break;
  }
}

function hideLoadingScreen() {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1000);
}

// ==================== NAVIGATION ====================
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    updateActiveNavLink();
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// ==================== SIDEBAR ====================
document.getElementById("sidebarToggle")?.addEventListener("click", () => {
  document.getElementById("interactiveSidebar").classList.add("active");
});

function closeSidebar() {
  document.getElementById("interactiveSidebar").classList.remove("active");
}

document.querySelectorAll(".sidebar-link").forEach((link) => {
  link.addEventListener("click", () => {
    closeSidebar();
  });
});

// ==================== THEME TOGGLE ====================
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme") || "dark";
  body.classList.toggle("light-theme", savedTheme === "light");
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    const currentTheme = body.classList.contains("light-theme")
      ? "light"
      : "dark";
    localStorage.setItem("theme", currentTheme);
    updateThemeIcon(currentTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector("#themeToggle i");
  icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}

// ==================== MOOD-BASED THEME ====================
function initMoodBasedTheme() {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) {
    document.body.style.setProperty("--accent-primary", "#FFD700");
    showToast("☀️ Good morning! Theme adjusted for morning hours.");
  } else if (hour >= 18 && hour < 22) {
    document.body.style.setProperty("--accent-primary", "#FF8C42");
    showToast("🌆 Good evening! Theme adjusted for evening hours.");
  } else if (hour >= 22 || hour < 6) {
    document.body.style.setProperty("--accent-primary", "#6E8EFF");
    showToast("🌙 Good night! Theme adjusted for night hours.");
  }
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  mobileToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = mobileToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = mobileToggle?.querySelector("i");
      icon?.classList.remove("fa-times");
      icon?.classList.add("fa-bars");
    });
  });
}

// ==================== CUSTOM CURSOR ====================
function initCustomCursor() {
  const cursor = document.getElementById("cursor");
  const cursorDot = document.getElementById("cursorDot");

  if (!cursor || !cursorDot) return;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";
  });

  const clickables = document.querySelectorAll(
    "a, button, .project-card, .skill-card"
  );
  clickables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-hover");
      cursorDot.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-hover");
      cursorDot.classList.remove("cursor-hover");
    });
  });
}

// ==================== TYPING ANIMATION ====================
function initTypingAnimation() {
  const typingText = document.getElementById("typingText");
  const phrases = window.typingPhrases || [
    "Building Autonomous Robots",
    "Developing Embedded Systems",
    "Training AI Models",
    "Implementing Motion Control",
    "ROS1 & ROS2 Expert",
    "STM32 Firmware Developer",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      setTimeout(() => (isDeleting = true), 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
  }

  setTimeout(typeEffect, 1000);
}

// ==================== PARTICLE ANIMATION ====================
function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 100;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.fillStyle = "rgba(78, 205, 196, 0.5)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.strokeStyle = `rgba(78, 205, 196, ${0.2 - distance / 500})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ==================== IMAGE CAROUSEL ====================
function initCarousel() {
  const images = document.querySelectorAll(".carousel-images img");
  const indicators = document.getElementById("carouselIndicators");

  images.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = index === 0 ? "indicator active" : "indicator";
    dot.onclick = () => goToImage(index);
    indicators.appendChild(dot);
  });

  setInterval(() => {
    nextImage();
  }, 5000);
}

function nextImage() {
  const images = document.querySelectorAll(".carousel-images img");
  const indicators = document.querySelectorAll(".indicator");

  images[currentCarouselImage].classList.remove("active");
  indicators[currentCarouselImage].classList.remove("active");

  currentCarouselImage = (currentCarouselImage + 1) % images.length;

  images[currentCarouselImage].classList.add("active");
  indicators[currentCarouselImage].classList.add("active");
}

function prevImage() {
  const images = document.querySelectorAll(".carousel-images img");
  const indicators = document.querySelectorAll(".indicator");

  images[currentCarouselImage].classList.remove("active");
  indicators[currentCarouselImage].classList.remove("active");

  currentCarouselImage =
    (currentCarouselImage - 1 + images.length) % images.length;

  images[currentCarouselImage].classList.add("active");
  indicators[currentCarouselImage].classList.add("active");
}

function goToImage(index) {
  const images = document.querySelectorAll(".carousel-images img");
  const indicators = document.querySelectorAll(".indicator");

  images[currentCarouselImage].classList.remove("active");
  indicators[currentCarouselImage].classList.remove("active");

  currentCarouselImage = index;

  images[currentCarouselImage].classList.add("active");
  indicators[currentCarouselImage].classList.add("active");
}

// ==================== VISITOR COUNTER ====================
async function initVisitorCounter() {
  const namespace = "ahmedehab411-github-io";
  const key = "portfolio-visits";

  try {
    // First, update live visitors immediately
    const estimatedLive = Math.floor(Math.random() * 5) + 1;
    const liveElement = document.getElementById("liveVisitors");
    if (liveElement) {
      liveElement.textContent = estimatedLive;
    }

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Visitor count:", data.value);

      // Update live visitors with better estimate
      const betterLive = Math.max(1, Math.floor(Math.random() * 5) + 1);
      if (liveElement) {
        liveElement.textContent = betterLive;
      }

      // Update live count every 30 seconds
      setInterval(() => {
        const newLive = Math.max(1, Math.floor(Math.random() * 5) + 1);
        const el = document.getElementById("liveVisitors");
        if (el) {
          el.textContent = newLive;
        }
      }, 30000);
    } else {
      throw new Error("CountAPI not available");
    }
  } catch (error) {
    console.warn("Using fallback counter:", error);

    // Fallback: show live visitors anyway
    let localCount = parseInt(
      localStorage.getItem("portfolio_visit_count") || "0"
    );
    localCount++;
    localStorage.setItem("portfolio_visit_count", localCount);

    const liveElement = document.getElementById("liveVisitors");
    if (liveElement) {
      liveElement.textContent = Math.floor(Math.random() * 3) + 1;
    }

    // Update periodically
    setInterval(() => {
      const el = document.getElementById("liveVisitors");
      if (el) {
        el.textContent = Math.floor(Math.random() * 3) + 1;
      }
    }, 30000);
  }
}
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ==================== COUNTER ANIMATION ====================
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  const observerOptions = { threshold: 0.5 };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        animateCounter(counter, target);
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => counterObserver.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target > 100 ? target + "+" : target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 20);
}
// ==================== TYPING TEST GAME ====================
const sampleTexts = [
  "Artificial intelligence is revolutionizing the tech industry by enabling machines to perform tasks that typically require human intelligence. From natural language processing to computer vision, AI algorithms are powering applications like autonomous vehicles, medical diagnostics, and personalized recommendations.",
  "Robotics is at the forefront of technological advancement, blending hardware and software to create machines that interact with the physical world. Modern robots leverage sensors, actuators, and sophisticated algorithms to navigate environments, perform tasks, and collaborate with humans.",
  "Software development drives innovation in the digital age, with programming languages like Python, JavaScript, and C++ powering everything from web applications to embedded systems. Developers rely on version control systems like Git to collaborate on complex projects.",
  "Cybersecurity is a critical concern as digital systems become integral to daily life. Protecting data from breaches and attacks requires robust strategies, including encryption, firewalls, and intrusion detection systems.",
  "Quantum computing represents the next frontier in computational power, leveraging quantum mechanics to solve problems beyond the reach of classical computers.",
];

let typingTestActive = false;
let typingTestTimer = null;
let typingTestStartTime = null;
let typingTestErrors = 0;
let typingTestCurrentText = "";
let typingTestCurrentIndex = 0;

function toggleTypingTest() {
  const container = document.getElementById("typingTestContainer");
  container.style.display =
    container.style.display === "none" ? "block" : "none";
  if (container.style.display === "none" && typingTestActive) {
    endTypingTest();
  }
}

function initTypingTest() {
  const input = document.getElementById("typingInput");
  const prompt = document.getElementById("typingPrompt");
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const restartBtn = document.getElementById("restartBtn");
  const timeDisplay = document.getElementById("typingTime");
  const wpmDisplay = document.getElementById("typingWPM");
  const accuracyDisplay = document.getElementById("typingAccuracy");
  const errorsDisplay = document.getElementById("typingErrors");
  const statusDisplay = document.getElementById("typingStatus");

  input?.addEventListener("paste", (e) => {
    e.preventDefault();
    showToast("🚫 Pasting is disabled. Please type the text manually.");
  });

  function setRandomText() {
    typingTestCurrentText =
      sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    typingTestCurrentIndex = 0;
    typingTestErrors = 0;
    prompt.innerHTML = `<span class="untyped">${typingTestCurrentText}</span>`;
    input.value = "";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100";
    errorsDisplay.textContent = "0";
    timeDisplay.textContent = "0";
  }

  function updateHighlights() {
    const typed = typingTestCurrentText.slice(0, typingTestCurrentIndex);
    const untyped = typingTestCurrentText.slice(typingTestCurrentIndex);
    prompt.innerHTML = `<span class="typed">${typed}</span><span class="untyped">${untyped}</span>`;
  }

  function calculateResults() {
    const elapsedSeconds = (Date.now() - typingTestStartTime) / 1000;
    const words = typingTestCurrentIndex / 5;
    const wpm = Math.round(words / (elapsedSeconds / 60)) || 0;
    const accuracy =
      typingTestCurrentIndex > 0
        ? Math.round(
            ((typingTestCurrentIndex - typingTestErrors) /
              typingTestCurrentIndex) *
              100
          )
        : 100;
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = `${accuracy}`;
    errorsDisplay.textContent = typingTestErrors;
    timeDisplay.textContent = Math.round(elapsedSeconds);
  }

  function startTypingTest() {
    if (typingTestActive) return;
    typingTestActive = true;
    typingTestStartTime = Date.now();
    setRandomText();
    input.disabled = false;
    input.focus();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    restartBtn.disabled = false;
    statusDisplay.textContent = "Type the text above. Press Stop to end.";
    typingTestTimer = setInterval(calculateResults, 1000);
  }

  function endTypingTest() {
    if (!typingTestActive) return;
    typingTestActive = false;
    clearInterval(typingTestTimer);
    input.disabled = true;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    restartBtn.disabled = false;
    calculateResults();
    const wpm = wpmDisplay.textContent;
    const accuracy = accuracyDisplay.textContent;
    statusDisplay.textContent =
      "Test stopped. Press Enter or Restart to try again.";
    showToast(`✅ Test completed! Speed: ${wpm} WPM | Accuracy: ${accuracy}%`);
  }

  function restartTypingTest() {
    if (typingTestActive) {
      endTypingTest();
    }
    startTypingTest();
  }

  startBtn?.addEventListener("click", startTypingTest);
  stopBtn?.addEventListener("click", endTypingTest);
  restartBtn?.addEventListener("click", restartTypingTest);
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (!typingTestActive) {
        startTypingTest();
      } else {
        e.preventDefault();
      }
    }
  });
  input?.addEventListener("input", () => {
    if (!typingTestActive) return;
    const typed = input.value;
    typingTestCurrentIndex = typed.length;
    typingTestErrors = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] !== typingTestCurrentText[i]) {
        typingTestErrors++;
      }
    }
    updateHighlights();
    calculateResults();
    if (typed === typingTestCurrentText) {
      endTypingTest();
      statusDisplay.textContent =
        "🎉 Test completed! Press Enter or Restart to try again.";
    }
  });

  setRandomText();
}

document.addEventListener("DOMContentLoaded", initTypingTest);

// ==================== PROJECTS ====================
let allProjects = [];
let currentProjectPage = 0;
const PROJECTS_PER_PAGE = 3;
function getProjectImage(project) {
  // Check if image exists and is not empty
  if (project.image && project.image.trim() !== "") {
    return project.image;
  }

  // Generate contextual placeholder based on category
  const placeholders = {
    robotics:
      "https://via.placeholder.com/400x300/302B63/4ECDC4?text=Robotics+Project",
    ai: "https://via.placeholder.com/400x300/302B63/FF6B6B?text=AI+Project",
    embedded:
      "https://via.placeholder.com/400x300/302B63/FFD700?text=Embedded+Project",
    software:
      "https://via.placeholder.com/400x300/302B63/FFFFFF?text=Software+Project",
  };

  return (
    placeholders[project.category] ||
    "https://via.placeholder.com/400x300/302B63/4ECDC4?text=Project"
  );
}

function showProjectToast(message, type = "info") {
  const colors = {
    info: "#4ecdc4",
    success: "#4caf50",
    warning: "#ffc107",
    error: "#ff6b6b",
  };

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.background = colors[type] || colors.info;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function getProjectStatusBadge(status) {
  const badges = {
    complete: '<span class="status-badge complete">✅ Complete</span>',
    "github-soon":
      '<span class="status-badge soon">🚧 GitHub Coming Soon</span>',
    "github-available":
      '<span class="status-badge available">📁 Code Available</span>',
    "completed-unavailable":
      '<span class="status-badge unavailable">📂 Completed (Unavailable)</span>',
  };
  return badges[status] || "";
}

async function loadProjects() {
  try {
    const res = await fetch("data/projects.json");
    const projects = res.ok ? await res.json() : getDefaultProjects();
    displayProjects(projects, "all");

    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        displayProjects(projects, btn.dataset.filter);
      });
    });
  } catch (e) {
    console.error("Error loading projects:", e);
    displayProjects(getDefaultProjects(), "all");
  }
}

function getDefaultProjects() {
  return [
    {
      id: 1,
      title: "Autonomous Mobile Warehouse Robot",
      description:
        "Graduation project featuring autonomous navigation using ROS, real-time control with STM32.",
      image:
        "https://via.placeholder.com/400x300/302B63/4ECDC4?text=Warehouse+Robot",
      tags: ["ROS", "STM32", "PD Control", "Navigation"],
      category: "robotics",
      featured: true,
      github: "https://github.com/ahmedehab411",
    },
  ];
}

function displayProjects(projects, filter) {
  const projectsGrid = document.getElementById("projectsGrid");
  if (!projectsGrid) return;

  // Sort by priority and featured status
  const sortedProjects = projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.priority === "high" && b.priority !== "high") return -1;
    if (a.priority !== "high" && b.priority === "high") return 1;
    return 0;
  });

  // Filter projects
  allProjects =
    filter === "all"
      ? sortedProjects
      : sortedProjects.filter((project) => project.category === filter);

  currentProjectPage = 0;
  renderProjectPage();
  updateProjectNavigation();
}

function renderProjectPage() {
  const projectsGrid = document.getElementById("projectsGrid");
  if (!projectsGrid) return;

  const start = currentProjectPage * PROJECTS_PER_PAGE;
  const end = start + PROJECTS_PER_PAGE;
  const pageProjects = allProjects.slice(start, end);

  projectsGrid.innerHTML = "";

  if (pageProjects.length === 0) {
    projectsGrid.innerHTML =
      '<div class="empty-state" style="grid-column: 1/-1;"><i class="fas fa-folder-open"></i><br>No projects found</div>';
    return;
  }

  pageProjects.forEach((project, index) => {
    const projectCard = createProjectCard(project, index);
    projectsGrid.appendChild(projectCard);
  });

  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
}

function filterByStatus(status) {
  const filtered = projectsData.filter(
    (project) =>
      project.status === status ||
      (status === "available" && project.github !== "#")
  );
  displayProjects(filtered, "all");
}

function createProjectCard(project, index) {
  const card = document.createElement("div");
  card.className = "project-card";
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-delay", (index % 3) * 100);

  const projectImage = getProjectImage(project);
  const featuredBadge = project.featured
    ? '<span class="featured-badge"><i class="fas fa-star"></i> Featured</span>'
    : "";

  const statusBadge = getProjectStatusBadge(project.status);

  const isCompletedUnavailable = project.status === "completed-unavailable";
  const isGithubSoon = project.status === "github-soon";
  const hasGithub =
    project.github && project.github !== "#" && project.github !== "";

  const shouldDisableGithub = isCompletedUnavailable || isGithubSoon;

  const githubButton = shouldDisableGithub
    ? ""
    : hasGithub
    ? `<a href="${project.github}" class="project-link" target="_blank" title="View on GitHub">
           <i class="fab fa-github"></i>
         </a>`
    : `<button class="project-link disabled" 
           onclick="handleMissingProject('${project.status}')" 
           title="${getDisabledTitle(project.status)}"
           disabled>
           <i class="fab fa-github"></i>
         </button>`;

  card.innerHTML = `
    <div class="project-image">
      <img src="${projectImage}" 
           alt="${project.title}"
           onerror="this.src='https://via.placeholder.com/400x300/24243e/4ECDC4?text=Project+Image'">
      ${featuredBadge}
      ${statusBadge}
      <div class="project-overlay">
        ${githubButton}
      </div>
    </div>
    <div class="project-info">
      <h3>${project.title}</h3>
      <p>${project.description}</p> 
  `;

  return card;
}

function handleMissingProject(status, type) {
  if (status === "completed-unavailable") {
    showProjectToast(
      "This project was completed but is currently unavailable. 📂",
      "unavailable"
    );
  } else if (
    status.includes("completed-lost") ||
    status.includes("completed-missing")
  ) {
    showProjectToast(
      "This project was completed but the original files are no longer available. 📂",
      "lost"
    );
  } else if (status.includes("completed-legacy")) {
    showProjectToast(
      "This is a legacy project completed in the past. Original files are unavailable. 🏛️",
      "legacy"
    );
  } else {
    showProjectToast(
      `${type === "github" ? "GitHub repository" : "Demo"} coming soon! 🚧`,
      "info"
    );
  }
}

function updateProjectNavigation() {
  const totalPages = Math.ceil(allProjects.length / PROJECTS_PER_PAGE);
  let navContainer = document.getElementById("projectNavigation");

  if (!navContainer) {
    const nav = document.createElement("div");
    nav.id = "projectNavigation";
    nav.className = "project-navigation";
    const projectsContainer = document.querySelector("#projects .container");
    if (projectsContainer) {
      projectsContainer.appendChild(nav);
    }
    navContainer = nav;
  }

  if (totalPages <= 1) {
    navContainer.style.display = "none";
    return;
  }

  navContainer.style.display = "flex";
  navContainer.innerHTML = `
        <button class="nav-btn prev-btn" onclick="navigateProjects('prev')" ${
          currentProjectPage === 0 ? "disabled" : ""
        }>
            <i class="fas fa-chevron-left"></i> Previous
        </button>
        <div class="page-indicator">
            <span class="current-page">${
              currentProjectPage + 1
            }</span> / <span class="total-pages">${totalPages}</span>
        </div>
        <button class="nav-btn next-btn" onclick="navigateProjects('next')" ${
          currentProjectPage >= totalPages - 1 ? "disabled" : ""
        }>
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;
}

function navigateProjects(direction) {
  const totalPages = Math.ceil(allProjects.length / PROJECTS_PER_PAGE);

  if (direction === "prev" && currentProjectPage > 0) {
    currentProjectPage--;
  } else if (direction === "next" && currentProjectPage < totalPages - 1) {
    currentProjectPage++;
  }

  renderProjectPage();
  updateProjectNavigation();

  const projectsGrid = document.getElementById("projectsGrid");
  if (projectsGrid) {
    const offsetTop = projectsGrid.offsetTop - 100; // 100px offset for navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

// ==================== SKILLS ====================
async function loadSkills() {
  try {
    const res = await fetch("data/skills.json");
    const skillTree = res.ok ? await res.json() : { skills: {} };
    renderSkills(skillTree.skills || skillTree);
  } catch (e) {
    console.error("Error loading skills:", e);
  }
}

function renderSkills(skillTree) {
  const skillsSection = document.querySelector("#skills .container");
  if (!skillsSection) return;

  const categoryMeta = {
    programming_languages: { icon: "💻", title: "Programming Languages" },
    os_and_tools: { icon: "🖥️", title: "OS & Dev-Tools" },
    software_development: { icon: "⚙️", title: "Software Development" },
    robotics: { icon: "🤖", title: "Robotics & Control" },
    data_science_ml: { icon: "🧠", title: "Data-Science & ML" },
    embedded_systems: { icon: "⚡", title: "Embedded Systems" },
    other_skills: { icon: "🔧", title: "Other Skills" },
  };

  let html = `
      <div class="section-header" data-aos="fade-up">
        <h2>Technical <span class="gradient-text">Skills</span></h2>
        <p>Technologies and tools I master</p>
      </div>
      <div class="skills-container">`;

  let delay = 0;
  for (const [cat, list] of Object.entries(skillTree)) {
    const meta = categoryMeta[cat] || {
      icon: "📦",
      title: cat.replace(/_/g, " ").toUpperCase(),
    };

    html += `
        <div class="skill-category" data-category="${cat}" data-aos="fade-up" data-aos-delay="${delay}">
          <div class="skill-category-header">
            <div class="skill-category-icon">${meta.icon}</div>
            <h3 class="skill-category-title">${meta.title}</h3>
          </div>
          <div class="skill-tags">
            ${list.map((skill) => `<span class="tag">${skill}</span>`).join("")}
          </div>
        </div>`;
    delay += 100;
  }

  html += "</div>";
  skillsSection.innerHTML = html;
  if (typeof AOS !== "undefined") AOS.refresh();
}

// ==================== ENHANCED AI CHATBOT ====================
let chatHistory = [];

function toggleChatbot() {
  const chatWindow = document.getElementById("chatbotWindow");
  chatWindow.classList.toggle("active");
}

function openChatbot() {
  document.getElementById("chatbotWindow").classList.add("active");
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();

  if (!message) return;

  addChatMessage("user", message);
  input.value = "";

  setTimeout(() => {
    const response = getChatbotResponse(message);
    addChatMessage("bot", response);
  }, 1000);
}

function handleChatEnter(event) {
  if (event.key === "Enter") {
    sendChatMessage();
  }
}

function addChatMessage(sender, message) {
  const messagesContainer = document.getElementById("chatbotMessages");
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "user" ? "user-message" : "bot-message";
  messageDiv.innerHTML = `<p>${message}</p>`;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  chatHistory.push({ sender, message });
}

function getChatbotResponse(message) {
  const lowerMessage = message.toLowerCase();

  // CV Download
  if (
    lowerMessage.includes("cv") ||
    lowerMessage.includes("resume") ||
    lowerMessage.includes("download")
  ) {
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = CONFIG.resumePath;
      link.download = "Ahmed_Ehab_CV.pdf";
      link.click();
      showToast("📄 CV download started!");
    }, 500);
    return "Sure! I'm downloading Ahmed's CV for you. You can also find it in the top navigation bar. The CV includes his complete experience in R&D Product Engineering, robotics, embedded systems, and AI/ML.";
  }

  // Specific project inquiries
  if (
    lowerMessage.includes("warehouse robot") ||
    lowerMessage.includes("graduation project")
  ) {
    return "Ahmed's graduation project is an Autonomous Mobile Warehouse Robot! 🤖\n\nKey features:\n• Autonomous navigation using ROS Noetic\n• Real-time motion control with STM32 microcontroller\n• PD control algorithms for precise movement\n• LiDAR sensor integration for obstacle detection\n• Custom path planning algorithms\n\nThis project demonstrates his expertise in integrating robotics software (ROS) with embedded hardware (STM32) for real-world applications. Check the Projects section for more details!";
  }

  // Hiring/rates
  if (
    lowerMessage.includes("rate") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("price") ||
    lowerMessage.includes("fee")
  ) {
    return "For project rates and availability, Ahmed prefers to discuss requirements directly to provide accurate quotes. Rates vary based on:\n\n• Project complexity and duration\n• Required technologies (ROS, Embedded, AI/ML)\n• Timeline and deliverables\n• Ongoing support needs\n\nPlease contact him at ahmedehab1232@gmail.com or use the contact form to discuss your specific needs!";
  }

  // Timeline/availability
  if (
    lowerMessage.includes("how long") ||
    lowerMessage.includes("timeline") ||
    lowerMessage.includes("when can you")
  ) {
    return "Project timelines depend on scope and complexity. Typical timeframes:\n\n• Small embedded projects: 1-2 weeks\n• ROS integration tasks: 2-4 weeks\n• Full robot development: 1-3 months\n• AI/ML model deployment: 2-6 weeks\n\nAhmed can usually start new projects within 1-2 weeks. For urgent requirements, he may be able to accommodate faster start dates. Contact him to discuss your specific timeline!";
  }

  // Training/teaching
  if (
    lowerMessage.includes("training") ||
    lowerMessage.includes("teach") ||
    lowerMessage.includes("course") ||
    lowerMessage.includes("workshop")
  ) {
    return "Yes! Ahmed offers technical training and workshops 👨‍🏫\n\nHe has trained 3000+ students in:\n\n• Advanced Robotics & ROS\n• Modern C++ Programming\n• STM32 Embedded Systems\n• Motion Control Algorithms\n• AI/ML Fundamentals\n\nHe can provide:\n✅ Corporate training programs\n✅ University workshops\n✅ One-on-one mentoring\n✅ Online/offline sessions\n\nInterested? Email ahmedehab1232@gmail.com to discuss a training program!";
  }

  // Specific tech questions
  if (
    lowerMessage.includes("can you") &&
    (lowerMessage.includes("help") ||
      lowerMessage.includes("build") ||
      lowerMessage.includes("develop"))
  ) {
    return "Yes, Ahmed can help with:\n\n🤖 **Robotics**:\n• Autonomous navigation systems\n• ROS/ROS2 development\n• Robot integration & testing\n\n⚡ **Embedded**:\n• STM32/ARM firmware\n• Motion control systems\n• CAN/LIN protocol implementation\n\n🧠 **AI/ML**:\n• Computer vision applications\n• ML model deployment\n• Neural network training\n\n🛠️ **Plus**:\n• Technical consulting\n• Code review & optimization\n• System architecture design\n\nWhat's your project about? Feel free to reach out!";
  }

  // Experience
  if (
    lowerMessage.includes("experience") ||
    lowerMessage.includes("work") ||
    lowerMessage.includes("job") ||
    lowerMessage.includes("career")
  ) {
    return "Ahmed has 3+ years of professional experience! 💼\n\n**Current**: R&D Product Engineer at FEDIS\n• End-to-end product development\n• Embedded systems integration\n• Prototype development & testing\n\n**Concurrent**: Part-time Technical Instructor at ITIDA (2+ years)\n• 80+ instructional sessions\n• 40+ practical projects\n• 3000+ students trained\n\n**Specializations**:\n✅ ROS1/ROS2 development\n✅ STM32 firmware\n✅ Motion control (PD/PID)\n✅ AI/ML deployment\n\nWant more details? Check the Experience section!";
  }

  // Skills - more detailed
  if (
    lowerMessage.includes("skills") ||
    lowerMessage.includes("technology") ||
    lowerMessage.includes("tech stack") ||
    lowerMessage.includes("know")
  ) {
    return "Ahmed's comprehensive tech stack:\n\n🤖 **Robotics**:\n• ROS1 Noetic, ROS2 (Humble/Jazzy)\n• Navigation, SLAM, Motion Planning\n• Sensor Fusion (LiDAR, IMU, Camera)\n\n⚡ **Embedded**:\n• STM32, ARM Cortex-M, AVR\n• FreeRTOS, Embedded C/C++\n• CAN, LIN, UART, I2C, SPI\n• PD/PID Controllers\n\n💻 **Programming**:\n• C/C++ (Modern C++17/20)\n• Python (NumPy, Pandas, Matplotlib)\n• Rust (Intermediate)\n\n🧠 **AI/ML**:\n• PyTorch, TensorFlow\n• CNNs, Deep Learning\n• Computer Vision (OpenCV)\n\n🛠️ **Tools**:\n• Linux, Git, CMake\n• Qt Creator, MATLAB\n• Docker, LabVIEW\n\nView the Skills section for the complete list!";
  }

  // Projects - more comprehensive
  if (
    lowerMessage.includes("project") ||
    lowerMessage.includes("portfolio") ||
    lowerMessage.includes("work sample") ||
    lowerMessage.includes("what have you built")
  ) {
    return "Ahmed has 50+ projects across multiple domains! 🚀\n\n**Featured Projects**:\n\n🤖 **Autonomous Warehouse Robot** (Graduation)\n• ROS-based navigation\n• STM32 real-time control\n• LiDAR integration\n\n🧠 **Neural Networks from Scratch**\n• 95% accuracy on MNIST\n• Pure NumPy implementation\n• Deep understanding of ML fundamentals\n\n📸 **CNN Image Classifier**\n• 98.96% accuracy\n• PyTorch implementation\n• Data augmentation pipeline\n\n🏠 **Smart Home System**\n• Distributed ECU architecture\n• CAN bus communication\n• Real-time coordination\n\n🌊 **ROV Control System**\n• Underwater navigation\n• Sensor integration\n• Remote operation\n\n**Categories**: Robotics, AI/ML, Embedded, IoT\n\nVisit the Projects section to explore more!";
  }

  // Contact - enhanced
  if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("hire") ||
    lowerMessage.includes("email") ||
    lowerMessage.includes("reach") ||
    lowerMessage.includes("get in touch")
  ) {
    return "📬 **Contact Ahmed**:\n\n📧 **Email**: ahmedehab1232@gmail.com\n📱 **Phone**: (+20) 1027715033\n📍 **Location**: Cairo, Egypt (GMT+2)\n\n**Professional Profiles**:\n💼 LinkedIn: linkedin.com/in/ahmedehab1232\n💻 GitHub: github.com/ahmedehab411\n👤 Facebook: facebook.com/ahmed.ehab.9216\n💬 WhatsApp: wa.me/201027715033\n\n**Availability**: Currently available for:\n✅ Freelance projects\n✅ Consulting\n✅ Technical training\n✅ Part-time opportunities\n\n**Response Time**: Usually within 24 hours!\n\nPrefer the contact form? Scroll down to the Contact section!";
  }

  // Education - more detailed
  if (
    lowerMessage.includes("education") ||
    lowerMessage.includes("degree") ||
    lowerMessage.includes("study") ||
    lowerMessage.includes("university") ||
    lowerMessage.includes("graduated")
  ) {
    return "🎓 **Education & Certifications**:\n\n**Degree**:\n• B.Sc. Mechatronics Engineering\n• Helwan University (2018-2023)\n• Grade: Very Good with Honors\n\n**Professional Certifications**:\n\n📜 **Embedded Systems**:\n• Embedded Software Development (ARM & AVR) - IMT\n• Advanced techniques in firmware development\n\n🎛️ **Control Systems**:\n• Classic Control & PLC Programming - HA Consulting\n• Industrial automation expertise\n\n🤖 **Machine Learning**:\n• ML Specialization - Andrew Ng (Coursera)\n• Deep Learning Specialization (In Progress)\n• Mathematics for ML - Luis Serrano\n\n**Continuous Learning**:\n• Currently: Deep Learning Specialization (75%)\n• Next: ROS2 Advanced Concepts\n\nEducation never stops! 📚";
  }

  // Volunteering - enhanced
  if (
    lowerMessage.includes("volunteer") ||
    lowerMessage.includes("ieee") ||
    lowerMessage.includes("leadership") ||
    lowerMessage.includes("community")
  ) {
    return "🤝 **Volunteering & Leadership**:\n\n**IEEE Helwan Student Branch**:\n\n👔 **Executive Chairperson** (2022-2023):\n• Led team of 21 members\n• Organized events for 3000+ students\n• Won 3 global IEEE prizes\n• Managed $15K+ budget\n\n🤖 **RAS Chapter Director** (2021-2022):\n• Built robotics community\n• Organized competitions\n• Technical workshops\n\n⚙️ **RAS Project Team - Control Leader** (2020-2021):\n• Led control systems development\n• Mentored team members\n• Competition preparations\n\n🌊 **ROV Member** - Robotics Student Organization:\n• Underwater robot development\n• Team collaboration\n• Problem-solving\n\n**Impact**: Helped build one of Egypt's strongest student robotics communities! 🏆";
  }

  // Availability - detailed
  if (
    lowerMessage.includes("available") ||
    lowerMessage.includes("freelance") ||
    lowerMessage.includes("opportunity") ||
    lowerMessage.includes("free time")
  ) {
    return "✅ **Current Availability**:\n\nAhmed is available for:\n\n**Freelance Projects**:\n• Autonomous robot development\n• ROS/ROS2 integration\n• Embedded systems design\n• Motion control implementation\n• AI/ML model deployment\n\n**Consulting Services**:\n• Technical architecture review\n• Code review & optimization\n• Technology selection guidance\n• Feasibility studies\n\n**Training & Mentorship**:\n• Corporate workshops\n• One-on-one mentoring\n• Team training programs\n\n**Commitment**:\n• Can start within 1-2 weeks\n• Flexible hours for urgent projects\n• Remote & on-site options\n\n**Working Hours**: GMT+2 (Cairo)\n**Response Time**: < 24 hours\n\nReady to discuss your project? Contact ahmedehab1232@gmail.com!";
  }

  // ROS specific - very detailed
  if (
    lowerMessage.includes("ros") ||
    lowerMessage.includes("robot operating system") ||
    lowerMessage.includes("navigation")
  ) {
    return "🤖 **ROS Expertise**:\n\nAhmed is highly skilled in both ROS1 & ROS2!\n\n**ROS1 (Noetic)**:\n• Navigation Stack (move_base)\n• SLAM (gmapping, cartographer)\n• TF transformations\n• Custom node development\n• Sensor drivers (LiDAR, Camera, IMU)\n• Actionlib servers/clients\n\n**ROS2 (Humble & Jazzy)**:\n• Nav2 navigation stack\n• Lifecycle nodes\n• DDS middleware\n• Composition & components\n• Modern C++ practices\n\n**Real-World Applications**:\n✅ Autonomous mobile robots\n✅ Warehouse automation\n✅ Path planning algorithms\n✅ Obstacle avoidance\n✅ Multi-robot coordination\n\n**Integration**:\n• ROS + STM32 (micro-ROS)\n• ROS + Computer Vision\n• ROS + Motion Control\n\nUsed in his graduation project and professional work!";
  }

  // Embedded - comprehensive
  if (
    lowerMessage.includes("stm32") ||
    lowerMessage.includes("embedded") ||
    lowerMessage.includes("firmware") ||
    lowerMessage.includes("microcontroller")
  ) {
    return "⚡ **Embedded Systems Mastery**:\n\n**Microcontrollers**:\n• STM32 (F4, F7, H7 series)\n• ARM Cortex-M architecture\n• AVR (ATmega series)\n\n**Development**:\n• Bare-metal programming\n• FreeRTOS implementation\n• HAL & LL drivers\n• CMSIS integration\n\n**Communication Protocols**:\n📡 **Automotive**:\n• CAN 2.0 & CAN-FD\n• LIN protocol\n\n📡 **Common**:\n• UART, USART\n• I2C (Master/Slave)\n• SPI (Multi-device)\n• USB CDC\n\n**Control Systems**:\n• PD/PID controllers\n• Motor control (DC, Stepper, Servo)\n• PWM generation\n• Encoder reading\n\n**Advanced**:\n• DMA transfers\n• Interrupt handling\n• Watchdog timers\n• Bootloader development\n• MISRA C compliance\n\n**Tools**: STM32CubeIDE, Keil, IAR, GDB\n\nExperience from both academic and professional projects!";
  }

  // AI/ML - very comprehensive
  if (
    lowerMessage.includes("machine learning") ||
    lowerMessage.includes("ai") ||
    lowerMessage.includes("deep learning") ||
    lowerMessage.includes("neural") ||
    lowerMessage.includes("pytorch") ||
    lowerMessage.includes("tensorflow")
  ) {
    return "🧠 **AI/ML Expertise**:\n\n**Frameworks & Libraries**:\n• PyTorch (Primary)\n• TensorFlow/Keras\n• scikit-learn\n• OpenCV (Computer Vision)\n\n**Deep Learning**:\n• Neural Networks from Scratch (95% MNIST)\n• CNNs (98.96% accuracy)\n• Transfer Learning\n• Model optimization\n\n**ML Algorithms**:\n• Linear/Logistic Regression\n• Decision Trees & Random Forests\n• XGBoost\n• K-Means Clustering\n• PCA\n\n**Computer Vision**:\n• Image classification\n• Object detection\n• Image segmentation\n• Feature extraction\n\n**Data Processing**:\n• NumPy, Pandas\n• Data augmentation\n• Feature engineering\n• Normalization techniques\n\n**Deployment**:\n✅ Model optimization (quantization)\n✅ Edge deployment\n✅ ROS integration\n✅ Real-time inference\n\n**Current Learning**: Deep Learning Specialization (75%)\n\nSpecializes in deploying AI for robotics! 🤖";
  }

  // Testimonials
  if (
    lowerMessage.includes("testimonial") ||
    lowerMessage.includes("review") ||
    lowerMessage.includes("feedback")
  ) {
    return '⭐ **Client Testimonials**:\n\nAhmed has received excellent feedback from:\n\n• **40+ Happy Clients**\n• **4.9/5 Average Rating**\n\nFeatured testimonials from:\n• Technical directors\n• Project managers\n• Fellow engineers\n• Students & mentees\n\nCommon themes:\n✅ Deep technical knowledge\n✅ Clear communication\n✅ Problem-solving ability\n✅ Deadline commitment\n✅ Quality deliverables\n\nCheck the Testimonials section to read them!\n\nWorked with Ahmed? Add your feedback using the "Add Your Feedback" button!';
  }

  // Specific tech combinations
  if (
    (lowerMessage.includes("ros") && lowerMessage.includes("stm32")) ||
    (lowerMessage.includes("robot") && lowerMessage.includes("embedded"))
  ) {
    return "🔧 **ROS + Embedded Integration**:\n\nAhmed specializes in bridging high-level robotics (ROS) with low-level hardware (STM32)!\n\n**Integration Approach**:\n\n1️⃣ **Communication Layer**:\n• Serial (UART) bridge\n• micro-ROS integration\n• Custom protocol design\n\n2️⃣ **Real-time Control**:\n• STM32 handles motor control\n• PD/PID loops at high frequency\n• Sensor data processing\n\n3️⃣ **ROS Side**:\n• High-level planning\n• Navigation stack\n• Sensor fusion\n\n**Real Example**: Autonomous Warehouse Robot\n• ROS Noetic for navigation\n• STM32 for motor control\n• CAN bus for multi-ECU\n• Real-time coordination\n\n**Benefits**:\n✅ Best of both worlds\n✅ Reliable real-time performance\n✅ Flexible high-level control\n\nThis is his specialty! 💪";
  }

  // Languages
  if (
    lowerMessage.includes("language") &&
    !lowerMessage.includes("programming")
  ) {
    return "🗣️ **Languages**:\n\n• **Arabic**: Native speaker\n• **English**: Fluent (Professional working proficiency)\n\nCan communicate effectively in both languages for:\n• Technical documentation\n• Client meetings\n• Training sessions\n• Code comments\n\nPreferred for technical work: English\nComfortable with: Both languages";
  }

  // Comparison with others
  if (
    lowerMessage.includes("why") &&
    (lowerMessage.includes("choose") || lowerMessage.includes("hire"))
  ) {
    return "💡 **Why Choose Ahmed?**\n\n**Unique Combination**:\n✅ **Robotics** (ROS1/ROS2)\n✅ **Embedded** (STM32, ARM)\n✅ **AI/ML** (PyTorch, TensorFlow)\n✅ **Teaching** (3000+ students)\n\n**Not just coding**:\n• Understands full system architecture\n• Hardware + Software integration\n• Real-world deployment experience\n• Clear communication\n\n**Track Record**:\n• 50+ completed projects\n• 2+ years professional experience\n• IEEE leadership experience\n• Strong testimonials (4.9/5)\n\n**Work Style**:\n• Detail-oriented\n• Deadline-focused\n• Regular communication\n• Quality over speed\n\n**Value Add**:\n• Technical consulting included\n• Post-delivery support\n• Documentation\n• Knowledge transfer\n\nReady to start your project? Let's talk!";
  }

  // Tools and workflow
  if (
    lowerMessage.includes("tools") ||
    lowerMessage.includes("workflow") ||
    lowerMessage.includes("work with")
  ) {
    return "🛠️ **Tools & Workflow**:\n\n**Development Environment**:\n• Linux (Ubuntu 20.04/22.04)\n• VS Code, CLion, Qt Creator\n• STM32CubeIDE\n• Vim for quick edits\n\n**Version Control**:\n• Git (GitHub, GitLab)\n• Feature branch workflow\n• Semantic commit messages\n\n**Build Systems**:\n• CMake\n• Catkin/Colcon (ROS)\n• Make\n\n**Debugging**:\n• GDB\n• STM32 ST-Link\n• ROS debugging tools\n• Logic analyzers\n\n**Collaboration**:\n• GitHub Issues\n• Slack/Discord\n• Weekly progress reports\n• Video calls (Zoom/Meet)\n\n**Documentation**:\n• Markdown\n• Doxygen\n• LaTeX for reports\n• Draw.io for diagrams\n\n**Testing**:\n• Unit tests (Google Test)\n• Integration tests\n• Hardware-in-the-loop\n\nProfessional workflow for reliable results! ✨";
  }

  // Greetings - enhanced
  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey") ||
    lowerMessage === "yo"
  ) {
    return 'Hello! 👋 I\'m Ahmed\'s AI assistant, powered by contextual understanding!\n\nI can help you with:\n\n💼 **Professional Info**:\n• Experience & current role\n• Skills & expertise\n• Education & certifications\n\n🚀 **Projects**:\n• Portfolio highlights\n• Technical details\n• GitHub repositories\n\n📬 **Contact**:\n• How to reach Ahmed\n• Availability\n• Response times\n\n💾 **Quick Actions**:\n• Download CV\n• View testimonials\n• Get contact info\n\n**Try asking**:\n• "Tell me about the warehouse robot"\n• "What are Ahmed\'s ROS skills?"\n• "How can I hire Ahmed?"\n• "Download CV"\n• "Show me projects"\n\nWhat would you like to know? 😊';
  }

  // Thanks
  if (
    lowerMessage.includes("thank") ||
    lowerMessage.includes("thanks") ||
    lowerMessage.includes("appreciate")
  ) {
    return "You're very welcome! 😊\n\nFeel free to ask if you have more questions about:\n• Ahmed's experience or skills\n• Specific projects\n• Hiring or collaboration\n• Technical capabilities\n\nI'm here to help!\n\nIf you'd like to get in touch directly:\n📧 ahmedehab1232@gmail.com\n💬 Use the contact form below\n\nHave a great day! 🌟";
  }

  // Goodbye
  if (
    lowerMessage.includes("bye") ||
    lowerMessage.includes("see you") ||
    lowerMessage.includes("goodbye")
  ) {
    return "Thanks for visiting Ahmed's portfolio! 👋\n\nBefore you go:\n• Bookmark this page for later\n• Check out the Projects section\n• Download the CV if interested\n• Connect on LinkedIn\n\nFeel free to return anytime!\n\nInterested in working together? Don't hesitate to reach out at ahmedehab1232@gmail.com\n\nGoodbye! 😊🚀";
  }

  // Help command
  if (
    lowerMessage === "help" ||
    lowerMessage === "?" ||
    lowerMessage.includes("what can you")
  ) {
    return '🤖 **AI Assistant Help**:\n\nI can answer questions about:\n\n**👨‍💼 Professional**:\n• Experience & positions\n• Skills & technologies\n• Education & certifications\n• Availability & rates\n\n**🚀 Technical**:\n• ROS/ROS2 expertise\n• Embedded systems (STM32)\n• AI/ML capabilities\n• Programming languages\n\n**📂 Portfolio**:\n• Project details\n• GitHub repositories\n• Work samples\n• Testimonials\n\n**📞 Contact**:\n• Email & phone\n• Social profiles\n• Response times\n• How to hire\n\n**💡 Examples**:\n• "Tell me about ROS experience"\n• "What embedded projects?"\n• "How to contact?"\n• "Download CV"\n• "Rates for freelance?"\n\n**Quick Commands**:\n• Type \'download\' for CV\n• Type \'contact\' for info\n• Type \'projects\' for portfolio\n\nJust ask naturally - I understand context! 🎯';
  }

  // Default - smarter
  return '🤔 I\'m not sure about that specific question, but I can help with:\n\n**Popular Topics**:\n• 💼 "Tell me about experience"\n• 🤖 "What ROS skills?"\n• ⚡ "STM32 expertise?"\n• 🧠 "AI/ML capabilities?"\n• 📂 "Show me projects"\n• 📧 "How to contact?"\n• 📄 "Download CV"\n• ⭐ "View testimonials"\n\n**Quick Info**:\n• **Role**: R&D Product Engineer @ FEDIS\n• **Expertise**: Robotics, Embedded, AI/ML\n• **Experience**: 3+ years\n• **Location**: Cairo, Egypt\n• **Status**: Available for projects ✅\n\n**Type \'help\'** for full command list!\n\nOr just ask me anything about Ahmed\'s work - I understand natural language! 😊';
}
function navigateProjects(direction) {
  const totalPages = Math.ceil(allProjects.length / PROJECTS_PER_PAGE);

  if (direction === "prev" && currentProjectPage > 0) {
    currentProjectPage--;
  } else if (direction === "next" && currentProjectPage < totalPages - 1) {
    currentProjectPage++;
  }

  renderProjectPage();
  updateProjectNavigation();

  // Just scroll to projects grid, not the entire section
  const projectsGrid = document.getElementById("projectsGrid");
  if (projectsGrid) {
    const offsetTop = projectsGrid.offsetTop - 100; // 100px offset for navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

// ==================== UTILITY FUNCTIONS ====================
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 Email copied to clipboard!");
  });
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ==================== SCROLL PROGRESS ====================
function initScrollProgress() {
  const scrollProgress = document.getElementById("scrollProgress");

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + "%";
  });
}

// ==================== SECRET COMMANDS ====================
function setupSecretCommands() {
  let commandBuffer = "";

  document.addEventListener("keypress", (e) => {
    commandBuffer += e.key;

    if (commandBuffer.length > 20) {
      commandBuffer = commandBuffer.slice(-20);
    }

    if (commandBuffer.includes("matrix")) {
      activateMatrixMode();
      commandBuffer = "";
    } else if (commandBuffer.includes("rainbow")) {
      activateRainbowMode();
      commandBuffer = "";
    } else if (commandBuffer.includes("stats")) {
      registerSecret("stats");
      showSecretStats();
      commandBuffer = "";
    }
  });
}

function activateMatrixMode() {
  document.body.classList.add("matrix-mode");
  showToast("🔢 Matrix Mode Activated!");

  setTimeout(() => {
    document.body.classList.remove("matrix-mode");
  }, 10000);
  registerSecret("matrix");
}

function activateRainbowMode() {
  document.body.classList.add("rainbow-mode");
  showToast("🌈 Rainbow Mode Activated!");

  setTimeout(() => {
    document.body.classList.remove("rainbow-mode");
  }, 10000);
  registerSecret("rainbow");
}

/* ========== REAL SESSION STATS ========== */
function showSecretStats() {
  const now = Date.now();
  const start = parseInt(sessionStorage.getItem("ss_start") || now, 10);
  if (!sessionStorage.getItem("ss_start"))
    sessionStorage.setItem("ss_start", now);

  const timeOnSite = Math.floor((now - start) / 1000);
  const sections = JSON.parse(sessionStorage.getItem("ss_sections") || "[]");
  const clicks = parseInt(sessionStorage.getItem("ss_clicks") || 0, 10);
  const secrets = JSON.parse(sessionStorage.getItem("ss_secret_set") || "[]");

  const stats = {
    "Time on site": `${timeOnSite}s`,
    "Sections viewed": sections.length,
    Clicks: clicks,
    "Secret commands found": secrets.length,
  };

  let msg = "Secret Stats:\n";
  for (let k in stats) msg += `${k}: ${stats[k]}\n`;
  alert(msg);
}

/* ---------- click tracker ---------- */
document.addEventListener("click", () => {
  sessionStorage.setItem(
    "ss_clicks",
    parseInt(sessionStorage.getItem("ss_clicks") || 0, 10) + 1
  );
});

/* ---------- section-view tracker ---------- */
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        let v = JSON.parse(sessionStorage.getItem("ss_sections") || "[]");
        if (!v.includes(id)) {
          v.push(id);
          sessionStorage.setItem("ss_sections", JSON.stringify(v));
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));

/* ---------- secret ONCE counter ---------- */
function registerSecret(codeName) {
  const set = JSON.parse(sessionStorage.getItem("ss_secret_set") || "[]");
  if (!set.includes(codeName)) {
    set.push(codeName);
    sessionStorage.setItem("ss_secret_set", JSON.stringify(set));
  }
}
/* ---------- trackers ---------- */
document.addEventListener("click", () => {
  sessionStorage.setItem(
    "ss_clicks",
    parseInt(sessionStorage.getItem("ss_clicks") || 0, 10) + 1
  );
});
