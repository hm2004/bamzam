// Neo-Brutalism Portfolio Data & Interactive Engine for Hervie Mariano

const portfolioData = {
  eyebrow: "BAMZAM.LIVE",
  name: "Hervie Keithrick Mariano",
  role: "Network Administrator | Aspiring Professional | Customer Relations Enthusiast",
  summary:
    "Building high-reliability IT infrastructure and network environments with curiosity, discipline, and practical problem solving. Passionate about systems administration, fraud prevention, hardware maintenance, and delivering seamless user experiences.",
  about: [
    "A dedicated Information Technology professional with a strong foundation in computer science and network administration. Ready to build, configure, and maintain robust infrastructure.",
    "Brings real-world industry experience across customer support, quality assurance coaching, and fraud analysis, combined with hands-on expertise in Cisco networking, Linux servers, Docker, and hardware diagnostics."
  ],
  details: [
    { label: "Location", value: "Antipolo City, Rizal, PH", icon: "📍" },
    { label: "Email", value: "keithrick.mariano@hotmail.com", icon: "✉" },
    { label: "Focus", value: "IT Support / Network Admin / QA / DevOps", icon: "🎯" },
    { label: "Status", value: "Open for Opportunities", icon: "🟢" }
  ],
  stats: [
    { value: "3+", targetNum: 3, suffix: "+", label: "Major Achievements", color: "yellow" },
    { value: "4", targetNum: 4, suffix: "", label: "Industry & Intern Roles", color: "cyan" },
    { value: "11+", targetNum: 11, suffix: "+", label: "Core Technical Skills", color: "pink" }
  ],
  education: [
    {
      school: "ICCT Colleges",
      degree: "Bachelor of Science in Information Technology",
      years: "2022 - 2026",
      tag: "COLLEGE DEGREE",
      highlights: [
        "Cisco Networking & Routing Protocols.",
        "Computer Hardware & Software Maintenance.",
        "Network Security & Systems Administration."
      ]
    },
    {
      school: "Antipolo City Senior High School",
      degree: "Humanities and Social Sciences Strand",
      years: "2020 - 2022",
      tag: "HONOR GRADUATE",
      highlights: [
        "One of the Honor students of 2022 graduating batch.",
        "Consecutive Honor Student for Grades 11 and 12."
      ]
    }
  ],
  jobHistory: [
    {
      company: "Alorica Philippines",
      role: "Customer Service Representative",
      years: "Nov 2022 - May 2024",
      tag: "COMMUNICATIONS",
      colorTag: "tag-blue",
      summary:
        "Helped global customers resolve complex inquiries promptly while consistently surpassing customer satisfaction (CSAT) and resolution benchmarks."
    },
    {
      company: "Alorica Philippines",
      role: "Quality Analyst",
      years: "Jun 2024 - Jan 2025",
      tag: "LEADERSHIP & QA",
      colorTag: "tag-pink",
      summary:
        "Coached and evaluated over 40+ agents, performing root-cause evaluations and calibration sessions to elevate team performance and compliance standards."
    },
    {
      company: "Movate Inc.",
      role: "Fraud Analyst",
      years: "Jan 2025 - Dec 2025",
      tag: "SECURITY & RISK",
      colorTag: "tag-purple",
      summary:
        "Investigated suspicious accounts and payment activities to identify patterns, neutralize vulnerabilities, and safeguard company and customer assets."
    },
    {
      company: "ICCT COLLEGES",
      role: "MIS Intern",
      years: "Jan 2026 - Mar 2026",
      tag: "SYSADMIN & IT",
      colorTag: "tag-green",
      summary:
        "Maintained campus IT infrastructure, resolved hardware/software support tickets, and ensured smooth uptime for academic laboratory systems."
    }
  ],
  achievements: [
    {
      title: "Academic Recognition",
      year: "2022",
      badge: "★ HONORS",
      color: "yellow",
      description:
        "Graduated as an Honor student in Humanities and Social Sciences (HUMSS), recognized for consistent academic excellence in Grades 11 and 12."
    },
    {
      title: "Quality Analyst Coach",
      year: "2024",
      badge: "★ COACH OF 40+",
      color: "pink",
      description:
        "Promoted to Quality Analyst Coach at Alorica; mentored and upgraded the metrics of 40+ customer service agents through data-driven coaching."
    },
    {
      title: "Binovation Metal Waste Detector",
      year: "2025",
      badge: "★ CAPSTONE",
      color: "green",
      description:
        "Engineered an IoT-enabled metal waste detector addressing environmental recycling needs, assisting electronic shops in sorting and reclaiming precious metals."
    }
  ],
  skills: [
    { name: "Cisco Networking", color: "yellow" },
    { name: "Linux Server Management", color: "cyan" },
    { name: "Docker & Kubernetes", color: "purple" },
    { name: "Server Administration", color: "green" },
    { name: "Java & Python Programming", color: "orange" },
    { name: "Hardware & Software Maintenance", color: "pink" },
    { name: "Root Cause Analysis", color: "yellow" },
    { name: "Fraud Investigation & Risk", color: "purple" },
    { name: "Quality Assurance & Coaching", color: "cyan" },
    { name: "Customer Relations", color: "green" },
    { name: "Problem Solving", color: "pink" },
    { name: "Team Leadership & Communication", color: "orange" }
  ],
  projects: [
    {
      title: "Portfolio Website (Neo-Brutalist)",
      category: "Web & UI Design",
      badge: "LIVE BUILD",
      color: "yellow",
      description:
        "A high-impact, responsive Neo-Brutalist portfolio showcasing experience, certifications, and technical proficiencies with tactile micro-interactions and dark mode.",
      linkLabel: "View Top",
      link: "#top"
    },
    {
      title: "Binovation Metal Waste Detector",
      category: "IoT Hardware & Sensors",
      badge: "CAPSTONE PROJECT",
      color: "pink",
      description:
        "An automated metal waste detection and sorting prototype designed for environmental efficiency and small electronics workshop recycling workflows.",
      linkLabel: "Inquire More",
      link: "#contact"
    },
    {
      title: "Home Automation System",
      category: "IoT & Smart Systems",
      badge: "HARDWARE & AUTOMATION",
      color: "cyan",
      description:
        "An automated microcontroller-driven ecosystem for centralizing, automating, and remotely monitoring household electrical appliances and sensors.",
      linkLabel: "Inquire More",
      link: "#contact"
    },
    {
      title: "Homelab & Container Server",
      category: "DevOps & Virtualization",
      badge: "SYSADMIN / CLOUD",
      color: "green",
      description:
        "A personal dedicated server running a suite of self-hosted microservices managed and orchestrated using Docker containers and Kubernetes clusters.",
      linkLabel: "Inquire More",
      link: "#contact"
    }
  ],
  contactMessage:
    "Open for full-time opportunities, freelance infrastructure setups, networking consults, or tech discussions. Let's build something remarkable together!",
  contacts: [
    {
      label: "Email",
      value: "keithrick.mariano@hotmail.com",
      href: "mailto:keithrick.mariano@hotmail.com",
      copyable: true,
      icon: "✉",
      btnText: "Copy Email"
    },
    {
      label: "Phone / WhatsApp",
      value: "+63 9389734983",
      href: "tel:+639389734983",
      copyable: true,
      icon: "📞",
      btnText: "Copy Number"
    },
    {
      label: "LinkedIn Profile",
      value: "linkedin.com/in/hervie-keithrick-mariano",
      href: "https://www.linkedin.com/in/hervie-keithrick-mariano-2b4a40228/",
      copyable: false,
      icon: "🔗",
      btnText: "Visit Profile ↗"
    }
  ]
};

