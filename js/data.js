/**
 * Operational Readiness Training for Fumigation Supervisors
 * Master Data: Handbook, Decision Quiz, Scenarios, and Competency Rubrics
 */

const HANDBOOK_DATA = {
  sections: [
    {
      id: "sec-1",
      number: "1",
      title: "PREPARATION READINESS HANDBOOK",
      subtitle: "Check the conditions. Verify the evidence. Make an informed decision.",
      badge: "Core Standard",
      content: `
        <p class="lead-text">A practical guide to checking site/position, equipment, and PPE/respirator readiness before fumigation begins.</p>
        
        <div class="handbook-media-banner">
          <img src="assets/images/handbook_overview.jpg" alt="Supervisor performing pre-start operational verification at container fumigation site" class="handbook-media-img">
          <div class="handbook-media-caption">
            <strong>Standard Field Protocol:</strong> A certified supervisor confirms physical site readiness, warning signage, and containment boundaries before any gas application.
          </div>
        </div>

        <p>Read the handbook before starting the scenarios, or return to a section whenever you need operational guidance during supervisory verification.</p>
        <div class="callout callout-info">
          <div class="callout-icon">📋</div>
          <div>
            <strong>Supervisory Mandate:</strong> Fumigation is a high-hazard, zero-tolerance operation. No gas application or enclosure sealing may commence based on assumptions, promises, or partial paperwork.
          </div>
        </div>
      `
    },
    {
      id: "sec-2",
      number: "2",
      title: "How to Use This Handbook",
      subtitle: "LEARN FIRST. REFER BACK WHEN NEEDED.",
      badge: "Workflow",
      content: `
        <div class="two-col-grid">
          <div class="card-mini">
            <h4><span class="step-num">A.</span> Before the Scenario</h4>
            <p>Read the readiness framework and explore the three preparation areas. Learn what to check, which evidence to review, and how to respond when a requirement is unclear or unmet.</p>
          </div>
          <div class="card-mini">
            <h4><span class="step-num">B.</span> During the Scenario</h4>
            <p>Select <strong>View Handbook</strong> at any time to revisit the relevant section. Compare the field information provided with the stated criteria before committing to your decision.</p>
          </div>
        </div>
      `
    },
    {
      id: "sec-3",
      number: "3",
      title: "Readiness Framework",
      subtitle: "CHECK → IDENTIFY → CLASSIFY → DECIDE",
      badge: "Decision Logic",
      content: `
        <p>Pre-start verification follows a rigorous four-stage supervisory pipeline:</p>
        <div class="process-pipeline">
          <div class="pipeline-step"><span class="pipe-num">1. </span><strong>CHECK:</strong> Physical conditions & documentation</div>
          <div class="pipeline-step"><span class="pipe-num">2. </span><strong>IDENTIFY:</strong> Gaps, mismatches & discrepancies</div>
          <div class="pipeline-step"><span class="pipe-num">3. </span><strong>CLASSIFY:</strong> Status per requirement</div>
          <div class="pipeline-step"><span class="pipe-num">4. </span><strong>DECIDE:</strong> Overall pre-start disposition</div>
        </div>

        <h4 class="section-subheading">Review all three preparation areas:</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 25%;">Area</th>
                <th>Key Supervisory Question</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="tag-area site">Site / Condition</span></td>
                <td>Does the actual work area meet the approved preparation requirements?</td>
              </tr>
              <tr>
                <td><span class="tag-area equip">Equipment</span></td>
                <td>Are the required items available, checked, and supported by the necessary readiness evidence?</td>
              </tr>
              <tr>
                <td><span class="tag-area ppe">PPE / Respirator</span></td>
                <td>Is the required protection available and its readiness confirmed for the intended users?</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="section-subheading">Classify each requirement:</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 25%;">Status</th>
                <th>Operational Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="status-badge ready">Next Check</span></td>
                <td>The requirement is met and the necessary evidence has been confirmed.</td>
              </tr>
              <tr>
                <td><span class="status-badge hold">Not Verified</span></td>
                <td>Evidence is missing, unclear, inconsistent, or no longer applicable.</td>
              </tr>
              <tr>
                <td><span class="status-badge stop">Not Ready</span></td>
                <td>The available evidence confirms that the requirement is not met.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="section-subheading">Make the overall decision:</h4>
        <div class="decision-cards-grid">
          <div class="decision-card proceed-card">
            <div class="decision-header">
              <span class="decision-icon">🟢</span>
              <h5>Proceed</h5>
            </div>
            <p>All applicable readiness requirements are verified, outstanding issues are closed, and the required start authorizations are complete.</p>
          </div>
          <div class="decision-card hold-card">
            <div class="decision-header">
              <span class="decision-icon">🟡</span>
              <h5>Hold for Verification</h5>
            </div>
            <p>A requirement cannot yet be confirmed. Keep the operation on hold while obtaining reliable, validated evidence.</p>
          </div>
          <div class="decision-card escalate-card">
            <div class="decision-header">
              <span class="decision-icon">🔴</span>
              <h5>Do Not Start & Escalate</h5>
            </div>
            <p>A critical requirement has failed, the procedure requires escalation, or the issue exceeds your authority. Contact the designated company authority immediately.</p>
          </div>
        </div>

        <div class="callout callout-warning mt-4">
          <div class="callout-icon">⚠️</div>
          <div>
            <strong>Critical Safety Doctrine:</strong> A confirmed defect requires correction and re-verification before starting. Use the approved procedure to determine whether it must also be escalated.<br>
            <em>Remember: Both <strong>Hold for Verification</strong> and <strong>Do Not Start & Escalate</strong> mean the operation MUST NOT begin.</em>
          </div>
        </div>
      `
    },
    {
      id: "sec-4",
      number: "4",
      title: "Site / Condition Readiness",
      subtitle: "IS THE WORK AREA READY?",
      badge: "Area 1",
      content: `
        <div class="handbook-media-banner">
          <img src="assets/images/site_readiness.jpg" alt="Fumigation exclusion perimeter barricades with danger signs and warning cones" class="handbook-media-img">
          <div class="handbook-media-caption">
            <strong>Perimeter Verification:</strong> Confirmed exclusion barriers and unambiguous warning signage ('DANGER FUMIGATION ZONE - KEEP OUT') must be established prior to authorization.
          </div>
        </div>

        <div class="quad-grid">
          <div class="quad-box">
            <div class="quad-title">🔍 What to Verify</div>
            <ul>
              <li><strong>Correct location:</strong> Actual work area matches approved job information.</li>
              <li><strong>Preparation:</strong> Access routes and work areas meet specified conditions.</li>
              <li><strong>Site controls:</strong> Required boundaries, access restrictions, and warning signs are in place.</li>
              <li><strong>Current conditions:</strong> Changes or obstructions have been assessed against the approved plan.</li>
            </ul>
          </div>
          <div class="quad-box">
            <div class="quad-title">📄 Evidence to Review</div>
            <p>Compare the physical site with the current work pack, site plan, risk assessment, and required inspection confirmations.</p>
          </div>
          <div class="quad-box quad-alert">
            <div class="quad-title">⚠️ Warning Signs</div>
            <ul>
              <li>Site does not match job information.</li>
              <li>Required access or preparation is incomplete.</li>
              <li>A specified boundary control is absent.</li>
              <li>A changed condition has occurred but has not been formally assessed.</li>
            </ul>
          </div>
          <div class="quad-box quad-action">
            <div class="quad-title">🛡️ What to Do</div>
            <p>Record the specific gap. <strong>Hold</strong> when evidence is unclear. <strong>Do Not Start & Escalate</strong> a critical failure according to procedure. Recheck and re-verify after corrective action.</p>
          </div>
        </div>
      `
    },
    {
      id: "sec-5",
      number: "5",
      title: "Equipment Readiness",
      subtitle: "IS THE EQUIPMENT READY FOR THIS JOB?",
      badge: "Area 2",
      content: `
        <div class="handbook-media-banner">
          <img src="assets/images/equipment_readiness.jpg" alt="Gas clearance detector monitor with valid calibration certification tag and inspection log" class="handbook-media-img">
          <div class="handbook-media-caption">
            <strong>Calibration Verification:</strong> Verify that monitoring equipment serial numbers match current calibration certificates and valid inspection dates.
          </div>
        </div>

        <div class="quad-grid">
          <div class="quad-box">
            <div class="quad-title">🔍 What to Verify</div>
            <ul>
              <li><strong>Availability:</strong> Every required item matches the approved equipment list.</li>
              <li><strong>Condition:</strong> Required pre-start checks are complete and defects addressed.</li>
              <li><strong>Evidence:</strong> Inspection/maintenance information matches actual item ID and remains applicable.</li>
              <li><strong>Monitoring equipment:</strong> Gas detectors/clearance monitors calibrated under approved procedure.</li>
            </ul>
          </div>
          <div class="quad-box">
            <div class="quad-title">📄 Evidence to Review</div>
            <p>Use the equipment list, item identifiers (serial/asset tag), required inspection logs, and applicable manufacturer guidelines.</p>
          </div>
          <div class="quad-box quad-alert">
            <div class="quad-title">⚠️ Warning Signs</div>
            <ul>
              <li>A required item is missing or damaged.</li>
              <li>A substitute has not been formally approved.</li>
              <li>A calibration record belongs to a different serial number.</li>
              <li>A required check is incomplete or status is unclear.</li>
            </ul>
          </div>
          <div class="quad-box quad-action">
            <div class="quad-title">🛡️ What to Do</div>
            <p>Keep unresolved equipment requirements open. Obtain missing records, arrange authorized repairs or replacements, and physically verify before updating status.</p>
          </div>
        </div>
      `
    },
    {
      id: "sec-6",
      number: "6",
      title: "PPE / Respirator Readiness",
      subtitle: "IS THE REQUIRED PROTECTION READY?",
      badge: "Area 3",
      content: `
        <div class="handbook-media-banner">
          <img src="assets/images/ppe_readiness.jpg" alt="Full-face respirator, gas canister, SCBA cylinder, chemical suit, and wearer fit-test card" class="handbook-media-img">
          <div class="handbook-media-caption">
            <strong>Life-Safety Compliance:</strong> Ensure tight-fitting respirators have verified quantitative fit-test certificates matching each specific wearer and facepiece model.
          </div>
        </div>

        <div class="quad-grid">
          <div class="quad-box">
            <div class="quad-title">🔍 What to Verify</div>
            <ul>
              <li><strong>Approved requirement:</strong> Supplied protection matches approved PPE/respiratory schedule.</li>
              <li><strong>Availability & condition:</strong> Items available for every assigned worker; pre-use checks complete.</li>
              <li><strong>Respirator evidence:</strong> Wearer-specific readiness confirmed. For tight-fitting facepieces, check fit-test records for specific wearer and model.</li>
            </ul>
          </div>
          <div class="quad-box">
            <div class="quad-title">📄 Evidence to Review</div>
            <p>Approved PPE schedule, pre-use inspection forms, fit-test certifications, and medical clearance confirmations.</p>
          </div>
          <div class="quad-box quad-alert">
            <div class="quad-title">⚠️ Warning Signs</div>
            <ul>
              <li>Required protection is missing, short, or damaged.</li>
              <li>Supplied cartridges/canisters differ from gas specification.</li>
              <li>Fit-test evidence is absent or names another worker.</li>
              <li>Readiness is assumed because "they used it yesterday."</li>
            </ul>
          </div>
          <div class="quad-box quad-action">
            <div class="quad-title">🛡️ What to Do</div>
            <p><strong>Hold</strong> when readiness cannot be confirmed. Follow approved escalation for shortages or failed fit-tests. Always re-verify physically before closing the gap.</p>
          </div>
        </div>
      `
    },
    {
      id: "sec-7",
      number: "7",
      title: "Quick Reference Checklist",
      subtitle: "REVIEW EVERY REQUIREMENT BEFORE DECIDING",
      badge: "Inspection Card",
      content: `
        <p>Use this checklist alongside approved job-specific documentation. Mark each item <strong>Ready</strong>, <strong>Not Verified</strong>, or <strong>Not Ready</strong>, and log the supporting evidence.</p>
        
        <div class="checklist-toolbar">
          <div class="checklist-summary-stat">
            <span class="checklist-progress-badge"><strong id="handbook-checklist-count">0</strong> / 12 Verified</span>
            <span class="checklist-stat-desc">Click any requirement to toggle verification status</span>
          </div>
          <div class="checklist-toolbar-actions">
            <button type="button" class="btn-check-action" id="btn-check-all">Select All</button>
            <button type="button" class="btn-check-action" id="btn-check-clear">Clear All</button>
          </div>
        </div>

        <div class="checklist-interactive">
          <div class="checklist-group" data-domain="site">
            <div class="checklist-group-header">
              <h5>Site / Position</h5>
              <span class="group-count" id="count-site">0/4</span>
            </div>
            <label class="check-item"><input type="checkbox" class="checklist-cb" data-domain="site" data-idx="0"> <span>Work area matches the approved job information.</span></label>
            <label class="check-item"><input type="checkbox" class="checklist-cb" data-domain="site" data-idx="1"> <span>Required access and site preparation are confirmed.</span></label>
            <label class="check-item"><input type="checkbox" class="checklist-cb" data-domain="site" data-idx="2"> <span>Specified boundaries, signs, and access controls are verified.</span></label>
            <label class="check-item"><input type="checkbox" class="checklist-cb" data-domain="site" data-idx="3"> <span>Changed conditions and identified obstructions are addressed.</span></label>
          </div>

          <div class="checklist-group" data-domain="equipment">
            <div class="checklist-group-header">
              <h5>Equipment</h5>
              <span class="group-count" id="count-equipment">0/4</span>
            </div>
            <label class="check-item"><input type="checkbox" class="checklist-cb" data-domain="equipment" data-idx="0"> <span>Required items are available and match the approved list.</span></label>
            <label class="check-item"><input type="checkbox" class="checklist-cb" data-domain="equipment" data-idx="1"> <span>Required condition checks are complete.</span></label>
            <label class="check-item"><input type="checkbox" class="checklist-cb" data-domain="equipment" data-idx="2"> <span>Applicable inspection records match the actual equipment serials.</span></label>
            <label class="check-item"><input type="checkbox" class="checklist-cb" data-domain="equipment" data-idx="3"> <span>Required monitoring-equipment readiness & calibration is confirmed.</span></label>
          </div>

          <div class="checklist-group" data-domain="ppe">
            <div class="checklist-group-header">
              <h5>PPE / Respirator</h5>
              <span class="group-count" id="count-ppe">0/4</span>
            </div>
            <label class="check-item"><input type="checkbox" class="checklist-cb" data-domain="ppe" data-idx="0"> <span>Protection matches the approved job requirements.</span></label>
            <label class="check-item"><input type="checkbox" class="checklist-cb" data-domain="ppe" data-idx="1"> <span>Required items are available for each intended user.</span></label>
            <label class="check-item"><input type="checkbox" class="checklist-cb" data-domain="ppe" data-idx="2"> <span>Required condition checks are complete.</span></label>
            <label class="check-item"><input type="checkbox" class="checklist-cb" data-domain="ppe" data-idx="3"> <span>Applicable respirator and wearer-readiness evidence is confirmed.</span></label>
          </div>
        </div>

        <div class="callout callout-info mt-4">
          <div class="callout-icon">📌</div>
          <div>
            <strong>Close the gaps:</strong> For each issue, record the requirement reviewed, action taken, authority contacted, and result of re-verification. A reported fix remains OPEN until its completion is physically verified.
          </div>
        </div>
      `
    }
  ]
};

