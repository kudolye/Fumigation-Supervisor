/**
 * Operational Readiness Training for Fumigation Supervisors
 * Application State Engine, Quiz & Scenario Controllers, and Dual Dashboard
 */

document.addEventListener("DOMContentLoaded", () => {
  // Global Application State
  const state = {
    currentView: "hero", // 'hero' | 'role' | 'handbook' | 'quiz' | 'scenarios' | 'dashboard'
    
    // Quiz State (Part A)
    currentQuizIndex: 0,
    quizAnswers: {}, // { [quizId]: { q1: 'B', q2: 'B', submitted: true, isCorrect: boolean } }
    
    // Scenario State (Part B)
    currentClusterIndex: 0,
    currentRoundIndex: 0,
    scenarioAnswers: {}, // { [clusterId_roundNum]: { q1: 'B', q2: 'A', submitted: true, isCorrect: boolean } }
    
    // Dashboard preview override
    dashboardMode: "live", // 'live' | 'criteria-met' | 'review-required'

    // Assessment Metrics
    totalQuestions: 20, // 6 quiz * 2 = 12 + 2 clusters * 2 rounds * 2 questions = 20
    score: 0,
    criticalViolations: []
  };

  // DOM Elements
  const views = {
    hero: document.getElementById("view-hero"),
    role: document.getElementById("view-role"),
    handbook: document.getElementById("view-handbook"),
    quiz: document.getElementById("view-quiz"),
    scenarios: document.getElementById("view-scenarios"),
    dashboard: document.getElementById("view-dashboard")
  };

  const navButtons = document.querySelectorAll(".nav-tab-btn");
  const handbookDrawer = document.getElementById("handbook-drawer");
  const btnOpenDrawer = document.getElementById("btn-open-drawer");
  const btnCloseDrawer = document.getElementById("btn-close-drawer");

  // =========================================================================
  // Navigation & View Routing
  // =========================================================================
  function switchView(viewName) {
    state.currentView = viewName;

    // Update active view DOM
    Object.keys(views).forEach((key) => {
      if (views[key]) {
        views[key].classList.toggle("active", key === viewName);
      }
    });

    // Update nav buttons
    navButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === viewName);
    });

    // Window scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Specific view initializations
    if (viewName === "handbook") {
      renderHandbookContent();
    } else if (viewName === "quiz") {
      renderQuizQuestion(state.currentQuizIndex);
    } else if (viewName === "scenarios") {
      renderScenarioRound(state.currentClusterIndex, state.currentRoundIndex);
    } else if (viewName === "dashboard") {
      renderDashboard();
    }
  }

  // Header Nav Tab Click Handlers
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetView = btn.dataset.view;
      if (targetView) switchView(targetView);
    });
  });

  // Hero Transition ("READY TO START? Click to Next")
  const btnHeroNext = document.getElementById("btn-hero-next");
  if (btnHeroNext) {
    btnHeroNext.addEventListener("click", () => {
      switchView("role");
    });
  }

  // Role Overview Action Portals
  const btnPortalHandbook = document.getElementById("btn-portal-handbook");
  const btnPortalTesting = document.getElementById("btn-portal-testing");

  if (btnPortalHandbook) {
    btnPortalHandbook.addEventListener("click", () => switchView("handbook"));
  }
  if (btnPortalTesting) {
    btnPortalTesting.addEventListener("click", () => switchView("quiz"));
  }

  // Quick Handbook Slide-over Drawer
  if (btnOpenDrawer) {
    btnOpenDrawer.addEventListener("click", () => {
      handbookDrawer.classList.add("open");
    });
  }
  if (btnCloseDrawer) {
    btnCloseDrawer.addEventListener("click", () => {
      handbookDrawer.classList.remove("open");
    });
  }
  handbookDrawer.addEventListener("click", (e) => {
    if (e.target === handbookDrawer) {
      handbookDrawer.classList.remove("open");
    }
  });

  // =========================================================================
  // Handbook Rendering & Interactivity
  // =========================================================================
  function renderHandbookContent() {
    const container = document.getElementById("handbook-sections-container");
    const navList = document.getElementById("handbook-nav-list");
    if (!container || !navList) return;

    if (container.children.length > 0) return; // already rendered

    navList.innerHTML = "";
    container.innerHTML = "";

    HANDBOOK_DATA.sections.forEach((sec, idx) => {
      // Sidebar link
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.className = `handbook-nav-link ${idx === 0 ? "active" : ""}`;
      a.href = `#${sec.id}`;
      a.textContent = `${sec.number}. ${sec.title}`;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelectorAll(".handbook-nav-link").forEach((link) => link.classList.remove("active"));
        a.classList.add("active");
        const target = document.getElementById(sec.id);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
      li.appendChild(a);
      navList.appendChild(li);

      // Section Card
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
  }

  // =========================================================================
  // Part A: Readiness Decision Quiz Engine
  // =========================================================================
  function renderQuizQuestion(index) {
    state.currentQuizIndex = index;
    const qData = QUIZ_QUESTIONS[index];
    const container = document.getElementById("quiz-card-container");
    const ribbon = document.getElementById("quiz-progress-ribbon");
    if (!container || !qData) return;

    // Render Progress Ribbon
    if (ribbon) {
      ribbon.innerHTML = QUIZ_QUESTIONS.map((q, i) => {
        const isAnswered = state.quizAnswers[q.id]?.submitted;
        const isActive = i === index;
        return `
          <button class="prog-item ${isActive ? "active" : ""} ${isAnswered ? "completed" : ""}" data-quiz-idx="${i}">
            ${i + 1}. ${q.area}
          </button>
        `;
      }).join("");

      ribbon.querySelectorAll(".prog-item").forEach((btn) => {
        btn.addEventListener("click", () => {
          renderQuizQuestion(parseInt(btn.dataset.quizIdx, 10));
        });
      });
    }

    const currentAnswer = state.quizAnswers[qData.id] || { q1: null, q2: null, submitted: false };

    container.innerHTML = `
      <div class="dossier-header-bar">
        <span class="tag-area ${qData.tagClass}">${qData.area.toUpperCase()}</span>
        <span class="dossier-time">CASE ${index + 1} OF ${QUIZ_QUESTIONS.length}</span>
      </div>

      <h3 style="font-size: 1.45rem; font-weight: 800; margin: 0.75rem 0 1.25rem; color: var(--color-text-primary);">
        ${qData.title}
      </h3>

      <!-- Field Dossier Card -->
      ${qData.evidenceSnippet}

      <!-- Question 1 (Decision) -->
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

      <!-- Question 2 (Next Action) -->
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

      <!-- Feedback Area (revealed on submit) -->
      <div id="quiz-feedback-mount"></div>

      <!-- Footer Action Controls -->
      <div class="test-actions-footer">
        <button class="btn-secondary" id="btn-quiz-prev" ${index === 0 ? "disabled" : ""}>
          ← Previous Case
        </button>
        <div style="display: flex; gap: 0.75rem;">
          <button class="btn-secondary btn-handbook-quick" id="btn-view-hb-inline">
            📖 View Handbook Criteria
          </button>
          <button class="btn-primary" id="btn-quiz-submit" ${currentAnswer.submitted ? "style='display:none;'" : ""}>
            Submit Decision
          </button>
          <button class="btn-primary" id="btn-quiz-next" ${!currentAnswer.submitted ? "style='display:none;'" : ""}>
            ${index < QUIZ_QUESTIONS.length - 1 ? "Next Case →" : "Proceed to Interactive Scenarios →"}
          </button>
        </div>
      </div>
    `;

    // Hook up option selections
    container.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (currentAnswer.submitted) return;
        const qNum = btn.dataset.q;
        const optId = btn.dataset.opt;

        if (qNum === "1") {
          currentAnswer.q1 = optId;
          container.querySelectorAll('#q1-options .option-btn').forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        } else if (qNum === "2") {
          currentAnswer.q2 = optId;
          container.querySelectorAll('#q2-options .option-btn').forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        }
        state.quizAnswers[qData.id] = currentAnswer;
      });
    });

    // Inline View Handbook trigger
    const btnViewHbInline = document.getElementById("btn-view-hb-inline");
    if (btnViewHbInline) {
      btnViewHbInline.addEventListener("click", () => handbookDrawer.classList.add("open"));
    }

    // Previous Button
    const btnPrev = document.getElementById("btn-quiz-prev");
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        if (index > 0) renderQuizQuestion(index - 1);
      });
    }

    // Submit Button
    const btnSubmit = document.getElementById("btn-quiz-submit");
    if (btnSubmit) {
      btnSubmit.addEventListener("click", () => {
        if (!currentAnswer.q1 || !currentAnswer.q2) {
          alert("Please select both a Decision (Question 1) and a Next Action (Question 2) before submitting.");
          return;
        }

        currentAnswer.submitted = true;
        const q1Correct = currentAnswer.q1 === qData.q1.correct;
        const q2Correct = currentAnswer.q2 === qData.q2.correct;
        currentAnswer.isCorrect = q1Correct && q2Correct;
        state.quizAnswers[qData.id] = currentAnswer;

        // Render feedback immediately
        renderQuizFeedback(qData, currentAnswer);

        // Update Option button styles
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

        btnSubmit.style.display = "none";
        const btnNext = document.getElementById("btn-quiz-next");
        if (btnNext) btnNext.style.display = "inline-flex";

        // Update ribbon
        renderQuizQuestion(index);
      });
    }

    // If already submitted, display feedback
    if (currentAnswer.submitted) {
      renderQuizFeedback(qData, currentAnswer);
      // Mark options
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

    // Next Button
    const btnNext = document.getElementById("btn-quiz-next");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (index < QUIZ_QUESTIONS.length - 1) {
          renderQuizQuestion(index + 1);
        } else {
          switchView("scenarios");
        }
      });
    }
  }

  function renderQuizFeedback(qData, answer) {
    const mount = document.getElementById("quiz-feedback-mount");
    if (!mount) return;

    const isFullyCorrect = answer.q1 === qData.q1.correct && answer.q2 === qData.q2.correct;

    mount.innerHTML = `
      <div class="feedback-box ${isFullyCorrect ? "correct" : "incorrect"}">
        <div class="feedback-header">
          <span>${isFullyCorrect ? "✓ DECISION VERIFIED: CORRECT" : "⚠ SUPERVISORY CORRECTION REQUIRED"}</span>
        </div>
        <div class="feedback-body">
          <p><strong>Approved Decision:</strong> ${qData.explanation.decision}</p>
          <p><strong>Approved Next Action:</strong> ${qData.explanation.action}</p>
          <p style="margin-top: 0.6rem;">${qData.explanation.details}</p>
          <div class="competency-note">
            <strong>Supervisory Focus:</strong> ${qData.explanation.competencyNote}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // Part B: Interactive Scenario Clusters Engine (2 Clusters x 2 Rounds)
  // =========================================================================
  function renderScenarioRound(clusterIdx, roundIdx) {
    state.currentClusterIndex = clusterIdx;
    state.currentRoundIndex = roundIdx;

    const cluster = SCENARIO_CLUSTERS[clusterIdx];
    const roundData = cluster.rounds[roundIdx];
    const container = document.getElementById("scenario-card-container");
    const ribbon = document.getElementById("scenario-progress-ribbon");
    if (!container || !roundData) return;

    const answerKey = `${cluster.id}_round${roundData.roundNumber}`;
    const currentAnswer = state.scenarioAnswers[answerKey] || { q1: null, q2: null, submitted: false };

    // Render Scenario Ribbon
    if (ribbon) {
      ribbon.innerHTML = `
        <button class="prog-item ${clusterIdx === 0 && roundIdx === 0 ? "active" : ""} ${state.scenarioAnswers["cluster-1_round1"]?.submitted ? "completed" : ""}" data-c="0" data-r="0">
          Cluster 1: Round 1 (Initial)
        </button>
        <button class="prog-item ${clusterIdx === 0 && roundIdx === 1 ? "active" : ""} ${state.scenarioAnswers["cluster-1_round2"]?.submitted ? "completed" : ""}" data-c="0" data-r="1">
          Cluster 1: Round 2 (Updated)
        </button>
        <button class="prog-item ${clusterIdx === 1 && roundIdx === 0 ? "active" : ""} ${state.scenarioAnswers["cluster-2_round1"]?.submitted ? "completed" : ""}" data-c="1" data-r="0">
          Cluster 2: Round 1 (Initial)
        </button>
        <button class="prog-item ${clusterIdx === 1 && roundIdx === 1 ? "active" : ""} ${state.scenarioAnswers["cluster-2_round2"]?.submitted ? "completed" : ""}" data-c="1" data-r="1">
          Cluster 2: Round 2 (Cleared Site)
        </button>
      `;

      ribbon.querySelectorAll(".prog-item").forEach((btn) => {
        btn.addEventListener("click", () => {
          renderScenarioRound(parseInt(btn.dataset.c, 10), parseInt(btn.dataset.r, 10));
        });
      });
    }

    container.innerHTML = `
      <!-- Scenario Briefing Header -->
      <div class="scenario-briefing-card">
        <div class="test-badge">${cluster.id.toUpperCase()}</div>
        <h3 class="scenario-title">${cluster.title}</h3>
        <p class="scenario-desc">${cluster.briefing}</p>
      </div>

      <!-- Round Header Banner -->
      <div class="round-status-banner">
        <span class="round-title-tag">${roundData.subtitle.toUpperCase()}</span>
        <span class="dossier-time">EVALUATION STAGE ${roundData.roundNumber} OF 2</span>
      </div>

      <!-- Three Preparation Areas Evidence Grid -->
      <div class="evidence-trio-grid">
        ${roundData.areas.map((a) => `
          <div class="evidence-trio-card">
            <div class="trio-card-header">
              <span class="tag-area ${a.tagClass}">${a.name}</span>
              <span class="status-badge ${a.statusClass}">${a.status}</span>
            </div>
            <div class="trio-card-body">
              ${a.details}
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Context Callout -->
      <div class="callout callout-info" style="margin-bottom: 2rem;">
        <div class="callout-icon">📋</div>
        <div><strong>Current Authorisation Context:</strong> ${roundData.contextNote}</div>
      </div>

      <!-- Question 1: Decision -->
      <div class="question-block">
        <div class="q-label">Question 1 — Overall Decision</div>
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

      <!-- Feedback Mount -->
      <div id="scenario-feedback-mount"></div>

      <!-- Actions Footer -->
      <div class="test-actions-footer">
        <button class="btn-secondary btn-handbook-quick" id="btn-view-hb-scenario">
          📖 View Handbook Framework
        </button>
        <div style="display: flex; gap: 0.75rem;">
          <button class="btn-primary" id="btn-scenario-submit" ${currentAnswer.submitted ? "style='display:none;'" : ""}>
            Submit Overall Decision
          </button>
          <button class="btn-primary" id="btn-scenario-next" ${!currentAnswer.submitted ? "style='display:none;'" : ""}>
            ${roundIdx === 0 ? "Advance to Round 2 (Updated Evidence) →" : clusterIdx === 0 ? "Advance to Scenario Cluster 2 →" : "View Final Readiness Dashboard →"}
          </button>
        </div>
      </div>
    `;

    // Option Selection
    container.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (currentAnswer.submitted) return;
        const qNum = btn.dataset.sq;
        const optId = btn.dataset.opt;

        if (qNum === "1") {
          currentAnswer.q1 = optId;
          container.querySelectorAll('#scenario-q1-options .option-btn').forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        } else if (qNum === "2") {
          currentAnswer.q2 = optId;
          container.querySelectorAll('#scenario-q2-options .option-btn').forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        }
        state.scenarioAnswers[answerKey] = currentAnswer;
      });
    });

    // Handbook Drawer trigger
    const btnViewHbScenario = document.getElementById("btn-view-hb-scenario");
    if (btnViewHbScenario) {
      btnViewHbScenario.addEventListener("click", () => handbookDrawer.classList.add("open"));
    }

    // Submit handler
    const btnSubmit = document.getElementById("btn-scenario-submit");
    if (btnSubmit) {
      btnSubmit.addEventListener("click", () => {
        if (!currentAnswer.q1 || !currentAnswer.q2) {
          alert("Please select both your Overall Decision and your Next Action before submitting.");
          return;
        }

        currentAnswer.submitted = true;
        const q1Correct = currentAnswer.q1 === roundData.q1.correct;
        const q2Correct = currentAnswer.q2 === roundData.q2.correct;
        currentAnswer.isCorrect = q1Correct && q2Correct;
        state.scenarioAnswers[answerKey] = currentAnswer;

        // Render feedback immediately
        renderScenarioFeedback(roundData, currentAnswer);

        // Highlight options
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

        btnSubmit.style.display = "none";
        const btnNext = document.getElementById("btn-scenario-next");
        if (btnNext) btnNext.style.display = "inline-flex";

        // Re-render to update ribbon
        renderScenarioRound(clusterIdx, roundIdx);
      });
    }

    // Feedback if already submitted
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

    // Next Round/Cluster handler
    const btnNext = document.getElementById("btn-scenario-next");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (roundIdx === 0) {
          renderScenarioRound(clusterIdx, 1);
        } else if (clusterIdx === 0) {
          renderScenarioRound(1, 0);
        } else {
          switchView("dashboard");
        }
      });
    }
  }

  function renderScenarioFeedback(roundData, answer) {
    const mount = document.getElementById("scenario-feedback-mount");
    if (!mount) return;

    const isFullyCorrect = answer.q1 === roundData.q1.correct && answer.q2 === roundData.q2.correct;

    mount.innerHTML = `
      <div class="feedback-box ${isFullyCorrect ? "correct" : "incorrect"}">
        <div class="feedback-header">
          <span>${isFullyCorrect ? "✓ OPERATIONAL DECISION CONFIRMED" : "⚠ SUPERVISORY DEFICIENCY DETECTED"}</span>
        </div>
        <div class="feedback-body">
          <p><strong>Approved Decision:</strong> ${roundData.explanation.decision}</p>
          <p><strong>Approved Next Action:</strong> ${roundData.explanation.action}</p>
          <p style="margin-top: 0.6rem;">${roundData.explanation.details}</p>
          <div class="competency-note">
            <strong>Supervisory Focus:</strong> ${roundData.explanation.competencyNote}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // Dual-State Dashboard Engine (Criteria Met & Review Required)
  // =========================================================================
  function calculateAssessment() {
    let score = 0;
    const criticalViolations = [];

    // Part A scoring (6 quiz questions x 2 parts = 12 total points)
    QUIZ_QUESTIONS.forEach((q) => {
      const ans = state.quizAnswers[q.id];
      if (ans) {
        if (ans.q1 === q.q1.correct) score++;
        if (ans.q2 === q.q2.correct) score++;

        // Check Critical No-Go Violations
        if (q.id === "q2" && ans.q1 !== "C") {
          criticalViolations.push("Failed to Escalate Missing Site Barrier (Case 2)");
        }
        if (q.id === "q6" && ans.q1 !== "C") {
          criticalViolations.push("Failed to Escalate Missing Protective Equipment (Case 6)");
        }
      }
    });

    // Part B scoring (2 clusters x 2 rounds x 2 questions = 8 total points)
    SCENARIO_CLUSTERS.forEach((cluster) => {
      cluster.rounds.forEach((round) => {
        const key = `${cluster.id}_round${round.roundNumber}`;
        const ans = state.scenarioAnswers[key];
        if (ans) {
          if (ans.q1 === round.q1.correct) score++;
          if (ans.q2 === round.q2.correct) score++;

          // Check Critical Scenario Violations
          if (key === "cluster-2_round1" && ans.q1 !== "C") {
            criticalViolations.push("Failed to Escalate Critical Barrier Deficiency in Cluster 2");
          }
          if (key === "cluster-2_round2" && ans.q1 === "A") {
            criticalViolations.push("Prematurely Approved Operation Without Valid Fit-Test Documentation (Cluster 2)");
          }
        }
      });
    });

    const percent = Math.round((score / state.totalQuestions) * 100);
    // Passing criteria: >= 80% AND 0 Critical Violations
    const isPassing = percent >= 80 && criticalViolations.length === 0;

    return { score, total: state.totalQuestions, percent, criticalViolations, isPassing };
  }

  function renderDashboard() {
    const container = document.getElementById("dashboard-content-mount");
    if (!container) return;

    const calc = calculateAssessment();

    let displayState = "met";
    if (state.dashboardMode === "criteria-met") {
      displayState = "met";
    } else if (state.dashboardMode === "review-required") {
      displayState = "review";
    } else {
      displayState = calc.isPassing ? "met" : "review";
    }

    container.innerHTML = `
      <!-- Mode Switcher Pill -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
        <div class="dashboard-mode-switcher">
          <button class="mode-toggle-btn ${state.dashboardMode === "live" ? "active" : ""}" data-mode="live">
            Live Assessment Result (${calc.percent}%)
          </button>
          <button class="mode-toggle-btn ${state.dashboardMode === "criteria-met" ? "active" : ""}" data-mode="criteria-met">
            Preview: Criteria Met (Passing)
          </button>
          <button class="mode-toggle-btn ${state.dashboardMode === "review-required" ? "active" : ""}" data-mode="review-required">
            Preview: Review Required (Failed)
          </button>
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-text-muted);">
          TIMESTAMP: ${new Date().toISOString().replace("T", " ").substring(0, 19)} UTC
        </div>
      </div>

      ${displayState === "met" ? renderCriteriaMetCard(calc) : renderReviewRequiredCard(calc)}
    `;

    // Bind mode toggle buttons
    container.querySelectorAll(".mode-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.dashboardMode = btn.dataset.mode;
        renderDashboard();
      });
    });

    // Bind Print Button
    const btnPrint = document.getElementById("btn-print-cert");
    if (btnPrint) {
      btnPrint.addEventListener("click", () => window.print());
    }

    // Bind Retake Assessment Button
    const btnRetake = document.getElementById("btn-retake-training");
    if (btnRetake) {
      btnRetake.addEventListener("click", () => {
        if (confirm("Reset current assessment scores and restart from Case 1?")) {
          state.quizAnswers = {};
          state.scenarioAnswers = {};
          state.currentQuizIndex = 0;
          state.currentClusterIndex = 0;
          state.currentRoundIndex = 0;
          state.dashboardMode = "live";
          switchView("quiz");
        }
      });
    }

    // Bind Handbook Review Button
    const btnReviewHb = document.getElementById("btn-dashboard-handbook");
    if (btnReviewHb) {
      btnReviewHb.addEventListener("click", () => switchView("handbook"));
    }
  }

  function renderCriteriaMetCard(calc) {
    const certCode = "OP-VER-" + Math.random().toString(36).substring(2, 8).toUpperCase() + "-2026";
    const scoreVal = state.dashboardMode === "criteria-met" ? "100%" : `${calc.percent}%`;
    const scoreFraction = state.dashboardMode === "criteria-met" ? "20 / 20" : `${calc.score} / ${calc.total}`;

    return `
      <div class="dashboard-card-met">
        <div class="cert-header">
          <div class="cert-emblem">✓</div>
          <div class="cert-title-col">
            <div class="cert-subhead">SUPERVISORY READINESS CERTIFICATION</div>
            <h2 class="cert-main-title">Operational Criteria Met — Verification Authority Granted</h2>
            <p style="color: var(--color-text-secondary); font-size: 0.95rem; margin-top: 0.35rem;">
              The candidate has demonstrated full competence in pre-start cross-checking, site verification, equipment serialization, respirator readiness, and formal escalation procedures.
            </p>
          </div>
          <div class="cert-serial-tag">
            VERIFICATION ID:<br>
            <strong style="color: var(--color-primary-green); font-size: 0.95rem;">${certCode}</strong>
          </div>
        </div>

        <!-- Metrics Row -->
        <div class="metrics-row">
          <div class="metric-card">
            <div class="metric-label">Overall Readiness Score</div>
            <div class="metric-val pass">${scoreVal}</div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">${scoreFraction} Criteria Verified</span>
          </div>
          <div class="metric-card">
            <div class="metric-label">Site Verification</div>
            <div class="metric-val pass">100%</div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">Layout & Controls Verified</span>
          </div>
          <div class="metric-card">
            <div class="metric-label">Equipment Checks</div>
            <div class="metric-val pass">100%</div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">Serials & Calibration Valid</span>
          </div>
          <div class="metric-card">
            <div class="metric-label">Escalation Protocol</div>
            <div class="metric-val pass">0 Failures</div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">Zero Premature Starts</span>
          </div>
        </div>

        <!-- Competency Statement -->
        <div class="cert-statement-box">
          <strong>Official Operational Finding:</strong> The supervisor correctly recognized that both <em>Hold for Verification</em> and <em>Do Not Start & Escalate</em> forbid operation initiation until physical verification is complete. The candidate resisted schedule pressure, refused verbal promises in place of inspection records, and successfully held operations on Cluster 2 Round 2 when unverified wearer documentation remained unresolved.
        </div>

        <!-- Sign-off Block -->
        <div class="signoff-row">
          <div class="sig-block">
            <span class="sig-name">CHIEF OPERATIONAL SAFETY AUDITOR</span>
            <span class="sig-role">Fumigation Safety Board & Chemical Control Division</span>
          </div>
          <div class="sig-block" style="text-align: right;">
            <span class="sig-name">SUPERVISOR READINESS STATUS</span>
            <span class="status-badge ready" style="margin-left: auto;">CERTIFIED READY TO SUPERVISE</span>
          </div>
        </div>

        <div class="dashboard-actions" style="margin-top: 2rem;">
          <button class="btn-secondary" id="btn-dashboard-handbook">
            📖 Return to Handbook
          </button>
          <button class="btn-primary" id="btn-print-cert">
            🖨️ Print / Save Official Certificate
          </button>
        </div>
      </div>
    `;
  }

  function renderReviewRequiredCard(calc) {
    const scoreVal = state.dashboardMode === "review-required" ? "55%" : `${calc.percent}%`;
    const scoreFraction = state.dashboardMode === "review-required" ? "11 / 20" : `${calc.score} / ${calc.total}`;
    const violations = state.dashboardMode === "review-required" 
      ? [
          "Failed to Escalate Missing Site Barrier (Case 2)",
          "Accepted Unverified Worker Statement in Place of Fit-Test (Cluster 2 Round 2)",
          "Conflated Partial Verification with Full Operation Start Release"
        ]
      : (calc.criticalViolations.length > 0 ? calc.criticalViolations : ["Readiness Score Below Required 80% Threshold"]);

    return `
      <div class="dashboard-card-review">
        <div class="review-header">
          <div class="review-emblem">⚠️</div>
          <div class="review-title-col">
            <div class="review-subhead">SUPERVISORY READINESS AUDIT: ACTION REQUIRED</div>
            <h3>Operational Readiness Unverified — Review Required</h3>
            <p style="color: var(--color-text-secondary); font-size: 0.95rem; margin-top: 0.45rem;">
              The supervisor assessment did not meet the mandatory criteria required to authorize pre-start fumigation. Critical safety gaps or unverified assumptions were identified during the review.
            </p>
          </div>
        </div>

        <!-- Metrics Row -->
        <div class="metrics-row">
          <div class="metric-card">
            <div class="metric-label">Assessment Score</div>
            <div class="metric-val alert">${scoreVal}</div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">${scoreFraction} Criteria Met</span>
          </div>
          <div class="metric-card">
            <div class="metric-label">Passing Standard</div>
            <div class="metric-val" style="color: var(--color-text-primary);">80%</div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">Required Passing Benchmark</span>
          </div>
          <div class="metric-card">
            <div class="metric-label">Critical Safety Breaches</div>
            <div class="metric-val alert">${violations.length}</div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">Zero Tolerance Allowed</span>
          </div>
          <div class="metric-card">
            <div class="metric-label">Operational Authority</div>
            <div class="status-badge stop" style="margin-top: 0.5rem; font-size: 0.75rem;">AUTHORITY WITHHELD</div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); display: block; margin-top: 0.35rem;">Re-training Mandatory</span>
          </div>
        </div>

        <!-- Deficiencies Identified -->
        <div class="findings-list">
          <div class="findings-title">Identified Operational Vulnerabilities:</div>
          ${violations.map((item) => `
            <div class="finding-item">
              <span class="finding-icon">✕</span>
              <div>
                <strong>${item}</strong>
                <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 0.2rem;">
                  Fumigation gas introduction under this condition presents severe toxic exposure risk to personnel and uncontained public exposure hazards.
                </p>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Remediation Plan -->
        <div class="remediation-plan">
          <h4>Required Remediation Roadmap:</h4>
          <p>
            1. Re-read <strong>Section 3 (Readiness Framework)</strong> to master the differences between <em>Hold for Verification</em> and <em>Do Not Start & Escalate</em>.<br>
            2. Re-visit <strong>Section 4 & 6</strong> regarding physical barrier verification and quantitative respirator fit-test records.<br>
            3. Remember: Verbal assurances ("we will install it later" or "I used it yesterday") are NEVER acceptable verification evidence.
          </p>
        </div>

        <div class="dashboard-actions">
          <button class="btn-secondary" id="btn-dashboard-handbook">
            📖 Study Handbook Guidance
          </button>
          <button class="btn-primary" id="btn-retake-training" style="background: #ef4444; color: #ffffff;">
            🔄 Retake Training Assessment
          </button>
        </div>
      </div>
    `;
  }

  // Initialize Landing View on Load
  switchView("hero");
});