// Utilities
const text = (value) => value ?? "";

const escapeHtml = (value) =>
  text(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const sanitizeUrl = (value) => {
  const url = text(value).trim();
  if (
    url.startsWith("#") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("https://") ||
    url.startsWith("http://")
  ) {
    return url;
  }
  return "#";
};

// Toast notification helper
let toastTimeout;
const showToast = (message) => {
  const toast = document.getElementById("neoToast");
  const msgEl = document.getElementById("toastMessage");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
};

// Copy to clipboard helper
const copyToClipboard = async (content, label) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(content);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = content;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    showToast(`✓ Copied ${label} to clipboard!`);
  } catch (err) {
    showToast(`Copied: ${content}`);
  }
};

// Theme Management
const themeStorageKey = "hervie-portfolio-theme";

const getStoredTheme = () => {
  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch (error) {
    return "";
  }
  return "";
};

const getPreferredTheme = () => {
  const stored = getStoredTheme();
  if (stored) return stored;

  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme) => {
  const resolved = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = resolved;

  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const isDark = resolved === "dark";
  const label = toggle.querySelector(".theme-toggle-label");
  const icon = toggle.querySelector(".theme-toggle-icon");

  toggle.setAttribute("aria-pressed", String(isDark));
  toggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );

  if (label) {
    label.textContent = isDark ? "LIGHT MODE" : "DARK MODE";
  }
  if (icon) {
    icon.textContent = isDark ? "🌙" : "☀️";
  }
};