const QUIZ_COMMON_DECISIONS = [
  { id: "A", text: "Next Check", desc: "The requirement is met and the necessary evidence has been confirmed." },
  { id: "B", text: "Not Verified", desc: "Evidence is missing, unclear, inconsistent, or no longer applicable." },
  { id: "C", text: "Not Ready", desc: "The available evidence confirms that the requirement is not met." }
];

const QUIZ_QUESTIONS = [
  {
    id: "q1",
    area: "Site Conditions",
    tagClass: "site",
    title: "Case 1: Site Conditions — Changed Conditions After Initial Check",
    evidenceSnippet: `
      <div class="dossier-card">
        <div class="dossier-header">
          <span class="dossier-tag">FIELD DOSSIER #ST-101</span>
          <span class="dossier-time">TIMELOG: 09:15</span>
        </div>
        <ul class="dossier-list">
          <li><strong>Approved Job Location:</strong> Area A.</li>
          <li><strong>Site Checklist:</strong> Initial checklist completed and signed at <strong>08:00</strong>.</li>
          <li><strong>Field Change:</strong> At <strong>09:00</strong>, the physical layout of the work area was modified due to material staging.</li>
          <li><strong>Current Evidence:</strong> No updated site check covering the layout modification has been provided.</li>
          <li><strong>Procedure Rule:</strong> The exercise procedure strictly requires site verification evidence to cover all relevant layout changes prior to start.</li>
        </ul>
      </div>
    `,
    q1: {
      prompt: "What is your decision for the current site-conditions check?",
      options: QUIZ_COMMON_DECISIONS,
      correct: "B"
    },
    q2: {
      prompt: "What should you do next?",
      options: [
        { id: "A", text: "Accept the earlier checklist because the job still refers to Area A." },
        { id: "B", text: "Obtain and review a current site check covering the layout change." },
        { id: "C", text: "Confirm the earlier checklist was signed, then accept it for the new layout." }
      ],
      correct: "B"
    },
    explanation: {
      decision: "B — Not Verified",
      action: "B — Obtain and review a current site check covering the layout change.",
      details: "The 08:00 checklist does not reflect the conditions created by the 09:00 layout alteration. The fact that the area designation remains 'Area A' or that a signature exists on outdated paperwork does not bridge this evidentiary gap. Additionally, the evidence does not establish a confirmed critical no-go failure, meaning escalation is not warranted under the exercise rules.",
      competencyNote: "Evaluates whether the supervisor confirms that evidence remains applicable to current physical conditions, rather than blindly accepting a signed document."
    }
  },
  {
    id: "q2",
    area: "Site Conditions",
    tagClass: "site",
    title: "Case 2: Site Conditions — Required Control Not Implemented",
    evidenceSnippet: `
      <div class="dossier-card alert-border">
        <div class="dossier-header">
          <span class="dossier-tag">FIELD DOSSIER #ST-204</span>
          <span class="dossier-badge-danger">CRITICAL AUDIT FINDING</span>
        </div>
        <ul class="dossier-list">
          <li><strong>Approved Site Requirements:</strong> Mandatory perimeter access barrier with warning signage.</li>
          <li><strong>Current Field Inspection:</strong> Confirms that the physical barrier is <strong>completely absent</strong>.</li>
          <li><strong>Team Statement:</strong> The fumigation crew states they plan to install the barrier before the scheduled injection time.</li>
          <li><strong>Procedure Rule:</strong> The exercise procedure classifies an absent required barrier as a <strong>critical no-go condition requiring escalation</strong>.</li>
        </ul>
      </div>
    `,
    q1: {
      prompt: "What is your decision based on the conditions currently confirmed?",
      options: QUIZ_COMMON_DECISIONS,
      correct: "C"
    },
    q2: {
      prompt: "What should you do next?",
      options: [
        { id: "A", text: "Record the planned installation time and mark the barrier requirement as complete." },
        { id: "B", text: "Keep the issue open and rely on the team’s plan without notifying the designated person." },
        { id: "C", text: "Notify the designated person, arrange correction under the procedure, and verify completion before closing the issue." }
      ],
      correct: "C"
    },
    explanation: {
      decision: "C — Not Ready",
      action: "C — Notify the designated person, arrange correction under procedure, and verify completion before closing the issue.",
      details: "The barrier is confirmed to be missing, and the operating procedure explicitly defines this as a critical no-go condition demanding escalation. This is a confirmed physical safety violation, not merely missing paperwork. A verbal assurance of future installation does not constitute verified readiness.",
      competencyNote: "Tests the supervisor's ability to distinguish 'unverified paperwork' from 'confirmed physical failure,' and enforces that planned corrective actions are never recorded as closed until physically re-verified."
    }
  },
  {
    id: "q3",
    area: "Equipment",
    tagClass: "equip",
    title: "Case 3: Equipment — Record Does Not Match Actual Equipment",
    evidenceSnippet: `
      <div class="dossier-card">
        <div class="dossier-header">
          <span class="dossier-tag">FIELD DOSSIER #EQ-312</span>
          <span class="dossier-time">INSTRUMENT CHECK</span>
        </div>
        <ul class="dossier-list">
          <li><strong>Physical Device on Site:</strong> Clearance gas monitor stamped with Serial ID <strong>M-02</strong>.</li>
          <li><strong>Supplied Readiness Record:</strong> Calibration and pre-use verification log identifies Serial ID <strong>M-03</strong>.</li>
          <li><strong>Device Specification:</strong> Both M-02 and M-03 are the exact same make and model.</li>
          <li><strong>Current Evidence:</strong> No calibration or readiness documentation for M-02 has been provided.</li>
        </ul>
      </div>
    `,
    q1: {
      prompt: "What is your decision for the readiness of the monitor on site?",
      options: QUIZ_COMMON_DECISIONS,
      correct: "B"
    },
    q2: {
      prompt: "What should you do next?",
      options: [
        { id: "A", text: "Obtain the applicable record for M-02 and verify it against the actual item and approved requirements." },
        { id: "B", text: "Accept M-03’s record because both monitors are the same model." },
        { id: "C", text: "Replace the missing evidence with a visual check that M-02 appears undamaged." }
      ],
      correct: "A"
    },
    explanation: {
      decision: "B — Not Verified",
      action: "A — Obtain the applicable record for M-02 and verify it against the actual item and approved requirements.",
      details: "The record for M-03 cannot establish the operational readiness or sensor calibration of M-02. Being the same model does not make calibration records interchangeable. However, this serial mismatch does not prove M-02 is broken or condemned; its readiness is simply unverified at this moment.",
      competencyNote: "Assesses cross-checking physical serial identities against compliance records and selecting the correct remedy to resolve discrepancies."
    }
  },
  {
    id: "q4",
    area: "Equipment",
    tagClass: "equip",
    title: "Case 4: Equipment — Sufficient Evidence for Equipment Check",
    evidenceSnippet: `
      <div class="dossier-card">
        <div class="dossier-header">
          <span class="dossier-tag">FIELD DOSSIER #EQ-405</span>
          <span class="dossier-time">VERIFICATION PASSED</span>
        </div>
        <ul class="dossier-list">
          <li><strong>Approved Equipment Schedule:</strong> Gas application unit <strong>E-07</strong> and clearance monitor <strong>M-04</strong>.</li>
          <li><strong>Physical Verification:</strong> Both physical asset tags match the schedule exactly (E-07, M-04).</li>
          <li><strong>Condition Checks:</strong> Complete and signed off with zero defects recorded.</li>
          <li><strong>Supporting Documentation:</strong> Valid calibration certificates and maintenance logs verified.</li>
          <li><strong>Job Context:</strong> Site boundary checks and PPE verification are not yet complete.</li>
        </ul>
      </div>
    `,
    q1: {
      prompt: "What is your decision for the equipment check?",
      options: QUIZ_COMMON_DECISIONS,
      correct: "A"
    },
    q2: {
      prompt: "What should you do next?",
      options: [
        { id: "A", text: "Record the equipment result and authorize the operation to begin." },
        { id: "B", text: "Keep equipment status unverified solely because another readiness area is incomplete." },
        { id: "C", text: "Record equipment readiness as verified and continue the remaining readiness checks." }
      ],
      correct: "C"
    },
    explanation: {
      decision: "A — Next Check",
      action: "C — Record equipment readiness as verified and continue the remaining readiness checks.",
      details: "All specified equipment requirements have been verified with complete evidence. Therefore, this specific equipment check is Ready. Incomplete site and PPE checks prevent starting the overall fumigation, but they do not invalidate a fully verified equipment dossier.",
      competencyNote: "Tests whether the supervisor can recognize when sufficient evidence exists to close one readiness check, without conflating a single domain sign-off with overall job start authorization."
    }
  },
  {
    id: "q5",
    area: "PPE / Respirator",
    tagClass: "ppe",
    title: "Case 5: PPE / Respirator — Required Protection & Wearer Evidence Match",
    evidenceSnippet: `
      <div class="dossier-card">
        <div class="dossier-header">
          <span class="dossier-tag">FIELD DOSSIER #PPE-518</span>
          <span class="dossier-time">RESPIRATORY LOG</span>
        </div>
        <ul class="dossier-list">
          <li><strong>Approved Protection Requirements:</strong> Full-face air-purifying respirators with approved multi-gas/fumigant canisters for all assigned workers.</li>
          <li><strong>Physical Issue:</strong> Issued respirators and canisters match approved models and chemical ratings.</li>
          <li><strong>Pre-use Inspection:</strong> Positive/negative pressure seal checks and harness condition verified.</li>
          <li><strong>Wearer Confirmations:</strong> Valid quantitative fit-test certificates match each assigned worker's name and specific facepiece model.</li>
          <li><strong>Context:</strong> Other pre-start checks remain in progress.</li>
        </ul>
      </div>
    `,
    q1: {
      prompt: "What is your decision for this PPE/respirator check?",
      options: QUIZ_COMMON_DECISIONS,
      correct: "A"
    },
    q2: {
      prompt: "What should you do next?",
      options: [
        { id: "A", text: "Record the protection check as verified and continue the remaining pre-start checks." },
        { id: "B", text: "Record the protection check as verified and release the team to begin the operation." },
        { id: "C", text: "Mark the protection check as unverified because unrelated pre-start checks are incomplete." }
      ],
      correct: "A"
    },
    explanation: {
      decision: "A — Next Check",
      action: "A — Record the protection check as verified and continue the remaining pre-start checks.",
      details: "The PPE and respirator requirements have been fully substantiated with matching equipment, condition checks, and wearer-specific fit-test certifications. The supervisor correctly marks this area as verified, while continuing the overall pre-start sequence.",
      competencyNote: "Demonstrates ability to synthesize approved criteria, physical items, and wearer documentation to make a confident positive check, avoiding an unwarranted reflex 'Hold'."
    }
  },
  {
    id: "q6",
    area: "PPE / Respirator",
    tagClass: "ppe",
    title: "Case 6: PPE / Respirator — Required Item Not Supplied",
    evidenceSnippet: `
      <div class="dossier-card alert-border">
        <div class="dossier-header">
          <span class="dossier-tag">FIELD DOSSIER #PPE-629</span>
          <span class="dossier-badge-danger">EQUIPMENT SHORTAGE</span>
        </div>
        <ul class="dossier-list">
          <li><strong>Approved Job Requirement:</strong> Mandatory gas-tight chemical suit and SCBA unit for each designated applicator.</li>
          <li><strong>Physical Check:</strong> Physical issue records and field inspection confirm one assigned worker has <strong>not received</strong> the required chemical protective suit.</li>
          <li><strong>Logistics Update:</strong> Warehouse reports a courier is in transit, with delivery expected in approximately 15 minutes.</li>
          <li><strong>Procedure Rule:</strong> The exercise procedure classifies this confirmed protection shortage as a <strong>critical no-go condition requiring escalation</strong>.</li>
        </ul>
      </div>
    `,
    q1: {
      prompt: "What is your decision based on the protection currently available?",
      options: QUIZ_COMMON_DECISIONS,
      correct: "C"
    },
    q2: {
      prompt: "What should you do next?",
      options: [
        { id: "A", text: "Accept the delivery confirmation as evidence that the worker’s protection is ready." },
        { id: "B", text: "Notify the designated person, arrange the required item, and verify the applicable readiness requirements once it is available." },
        { id: "C", text: "Wait for the delivery and close the issue when the package arrives, without further verification." }
      ],
      correct: "B"
    },
    explanation: {
      decision: "C — Not Ready",
      action: "B — Notify the designated person, arrange the required item, and verify the applicable readiness requirements once it is available.",
      details: "A missing required life-safety PPE item is a confirmed failure that triggers mandatory escalation under safety procedures. An ETA on a delivery truck is not evidence of operational readiness. When the package arrives, the supervisor must still unbox, inspect, and verify the item prior to closing the gap.",
      competencyNote: "Measures resilience against schedule pressure and reinforces that physical receipt must be accompanied by verified inspection before closing a life-safety issue."
    }
  }
];

