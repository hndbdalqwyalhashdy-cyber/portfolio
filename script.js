const projects = {
  garden: {
    title: "حديقة الحكايات",
    category: "متجر الورود والنباتات والتحف",
    description: "متجر إلكتروني أنيق وهادئ يجمع بين جمال الورود وتنسيقات الباقات، وروعة النباتات المنزلية، والتحف وقطع الزينة المميزة. يقدم خيارات متنوعة تناسب الأذواق والمناسبات، لتكون تجربة التسوق مليئة بالجمال والأناقة.",
    tags: ["HTML", "CSS", "JavaScript", "الورود", "النباتات"],
    link: "https://myrose-3ie.pages.dev/"
  },
  games: {
    title: "نلعب ونتعلم",
    category: "التعلم باللعب والإبداع",
    description: "موقع تعليمي تفاعلي للأطفال يجمع بين المعرفة والمرح من خلال الألعاب والأنشطة في الرياضيات واللغة الإنجليزية والعلوم. يمنح الأطفال فرصة للتعلم والرسم والإبداع واكتشاف المعلومات بطريقة مبسطة وممتعة.",
    tags: ["HTML", "CSS", "JavaScript", "التعليم", "الرسم"],
    link: "https://weplayandlearn.pages.dev/#home"
  },
  stars: {
    title: "نجوم السعادة",
    category: "رسائل الأمل والطمأنينة",
    description: "موقع تفاعلي هادئ يضم نجوماً مضيئة، تحمل كل نجمة رسالة تنشر التفاؤل والأمل وتعزز الثقة بالله. يتيح للزائر كتابة رسالته وإطلاقها إلى النجوم، ويضم أذكار الصباح والمساء والمسبحة الذكية، ليكون مساحة تجمع بين الإلهام والطمأنينة والذكر.",
    tags: ["HTML", "CSS", "JavaScript", "رسائل إيجابية", "أذكار"],
    link: "https://startofhappiness.pages.dev/"
  },
  sakina: {
    title: "ركن السكينة",
    category: "تصميم موقع لمقهى",
    description: "موقع مقهى يجمع بين الهدوء والقراءة والقهوة، في تجربة تدعو إلى التمهّل.",
    tags: ["تصميم واجهات", "تجربة مستخدم"],
    link: "https://project7.hndbdalqwyalhashdy.workers.dev"
  },
  cv: {
    title: "سيرتي الذاتية الرقمية",
    category: "رحلتي في عالم التقنية والإبداع",
    description: "صفحة شخصية تعرض نبذة عني ومهاراتي ومشاريعي التعليمية بطريقة منظمة وأنيقة. تمثل هذه الصفحة خطوة في رحلتي لتعلم تصميم وتطوير مواقع الويب، وتوثق ما أكتسبه من مهارات في مجال التقنية والذكاء الاصطناعي.",
    tags: ["HTML", "CSS", "JavaScript", "السيرة الذاتية"],
    link: "https://fancy-cake-e58d.hndbdalqwyalhashdy.workers.dev/"
  }
};

const ideaStorageKey = "creative-galaxy-idea-lab";
const allowedIdeaCategories = [
  "التعليم",
  "الذكاء الاصطناعي",
  "التصميم",
  "المشاريع المجتمعية",
  "فكرة أخرى"
];