const initializeThemeToggle = () => {
  applyTheme(getPreferredTheme());

  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch (e) {
      // storage unavailable
    }

    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme.toUpperCase()} mode!`);
  });
};

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el) el.textContent = text(value);
};

const createListItem = (value) =>
  `<li class="timeline-bullet-item"><span class="bullet-accent">◆</span><span>${escapeHtml(value)}</span></li>`;

// Render function
const render = () => {
  setText("eyebrow", portfolioData.eyebrow);
  setText("name", portfolioData.name);
  setText("role", portfolioData.role);
  setText("summary", portfolioData.summary);
  setText("contactMessage", portfolioData.contactMessage);

  // Stats
  const statsEl = document.getElementById("stats");
  if (statsEl) {
    statsEl.innerHTML = portfolioData.stats
      .map(
        (item) => `
        <article class="stat-card stat-${item.color || 'yellow'}" data-target="${item.targetNum || 0}" data-suffix="${escapeHtml(item.suffix || '')}">
          <div class="stat-header">
            <span class="stat-indicator">●</span>
            <span class="stat-code-tag">#STAT</span>
          </div>
          <strong class="stat-number">${escapeHtml(item.value)}</strong>
          <span class="stat-label">${escapeHtml(item.label)}</span>
        </article>
      `
      )
      .join("");
  }

  // About Content
  const aboutEl = document.getElementById("aboutContent");
  if (aboutEl) {
    aboutEl.innerHTML = portfolioData.about
      .map(
        (paragraph) => `
        <p class="about-p">
          <span class="p-accent-marker">❯</span> ${escapeHtml(paragraph)}
        </p>
      `
      )
      .join("");
  }

  // Details Strip
  const detailsEl = document.getElementById("details");
  if (detailsEl) {
    detailsEl.innerHTML = portfolioData.details
      .map(
        (item) => `
        <div class="detail-pill">
          <span class="detail-icon" aria-hidden="true">${item.icon || '▪'}</span>
          <span class="detail-label">${escapeHtml(item.label)}:</span>
          <strong class="detail-val">${escapeHtml(item.value)}</strong>
        </div>
      `
      )
      .join("");
  }

  // Education Timeline
  const eduEl = document.getElementById("educationList");
  if (eduEl) {
    eduEl.innerHTML = portfolioData.education
      .map(
        (item) => `
        <article class="timeline-item">
          <div class="timeline-top">
            <div class="timeline-titles">
              <span class="edu-tag sticker-badge">${escapeHtml(item.tag || "ACADEMICS")}</span>
              <h3 class="edu-school">${escapeHtml(item.school)}</h3>
              <p class="timeline-subtitle">${escapeHtml(item.degree)}</p>
            </div>
            <span class="year-badge neo-stamp">${escapeHtml(item.years)}</span>
          </div>
          <ul class="timeline-list">
            ${item.highlights.map(createListItem).join("")}
          </ul>
        </article>
      `
      )
      .join("");
  }

  // Job History
  const jobEl = document.getElementById("jobHistoryList");
  if (jobEl) {
    jobEl.innerHTML = portfolioData.jobHistory
      .map(
        (job) => `
        <article class="job-card ${job.colorTag || ''}">
          <div class="job-top">
            <div>
              <span class="job-role-tag">${escapeHtml(job.tag || 'EXPERIENCE')}</span>
              <h3 class="job-company">${escapeHtml(job.company)}</h3>
              <p class="job-subtitle">${escapeHtml(job.role)}</p>
            </div>
            <span class="year-badge neo-stamp">${escapeHtml(job.years)}</span>
          </div>
          <p class="job-summary">${escapeHtml(job.summary)}</p>
        </article>
      `
      )
      .join("");
  }

  // Achievements
  const achieveEl = document.getElementById("achievementList");
  if (achieveEl) {
    achieveEl.innerHTML = portfolioData.achievements
      .map(
        (item) => `
        <article class="achievement-card card-${item.color || 'yellow'}">
          <div class="achievement-top">
            <span class="achievement-badge-pill">${escapeHtml(item.badge || '★ HONORS')}</span>
            <span class="year-badge neo-stamp">${escapeHtml(item.year)}</span>
          </div>
          <h3 class="achievement-title">${escapeHtml(item.title)}</h3>
          <p class="achievement-desc">${escapeHtml(item.description)}</p>
        </article>
      `
      )
      .join("");
  }

  // Skills
  const skillsEl = document.getElementById("skillsList");
  if (skillsEl) {
    skillsEl.innerHTML = portfolioData.skills
      .map(
        (skill, index) => {
          const name = typeof skill === "string" ? skill : skill.name;
          const color = typeof skill === "string" ? ["yellow", "cyan", "pink", "green", "purple", "orange"][index % 6] : skill.color;
          return `
            <button class="skill-chip chip-${color}" type="button" data-skill="${escapeHtml(name)}">
              <span class="chip-star">✦</span>
              <span>${escapeHtml(name)}</span>
            </button>
          `;
        }
      )
      .join("");
  }

  // Projects
  const projectEl = document.getElementById("projectList");
  if (projectEl) {
    projectEl.innerHTML = portfolioData.projects
      .map(
        (project) => `
        <article class="project-card card-${project.color || 'cyan'}">
          <div class="project-header-bar">
            <span class="project-cat-badge">${escapeHtml(project.category || 'PROJECT')}</span>
            <span class="project-pill-stamp">${escapeHtml(project.badge || 'PROD')}</span>
          </div>
          <div class="project-body">
            <h3 class="project-title">${escapeHtml(project.title)}</h3>
            <p class="project-desc">${escapeHtml(project.description)}</p>
          </div>
          <div class="project-footer">
            <a class="project-link neo-btn-link" href="${sanitizeUrl(project.link)}">
              <span>${escapeHtml(project.linkLabel || 'Explore')}</span>
              <span class="link-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      `
      )
      .join("");
  }

  // Contact Links
  const contactEl = document.getElementById("contactLinks");
  if (contactEl) {
    contactEl.innerHTML = portfolioData.contacts
      .map(
        (contact) => `
        <div class="contact-card-box">
          <div class="contact-card-content">
            <span class="contact-icon-badge" aria-hidden="true">${contact.icon || '✉'}</span>
            <div class="contact-card-texts">
              <span class="contact-label">${escapeHtml(contact.label)}</span>
              <a class="contact-val-link" href="${sanitizeUrl(contact.href)}" ${contact.href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                ${escapeHtml(contact.value)}
              </a>
            </div>
          </div>
          <div class="contact-action-wrap">
            ${
              contact.copyable
                ? `<button class="contact-btn-action copy-action-btn" type="button" data-copy="${escapeHtml(contact.value)}" data-label="${escapeHtml(contact.label)}">
                    <span>${escapeHtml(contact.btnText || 'Copy')}</span>
                    <span class="btn-icon">📋</span>
                  </button>`
                : `<a class="contact-btn-action" href="${sanitizeUrl(contact.href)}" target="_blank" rel="noopener noreferrer">
                    <span>${escapeHtml(contact.btnText || 'Open ↗')}</span>
                  </a>`
            }
          </div>
        </div>
      `
      )
      .join("");
  }
};