const SCENARIO_CLUSTERS = [
  {
    id: "scenario-1",
    code: "01",
    title: "01 · Evidence mismatches",
    briefing: "You are supervising the pre-start readiness review for a high-priority fumigation job in Area B. The operations team expects to initiate gas introduction shortly. Review all three readiness areas and decide what must happen next.",
    rounds: [
      {
        roundNumber: 1,
        subtitle: "Round 1: Initial Evidence Review",
        areas: [
          {
            name: "Site Conditions",
            tagClass: "site",
            details: "The current site check covers the approved Area B layout and confirms all required site controls and exclusion barriers. No later changes are reported."
          },
          {
            name: "Equipment",
            tagClass: "equip",
            details: "The actual gas monitor physically present is unit D-17. The supplied calibration readiness record identifies unit D-71. Other equipment requirements are verified."
          },
          {
            name: "PPE / Respirator",
            tagClass: "ppe",
            details: "Required items and physical condition checks are confirmed. The assigned worker entering the space is Linh, but the supplied wearer-specific fit-test confirmation identifies Minh. No applicable confirmation for Linh is available."
          }
        ],
        q1: {
          prompt: "Considering all three readiness areas, what is your overall decision?",
          options: [
            { id: "A", text: "Proceed" },
            { id: "B", text: "Hold for Verification" },
            { id: "C", text: "Do Not Start & Escalate" }
          ],
          correct: "B"
        },
        q2: {
          prompt: "Which action addresses all outstanding readiness gaps?",
          options: [
            { id: "A", text: "Obtain and verify D-17’s equipment evidence and Linh’s applicable wearer confirmation; keep both gaps open until verified." },
            { id: "B", text: "Obtain D-17’s evidence and accept Minh’s confirmation for Linh because the required protection is the same." },
            { id: "C", text: "Obtain Linh’s confirmation and accept D-71’s equipment record because the monitor is physically present." }
          ],
          correct: "A"
        },
        explanation: {
          decision: "B — Hold for Verification",
          action: "A — Obtain and verify D-17’s equipment evidence and Linh’s applicable wearer confirmation; keep both gaps open until verified.",
          details: "There are two independent documentation gaps: the equipment calibration record does not match the actual instrument (D-17 vs D-71), and the respirator fit-test record does not match the assigned worker (Linh vs Minh). A verified site check does not compensate for these gaps. Options B and C address one issue while relying on an unverified assumption for the other.",
          competencyNote: "Tests whether the supervisor detects multiple simultaneous discrepancies and formulates an action plan that resolves all open gaps without cutting corners."
        }
      },
      {
        roundNumber: 2,
        subtitle: "Round 2: Updated Evidence Following Supervisory Action",
        areas: [
          {
            name: "Site Conditions",
            tagClass: "site",
            details: "The site remains unchanged; all required site checks, perimeter signs, and exclusion zones remain verified."
          },
          {
            name: "Equipment",
            tagClass: "equip",
            details: "The applicable calibration and inspection record for unit D-17 has been retrieved from records and verified against the actual item. All required checks are acceptable and complete."
          },
          {
            name: "PPE / Respirator",
            tagClass: "ppe",
            details: "Linh’s valid, current quantitative fit-test confirmation has been retrieved and verified for the assigned facepiece. All required protection and wearer-readiness criteria are confirmed."
          }
        ],
        q1: {
          prompt: "Based on the updated evidence and completed start authorization, what is your overall decision now?",
          options: [
            { id: "A", text: "Proceed" },
            { id: "B", text: "Hold for Verification" },
            { id: "C", text: "Do Not Start & Escalate" }
          ],
          correct: "A"
        },
        q2: {
          prompt: "What should you do next?",
          options: [
            { id: "A", text: "Keep the job on hold solely because the original documents contained mismatches." },
            { id: "B", text: "Record the verified closure of both gaps and follow the approved start process." },
            { id: "C", text: "Close both gaps using the original records without retaining the newly verified evidence." }
          ],
          correct: "B"
        },
        explanation: {
          decision: "A — Proceed",
          action: "B — Record the verified closure of both gaps and follow the approved start process.",
          details: "The new evidence directly resolves both prior discrepancies; all three readiness areas are verified, and the formal start authorization has been issued. The supervisor's decision must reflect the verified present state. Closing the gaps must be formally logged with the newly verified documentation retained.",
          competencyNote: "Validates that the supervisor knows how to update their operational decision once all evidence gaps are closed, transitioning safely from Hold to Proceed."
        }
      }
    ]
  },
  {
    id: "scenario-2",
    code: "02",
    title: "02 · Changing conditions",
    briefing: "You are reviewing pre-start preparation for a fumigation operation in Area C. The contractor team reports that site preparation is nearly complete and requests immediate sign-off. Assess all three readiness areas and determine the next action.",
    rounds: [
      {
        roundNumber: 1,
        subtitle: "Round 1: Initial Evidence Review",
        areas: [
          {
            name: "Site Conditions",
            tagClass: "site",
            details: "The current inspection confirms that a mandatory security access barrier is completely absent. The exercise procedure explicitly requires escalation for this condition."
          },
          {
            name: "Equipment",
            tagClass: "equip",
            details: "Required equipment, item serial identities, condition checks, and all applicable calibration readiness records are verified."
          },
          {
            name: "PPE / Respirator",
            tagClass: "ppe",
            details: "Required items and physical condition checks are confirmed. Worker An is assigned respirator model R-22, but An’s applicable wearer-readiness fit-test confirmation cannot be located."
          }
        ],
        q1: {
          prompt: "Considering all three readiness areas, what is your overall decision?",
          options: [
            { id: "A", text: "Proceed" },
            { id: "B", text: "Hold for Verification" },
            { id: "C", text: "Do Not Start & Escalate" }
          ],
          correct: "C"
        },
        q2: {
          prompt: "Which action best addresses the findings?",
          options: [
            { id: "A", text: "Request An’s missing confirmation and defer the site issue until the team reports the barrier installed." },
            { id: "B", text: "Escalate the missing barrier through the designated process, arrange verified correction, and obtain An’s applicable confirmation; track both issues." },
            { id: "C", text: "Escalate and correct the barrier issue, then treat the PPE check as complete because the respirator is present." }
          ],
          correct: "B"
        },
        explanation: {
          decision: "C — Do Not Start & Escalate",
          action: "B — Escalate the missing barrier through the designated process, arrange verified correction, and obtain An’s applicable confirmation; track both issues.",
          details: "A missing required perimeter barrier is a confirmed critical no-go condition under the procedure, requiring formal escalation rather than a mere 'Hold'. Furthermore, the supervisor cannot ignore the PPE gap: resolving the barrier does not verify An's respirator fit-test.",
          competencyNote: "Assesses managing concurrent issues: a confirmed critical failure requiring immediate escalation alongside an unverified documentation gap."
        }
      },
      {
        roundNumber: 2,
        subtitle: "Round 2: Evidence Following Barrier Correction",
        areas: [
          {
            name: "Site Conditions",
            tagClass: "site",
            details: "The barrier is installed. A physical re-inspection verifies that the barrier requirement is fully met. The designated safety manager has cleared the site no-go issue through the prescribed correction and review process."
          },
          {
            name: "Equipment",
            tagClass: "equip",
            details: "Equipment and required calibration records remain unchanged and fully verified."
          },
          {
            name: "PPE / Respirator",
            tagClass: "ppe",
            details: "An’s required fit-test confirmation is still unavailable. When questioned, An states: 'I used this exact respirator model on the previous job without any problem.'"
          }
        ],
        q1: {
          prompt: "The site issue has been verified closed, but the PPE evidence gap remains. What is your overall decision now?",
          options: [
            { id: "A", text: "Proceed" },
            { id: "B", text: "Hold for Verification" },
            { id: "C", text: "Do Not Start & Escalate" }
          ],
          correct: "B"
        },
        q2: {
          prompt: "What must happen next?",
          options: [
            { id: "A", text: "Accept An’s previous experience and mark the remaining PPE requirement as ready." },
            { id: "B", text: "Record the verified barrier correction as closure of all readiness issues." },
            { id: "C", text: "Obtain and verify An’s applicable wearer-readiness evidence, then reassess outstanding requirements and complete the remaining authorization process." }
          ],
          correct: "C"
        },
        explanation: {
          decision: "B — Hold for Verification",
          action: "C — Obtain and verify An’s applicable wearer-readiness evidence, then reassess outstanding requirements and complete the remaining authorization process.",
          details: "The site failure was formally corrected, verified, and cleared by the designated authority. The remaining hurdle is that An's required respirator fit-test confirmation is unverified. An's verbal claim of prior experience does not replace documented evidence. Since there is no confirmed defect or shortage, the correct posture is Hold for Verification.",
          competencyNote: "Crucial supervisory insight: This scenario intentionally concludes at Hold! Fixing the largest high-visibility hazard does not grant permission to begin when an unverified life-safety requirement remains open."
        }
      }
    ]
  }
];
