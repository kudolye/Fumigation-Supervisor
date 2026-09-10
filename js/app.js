/**
 * Operational Readiness Training for Fumigation Supervisors
 * Master Application Engine: Stepper Navigation, Domain Practice,
 * Integrated Scenarios, and Results Screen (Pixel-Matched to Design).
 */

document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const state = {
    currentView: "hero", // 'hero' | 'role' | 'handbook' | 'quiz' | 'scenarios' | 'dashboard'
    testCompleted: false,
    historyAccordionOpen: false,

    // Part A: Domain Practice (6 cases)
    currentQuizIndex: 0,
    quizAnswers: {}, // { [id]: { q1, q2, submitted, isCorrect } }

    // Part B: Integrated Scenarios (2 scenarios x 2 rounds)
    currentScenarioIndex: 0, // 0: Scenario 1, 1: Scenario 2
    currentRoundIndex: 0,    // 0: Round 1, 1: Round 2
    scenarioAnswers: {},    // { [scenarioId_round]: { q1, q2, submitted, isCorrect } }
    scenarioAttempts: { "scenario-1": 1, "scenario-2": 1 }
  };

  // View Elements
  const views = {
    hero: document.getElementById("view-hero"),
    role: document.getElementById("view-role"),
    handbook: document.getElementById("view-handbook"),
    quiz: document.getElementById("view-quiz"),
    scenarios: document.getElementById("view-scenarios"),
    dashboard: document.getElementById("view-dashboard")
  };

  const navStepGuide = document.getElementById("nav-step-guide");
  const navStepDomain = document.getElementById("nav-step-domain");
  const navStepScenarios = document.getElementById("nav-step-scenarios");
  const navStepResults = document.getElementById("nav-step-results");

  const handbookDrawer = document.getElementById("handbook-drawer");
  const btnOpenDrawer = document.getElementById("btn-open-drawer");
  const btnCloseDrawer = document.getElementById("btn-close-drawer");

  // =========================================================================
  // Navigation & View Routing
  // =========================================================================
  function isDomainPracticeCompleted() {
    return QUIZ_QUESTIONS.every((q) => {
      const ans = state.quizAnswers[q.id];
      return ans && ans.submitted;
    });
  }

  function updateNavLocks() {
    const domainDone = isDomainPracticeCompleted();
    if (navStepScenarios) {
      navStepScenarios.classList.toggle("locked", !domainDone);
      navStepScenarios.title = domainDone 
        ? "Go to Integrated Scenarios" 
        : "Vui lòng hoàn thành tất cả 6 tình huống Domain Practice trước";
    }
  }

  function switchView(viewName) {
    if (viewName === "scenarios" && !isDomainPracticeCompleted()) {
      alert("Bạn cần hoàn thành tất cả 6 tình huống trong Domain Practice trước khi qua phần Scenarios!");
      switchView("quiz");
      return;
    }

    state.currentView = viewName;

    // Toggle view containers
    Object.keys(views).forEach((key) => {
      if (views[key]) {
        views[key].classList.toggle("active", key === viewName);
      }
    });

    // Update Stepper Navigation
    [navStepGuide, navStepDomain, navStepScenarios, navStepResults].forEach((btn) => {
      if (btn) btn.classList.remove("active");
    });

    if (viewName === "handbook") navStepGuide?.classList.add("active");
    if (viewName === "quiz") navStepDomain?.classList.add("active");
    if (viewName === "scenarios") navStepScenarios?.classList.add("active");
    if (viewName === "dashboard") {
      navStepResults?.classList.add("active");
      if (navStepResults) navStepResults.style.display = "inline-flex";
    }

    updateNavLocks();

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Initializations
    if (viewName === "handbook") renderHandbookContent();
    if (viewName === "quiz") renderQuizQuestion(state.currentQuizIndex);
    if (viewName === "scenarios") renderScenarioRound(state.currentScenarioIndex, state.currentRoundIndex);
    if (viewName === "dashboard") renderResultsScreen();
  }

  // Stepper Header Buttons
  navStepGuide?.addEventListener("click", () => switchView("handbook"));
  navStepDomain?.addEventListener("click", () => switchView("quiz"));
  navStepScenarios?.addEventListener("click", () => {
    if (!isDomainPracticeCompleted()) {
      alert("Bạn cần hoàn thành tất cả 6 tình huống trong Domain Practice trước khi qua phần Scenarios!");
      return;
    }
    switchView("scenarios");
  });
  navStepResults?.addEventListener("click", () => switchView("dashboard"));

  // Brand Home trigger
  document.getElementById("brand-home-trigger")?.addEventListener("click", () => switchView("hero"));

  // Hero & Role Portals
  document.getElementById("btn-hero-next")?.addEventListener("click", () => switchView("role"));
  document.getElementById("btn-portal-handbook")?.addEventListener("click", () => switchView("handbook"));
  document.getElementById("btn-portal-testing")?.addEventListener("click", () => switchView("quiz"));

  // Quick Handbook Drawer triggers
  btnOpenDrawer?.addEventListener("click", () => handbookDrawer?.classList.add("open"));
  btnCloseDrawer?.addEventListener("click", () => handbookDrawer?.classList.remove("open"));
  handbookDrawer?.addEventListener("click", (e) => {
    if (e.target === handbookDrawer) handbookDrawer.classList.remove("open");
  });



  // =========================================================================
  // Interactive Checklist State & Handler (Handbook Section 7 & Drawer)
  // =========================================================================
  const checklistState = {
    site: [false, false, false, false],
    equipment: [false, false, false, false],
    ppe: [false, false, false, false]
  };

  function updateChecklistUI() {
    // 1. Update Section 7 Checkboxes if rendered
    document.querySelectorAll(".checklist-cb").forEach((cb) => {
      const domain = cb.dataset.domain;
      const idx = parseInt(cb.dataset.idx, 10);
      if (domain && !isNaN(idx)) {
        cb.checked = !!checklistState[domain]?.[idx];
        cb.closest(".check-item")?.classList.toggle("is-checked", cb.checked);
      }
    });

    // 2. Update Drawer Checkboxes
    document.querySelectorAll(".drawer-cb").forEach((cb) => {
      const domain = cb.dataset.domain;
      const idx = parseInt(cb.dataset.idx, 10);
      if (domain && !isNaN(idx)) {
        cb.checked = !!checklistState[domain]?.[idx];
        cb.closest(".check-item")?.classList.toggle("is-checked", cb.checked);
      }
    });

    // 3. Calculate Counts
    const siteCount = checklistState.site.filter(Boolean).length;
    const equipCount = checklistState.equipment.filter(Boolean).length;
    const ppeCount = checklistState.ppe.filter(Boolean).length;
    const totalCount = siteCount + equipCount + ppeCount;

    // 4. Update Badges in Section 7
    const countBadge = document.getElementById("handbook-checklist-count");
    if (countBadge) countBadge.textContent = totalCount;
    const siteBadge = document.getElementById("count-site");
    if (siteBadge) siteBadge.textContent = `${siteCount}/4`;
    const equipBadge = document.getElementById("count-equipment");
    if (equipBadge) equipBadge.textContent = `${equipCount}/4`;
    const ppeBadge = document.getElementById("count-ppe");
    if (ppeBadge) ppeBadge.textContent = `${ppeCount}/4`;

    // 5. Update Badges in Drawer
    const drawerTotalBadge = document.getElementById("drawer-checked-count");
    if (drawerTotalBadge) drawerTotalBadge.textContent = totalCount;
    const drawerSite = document.getElementById("drawer-count-site");
    if (drawerSite) drawerSite.textContent = `${siteCount}/4`;
    const drawerEquip = document.getElementById("drawer-count-equipment");
    if (drawerEquip) drawerEquip.textContent = `${equipCount}/4`;
    const drawerPpe = document.getElementById("drawer-count-ppe");
    if (drawerPpe) drawerPpe.textContent = `${ppeCount}/4`;
  }

  function initInteractiveChecklist() {
    // Attach change listeners to Section 7 checkboxes
    document.querySelectorAll(".checklist-cb").forEach((cb) => {
      cb.onchange = () => {
        const domain = cb.dataset.domain;
        const idx = parseInt(cb.dataset.idx, 10);
        if (domain && !isNaN(idx)) {
          checklistState[domain][idx] = cb.checked;
          updateChecklistUI();
        }
      };
    });

    // Section 7 toolbar buttons
    const btnAll = document.getElementById("btn-check-all");
    if (btnAll) {
      btnAll.onclick = () => {
        ["site", "equipment", "ppe"].forEach((dom) => {
          checklistState[dom] = [true, true, true, true];
        });
        updateChecklistUI();
      };
    }

    const btnClear = document.getElementById("btn-check-clear");
    if (btnClear) {
      btnClear.onclick = () => {
        ["site", "equipment", "ppe"].forEach((dom) => {
          checklistState[dom] = [false, false, false, false];
        });
        updateChecklistUI();
      };
    }

    // Attach change listeners to Drawer checkboxes
    document.querySelectorAll(".drawer-cb").forEach((cb) => {
      cb.onchange = () => {
        const domain = cb.dataset.domain;
        const idx = parseInt(cb.dataset.idx, 10);
        if (domain && !isNaN(idx)) {
          checklistState[domain][idx] = cb.checked;
          updateChecklistUI();
        }
      };
    });

    // Drawer toolbar buttons
    const btnDrawerAll = document.getElementById("btn-drawer-check-all");
    if (btnDrawerAll) {
      btnDrawerAll.onclick = () => {
        ["site", "equipment", "ppe"].forEach((dom) => {
          checklistState[dom] = [true, true, true, true];
        });
        updateChecklistUI();
      };
    }

    const btnDrawerClear = document.getElementById("btn-drawer-check-clear");
    if (btnDrawerClear) {
      btnDrawerClear.onclick = () => {
        ["site", "equipment", "ppe"].forEach((dom) => {
          checklistState[dom] = [false, false, false, false];
        });
        updateChecklistUI();
      };
    }

    updateChecklistUI();
  }

  // =========================================================================
  // Handbook Rendering & Scrollspy Tracking
  // =========================================================================
  let isManualHandbookScroll = false;
  let manualScrollTimeout = null;

  function updateHandbookScrollspy() {
    if (state.currentView !== "handbook" || isManualHandbookScroll) return;

    const sections = HANDBOOK_DATA.sections.map((sec) => document.getElementById(sec.id)).filter(Boolean);
    if (!sections.length) return;

    // Viewport target line (offset from top for sticky header)
    const scrollPos = window.scrollY + 160;

    let currentSecId = sections[0].id;
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      if (sec.offsetTop <= scrollPos) {
        currentSecId = sec.id;
      } else {
        break;
      }
    }

    // Check if scrolled near bottom of page (highlight section 7)
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 160)) {
      currentSecId = sections[sections.length - 1].id;
    }

    document.querySelectorAll(".handbook-nav-link").forEach((link) => {
      const href = link.getAttribute("href");
      const isActive = (href === `#${currentSecId}`);
      link.classList.toggle("active", isActive);
    });
  }

  window.addEventListener("scroll", updateHandbookScrollspy, { passive: true });

  function renderHandbookContent() {
    const container = document.getElementById("handbook-sections-container");
    const navList = document.getElementById("handbook-nav-list");
    if (!container || !navList) return;

    if (container.children.length > 0) {
      updateHandbookScrollspy();
      return;
    }

    navList.innerHTML = "";
    container.innerHTML = "";

    HANDBOOK_DATA.sections.forEach((sec, idx) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.className = `handbook-nav-link ${idx === 0 ? "active" : ""}`;
      a.href = `#${sec.id}`;
      a.textContent = `${sec.number}. ${sec.title}`;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        isManualHandbookScroll = true;
        document.querySelectorAll(".handbook-nav-link").forEach((link) => link.classList.remove("active"));
        a.classList.add("active");

        const targetEl = document.getElementById(sec.id);
        if (targetEl) {
          const headerOffset = 130;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }

        clearTimeout(manualScrollTimeout);
        manualScrollTimeout = setTimeout(() => {
          isManualHandbookScroll = false;
        }, 800);
      });
      li.appendChild(a);
      navList.appendChild(li);

      const card = document.createElement("section");
      card.id = sec.id;
      card.className = "handbook-section-card";
      card.innerHTML = `
        <div class="section-badge-row">
          <span class="badge-pill">${sec.badge}</span>
          <span class="dossier-time">SECTION ${sec.number} OF ${HANDBOOK_DATA.sections.length}</span>
        </div>
        <h2 class="section-main-heading">${sec.title}</h2>
        <div class="section-lead-subtitle">${sec.subtitle}</div>
        <div class="section-body-content">${sec.content}</div>
      `;
      container.appendChild(card);
    });

    // Bottom CTA Card: Advance to Domain Practice
    const nextCard = document.createElement("div");
    nextCard.className = "handbook-footer-cta";
    nextCard.innerHTML = `
      <div class="handbook-footer-info">
        <div class="footer-step-tag">STEP 02 OF 03</div>
        <h3 class="footer-cta-title">Ready for Domain Practice?</h3>
        <p class="footer-cta-desc">Test your operational decision-making across real field evidence in Site Conditions, Equipment, and PPE readiness.</p>
      </div>
      <button class="btn-cta-domain" id="btn-handbook-next-domain">
        <span>Start Domain Practice →</span>
      </button>
    `;
    container.appendChild(nextCard);

    document.getElementById("btn-handbook-next-domain")?.addEventListener("click", () => {
      switchView("quiz");
    });
    document.getElementById("btn-sidebar-next-domain")?.addEventListener("click", () => {
      switchView("quiz");
    });

    initInteractiveChecklist();
    updateHandbookScrollspy();
  }

  // =========================================================================
  // Part A: Domain Practice (3 Domains x 2 Cases)
  // =========================================================================
  function renderQuizQuestion(index) {
    state.currentQuizIndex = index;
    const qData = QUIZ_QUESTIONS[index];
    const container = document.getElementById("quiz-card-container");
    if (!container || !qData) return;

    const currentAnswer = state.quizAnswers[qData.id] || { q1: null, q2: null, submitted: false };

    container.innerHTML = `
      <div class="dossier-header-bar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span class="tag-area ${qData.tagClass}">${qData.area.toUpperCase()} PRACTICE</span>
        <span class="dossier-time" style="font-family: var(--font-mono); font-weight: 700; color: #64748b;">
          CASE ${index + 1} OF ${QUIZ_QUESTIONS.length}
        </span>
      </div>

      <h3 style="font-size: 1.35rem; font-weight: 800; margin: 0.5rem 0 1.25rem; color: var(--color-text-primary);">
        ${qData.title}
      </h3>

      ${qData.evidenceSnippet}

      <!-- Question 1: Decision -->
      <div class="question-block" id="q1-block">
        <div class="q-label">Question 1 — Decision</div>
        <div class="q-prompt">${qData.q1.prompt}</div>
        <div class="options-container" id="q1-options">
          ${qData.q1.options.map((opt) => `
            <button class="option-btn ${currentAnswer.q1 === opt.id ? "selected" : ""}" data-q="1" data-opt="${opt.id}" ${currentAnswer.submitted ? "disabled" : ""}>
              <span class="opt-letter">${opt.id}</span>
              <div class="opt-text-col">
                <span class="opt-main">${opt.text}</span>
                ${opt.desc ? `<span class="opt-sub">${opt.desc}</span>` : ""}
              </div>
            </button>
          `).join("")}
        </div>
      </div>

      <!-- Question 2: Next Action -->
      <div class="question-block" id="q2-block">
        <div class="q-label">Question 2 — Next Action</div>
        <div class="q-prompt">${qData.q2.prompt}</div>
        <div class="options-container" id="q2-options">
          ${qData.q2.options.map((opt) => `
            <button class="option-btn ${currentAnswer.q2 === opt.id ? "selected" : ""}" data-q="2" data-opt="${opt.id}" ${currentAnswer.submitted ? "disabled" : ""}>
              <span class="opt-letter">${opt.id}</span>
              <div class="opt-text-col">
                <span class="opt-main">${opt.text}</span>
              </div>
            </button>
          `).join("")}
        </div>
      </div>

      <div id="quiz-feedback-mount"></div>

      <div class="test-actions-footer">
        <button class="btn-secondary" id="btn-quiz-prev" ${index === 0 ? "disabled" : ""}>
          ← Previous Case
        </button>
        <div style="display: flex; gap: 0.75rem;">
          <button class="btn-primary" id="btn-quiz-submit" ${currentAnswer.submitted ? "style='display:none;'" : ""}>
            Submit Decision
          </button>
          <button class="btn-primary" id="btn-quiz-next" ${!currentAnswer.submitted ? "style='display:none;'" : ""}>
            ${index < QUIZ_QUESTIONS.length - 1 ? "Next Case →" : "Advance to Scenarios →"}
          </button>
        </div>
      </div>
    `;

    // Bind option selections
    container.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (currentAnswer.submitted) return;
        const qNum = btn.dataset.q;
        const optId = btn.dataset.opt;

        if (qNum === "1") {
          currentAnswer.q1 = optId;
          container.querySelectorAll('#q1-options .option-btn').forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        } else {
          currentAnswer.q2 = optId;
          container.querySelectorAll('#q2-options .option-btn').forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        }
        state.quizAnswers[qData.id] = currentAnswer;
      });
    });

    document.getElementById("btn-quiz-prev")?.addEventListener("click", () => {
      if (index > 0) renderQuizQuestion(index - 1);
    });

    document.getElementById("btn-quiz-submit")?.addEventListener("click", () => {
      if (!currentAnswer.q1 || !currentAnswer.q2) {
        alert("Please select both a Decision (Question 1) and a Next Action (Question 2) before submitting.");
        return;
      }

      const q1Correct = (currentAnswer.q1 === qData.q1.correct);
      const q2Correct = (currentAnswer.q2 === qData.q2.correct);
      currentAnswer.submitted = true;
      currentAnswer.q1Correct = q1Correct;
      currentAnswer.q2Correct = q2Correct;
      currentAnswer.isCorrect = q1Correct && q2Correct;
      state.quizAnswers[qData.id] = currentAnswer;

      renderQuizQuestion(index);
      updateNavLocks();
    });

    // If submitted, show feedback & marks
    if (currentAnswer.submitted) {
      renderQuizFeedback(qData, currentAnswer);
      container.querySelectorAll('#q1-options .option-btn').forEach((btn) => {
        btn.disabled = true;
        const opt = btn.dataset.opt;
        if (opt === qData.q1.correct) btn.classList.add("correct");
        else if (opt === currentAnswer.q1) btn.classList.add("incorrect");
      });
      container.querySelectorAll('#q2-options .option-btn').forEach((btn) => {
        btn.disabled = true;
        const opt = btn.dataset.opt;
        if (opt === qData.q2.correct) btn.classList.add("correct");
        else if (opt === currentAnswer.q2) btn.classList.add("incorrect");
      });
    }

    document.getElementById("btn-quiz-next")?.addEventListener("click", () => {
      if (index < QUIZ_QUESTIONS.length - 1) {
        renderQuizQuestion(index + 1);
      } else {
        if (!isDomainPracticeCompleted()) {
          alert("Bạn cần hoàn thành tất cả 6 tình huống trong Domain Practice trước khi qua phần Scenarios!");
          return;
        }
        switchView("scenarios");
      }
    });
  }

  function renderQuizFeedback(qData, answer) {
    const mount = document.getElementById("quiz-feedback-mount");
    if (!mount) return;

    const q1Ok = !!answer.q1Correct;
    const q2Ok = !!answer.q2Correct;
    const bothOk = q1Ok && q2Ok;
    const partialOk = (q1Ok || q2Ok) && !bothOk;
    const boxClass = bothOk ? "correct" : (partialOk ? "partial" : "incorrect");
    const headerTitle = bothOk 
      ? "✓ DECISION & ACTION VERIFIED: CORRECT" 
      : (partialOk ? "⚠ PARTIALLY CORRECT (1/2 QUESTIONS)" : "✕ CORRECTION REQUIRED (0/2 QUESTIONS)");

    mount.innerHTML = `
      <div class="feedback-box ${boxClass}">
        <div class="feedback-header">
          <span>${headerTitle}</span>
        </div>
        <div class="feedback-badge-row">
          <span class="feedback-badge ${q1Ok ? "ok" : "err"}">
            ${q1Ok ? "✓ Question 1 (Decision): Correct" : "✕ Question 1 (Decision): Incorrect"}
          </span>
          <span class="feedback-badge ${q2Ok ? "ok" : "err"}">
            ${q2Ok ? "✓ Question 2 (Next Action): Correct" : "✕ Question 2 (Next Action): Incorrect"}
          </span>
        </div>
        <div class="feedback-body">
          <p><strong>Approved Decision:</strong> ${qData.explanation.decision}</p>
          <p><strong>Approved Next Action:</strong> ${qData.explanation.action}</p>
          <p style="margin-top: 0.5rem;">${qData.explanation.details}</p>
          <div class="competency-note">
            <strong>Supervisory Focus:</strong> ${qData.explanation.competencyNote}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // Part B: Integrated Scenarios (01 · Evidence mismatches, 02 · Changing conditions)
  // =========================================================================
  function renderScenarioRound(scenarioIdx, roundIdx) {
    state.currentScenarioIndex = scenarioIdx;
    state.currentRoundIndex = roundIdx;

    const scenario = SCENARIO_CLUSTERS[scenarioIdx];
    const roundData = scenario.rounds[roundIdx];
    const container = document.getElementById("scenario-card-container");
    if (!container || !roundData) return;

    const answerKey = `${scenario.id}_round${roundData.roundNumber}`;
    const currentAnswer = state.scenarioAnswers[answerKey] || { q1: null, q2: null, submitted: false };

    container.innerHTML = `
      <div class="scenario-briefing-card">
        <h3 class="scenario-title">${scenario.title}</h3>
        <p class="scenario-desc">${scenario.briefing}</p>
      </div>

      <div class="round-status-banner">
        <span class="round-title-tag">${(roundData.subtitle || "").toUpperCase()}</span>
        <span class="dossier-time" style="font-family: var(--font-mono); font-weight: 700; color: #64748b;">
          STAGE ${roundData.roundNumber} OF 2
        </span>
      </div>

      <div class="evidence-trio-grid">
        ${roundData.areas.map((a) => `
          <div class="evidence-trio-card">
            <div class="trio-card-header">
              <span class="tag-area ${a.tagClass || ""}">${a.name || ""}</span>
            </div>
            <div class="trio-card-body">${a.details || ""}</div>
          </div>
        `).join("")}
      </div>

      <!-- Question 1: Decision -->
      <div class="question-block">
        <div class="q-label">Question 1 — Decision</div>
        <div class="q-prompt">${roundData.q1.prompt}</div>
        <div class="options-container" id="scenario-q1-options">
          ${roundData.q1.options.map((opt) => `
            <button class="option-btn ${currentAnswer.q1 === opt.id ? "selected" : ""}" data-sq="1" data-opt="${opt.id}" ${currentAnswer.submitted ? "disabled" : ""}>
              <span class="opt-letter">${opt.id}</span>
              <div class="opt-text-col">
                <span class="opt-main">${opt.text}</span>
              </div>
            </button>
          `).join("")}
        </div>
      </div>

      <!-- Question 2: Next Action -->
      <div class="question-block">
        <div class="q-label">Question 2 — Next Action</div>
        <div class="q-prompt">${roundData.q2.prompt}</div>
        <div class="options-container" id="scenario-q2-options">
          ${roundData.q2.options.map((opt) => `
            <button class="option-btn ${currentAnswer.q2 === opt.id ? "selected" : ""}" data-sq="2" data-opt="${opt.id}" ${currentAnswer.submitted ? "disabled" : ""}>
              <span class="opt-letter">${opt.id}</span>
              <div class="opt-text-col">
                <span class="opt-main">${opt.text}</span>
              </div>
            </button>
          `).join("")}
        </div>
      </div>

      <div id="scenario-feedback-mount"></div>

      <div class="test-actions-footer" style="display: flex; justify-content: flex-end;">
        <div style="display: flex; gap: 0.75rem;">
          <button class="btn-primary" id="btn-scenario-submit" ${currentAnswer.submitted ? "style='display:none;'" : ""}>
            Submit Decision
          </button>
          <button class="btn-primary" id="btn-scenario-next" ${!currentAnswer.submitted ? "style='display:none;'" : ""}>
            ${roundIdx === 0 ? "Advance to Round 2 →" : scenarioIdx === 0 ? "Advance to Scenario 02 →" : "View Results & Next Steps →"}
          </button>
        </div>
      </div>
    `;

    // Bind option selections
    container.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (currentAnswer.submitted) return;
        const qNum = btn.dataset.sq;
        const optId = btn.dataset.opt;

        if (qNum === "1") {
          currentAnswer.q1 = optId;
          container.querySelectorAll('#scenario-q1-options .option-btn').forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        } else {
          currentAnswer.q2 = optId;
          container.querySelectorAll('#scenario-q2-options .option-btn').forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        }
        state.scenarioAnswers[answerKey] = currentAnswer;
      });
    });

    document.getElementById("btn-scenario-submit")?.addEventListener("click", () => {
      if (!currentAnswer.q1 || !currentAnswer.q2) {
        alert("Please select both your Decision and your Next Action before submitting.");
        return;
      }

      const q1Correct = (currentAnswer.q1 === roundData.q1.correct);
      const q2Correct = (currentAnswer.q2 === roundData.q2.correct);
      currentAnswer.submitted = true;
      currentAnswer.q1Correct = q1Correct;
      currentAnswer.q2Correct = q2Correct;
      currentAnswer.isCorrect = q1Correct && q2Correct;
      state.scenarioAnswers[answerKey] = currentAnswer;

      renderScenarioRound(scenarioIdx, roundIdx);
    });

    if (currentAnswer.submitted) {
      renderScenarioFeedback(roundData, currentAnswer);
      container.querySelectorAll('#scenario-q1-options .option-btn').forEach((btn) => {
        btn.disabled = true;
        const opt = btn.dataset.opt;
        if (opt === roundData.q1.correct) btn.classList.add("correct");
        else if (opt === currentAnswer.q1) btn.classList.add("incorrect");
      });
      container.querySelectorAll('#scenario-q2-options .option-btn').forEach((btn) => {
        btn.disabled = true;
        const opt = btn.dataset.opt;
        if (opt === roundData.q2.correct) btn.classList.add("correct");
        else if (opt === currentAnswer.q2) btn.classList.add("incorrect");
      });
    }

    document.getElementById("btn-scenario-next")?.addEventListener("click", () => {
      if (roundIdx === 0) {
        renderScenarioRound(scenarioIdx, 1);
      } else if (scenarioIdx === 0) {
        renderScenarioRound(1, 0);
      } else {
        state.testCompleted = true;
        if (navStepResults) navStepResults.style.display = "inline-flex";
        switchView("dashboard");
      }
    });
  }

  function renderScenarioFeedback(roundData, answer) {
    const mount = document.getElementById("scenario-feedback-mount");
    if (!mount) return;

    const q1Ok = !!answer.q1Correct;
    const q2Ok = !!answer.q2Correct;
    const bothOk = q1Ok && q2Ok;
    const partialOk = (q1Ok || q2Ok) && !bothOk;
    const boxClass = bothOk ? "correct" : (partialOk ? "partial" : "incorrect");
    const headerTitle = bothOk 
      ? "✓ OPERATIONAL DECISION & ACTION CONFIRMED" 
      : (partialOk ? "⚠ PARTIALLY CORRECT (1/2 QUESTIONS)" : "✕ CORRECTION REQUIRED (0/2 QUESTIONS)");

    mount.innerHTML = `
      <div class="feedback-box ${boxClass}">
        <div class="feedback-header">
          <span>${headerTitle}</span>
        </div>
        <div class="feedback-badge-row">
          <span class="feedback-badge ${q1Ok ? "ok" : "err"}">
            ${q1Ok ? "✓ Question 1 (Decision): Correct" : "✕ Question 1 (Decision): Incorrect"}
          </span>
          <span class="feedback-badge ${q2Ok ? "ok" : "err"}">
            ${q2Ok ? "✓ Question 2 (Next Action): Correct" : "✕ Question 2 (Next Action): Incorrect"}
          </span>
        </div>
        <div class="feedback-body">
          <p><strong>Approved Decision:</strong> ${roundData.explanation.decision}</p>
          <p><strong>Approved Next Action:</strong> ${roundData.explanation.action}</p>
          <p style="margin-top: 0.5rem;">${roundData.explanation.details}</p>
          <div class="competency-note">
            <strong>Supervisory Focus:</strong> ${roundData.explanation.competencyNote}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // Evaluation Calculation & Exact Pixel-Matched Results Screen
  // =========================================================================
  function getOptionText(options, id) {
    if (!id || !options) return "Not selected";
    const found = options.find((o) => o.id === id);
    return found ? found.text : `Option ${id}`;
  }



  function calculateLiveEvaluation() {
    const c1 = state.quizAnswers["q1"] || {};
    const c2 = state.quizAnswers["q2"] || {};
    const c3 = state.quizAnswers["q3"] || {};
    const c4 = state.quizAnswers["q4"] || {};
    const c5 = state.quizAnswers["q5"] || {};
    const c6 = state.quizAnswers["q6"] || {};

    const siteCasesMet = (c1.isCorrect ? 1 : 0) + (c2.isCorrect ? 1 : 0);
    const equipCasesMet = (c3.isCorrect ? 1 : 0) + (c4.isCorrect ? 1 : 0);
    const ppeCasesMet = (c5.isCorrect ? 1 : 0) + (c6.isCorrect ? 1 : 0);
    const domainCasesScore = siteCasesMet + equipCasesMet + ppeCasesMet; // out of 6

    const siteQCorrect = (c1.q1Correct ? 1 : 0) + (c1.q2Correct ? 1 : 0) + (c2.q1Correct ? 1 : 0) + (c2.q2Correct ? 1 : 0);
    const equipQCorrect = (c3.q1Correct ? 1 : 0) + (c3.q2Correct ? 1 : 0) + (c4.q1Correct ? 1 : 0) + (c4.q2Correct ? 1 : 0);
    const ppeQCorrect = (c5.q1Correct ? 1 : 0) + (c5.q2Correct ? 1 : 0) + (c6.q1Correct ? 1 : 0) + (c6.q2Correct ? 1 : 0);
    const domainQScore = siteQCorrect + equipQCorrect + ppeQCorrect; // out of 12

    // Scenarios (4 questions each = 8 questions)
    const s1r1 = state.scenarioAnswers["scenario-1_round1"] || {};
    const s1r2 = state.scenarioAnswers["scenario-1_round2"] || {};
    const s2r1 = state.scenarioAnswers["scenario-2_round1"] || {};
    const s2r2 = state.scenarioAnswers["scenario-2_round2"] || {};

    const scen1QCorrect = (s1r1.q1Correct ? 1 : 0) + (s1r1.q2Correct ? 1 : 0) + (s1r2.q1Correct ? 1 : 0) + (s1r2.q2Correct ? 1 : 0);
    const scen2QCorrect = (s2r1.q1Correct ? 1 : 0) + (s2r1.q2Correct ? 1 : 0) + (s2r2.q1Correct ? 1 : 0) + (s2r2.q2Correct ? 1 : 0);

    const scen1Pass = (scen1QCorrect === 4);
    const scen2Pass = (scen2QCorrect === 4);
    const scenariosMetCount = (scen1Pass ? 1 : 0) + (scen2Pass ? 1 : 0);
    const scenarioQScore = scen1QCorrect + scen2QCorrect; // out of 8

    // Total questions across entire test: 12 + 8 = 20
    const totalCorrectQ = domainQScore + scenarioQScore;

    // Critical No-Go Mistakes
    let criticalMissedCount = 0;
    if (c2.q1 && c2.q1 !== "C") criticalMissedCount++;
    if (c6.q1 && c6.q1 !== "C") criticalMissedCount++;
    if (s2r1.q1 && s2r1.q1 !== "C") criticalMissedCount++;

    // STRICT PASSING RULE CLARIFIED BY USER:
    // "logic mà sai 1 câu là sai hết là kiểu sai 1 câu trong tất cả chứ không phải sai 1 câu trong 2 câu của 1 case"
    // To pass: ALL 20 questions across the entire test must be correct!
    const isPassing = (totalCorrectQ === 20);

    return {
      isPassing,
      totalCorrectQ,
      domainCasesScore,
      domainQScore,
      siteCasesMet,
      siteQCorrect,
      equipCasesMet,
      equipQCorrect,
      ppeCasesMet,
      ppeQCorrect,
      scen1Pass,
      scen2Pass,
      scen1QCorrect,
      scen2QCorrect,
      scenariosMetCount,
      scenarioQScore,
      criticalMissedCount,
      cases: { c1, c2, c3, c4, c5, c6 },
      scenarioRounds: { s1r1, s1r2, s2r1, s2r2 }
    };
  }

  function renderDetailedReviewHistory(answers) {
    let html = "";

    // 1. Part A: Domain Cases
    html += `
      <div class="review-section-header">
        <span>📋</span>
        <span>Part A · Domain Practice Cases (6 Cases)</span>
      </div>
      <div class="review-cases-grid">
    `;

    QUIZ_QUESTIONS.forEach((qData, idx) => {
      const ans = answers.quiz[qData.id] || { q1: null, q2: null, q1Correct: false, q2Correct: false, isCorrect: false };
      const q1Ok = !!ans.q1Correct;
      const q2Ok = !!ans.q2Correct;
      const bothOk = q1Ok && q2Ok;
      const partialOk = (q1Ok || q2Ok) && !bothOk;

      const cardClass = bothOk ? "pass" : (partialOk ? "partial" : "fail");
      const badgeClass = bothOk ? "pass" : (partialOk ? "partial" : "fail");
      const caseStatusLabel = bothOk ? "✓ 2/2 Correct" : (partialOk ? "⚠ 1/2 Correct (Partial)" : "✕ 0/2 Incorrect");

      const userQ1Text = getOptionText(qData.q1.options, ans.q1);
      const approvedQ1Text = getOptionText(qData.q1.options, qData.q1.correct);
      const userQ2Text = getOptionText(qData.q2.options, ans.q2);
      const approvedQ2Text = getOptionText(qData.q2.options, qData.q2.correct);

      html += `
        <div class="review-case-card ${cardClass}">
          <div class="review-case-header">
            <div class="review-case-title-col">
              <span class="review-case-meta">Case ${idx + 1} · ${qData.area.toUpperCase()}</span>
              <h4 class="review-case-title">${qData.title}</h4>
            </div>
            <span class="case-score-badge ${badgeClass}">${caseStatusLabel}</span>
          </div>

          <div class="review-q-list">
            <!-- Question 1 -->
            <div class="review-q-row ${q1Ok ? "ok" : "err"}">
              <div class="review-q-meta">
                <span class="review-q-tag">QUESTION 1 — DECISION</span>
                <span class="review-q-status-badge ${q1Ok ? "ok" : "err"}">
                  ${q1Ok ? "✓ Correct" : "✕ Incorrect"}
                </span>
              </div>
              <div class="review-q-prompt">${qData.q1.prompt}</div>
              <div class="review-q-choices">
                <div class="ans-line">
                  <span class="ans-label">Your decision:</span>
                  <span class="${q1Ok ? "ans-val-green" : "ans-val-red"}">
                    [${ans.q1 || "—"}] ${userQ1Text}
                  </span>
                </div>
                ${!q1Ok ? `
                  <div class="ans-line">
                    <span class="ans-label">Approved decision:</span>
                    <span class="ans-val-green">
                      [${qData.q1.correct}] ${approvedQ1Text}
                    </span>
                  </div>
                ` : ""}
              </div>
            </div>

            <!-- Question 2 -->
            <div class="review-q-row ${q2Ok ? "ok" : "err"}">
              <div class="review-q-meta">
                <span class="review-q-tag">QUESTION 2 — NEXT ACTION</span>
                <span class="review-q-status-badge ${q2Ok ? "ok" : "err"}">
                  ${q2Ok ? "✓ Correct" : "✕ Incorrect"}
                </span>
              </div>
              <div class="review-q-prompt">${qData.q2.prompt}</div>
              <div class="review-q-choices">
                <div class="ans-line">
                  <span class="ans-label">Your next action:</span>
                  <span class="${q2Ok ? "ans-val-green" : "ans-val-red"}">
                    [${ans.q2 || "—"}] ${userQ2Text}
                  </span>
                </div>
                ${!q2Ok ? `
                  <div class="ans-line">
                    <span class="ans-label">Approved action:</span>
                    <span class="ans-val-green">
                      [${qData.q2.correct}] ${approvedQ2Text}
                    </span>
                  </div>
                ` : ""}
              </div>
            </div>
          </div>

          <div class="review-rationale-box">
            <strong>Supervisory Rule:</strong> ${qData.explanation.details}
          </div>
        </div>
      `;
    });

    html += `</div>`;

    // 2. Part B: Integrated Scenarios
    html += `
      <div class="review-section-header" style="margin-top: 2rem;">
        <span>🎯</span>
        <span>Part B · Integrated Scenarios (4 Stages)</span>
      </div>
      <div class="review-cases-grid">
    `;

    SCENARIO_CLUSTERS.forEach((scen) => {
      scen.rounds.forEach((round) => {
        const answerKey = `${scen.id}_round${round.roundNumber}`;
        const ans = answers.scenarios[answerKey] || { q1: null, q2: null, q1Correct: false, q2Correct: false, isCorrect: false };
        const q1Ok = !!ans.q1Correct;
        const q2Ok = !!ans.q2Correct;
        const bothOk = q1Ok && q2Ok;
        const partialOk = (q1Ok || q2Ok) && !bothOk;

        const cardClass = bothOk ? "pass" : (partialOk ? "partial" : "fail");
        const badgeClass = bothOk ? "pass" : (partialOk ? "partial" : "fail");
        const caseStatusLabel = bothOk ? "✓ 2/2 Correct" : (partialOk ? "⚠ 1/2 Correct (Partial)" : "✕ 0/2 Incorrect");

        const userQ1Text = getOptionText(round.q1.options, ans.q1);
        const approvedQ1Text = getOptionText(round.q1.options, round.q1.correct);
        const userQ2Text = getOptionText(round.q2.options, ans.q2);
        const approvedQ2Text = getOptionText(round.q2.options, round.q2.correct);

        html += `
          <div class="review-case-card ${cardClass}">
            <div class="review-case-header">
              <div class="review-case-title-col">
                <span class="review-case-meta">Scenario ${scen.code} · Stage ${round.roundNumber} of 2</span>
                <h4 class="review-case-title">${scen.title} — ${round.subtitle}</h4>
              </div>
              <span class="case-score-badge ${badgeClass}">${caseStatusLabel}</span>
            </div>

            <div class="review-q-list">
              <!-- Question 1 -->
              <div class="review-q-row ${q1Ok ? "ok" : "err"}">
                <div class="review-q-meta">
                  <span class="review-q-tag">QUESTION 1 — DECISION</span>
                  <span class="review-q-status-badge ${q1Ok ? "ok" : "err"}">
                    ${q1Ok ? "✓ Correct" : "✕ Incorrect"}
                  </span>
                </div>
                <div class="review-q-prompt">${round.q1.prompt}</div>
                <div class="review-q-choices">
                  <div class="ans-line">
                    <span class="ans-label">Your decision:</span>
                    <span class="${q1Ok ? "ans-val-green" : "ans-val-red"}">
                      [${ans.q1 || "—"}] ${userQ1Text}
                    </span>
                  </div>
                  ${!q1Ok ? `
                    <div class="ans-line">
                      <span class="ans-label">Approved decision:</span>
                      <span class="ans-val-green">
                        [${round.q1.correct}] ${approvedQ1Text}
                      </span>
                    </div>
                  ` : ""}
                </div>
              </div>

              <!-- Question 2 -->
              <div class="review-q-row ${q2Ok ? "ok" : "err"}">
                <div class="review-q-meta">
                  <span class="review-q-tag">QUESTION 2 — NEXT ACTION</span>
                  <span class="review-q-status-badge ${q2Ok ? "ok" : "err"}">
                    ${q2Ok ? "✓ Correct" : "✕ Incorrect"}
                  </span>
                </div>
                <div class="review-q-prompt">${round.q2.prompt}</div>
                <div class="review-q-choices">
                  <div class="ans-line">
                    <span class="ans-label">Your next action:</span>
                    <span class="${q2Ok ? "ans-val-green" : "ans-val-red"}">
                      [${ans.q2 || "—"}] ${userQ2Text}
                    </span>
                  </div>
                  ${!q2Ok ? `
                    <div class="ans-line">
                      <span class="ans-label">Approved action:</span>
                      <span class="ans-val-green">
                        [${round.q2.correct}] ${approvedQ2Text}
                      </span>
                    </div>
                  ` : ""}
                </div>
              </div>
            </div>

            <div class="review-rationale-box">
              <strong>Supervisory Rule:</strong> ${round.explanation.details}
            </div>
          </div>
        `;
      });
    });

    html += `</div>`;
    html += `
      <div class="review-footer-action-row" style="display: flex; justify-content: flex-end; align-items: center; gap: 1rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px dashed #cbd5e1;">
        <span style="font-size: 0.85rem; color: #64748b; font-weight: 500;">Ready to retake? Clear decisions and start over:</span>
        <button class="btn-retake-header" id="btn-retake-history">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 4v6h6M23 20v-6h-6"/>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
          </svg>
          <span>Retake practice</span>
        </button>
      </div>
    `;
    return html;
  }

  function renderResultsScreen() {
    const container = document.getElementById("dashboard-content-mount");
    if (!container) return;

    const live = calculateLiveEvaluation();
    const isPassing = live.isPassing;
    const totalCorrectQ = live.totalCorrectQ;
    const domainCasesScore = live.domainCasesScore;
    const domainQScore = live.domainQScore;
    const siteCasesMet = live.siteCasesMet;
    const siteQCorrect = live.siteQCorrect;
    const equipCasesMet = live.equipCasesMet;
    const equipQCorrect = live.equipQCorrect;
    const ppeCasesMet = live.ppeCasesMet;
    const ppeQCorrect = live.ppeQCorrect;
    const scen1Pass = live.scen1Pass;
    const scen2Pass = live.scen2Pass;
    const scen1QCorrect = live.scen1QCorrect;
    const scen2QCorrect = live.scen2QCorrect;
    const scenariosMetCount = live.scenariosMetCount;
    const criticalMissedCount = live.criticalMissedCount;
    const reviewAnswers = {
      quiz: state.quizAnswers,
      scenarios: state.scenarioAnswers
    };
    const casesObj = live.cases;

    const statusTitle = isPassing ? "Criteria met" : "Review required";
    const statusPill = isPassing ? "Ready to authorize" : "Action required";
    const statusDesc = isPassing
      ? "All 20/20 questions verified. Zero unresolved readiness requirements across all domains."
      : `${20 - totalCorrectQ} requirement(s) unresolved (${totalCorrectQ}/20 correct). Re-assessment required before supervisory authorization.`;

    const c1 = casesObj.c1 || {};
    const c2 = casesObj.c2 || {};
    const c3 = casesObj.c3 || {};
    const c4 = casesObj.c4 || {};
    const c5 = casesObj.c5 || {};
    const c6 = casesObj.c6 || {};

    const historyCardsHtml = renderDetailedReviewHistory(reviewAnswers);

    container.innerHTML = `
      <!-- Header Row -->
      <div class="results-header-row">
        <div>
          <div class="results-super-tag">YOUR LEARNING SUMMARY</div>
          <h1 class="results-main-title">Your results & next steps</h1>
          <p class="results-subtitle">See your progress. Take the key decisions with you.</p>
        </div>
        <div class="results-header-actions" style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.65rem;">
          <div class="results-learner-badge">
            Demo learner · Supervisor
          </div>
          <button class="btn-retake-header" id="btn-retake-header">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 4v6h6M23 20v-6h-6"/>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
            <span>Retake practice</span>
          </button>
        </div>
      </div>

      <!-- Top Status Banner -->
      <div class="results-status-banner ${!isPassing ? "review-state" : ""}">
        <div class="status-banner-left">
          <div class="status-circle-icon">
            ${isPassing ? "✓" : "⚠️"}
          </div>
          <div class="status-text-group">
            <div class="status-title-row">
              <span class="status-main-heading">${statusTitle}</span>
              <span class="status-pill-subtag">${statusPill}</span>
            </div>
            <span class="status-sub-desc">${statusDesc}</span>
          </div>
        </div>
        <div class="status-banner-right">
          <span class="activities-completed-tag">
            <span style="color: ${isPassing ? "#15803d" : "#d97706"};">${isPassing ? "✓" : "⚠️"}</span>
            ${isPassing ? "All activities completed" : `${totalCorrectQ}/20 questions correct`}
          </span>
          <span class="activities-sub-meta">6 practice cases · 2 scenarios</span>
        </div>
      </div>

      <!-- Two-Column Cards Grid -->
      <div class="results-two-col-grid">
        
        <!-- Left: Part A Domain Practice -->
        <div class="eval-card">
          <div>
            <div class="eval-card-header">
              <div>
                <div class="eval-card-pretag">PART A · FIRST ATTEMPT</div>
                <h3 class="eval-card-title">Domain practice</h3>
              </div>
              <div class="eval-big-score">${domainCasesScore} / 6</div>
            </div>

            <div class="domain-metrics-list">
              <!-- Site conditions -->
              <div class="domain-metric-row">
                <span class="domain-name">Site conditions</span>
                <div class="segmented-bar">
                  <div class="segment-pill" title="Case 1: Q1 ${c1.q1Correct ? "✓" : "✕"}, Q2 ${c1.q2Correct ? "✓" : "✕"}">
                    <span class="sub-pill ${c1.q1Correct ? "pass" : ""}"></span>
                    <span class="sub-pill ${c1.q2Correct ? "pass" : ""}"></span>
                  </div>
                  <div class="segment-pill" title="Case 2: Q1 ${c2.q1Correct ? "✓" : "✕"}, Q2 ${c2.q2Correct ? "✓" : "✕"}">
                    <span class="sub-pill ${c2.q1Correct ? "pass" : ""}"></span>
                    <span class="sub-pill ${c2.q2Correct ? "pass" : ""}"></span>
                  </div>
                </div>
                <span class="domain-score-frac">
                  ${siteCasesMet}/2 ${siteQCorrect < 4 ? `<span class="sub-q-count">(${siteQCorrect}/4 q)</span>` : `<span class="sub-q-count">(4/4 q)</span>`}
                </span>
              </div>

              <!-- Equipment -->
              <div class="domain-metric-row">
                <span class="domain-name">Equipment</span>
                <div class="segmented-bar">
                  <div class="segment-pill" title="Case 3: Q1 ${c3.q1Correct ? "✓" : "✕"}, Q2 ${c3.q2Correct ? "✓" : "✕"}">
                    <span class="sub-pill ${c3.q1Correct ? "pass" : ""}"></span>
                    <span class="sub-pill ${c3.q2Correct ? "pass" : ""}"></span>
                  </div>
                  <div class="segment-pill" title="Case 4: Q1 ${c4.q1Correct ? "✓" : "✕"}, Q2 ${c4.q2Correct ? "✓" : "✕"}">
                    <span class="sub-pill ${c4.q1Correct ? "pass" : ""}"></span>
                    <span class="sub-pill ${c4.q2Correct ? "pass" : ""}"></span>
                  </div>
                </div>
                <span class="domain-score-frac">
                  ${equipCasesMet}/2 ${equipQCorrect < 4 ? `<span class="sub-q-count">(${equipQCorrect}/4 q)</span>` : `<span class="sub-q-count">(4/4 q)</span>`}
                </span>
              </div>

              <!-- PPE / respirator -->
              <div class="domain-metric-row">
                <span class="domain-name">PPE / respirator</span>
                <div class="segmented-bar">
                  <div class="segment-pill" title="Case 5: Q1 ${c5.q1Correct ? "✓" : "✕"}, Q2 ${c5.q2Correct ? "✓" : "✕"}">
                    <span class="sub-pill ${c5.q1Correct ? "pass" : ""}"></span>
                    <span class="sub-pill ${c5.q2Correct ? "pass" : ""}"></span>
                  </div>
                  <div class="segment-pill" title="Case 6: Q1 ${c6.q1Correct ? "✓" : "✕"}, Q2 ${c6.q2Correct ? "✓" : "✕"}">
                    <span class="sub-pill ${c6.q1Correct ? "pass" : ""}"></span>
                    <span class="sub-pill ${c6.q2Correct ? "pass" : ""}"></span>
                  </div>
                </div>
                <span class="domain-score-frac">
                  ${ppeCasesMet}/2 ${ppeQCorrect < 4 ? `<span class="sub-q-count">(${ppeQCorrect}/4 q)</span>` : `<span class="sub-q-count">(4/4 q)</span>`}
                </span>
              </div>
            </div>
          </div>

          <div class="eval-card-footer-note">
            A case counts when both Decision and Next Action are correct. Practice scores do not determine the overall result.
          </div>
        </div>

        <!-- Right: Part B Integrated Scenarios -->
        <div class="eval-card">
          <div>
            <div class="eval-card-header">
              <div>
                <div class="eval-card-pretag">PART B · LATEST ATTEMPTS</div>
                <h3 class="eval-card-title">Integrated scenarios</h3>
              </div>
              <div class="eval-big-score">${scenariosMetCount}/2 met</div>
            </div>

            <div class="scenario-metrics-list">
              <!-- Scenario 01 -->
              <div class="scenario-metric-item">
                <div class="scen-col-left">
                  <h5>01 · Evidence mismatches</h5>
                  <div class="scen-attempt-meta">${scen1Pass ? "1 attempt · Met on attempt (4/4 q)" : `1 attempt · ${scen1QCorrect}/4 questions correct`}</div>
                </div>
                <div class="scen-status-pill ${scen1Pass ? "" : "review"}">
                  ${scen1Pass ? "✓ Criteria met" : "✕ Review required"}
                </div>
              </div>

              <!-- Scenario 02 -->
              <div class="scenario-metric-item">
                <div class="scen-col-left">
                  <h5>02 · Changing conditions</h5>
                  <div class="scen-attempt-meta">${scen2Pass ? "1 attempt · Met on attempt (4/4 q)" : `1 attempt · ${scen2QCorrect}/4 questions correct`}</div>
                </div>
                <div class="scen-status-pill ${scen2Pass ? "" : "review"}">
                  ${scen2Pass ? "✓ Criteria met" : "✕ Review required"}
                </div>
              </div>
            </div>
          </div>

          <div class="critical-nogo-bar ${criticalMissedCount > 0 ? "alert-state" : ""}">
            <span class="nogo-label">Critical no-go conditions missed</span>
            <span class="nogo-val">${criticalMissedCount > 0 ? `${criticalMissedCount} critical rule(s) breached` : "0 critical rules breached"}</span>
          </div>
        </div>

      </div>

      <!-- Collapsible Decisions & Attempt History -->
      <div class="accordion-history-wrapper ${state.historyAccordionOpen ? "open" : ""}" id="history-accordion">
        <button class="accordion-trigger-btn" id="btn-toggle-history">
          <div class="accordion-title-left">
            <span>🕒</span>
            <span>Review your decisions & attempt history</span>
          </div>
          <span class="accordion-chevron">∨</span>
        </button>
        <div class="accordion-content-body">
          <div class="review-top-banner">
            <div class="review-stat-col">
              <span class="review-stat-number">${totalCorrectQ} / 20</span>
              <span class="review-stat-label">Total Questions Correct</span>
            </div>
            ${isPassing ? `
              <span class="review-top-badge ok">✓ Criteria Met · 20/20 Passed</span>
            ` : `
              <span class="review-top-badge action">⚠️ Action Required (${20 - totalCorrectQ} Unresolved)</span>
            `}
          </div>
          ${historyCardsHtml}
        </div>
      </div>

      <!-- Bottom Section: Four Checks to Remember -->
      <section class="next-shift-section">
        <div class="next-shift-supertag">TAKE IT INTO YOUR NEXT SHIFT</div>
        <div class="next-shift-title-row">
          <h2 class="next-shift-main-title">Four checks to remember</h2>
          <span class="bookmark-ribbon-icon">🔖</span>
        </div>

        <div class="next-shift-grid">
          <!-- Left: 4 numbered checks -->
          <div class="four-checks-list">
            <div class="four-check-item">
              <span class="check-num-badge">01</span>
              <div class="check-item-text-col">
                <strong>Check all three domains</strong>
                <p>Site conditions, equipment and PPE / respirator. One ready domain does not clear the whole job.</p>
              </div>
            </div>

            <div class="four-check-item">
              <span class="check-num-badge">02</span>
              <div class="check-item-text-col">
                <strong>Match the evidence</strong>
                <p>Confirm the current job, equipment ID, assigned wearer and required readiness status.</p>
              </div>
            </div>

            <div class="four-check-item">
              <span class="check-num-badge">03</span>
              <div class="check-item-text-col">
                <strong>Classify before you decide</strong>
                <p>Distinguish unverified evidence from confirmed failure. Apply the approved hold or escalation rule.</p>
              </div>
            </div>

            <div class="four-check-item">
              <span class="check-num-badge">04</span>
              <div class="check-item-text-col">
                <strong>Recheck after every change</strong>
                <p>Review every outstanding issue before updating the overall decision. Stay within your authority.</p>
              </div>
            </div>
          </div>

          <!-- Right: Personal Review Focus Box -->
          <div class="personal-review-card">
            <div class="review-focus-tag">YOUR PERSONAL REVIEW FOCUS</div>
            <h3 class="review-focus-title">One issue resolved.<br>What is still open?</h3>
            <p class="review-focus-p">
              In Scenario 2, the site issue was corrected, but the PPE record was still unverified. That remaining gap prevented a Proceed decision.
            </p>

            <div class="expected-change-subbox">
              <div class="expected-change-label">SCENARIO 2 · EXPECTED DECISION CHANGE</div>
              <div class="decision-arrow-row">
                <span class="badge-no-go">Do Not Start & Escalate</span>
                <span style="color: #64748b; font-weight: 800;">→</span>
                <span class="badge-hold-change">Hold for Verification</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom Action Bar -->
      <div class="results-bottom-action-bar">
        <div class="action-bar-motto">
          Verify the evidence. Apply the rule.<br>
          Decide within your authority.
        </div>
        <div style="display: flex; gap: 0.75rem; align-items: center;">
          <button class="btn-retake-header" id="btn-retake-bottom">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 4v6h6M23 20v-6h-6"/>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
            <span>Retake practice</span>
          </button>
          <button class="btn-open-checklist" id="btn-results-open-checklist">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
            <span>Open quick checklist →</span>
          </button>
        </div>
      </div>

      <!-- Footer Disclaimer -->
      <div class="results-legal-footer">
        <p>Training results do not authorize real work. Follow the current VFTC SOP and assigned authority.</p>
        <p>Prototype · Illustrative learner results and scenario rules.</p>
      </div>
    `;

    // Accordion Toggle
    document.getElementById("btn-toggle-history")?.addEventListener("click", () => {
      state.historyAccordionOpen = !state.historyAccordionOpen;
      document.getElementById("history-accordion")?.classList.toggle("open", state.historyAccordionOpen);
    });

    // Open Quick Checklist button
    document.getElementById("btn-results-open-checklist")?.addEventListener("click", () => {
      handbookDrawer?.classList.add("open");
    });

    // Retake Practice Action (Attached to all Retake buttons across header, history footer, and bottom action bar)
    function handleRetakePractice() {
      state.quizAnswers = {};
      state.scenarioAnswers = {};
      state.currentQuizIndex = 0;
      state.currentScenarioIndex = 0;
      state.currentRoundIndex = 0;
      state.testCompleted = false;
      state.historyAccordionOpen = false;
      state.scenarioAttempts = { "scenario-1": 1, "scenario-2": 1 };

      if (navStepResults) {
        navStepResults.style.display = "none";
        navStepResults.classList.remove("active");
      }

      switchView("quiz");
    }

    ["btn-retake-header", "btn-retake-history", "btn-retake-bottom"].forEach((btnId) => {
      document.getElementById(btnId)?.addEventListener("click", handleRetakePractice);
    });
  }

  // Initialize
  initInteractiveChecklist();
  switchView("hero");
});