// Interactive Features & Event Listeners
const initializeInteractiveFeatures = () => {
  // Quick Copy Email button in hero
  const quickCopyBtn = document.getElementById("quickCopyEmail");
  if (quickCopyBtn) {
    quickCopyBtn.addEventListener("click", () => {
      copyToClipboard("keithrick.mariano@hotmail.com", "Email");
    });
  }

  // Contact copy buttons
  document.addEventListener("click", (e) => {
    const copyBtn = e.target.closest(".copy-action-btn");
    if (copyBtn) {
      const val = copyBtn.getAttribute("data-copy");
      const label = copyBtn.getAttribute("data-label") || "Info";
      if (val) {
        copyToClipboard(val, label);
      }
    }
  });

  // Interactive skill chip toggle
  const skillsList = document.getElementById("skillsList");
  if (skillsList) {
    skillsList.addEventListener("click", (e) => {
      const chip = e.target.closest(".skill-chip");
      if (chip) {
        chip.classList.toggle("chip-active");
        const skillName = chip.getAttribute("data-skill");
        if (chip.classList.contains("chip-active")) {
          showToast(`Selected skill: ${skillName} ⚡`);
        }
      }
    });
  }

  // Floating Back to top button visibility
  const floatingBtn = document.getElementById("floatingBackTop");
  if (floatingBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        floatingBtn.classList.add("visible");
      } else {
        floatingBtn.classList.remove("visible");
      }
    }, { passive: true });
  }

  // Scroll Reveal Animations using IntersectionObserver
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.12
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-revealed"));
  }

  // Animated Stat Counters
  const statCards = document.querySelectorAll(".stat-card");
  if ("IntersectionObserver" in window && statCards.length > 0) {
    let animated = false;
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            animateNumbers();
            statObserver.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    statCards.forEach((c) => statObserver.observe(c));
  }

  const animateNumbers = () => {
    statCards.forEach((card) => {
      const target = parseInt(card.getAttribute("data-target"), 10) || 0;
      const suffix = card.getAttribute("data-suffix") || "";
      const numEl = card.querySelector(".stat-number");
      if (!numEl || target === 0) return;

      let current = 0;
      const duration = 1200;
      const intervalTime = Math.max(25, Math.floor(duration / target));

      const timer = setInterval(() => {
        current++;
        numEl.textContent = `${current}${suffix}`;
        if (current >= target) {
          numEl.textContent = `${target}${suffix}`;
          clearInterval(timer);
        }
      }, intervalTime);
    });
  };
};

// Initial Boot
initializeThemeToggle();
render();
initializeInteractiveFeatures();