function initializeAmbientBackground() {
  const canvas = document.getElementById("ambientCanvas");
  const shapes = document.getElementById("ambientShapes");
  const context = canvas && canvas.getContext("2d");
  if (!canvas || !context || !shapes) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  let width = 0;
  let height = 0;
  let frameId = 0;
  let previousFrame = 0;
  let stars = [];
  let motes = [];
  let trailDust = [];
  const trailStart = [-100, 450];
  const trailSegments = [
    [112, 430, 185, 398, 315, 428],
    [445, 458, 442, 472, 520, 420],
    [598, 368, 704, 378, 780, 428],
    [856, 478, 946, 488, 1042, 424],
    [1138, 360, 1260, 352, 1540, 450]
  ];

  function getTrailPoint(progress) {
    const scaledProgress = Math.min(progress, .999999) * trailSegments.length;
    const segmentIndex = Math.floor(scaledProgress);
    const t = scaledProgress - segmentIndex;
    const points = trailSegments[segmentIndex];
    const start = segmentIndex === 0
      ? trailStart
      : trailSegments[segmentIndex - 1].slice(4, 6);
    const inverse = 1 - t;
    const x = inverse * inverse * inverse * start[0]
      + 3 * inverse * inverse * t * points[0]
      + 3 * inverse * t * t * points[2]
      + t * t * t * points[4];
    const y = inverse * inverse * inverse * start[1]
      + 3 * inverse * inverse * t * points[1]
      + 3 * inverse * t * t * points[3]
      + t * t * t * points[5];
    return [x * width / 1440, y * height / 900];
  }

  function resizeCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const compact = width <= 680;
    const area = width * height;
    const starCount = compact
      ? Math.min(36, Math.max(22, Math.round(area / 24000)))
      : Math.min(140, Math.max(70, Math.round(area / 12000)));
    const moteCount = compact
      ? Math.min(16, Math.max(9, Math.round(area / 48000)))
      : Math.min(42, Math.max(20, Math.round(area / 33000)));

    stars = Array.from({ length: starCount }, function () {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.15 + .55,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * .95 + .3,
        prominent: Math.random() < .27
      };
    });
    motes = Array.from({ length: moteCount }, function () {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.15 + .55,
        drift: (Math.random() * .5 + .18) * (Math.random() > .5 ? 1 : -1),
        phase: Math.random() * Math.PI * 2,
        pearl: Math.random() < .16
      };
    });
    const trailDustCount = compact ? 120 : 260;
    trailDust = Array.from({ length: trailDustCount }, function () {
      return {
        progress: Math.random(),
        speed: Math.random() * .055 + .025,
        offset: (Math.random() - .5) * (compact ? 46 : 62),
        radius: Math.random() * 1.35 + .5,
        phase: Math.random() * Math.PI * 2,
        pearl: Math.random() < .12,
        prominent: Math.random() < .28
      };
    });
    drawFrame(performance.now(), 0);
  }

  function drawFrame(time, delta) {
    context.clearRect(0, 0, width, height);

    stars.forEach(function (star) {
      const pulse = (Math.sin(time * .00115 * star.speed + star.phase) + 1) / 2;
      const shimmer = .45 + pulse * .5;
      if (star.prominent) {
        const glowRadius = star.radius * (9 + pulse * 8);
        const glow = context.createRadialGradient(
          star.x, star.y, 0, star.x, star.y, glowRadius
        );
        glow.addColorStop(0, "rgba(255, 240, 205, " + (shimmer * .72).toFixed(3) + ")");
        glow.addColorStop(.2, "rgba(231, 190, 119, " + (shimmer * .3).toFixed(3) + ")");
        glow.addColorStop(1, "rgba(201, 166, 107, 0)");
        context.beginPath();
        context.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        context.fillStyle = glow;
        context.fill();
      }

      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(255, 242, 216, " + Math.min(shimmer + .18, 1).toFixed(3) + ")";
      context.fill();

      if (star.prominent) {
        const flareLength = star.radius * (3 + pulse * 5);
        context.strokeStyle = "rgba(255, 225, 166, " + (shimmer * .7).toFixed(3) + ")";
        context.lineWidth = .45;
        context.beginPath();
        context.moveTo(star.x - flareLength, star.y);
        context.lineTo(star.x + flareLength, star.y);
        context.moveTo(star.x, star.y - flareLength);
        context.lineTo(star.x, star.y + flareLength);
        context.moveTo(star.x - flareLength * .46, star.y - flareLength * .46);
        context.lineTo(star.x + flareLength * .46, star.y + flareLength * .46);
        context.moveTo(star.x + flareLength * .46, star.y - flareLength * .46);
        context.lineTo(star.x - flareLength * .46, star.y + flareLength * .46);
        context.stroke();
      }
    });

    motes.forEach(function (mote) {
      const pulse = .16 + (Math.sin(time * .0012 + mote.phase) + 1) * .12;
      const glowRadius = mote.radius * (mote.pearl ? 5 : 3.2);
      const glow = context.createRadialGradient(mote.x, mote.y, 0, mote.x, mote.y, glowRadius);
      glow.addColorStop(0, mote.pearl
        ? "rgba(255, 249, 235, " + (pulse * 2.2).toFixed(3) + ")"
        : "rgba(239, 202, 137, " + (pulse * 1.8).toFixed(3) + ")");
      glow.addColorStop(1, "rgba(201, 166, 107, 0)");
      context.beginPath();
      context.arc(mote.x, mote.y, glowRadius, 0, Math.PI * 2);
      context.fillStyle = glow;
      context.fill();
      context.beginPath();
      context.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
      context.fillStyle = mote.pearl
        ? "rgba(255, 250, 239, " + Math.min(pulse * 2.5, .95).toFixed(3) + ")"
        : "rgba(247, 215, 159, " + Math.min(pulse * 2, .88).toFixed(3) + ")";
      context.fill();

      if (!reducedMotion.matches) {
        mote.y -= mote.drift * delta * 10;
        mote.x += Math.sin(time * .00035 + mote.phase) * delta * 4;
        if (mote.y < -4) mote.y = height + 4;
        if (mote.y > height + 4) mote.y = -4;
        if (mote.x < -4) mote.x = width + 4;
        if (mote.x > width + 4) mote.x = -4;
      }
    });

    trailDust.forEach(function (particle) {
      const point = getTrailPoint(particle.progress);
      const x = point[0];
      const y = point[1] + particle.offset;
      const shimmer = .24 + (Math.sin(time * .0014 + particle.phase) + 1) * .37;

      if (particle.prominent) {
        const glowRadius = particle.radius * 5;
        const glow = context.createRadialGradient(x, y, 0, x, y, glowRadius);
        glow.addColorStop(0, particle.pearl
          ? "rgba(255, 249, 232, " + (shimmer * .66).toFixed(3) + ")"
          : "rgba(255, 219, 151, " + (shimmer * .62).toFixed(3) + ")");
        glow.addColorStop(1, "rgba(223, 177, 101, 0)");
        context.beginPath();
        context.arc(x, y, glowRadius, 0, Math.PI * 2);
        context.fillStyle = glow;
        context.fill();
      }

      context.beginPath();
      context.arc(x, y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = particle.pearl
        ? "rgba(255, 248, 229, " + shimmer.toFixed(3) + ")"
        : "rgba(248, 210, 143, " + (shimmer * .9).toFixed(3) + ")";
      context.fill();

      if (!reducedMotion.matches) {
        particle.progress = (particle.progress + particle.speed * delta) % 1;
      }
    });

  }

  function animate(time) {
    if (document.hidden || reducedMotion.matches) {
      frameId = 0;
      return;
    }

    if (time - previousFrame >= 40) {
      const delta = previousFrame ? Math.min((time - previousFrame) / 1000, .08) : 0;
      previousFrame = time;
      drawFrame(time, delta);
    }
    frameId = window.requestAnimationFrame(animate);
  }

  function updateAnimation() {
    if (reducedMotion.matches || document.hidden) {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      drawFrame(performance.now(), 0);
      return;
    }
    if (!frameId) {
      previousFrame = 0;
      frameId = window.requestAnimationFrame(animate);
    }
  }

  window.addEventListener("resize", resizeCanvas, { passive: true });
  document.addEventListener("visibilitychange", updateAnimation);
  reducedMotion.addEventListener("change", updateAnimation);

  if (finePointer.matches && !reducedMotion.matches) {
    window.addEventListener("pointermove", function (event) {
      if (reducedMotion.matches) return;
      const x = ((event.clientX / width) - .5) * 8;
      const y = ((event.clientY / height) - .5) * 8;
      shapes.style.setProperty("--parallax-x", x.toFixed(1) + "px");
      shapes.style.setProperty("--parallax-y", y.toFixed(1) + "px");
    }, { passive: true });
    window.addEventListener("pointerleave", function () {
      if (reducedMotion.matches) return;
      shapes.style.setProperty("--parallax-x", "0px");
      shapes.style.setProperty("--parallax-y", "0px");
    });
  }

  resizeCanvas();
  updateAnimation();
}

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const mainMenu = document.getElementById("mainMenu");
  const dialog = document.getElementById("projectDialog");
  const dialogClose = document.getElementById("dialogClose");
  const dialogCategory = document.getElementById("dialogCategory");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogDescription = document.getElementById("dialogDescription");
  const dialogTags = document.getElementById("dialogTags");
  const dialogLink = document.getElementById("dialogLink");
  const dialogNote = document.getElementById("dialogNote");
  const backToTop = document.getElementById("backToTop");
  const ideaForm = document.getElementById("ideaForm");
  const ideaText = document.getElementById("ideaText");
  const ideaCategory = document.getElementById("ideaCategory");
  const ideaList = document.getElementById("ideaList");
  const ideaFeedback = document.getElementById("ideaFeedback");

  document.getElementById("currentYear").textContent = String(new Date().getFullYear());

  function closeMenu() {
    if (!menuToggle || !mainMenu) return;
    mainMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "فتح القائمة");
  }

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener("click", function () {
      const isOpening = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(isOpening));
      menuToggle.setAttribute("aria-label", isOpening ? "إغلاق القائمة" : "فتح القائمة");
      mainMenu.classList.toggle("is-open", isOpening);
    });

    mainMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".header-inner")) closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 680) closeMenu();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  function openProject(project) {
    if (!project || !dialog) return;

    dialogCategory.textContent = project.category;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
    dialogTags.replaceChildren();

    project.tags.forEach(function (tag) {
      const tagElement = document.createElement("span");
      tagElement.textContent = tag;
      dialogTags.appendChild(tagElement);
    });

    if (project.link) {
      dialogLink.href = project.link;
      dialogLink.hidden = false;
      dialogNote.hidden = true;
    } else {
      dialogLink.removeAttribute("href");
      dialogLink.hidden = true;
      dialogNote.textContent = "سيُضاف رابط الزيارة عند توفره.";
      dialogNote.hidden = false;
    }

    dialog.showModal();
  }

  document.querySelectorAll(".project-card[data-project]").forEach(function (card) {
    const project = projects[card.dataset.project];
    const button = card.querySelector(".project-detail");
    if (button) button.addEventListener("click", function () { openProject(project); });
  });

  dialogClose.addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  function updateBackToTop() {
    backToTop.classList.toggle("is-visible", window.scrollY > 420);
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }

  const sectionLinks = Array.from(document.querySelectorAll(".main-nav a[href^='#']"));
  const navigableSections = sectionLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && navigableSections.length) {
    const navigationObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(function (link) {
          const isCurrent = link.hash === "#" + entry.target.id;
          if (isCurrent) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    navigableSections.forEach(function (section) { navigationObserver.observe(section); });
  }

  if (ideaForm && ideaText && ideaCategory && ideaList && ideaFeedback) {
    let ideaEntries = [];

    function saveIdeas() {
      try {
        window.sessionStorage.setItem(ideaStorageKey, JSON.stringify(ideaEntries));
        return true;
      } catch (error) {
        console.error("تعذر حفظ الأفكار في جلسة التصفح.", error);
        return false;
      }
    }

    function renderIdeas() {
      ideaList.replaceChildren();
      ideaEntries.forEach(function (entry) {
        const card = document.createElement("article");
        card.className = "idea-card";

        const category = document.createElement("p");
        category.className = "idea-category";
        category.textContent = entry.category;

        const text = document.createElement("p");
        text.className = "idea-text";
        text.textContent = entry.text;

        const removeButton = document.createElement("button");
        removeButton.className = "idea-remove";
        removeButton.type = "button";
        removeButton.textContent = "حذف";
        removeButton.setAttribute("aria-label", "حذف الفكرة: " + entry.text);
        removeButton.addEventListener("click", function () {
          ideaEntries = ideaEntries.filter(function (item) { return item.id !== entry.id; });
          const saved = saveIdeas();
          renderIdeas();
          ideaFeedback.textContent = saved
            ? "تم حذف الفكرة من العرض المحلي."
            : "حُذفت الفكرة من العرض الحالي، لكن تعذر تحديث تخزين جلسة التصفح.";
        });

        card.append(category, text, removeButton);
        ideaList.appendChild(card);
      });
    }

    try {
      const savedIdeas = window.sessionStorage.getItem(ideaStorageKey);
      if (savedIdeas) {
        const parsedIdeas = JSON.parse(savedIdeas);
        if (!Array.isArray(parsedIdeas)) throw new TypeError("بيانات الأفكار المحفوظة ليست قائمة صالحة.");
        ideaEntries = parsedIdeas.filter(function (entry) {
          return entry && typeof entry.id === "string" &&
            typeof entry.text === "string" && entry.text.trim() &&
            allowedIdeaCategories.includes(entry.category);
        });
      }
    } catch (error) {
      console.error("تعذر استعادة الأفكار من جلسة التصفح.", error);
      ideaFeedback.textContent = "تعذر استعادة الأفكار السابقة؛ يمكنك إضافة أفكار جديدة.";
    }

    renderIdeas();

    ideaForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const text = ideaText.value.trim();
      if (!text || !allowedIdeaCategories.includes(ideaCategory.value)) {
        ideaFeedback.textContent = "أكمل الفكرة واختر تصنيفاً صالحاً قبل الإضافة.";
        return;
      }

      ideaEntries.unshift({
        id: Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8),
        text: text,
        category: ideaCategory.value
      });
      const saved = saveIdeas();
      renderIdeas();
      ideaForm.reset();
      ideaFeedback.textContent = saved
        ? "أُضيفت الفكرة إلى العرض المحلي."
        : "أُضيفت الفكرة للعرض الحالي، لكن تعذر حفظها في جلسة التصفح.";
      ideaText.focus();
    });
  }
});