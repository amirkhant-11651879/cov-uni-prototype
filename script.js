/******************************************************
 * script.js
 * Contains JavaScript to handle modals, pop-ups,
 * and additional interactive features (like charts).
 ******************************************************/

// 1) Handle generic pop-up links
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const closeButtons = document.querySelectorAll(".close-button");
const overlays = document.querySelectorAll(".modal-overlay");

document.querySelectorAll(".popup-link").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    // Skip if this is the results button (handled separately)
    if (this.classList.contains('view-results-btn')) {
      return;
    }
    
    const title = this.getAttribute("data-modal-title");
    let content = this.getAttribute("data-modal-content");
    
    // For notifications, check if we have stored state
    if (title === 'Notifications' && window.notificationsContent) {
      content = window.notificationsContent;
    }
    
    // Special handling for Personal Information
    if (title === 'Personal Information') {
      content = `
        <div class="personal-info-container">
          <div class="info-section">
            <h3>Personal Details</h3>
            <div class="form-group">
              <label>Student ID:</label>
              <input type="text" id="studentId" value="123456789" readonly class="readonly-field">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>First Name:</label>
                <input type="text" id="firstName" value="Alex">
              </div>
              <div class="form-group">
                <label>Last Name:</label>
                <input type="text" id="lastName" value="Johnson">
              </div>
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input type="email" id="email" value="alex.johnson@uni.coventry.ac.uk" readonly class="readonly-field">
            </div>
            <div class="form-group">
              <label>Phone Number:</label>
              <input type="tel" id="phone" value="07555 123456">
            </div>
          </div>

          <div class="info-section">
            <h3>Address Information</h3>
            <div class="form-group">
              <label>Term Time Address:</label>
              <input type="text" id="termAddress" value="999 Generic St, Coventry, CV1 1ZZ">
            </div>
            <div class="form-group">
              <label>Home Address:</label>
              <input type="text" id="homeAddress" value="123 Home Street, London, SW1 1AA">
            </div>
          </div>

          <div class="info-section">
            <h3>Emergency Contact 1</h3>
            <div class="form-row">
              <div class="form-group">
                <label>First Name:</label>
                <input type="text" id="emergency1FirstName" value="Sarah">
              </div>
              <div class="form-group">
                <label>Last Name:</label>
                <input type="text" id="emergency1LastName" value="Johnson">
              </div>
            </div>
            <div class="form-group">
              <label>Relationship:</label>
              <input type="text" id="emergency1Relation" value="Parent">
            </div>
            <div class="form-group">
              <label>Phone:</label>
              <input type="tel" id="emergency1Phone" value="07900 111222">
            </div>
          </div>

          <div class="info-section">
            <h3>Emergency Contact 2</h3>
            <div class="form-row">
              <div class="form-group">
                <label>First Name:</label>
                <input type="text" id="emergency2FirstName" value="Tom">
              </div>
              <div class="form-group">
                <label>Last Name:</label>
                <input type="text" id="emergency2LastName" value="Johnson">
              </div>
            </div>
            <div class="form-group">
              <label>Relationship:</label>
              <input type="text" id="emergency2Relation" value="Sibling">
            </div>
            <div class="form-group">
              <label>Phone:</label>
              <input type="tel" id="emergency2Phone" value="07900 222333">
            </div>
          </div>

          <div class="info-section">
            <h3>Course Information</h3>
            <div class="form-group">
              <label>Course:</label>
              <input type="text" id="course" value="BSc Computer Science" readonly class="readonly-field">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Year of Study:</label>
                <input type="text" id="yearOfStudy" value="Year 3" readonly class="readonly-field">
              </div>
              <div class="form-group">
                <label>Mode of Study:</label>
                <input type="text" id="modeOfStudy" value="Full Time" readonly class="readonly-field">
              </div>
            </div>
          </div>

          <div class="form-buttons">
            <button type="button" class="save-info-btn primary-btn">Save Changes</button>
            <button type="button" class="cancel-info-btn secondary-btn">Cancel</button>
          </div>

          <p class="gdpr-notice">Your personal information is protected under GDPR and University data protection policies.</p>
        </div>
      `;
    }
    
    modalTitle.textContent = title;
    modalBody.innerHTML = content.replace(/\n/g, "<br>");
    modal.style.display = "block";
    
    // Initialize notifications if this is the notifications modal
    if (title === 'Notifications') {
      handleNotifications();
    }

    // Initialize personal info handlers if this is the personal info modal
    if (title === 'Personal Information') {
      initializePersonalInfoHandlers();
    }
  });
});

// 2) Show/hide modals for editing forms
document.querySelectorAll(".edit-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    const targetId = this.getAttribute("data-target");
    document.getElementById(targetId).style.display = "block";
  });
});

// 3) Close modals on close button or outside click
closeButtons.forEach(btn => {
  btn.addEventListener("click", function() {
    this.closest(".modal-overlay").style.display = "none";
  });
});
window.addEventListener("click", function(e) {
  overlays.forEach(overlay => {
    if(e.target === overlay) {
      overlay.style.display = "none";
    }
  });
});

// 4) Simulate form Save/Cancel
document.querySelectorAll(".save-btn").forEach(save => {
  save.addEventListener("click", function() {
    alert("Your changes have been saved (simulation).");
    showSuccessBanner("Your data has been saved successfully!");
    this.closest(".modal-overlay").style.display = "none";
  });
});
document.querySelectorAll(".cancel-btn").forEach(cancel => {
  cancel.addEventListener("click", function() {
    this.closest(".modal-overlay").style.display = "none";
  });
});

// A function to show a success banner
function showSuccessBanner(message) {
  const banner = document.getElementById("successBanner");
  banner.textContent = message;
  banner.style.display = "block";
  setTimeout(() => {
    banner.style.display = "none";
  }, 3000);
}

// 5) 'View Results' button logic
const resultsModal = document.getElementById("resultsModal");
// Update to handle all view results buttons
document.querySelectorAll(".view-results-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default popup behavior
    e.stopPropagation(); // Stop event from bubbling up
    
    if(resultsModal) {
      resultsModal.style.display = "block";
      initializeResultsTabs(); // Initialize tabs when modal is opened
    } else {
      console.error("Results modal not found in the DOM.");
    }
  });
});

// Week navigation with proper date handling
let currentWeek = 0;

// Results tabs functionality
function initializeResultsTabs() {
  console.log('Initializing results tabs...');
  
  const container = document.querySelector('.results-container');
  if (!container) {
    console.error('Results container not found');
    return;
  }
  
  const tabs = container.querySelectorAll('.results-tab');
  const contents = container.querySelectorAll('.results-content');
  
  console.log('Found tabs:', tabs.length);
  console.log('Found content sections:', contents.length);
  
  if (tabs.length === 0 || contents.length === 0) {
    console.error('Tabs or content sections not found');
    return;
  }
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      console.log('Tab clicked:', tab.textContent);
      
      // Remove active class from all tabs and content
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Show corresponding content
      const targetId = tab.getAttribute('data-target');
      console.log('Target content ID:', targetId);
      
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
        console.log('Added active class to target content:', targetId);
      } else {
        console.error('Target content not found:', targetId);
      }
    });
  });
  
  // Ensure first tab is active by default if no tab is active
  if (!container.querySelector('.results-tab.active')) {
    console.log('No active tab found, activating first tab');
    const firstTab = tabs[0];
    if (firstTab) {
      firstTab.click();
    }
  }
}

// 6) Support Services modal logic
const servicesModal = document.getElementById("servicesModal");
const openServicesModalLink = document.querySelector(".open-services-modal");
if(openServicesModalLink) {
  openServicesModalLink.addEventListener("click", (e) => {
    e.preventDefault();
    servicesModal.style.display = "block";
  });
}

// Each button in Support Services -> open its own modal
document.querySelectorAll(".services-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    const targetModal = this.getAttribute("data-service-target");
    servicesModal.style.display = "none";
    document.querySelector(targetModal).style.display = "block";
  });
});

// 'Back to Services' logic for sub-service modals
document.querySelectorAll(".back-btn").forEach(backBtn => {
  backBtn.addEventListener("click", function() {
    const parentModal = this.closest(".modal-overlay");
    parentModal.style.display = "none";
    servicesModal.style.display = "block";
  });
});

// 7) Donut chart for attendance
const attendanceChartCanvas = document.getElementById("attendanceChart");
if(attendanceChartCanvas && window.Chart) {
  const attendanceCtx = attendanceChartCanvas.getContext("2d");
  new Chart(attendanceCtx, {
    type: "doughnut",
    data: {
      labels: ["Attended (90%)", "Missed (10%)"],
      datasets: [{
        data: [90, 10],
        backgroundColor: ["#4caf50", "#f44336"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

// 8) Donut chart for academic progress
const progressChartCanvas = document.getElementById("progressChart");
if(progressChartCanvas && window.Chart) {
  const progressCtx = progressChartCanvas.getContext("2d");
  new Chart(progressCtx, {
    type: "doughnut",
    data: {
      labels: ["Completed (240)", "Remaining (120)"],
      datasets: [{
        data: [240, 120],
        backgroundColor: ["#4caf50", "#f44336"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

// 9) Sign Out button logic
const signOutBtn = document.querySelector(".signout-btn");
if(signOutBtn) {
  signOutBtn.addEventListener("click", () => {
    alert("You have been signed out. (simulation)");
  });
}

/********************************************
 * Additional Features
 ********************************************/

// COLLAPSIBLE SECTIONS with arrow icons
document.querySelectorAll(".collapsible-header").forEach(header => {
  header.addEventListener("click", function() {
    const body = header.nextElementSibling;
    const arrow = header.querySelector(".arrow-icon");
    const isHidden = (body.style.display === "none");

    // Toggle body display
    body.style.display = isHidden ? "block" : "none";
    header.setAttribute("aria-expanded", isHidden);

    // Rotate arrow
    if (arrow) {
      arrow.style.transform = isHidden ? "rotate(90deg)" : "rotate(0deg)";
    }
  });
});

// LOADING INDICATOR for Timetable
function loadTimetableData() {
  const loadingDiv = document.getElementById("timetableLoading");
  const contentDiv = document.getElementById("timetableContent");
  if (loadingDiv && contentDiv) {
    loadingDiv.style.display = "block";
    contentDiv.style.display = "none";

    // simulate a fetch
    setTimeout(() => {
      loadingDiv.style.display = "none";
      contentDiv.style.display = "block";
    }, 1500);
  }
}

// NOTIFY ABSENCE -> open a new modal with dropdown
const notifyAbsenceBtn = document.getElementById("notifyAbsenceBtn");
const absenceModal = document.getElementById("absenceModal");
if(notifyAbsenceBtn && absenceModal) {
  notifyAbsenceBtn.addEventListener("click", () => {
    absenceModal.style.display = "block";
  });
}

// Absence Modal: close or save logic
const absenceSaveBtn = document.getElementById("absenceSaveBtn");
if(absenceSaveBtn) {
  absenceSaveBtn.addEventListener("click", () => {
    // Gather user selection
    const classSelect = document.getElementById("absenceClass");
    const reasonField = document.getElementById("absenceReason");
    const chosenClass = classSelect.value;
    const reason = reasonField.value;

    // For simulation, just show success banner
    showSuccessBanner(`Absence recorded for ${chosenClass}. Reason: ${reason || "N/A"}`);
    absenceModal.style.display = "none";
  });
}

// Time-based greeting
function updateGreeting() {
  const firstNameInput = document.getElementById('firstName');
  const firstName = firstNameInput ? firstNameInput.value : 'Alex'; // Default to 'Alex' if input not found
  updateWelcomeMessage(firstName);
}

// Update current date
function updateDate() {
  const dateElement = document.getElementById('currentDate');
  if (dateElement) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('en-GB', options);
  }
}

// Initialize and update time-based elements
updateGreeting();
updateDate();
setInterval(updateGreeting, 60000); // Update every minute

// Announcement ticker pause on hover
const ticker = document.querySelector('.ticker-content');
if (ticker) {
  ticker.addEventListener('mouseover', () => {
    ticker.style.animationPlayState = 'paused';
  });
  ticker.addEventListener('mouseout', () => {
    ticker.style.animationPlayState = 'running';
  });
}

// Initialize Charts with proper error handling
function initializeCharts() {
  console.log('Initializing charts...');
  
  // Attendance Overview Chart
  const attendanceCanvas = document.getElementById('attendanceOverviewChart');
  console.log('Found attendance canvas:', attendanceCanvas);
  
  if (!attendanceCanvas) {
    console.error('Attendance canvas element not found');
    return;
  }

  if (!window.Chart) {
    console.error('Chart.js library not loaded');
    return;
  }

  try {
    const ctx = attendanceCanvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }

    console.log('Creating attendance chart...');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
        datasets: [{
          label: 'Total Attendance',
          data: [85, 87, 84, 88, 86, 89, 87, 87],
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 70,
            max: 100,
            ticks: {
              stepSize: 5
            }
          }
        }
      }
    });
    console.log('Attendance chart created successfully');
  } catch (error) {
    console.error('Error creating attendance chart:', error);
  }
}

// Calculate and update overall progress
function updateOverallProgress() {
  // Get all completed credits
  const stage1Credits = 80; // All completed
  const stage2Credits = 80; // All completed
  const stage3Credits = 40; // Currently completed
  
  // Calculate total completed and total possible
  const totalCompleted = stage1Credits + stage2Credits + stage3Credits;
  const totalPossible = 80 + 80 + 90; // Stage 1 + Stage 2 + Stage 3
  
  // Calculate percentage
  const progressPercentage = Math.round((totalCompleted / totalPossible) * 100);
  
  // Update the progress display in the quick stats
  const progressSpan = document.querySelector('.quick-stats .stat-item:last-child span');
  if (progressSpan) {
    progressSpan.textContent = `${progressPercentage}%`;
  }
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded, initializing...');
  
  // Initialize notifications
  updateInitialNotificationCount();
  
  // Initialize tabs
  initializeResultsTabs();
  
  // Calculate and update progress
  updateOverallProgress();
  
  // Rest of initialization code...
  initializeTimetable();
  initializeWeekNavigation();
  updateWeekDisplay();
  setupModalHandlers();
  initializeDocumentRequests();
  initializeDeadlines();
  initializeCharts();
  updateGradesDisplay();

  // Export calendar functionality
  const exportBtn = document.querySelector('.export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportCalendar);
  }

  // Initialize attendance record system
  initializeAttendanceRecord();
  
  // Add navigation toggle functionality for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');
  if(navToggle && nav) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }
});

// Timetable initialization
function initializeTimetable() {
  console.log('Initializing timetable...');
  const timetableGrid = document.querySelector('.timetable-grid');
  if (!timetableGrid) {
    console.error('Timetable grid not found');
    return;
  }

  // Clear existing content
  timetableGrid.innerHTML = '';

  // Add time labels
  const times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  // Calculate dates for the current week
  const today = new Date();
  today.setDate(today.getDate() + (currentWeek * 7));
  const monday = new Date(today);
  monday.setDate(monday.getDate() - monday.getDay() + 1);
  
  const dates = days.map((day, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return date.getDate();
  });

  // Add header row with days and dates
  const headerRow = document.createElement('div');
  headerRow.classList.add('time-slot', 'time-label');
  headerRow.textContent = '';
  timetableGrid.appendChild(headerRow);

  days.forEach((day, index) => {
    const dayLabel = document.createElement('div');
    dayLabel.classList.add('time-slot', 'time-label');
    dayLabel.innerHTML = `${day}<br><span style="font-size: 0.85em; color: #666;">${dates[index]}</span>`;
    timetableGrid.appendChild(dayLabel);
  });

  // Add time slots and class slots
  times.forEach(time => {
    // Time label
    const timeLabel = document.createElement('div');
    timeLabel.classList.add('time-slot', 'time-label');
    timeLabel.textContent = time;
    timetableGrid.appendChild(timeLabel);

    // Class slots for each day
    days.forEach(() => {
      const classSlot = document.createElement('div');
      classSlot.classList.add('time-slot');
      timetableGrid.appendChild(classSlot);
    });
  });

  // Add example classes
  const classes = [
    { 
      day: 1, 
      time: 2, 
      module: '6001CEM',
      subject: 'Individual Project', 
      room: 'ECG-01',
      lecturer: 'Dr. Sarah Wilson',
      type: 'Project Supervision'
    },
    { 
      day: 3, 
      time: 4, 
      module: '6042CEM',
      subject: 'Management Information Systems', 
      room: 'JL-120',
      lecturer: 'Prof. Michael Chen',
      type: 'Lecture',
      update: 'ROOM CHANGE: Moved to EC3-12'
    },
    { 
      day: 2, 
      time: 1, 
      module: '6068CEM',
      subject: 'Project Management', 
      room: 'AS-15',
      lecturer: 'Dr. Emma Thompson',
      type: 'Workshop'
    }
  ];

  classes.forEach(cls => {
    const index = (cls.time * 6) + cls.day;
    const slot = document.querySelectorAll('.time-slot:not(.time-label)')[index - 1];
    if (slot) {
      slot.classList.add('class-slot');
      slot.innerHTML = `
        <strong>${cls.module}</strong>
        <span>${cls.subject}</span>
        <small>${cls.room}</small>
      `;
      
      // Store class data for click handler
      slot.dataset.classInfo = JSON.stringify(cls);
      
      // Add click handler
      slot.addEventListener('click', () => showClassInfo(cls));
    }
  });
}

// Update class information display
function showClassInfo(classInfo) {
  const updates = document.querySelector('.room-updates');
  if (!updates) return;

  updates.style.display = 'flex';
  
  if (classInfo.update) {
    updates.innerHTML = `
      <span class="update-badge">Room Change Alert</span>
      <span>
        <strong>${classInfo.module} - ${classInfo.subject}</strong><br>
        ${classInfo.update}<br>
        Lecturer: ${classInfo.lecturer} | Type: ${classInfo.type}
      </span>
    `;
  } else {
    updates.innerHTML = `
      <span class="update-badge">${classInfo.type}</span>
      <span>
        <strong>${classInfo.module} - ${classInfo.subject}</strong><br>
        Lecturer: ${classInfo.lecturer} | Room: ${classInfo.room}
      </span>
    `;
  }

  // Auto-hide after 5 seconds
  setTimeout(() => {
    updates.style.display = 'none';
  }, 5000);
}

// Initialize week navigation buttons
function initializeWeekNavigation() {
  const prevWeekBtn = document.getElementById('prevWeekBtn');
  const nextWeekBtn = document.getElementById('nextWeekBtn');
  
  if (prevWeekBtn) {
    prevWeekBtn.addEventListener('click', () => {
      currentWeek--;
      updateWeekDisplay();
    });
  }
  
  if (nextWeekBtn) {
    nextWeekBtn.addEventListener('click', () => {
      currentWeek++;
      updateWeekDisplay();
    });
  }

  // Initial week display
  updateWeekDisplay();
}

// Update week display
function updateWeekDisplay() {
  const display = document.getElementById('currentWeekDisplay');
  if (!display) return;

  const today = new Date();
  today.setDate(today.getDate() + (currentWeek * 7));
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay() + 1));
  const weekEnd = new Date(today.setDate(today.getDate() + 4));
  
  const formatOptions = { month: 'short', day: 'numeric' };
  const startStr = weekStart.toLocaleDateString('en-GB', formatOptions);
  const endStr = weekEnd.toLocaleDateString('en-GB', formatOptions);
  
  display.textContent = `Week ${Math.abs(currentWeek) + 1} (${startStr} - ${endStr})`;

  // Update navigation buttons
  const prevWeekBtn = document.getElementById('prevWeekBtn');
  const nextWeekBtn = document.getElementById('nextWeekBtn');
  
  if (prevWeekBtn) prevWeekBtn.disabled = currentWeek <= -11;
  if (nextWeekBtn) nextWeekBtn.disabled = currentWeek >= 11;

  // Reinitialize timetable with new dates
  initializeTimetable();
}

// Modal functionality
function setupModalHandlers() {
  // Get modal elements
  const modalOverlay = document.querySelector('.modal-overlay');
  const closeButtons = document.querySelectorAll('.close-button');
  const absenceButton = document.querySelector('.notify-btn');

  if (absenceButton && modalOverlay) {
    absenceButton.addEventListener('click', function() {
      modalOverlay.style.display = 'block';
    });
  }

  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal-overlay');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
      event.target.style.display = 'none';
    }
  });

  // Handle absence form submission
  const absenceForm = document.getElementById('absenceForm');
  if (absenceForm) {
    absenceForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would handle the form submission
      modalOverlay.style.display = 'none';
      alert('Absence reported successfully!');
    });
  }

  // Show/hide "Other" reason input
  const reasonSelect = document.getElementById('absenceReason');
  const otherReasonInput = document.getElementById('otherReasonInput');
  
  if (reasonSelect && otherReasonInput) {
    reasonSelect.addEventListener('change', function() {
      otherReasonInput.style.display = this.value === 'other' ? 'block' : 'none';
    });
  }
}

// Deadline management
function initializeDeadlines() {
  const deadlinesList = document.getElementById('deadlinesList');
  if (!deadlinesList) return;

  // Add "Add Deadline" button to the widget header
  const widgetHeader = deadlinesList.closest('.dashboard-widget').querySelector('.widget-header');
  if (widgetHeader) {
    const addButton = document.createElement('button');
    addButton.className = 'add-deadline-btn';
    addButton.innerHTML = '<i class="fas fa-plus"></i>';
    addButton.title = 'Add Custom Deadline';
    addButton.onclick = openAddDeadlineModal;
    widgetHeader.appendChild(addButton);
  }

  updateDeadlineCountdowns();
  updateUpcomingDeadlinesCount();
}

// Add Deadline Modal HTML
function createAddDeadlineModal() {
  const modalHTML = `
    <div id="addDeadlineModal" class="modal-overlay">
      <div class="modal-content">
        <span class="close-button">&times;</span>
        <div class="modal-header">Add Custom Deadline</div>
        <div class="modal-body">
          <form id="addDeadlineForm">
            <div class="form-group">
              <label for="deadlineTitle">Title:</label>
              <input type="text" id="deadlineTitle" required placeholder="e.g., Project Milestone">
            </div>
            <div class="form-group">
              <label for="deadlineModule">Module Code:</label>
              <input type="text" id="deadlineModule" required placeholder="e.g., 6001CEM">
            </div>
            <div class="form-group">
              <label for="deadlineDate">Due Date:</label>
              <input type="datetime-local" id="deadlineDate" required>
            </div>
            <div class="form-group">
              <label for="deadlinePriority">Priority:</label>
              <select id="deadlinePriority" required>
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div class="form-buttons">
              <button type="submit" class="submit-btn">Add Deadline</button>
              <button type="button" class="cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  // Add modal to document if it doesn't exist
  if (!document.getElementById('addDeadlineModal')) {
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupAddDeadlineModalHandlers();
  }
}

// Setup handlers for add deadline modal
function setupAddDeadlineModalHandlers() {
  const modal = document.getElementById('addDeadlineModal');
  const form = document.getElementById('addDeadlineForm');
  const closeBtn = modal.querySelector('.close-button');
  const cancelBtn = modal.querySelector('.cancel-btn');

  // Close modal handlers
  [closeBtn, cancelBtn].forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const deadline = {
      module: document.getElementById('deadlineModule').value,
      title: document.getElementById('deadlineTitle').value,
      dueDate: new Date(document.getElementById('deadlineDate').value),
      priority: document.getElementById('deadlinePriority').value
    };

    addNewDeadline(deadline);
    modal.style.display = 'none';
    form.reset();
  });
}

// Open add deadline modal
function openAddDeadlineModal() {
  createAddDeadlineModal();
  const modal = document.getElementById('addDeadlineModal');
  
  // Set minimum date to today
  const dateInput = document.getElementById('deadlineDate');
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  dateInput.min = `${year}-${month}-${day}T${hours}:${minutes}`;
  
  modal.style.display = 'block';
}

// Add new deadline to the list
function addNewDeadline(deadline) {
  const deadlinesList = document.getElementById('deadlinesList');
  if (!deadlinesList) return;

  const deadlineItem = document.createElement('li');
  deadlineItem.className = `deadline-item ${deadline.priority}`;
  
  const dueDate = new Date(deadline.dueDate);
  const formattedDate = dueDate.toLocaleDateString('en-GB', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  deadlineItem.innerHTML = `
    <div class="deadline-info">
      <h4>${deadline.module} - ${deadline.title}</h4>
      <p>Due: ${formattedDate}</p>
      <button class="complete-btn">
        <i class="fas fa-check"></i>
        Mark Complete
      </button>
    </div>
    <div class="deadline-progress">
      <div class="progress-ring">
        <span></span>
        <small>days left</small>
      </div>
    </div>
  `;

  // Add to list and sort by due date
  deadlinesList.appendChild(deadlineItem);
  sortDeadlines();
  updateDeadlineCountdowns();
  updateUpcomingDeadlinesCount();
  
  showSuccessBanner('New deadline added successfully');
}

// Sort deadlines by due date
function sortDeadlines() {
  const deadlinesList = document.getElementById('deadlinesList');
  if (!deadlinesList) return;

  const deadlines = Array.from(deadlinesList.children);
  deadlines.sort((a, b) => {
    const dateA = new Date(a.querySelector('p').textContent.split('Due: ')[1]);
    const dateB = new Date(b.querySelector('p').textContent.split('Due: ')[1]);
    return dateA - dateB;
  });

  deadlines.forEach(deadline => deadlinesList.appendChild(deadline));
}

// Update deadline countdowns
function updateDeadlineCountdowns() {
  const deadlines = document.querySelectorAll('.deadline-item');
  deadlines.forEach(deadline => {
    const dueDateText = deadline.querySelector('p').textContent.split('Due: ')[1];
    const dueDate = new Date(dueDateText);
    const now = new Date();
    
    // Calculate difference in days
    const diff = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
    
    const countSpan = deadline.querySelector('.progress-ring span');
    const countSmall = deadline.querySelector('.progress-ring small');
    
    if (countSpan && countSmall) {
      countSpan.textContent = diff;
      countSmall.textContent = diff === 1 ? 'day left' : 'days left';
      
      // Update urgency class
      if (diff <= 1) {
        deadline.classList.add('urgent');
      } else {
        deadline.classList.remove('urgent');
      }
    }
  });
}

// Update upcoming deadlines count in quick stats
function updateUpcomingDeadlinesCount() {
  const deadlinesList = document.getElementById('deadlinesList');
  const deadlinesCountSpan = document.querySelector('.quick-stats .stat-item:first-child span');
  
  if (deadlinesList && deadlinesCountSpan) {
    const deadlineItems = deadlinesList.querySelectorAll('.deadline-item:not(.completed)');
    deadlinesCountSpan.textContent = deadlineItems.length;
  }
}

// Document Request System
function initializeDocumentRequests() {
  const requestCards = document.querySelectorAll('.request-card');
  const requestList = document.getElementById('requestList');
  const documentFilter = document.getElementById('documentTypeFilter');

  // Add click handlers for request buttons
  document.querySelectorAll('.request-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      openDocumentRequestModal(type);
    });
  });

  // Initialize download buttons for existing requests
  document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const requestType = this.closest('.request-item')
        .querySelector('.request-info h5')
        .textContent.toLowerCase()
        .replace(' letter', '');
        
      // Create and trigger download
      const link = document.createElement('a');
      link.href = '#'; // In a real implementation, this would be the actual file URL
      link.download = `${requestType}_letter.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showSuccessBanner('Letter download started');
    });
  });

  // Add empty state if no requests
  if (requestList && requestList.children.length === 0) {
    requestList.innerHTML = `
      <div class="empty-requests">
        <i class="fas fa-inbox"></i>
        <p>No document requests yet</p>
        <small>Generated letters will appear here</small>
      </div>
    `;
  }

  // Enhanced filter functionality
  if (documentFilter) {
    documentFilter.addEventListener('change', function() {
      const requests = document.querySelectorAll('.request-item');
      const filter = this.value;
      let hasVisibleRequests = false;

      requests.forEach(request => {
        const isVisible = filter === 'all' || 
          (filter === 'pending' && request.classList.contains('status-pending')) ||
          (filter === 'completed' && request.classList.contains('status-completed'));
        
        request.style.display = isVisible ? 'flex' : 'none';
        if (isVisible) hasVisibleRequests = true;
      });

      // Show empty state if no matching requests
      const emptyState = document.querySelector('.empty-requests');
      if (emptyState) {
        emptyState.style.display = hasVisibleRequests ? 'none' : 'block';
      }
    });
  }
}

// Document Request Modal
function openDocumentRequestModal(type) {
  const modal = document.getElementById('documentRequestModal');
  if (!modal) return;

  // Update modal content based on type
  const typeLabels = {
    'enrollment': 'Enrollment Verification Letter',
    'council': 'Council Tax Letter',
    'transcript': 'Academic Transcript',
    'custom': 'Custom Letter'
  };

  const modalHeader = modal.querySelector('.modal-header');
  if (modalHeader) {
    modalHeader.textContent = `Generate ${typeLabels[type] || 'Letter'}`;
  }
  modal.style.display = 'block';

  // Handle recipient selection
  const recipientSelect = modal.querySelector('select');
  const customRecipientGroup = document.getElementById('customRecipientGroup');
  
  if (recipientSelect) {
    recipientSelect.addEventListener('change', function() {
      if (customRecipientGroup) {
        customRecipientGroup.style.display = this.value === 'custom' ? 'block' : 'none';
      }
    });
  }

  // Handle form submission
  const form = modal.querySelector('form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      submitDocumentRequest(type, form);
    };
  }
}

// Submit document request
function submitDocumentRequest(type, form) {
  const requestList = document.querySelector('.request-list');
  if (!requestList) return;

  // Remove empty state if it exists
  const emptyState = requestList.querySelector('.empty-requests');
  if (emptyState) {
    emptyState.remove();
  }

  // Create new request item
  const newRequest = document.createElement('div');
  newRequest.className = 'request-item';
  newRequest.innerHTML = `
    <div class="request-info">
      <h5>${type.charAt(0).toUpperCase() + type.slice(1)} Letter</h5>
      <p><i class="fas fa-check-circle"></i> Generated: ${new Date().toLocaleDateString()}</p>
    </div>
    <div class="request-status">
      <span class="ready-status">Ready</span>
      <button class="download-btn">
        <i class="fas fa-download"></i>
        Download
      </button>
    </div>
  `;

  // Add download functionality
  const downloadBtn = newRequest.querySelector('.download-btn');
  downloadBtn.addEventListener('click', function() {
    // Create and trigger download
    const link = document.createElement('a');
    link.href = '#'; // In a real implementation, this would be the actual file URL
    link.download = `${type}_letter.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showSuccessBanner('Letter download started');
  });

  // Add to list with animation
  requestList.insertBefore(newRequest, requestList.firstChild);
  newRequest.style.opacity = '0';
  newRequest.style.transform = 'translateY(-10px)';
  
  // Trigger animation
  setTimeout(() => {
    newRequest.style.transition = 'all 0.3s ease';
    newRequest.style.opacity = '1';
    newRequest.style.transform = 'translateY(0)';
  }, 10);

  // Close modal and show success message
  document.getElementById('documentRequestModal').style.display = 'none';
  showSuccessBanner('Letter generated successfully - ready to download');
  form.reset();
}

// Handle deadline completion
document.addEventListener('click', function(e) {
  if (e.target.closest('.complete-btn')) {
    const button = e.target.closest('.complete-btn');
    const deadlineItem = button.closest('.deadline-item');
    const deadlineTitle = deadlineItem.querySelector('h4').textContent;
    
    // Show confirmation popup
    if (confirm(`Mark "${deadlineTitle}" as complete?`)) {
      // Add completed class
      deadlineItem.classList.add('completed');
      // Update the count
      updateUpcomingDeadlinesCount();
      showSuccessBanner('Deadline marked as complete');
    }
  }
});

// Function to get UK degree classification
function getUKClassification(percentage) {
  console.log('Calculating classification for:', percentage);
  if (percentage >= 70) return 'First Class Honours';
  if (percentage >= 60) return 'Upper Second Class (2:1)';
  if (percentage >= 50) return 'Lower Second Class (2:2)';
  if (percentage >= 40) return 'Third Class';
  return 'Fail';
}

// Function to get classification range
function getClassificationRange(classification) {
  console.log('Getting range for classification:', classification);
  switch(classification) {
    case 'First Class Honours': return '70-100%';
    case 'Upper Second Class (2:1)': return '60-69%';
    case 'Lower Second Class (2:2)': return '50-59%';
    case 'Third Class': return '40-49%';
    default: return '0-39%';
  }
}

// Update grades display
function updateGradesDisplay() {
    console.log('Starting updateGradesDisplay function...');
    
    // Get all grade cells from the table
    const gradeElements = document.querySelectorAll('.grades-table tbody td:nth-child(2)');
    console.log('Found grade elements:', gradeElements.length);
    
    if (gradeElements.length === 0) {
        console.error('No grade elements found in the table');
        return;
    }
    
    // Extract grades and remove the % symbol
    const grades = Array.from(gradeElements).map(el => {
        const gradeText = el.textContent.replace('%', '').trim();
        const grade = parseInt(gradeText);
        console.log('Parsed grade:', grade);
        return grade;
    });
    
    if (grades.some(isNaN)) {
        console.error('Some grades could not be parsed');
        return;
    }
    
    // Calculate average
    const average = Math.round(grades.reduce((a, b) => a + b, 0) / grades.length);
    console.log('Calculated average:', average);
    
    // Get classification and range
    const classification = getUKClassification(average);
    const range = getClassificationRange(classification);
    console.log('Classification:', classification);
    console.log('Range:', range);
    
    // Get display elements
    const averageCircle = document.querySelector('.average-circle span');
    const classLabel = document.querySelector('.class-label');
    const classRange = document.querySelector('.class-range');
    
    console.log('Found elements:', {
        averageCircle: !!averageCircle,
        classLabel: !!classLabel,
        classRange: !!classRange
    });
    
    // Update display elements if they exist
    if (averageCircle) {
        console.log('Updating average circle...');
        averageCircle.textContent = `${average}%`;
    } else {
        console.error('Average circle element not found');
    }
    
    if (classLabel) {
        console.log('Updating class label...');
        classLabel.textContent = classification;
    } else {
        console.error('Class label element not found');
    }
    
    if (classRange) {
        console.log('Updating class range...');
        classRange.textContent = `(${range})`;
    } else {
        console.error('Class range element not found');
    }
}

// Function to update initial notification count
function updateInitialNotificationCount() {
    // Get notifications content from the link attribute
    const notificationsLink = document.querySelector('.notifications-link');
    if (!notificationsLink) return;
    
    const notificationsContent = notificationsLink.getAttribute('data-modal-content');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = notificationsContent;
    const unreadCount = tempDiv.querySelectorAll('.notification-item.unread').length;
    
    console.log('Found unread notifications:', unreadCount);
    
    // Update dashboard counter
    const dashboardNotifCount = document.querySelector('.quick-stats .stat-item:nth-child(2) span');
    if (dashboardNotifCount) {
        dashboardNotifCount.textContent = unreadCount;
        
        // Add click handler to the parent stat-item
        const statItem = dashboardNotifCount.closest('.stat-item');
        if (statItem) {
            statItem.style.cursor = 'pointer';
            statItem.addEventListener('click', function() {
                notificationsLink.click();
            });
        }
    }
    
    // Update popup counter if it exists
    const popupCounter = document.querySelector('.notification-count');
    if (popupCounter) {
        popupCounter.textContent = unreadCount;
    }
}

// Function to update notification counts everywhere
function updateNotificationCount(count) {
  // Update the notification popup counter
  const popupCounter = document.querySelector('.notification-count');
  if (popupCounter) {
    popupCounter.textContent = count;
  }
  
  // Update the dashboard quick stats counter
  const dashboardCounter = document.querySelector('.quick-stats .stat-item:nth-child(2) span');
  if (dashboardCounter) {
    dashboardCounter.textContent = count;
  }
}

// Store notifications content when modified
function storeNotificationsState() {
  const notificationsList = document.querySelector('.notifications-list');
  if (notificationsList) {
    window.notificationsContent = `
<div class='notifications-popup'>
  <div class='notifications-header'>
    <h4><i class='fas fa-bell'></i> Notifications <span class='notification-count'>${document.querySelectorAll('.notification-item.unread').length}</span></h4>
  </div>
  ${notificationsList.outerHTML}
  <div class='notifications-footer'>
    <a class='mark-all-read'>Mark all as read</a>
  </div>
</div>`;
  }
}

// Notification handling
function handleNotifications() {
  // Get notification elements
  const dashboardNotifCount = document.querySelector('.quick-stats .stat-item:nth-child(2)');
  const unreadItems = document.querySelectorAll('.notification-item.unread');
  const count = unreadItems.length;
  
  // Update counts initially
  updateNotificationCount(count);
  
  // Add click handler to dashboard notification count
  if (dashboardNotifCount) {
    dashboardNotifCount.style.cursor = 'pointer';
    dashboardNotifCount.addEventListener('click', function() {
      const notificationsLink = document.querySelector('.notifications-link');
      if (notificationsLink) {
        notificationsLink.click();
      }
    });
  }

  // Function to create and attach dismiss button
  function attachDismissButton(item) {
    // Remove existing dismiss button if any
    const existingBtn = item.querySelector('.notification-dismiss');
    if (existingBtn) {
      existingBtn.remove();
    }

    const dismissBtn = document.createElement('button');
    dismissBtn.className = 'notification-dismiss';
    dismissBtn.innerHTML = '<i class="fas fa-times"></i>';
    dismissBtn.title = 'Dismiss notification';
    
    dismissBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      
      const itemHeight = item.offsetHeight;
      item.style.height = itemHeight + 'px';
      
      requestAnimationFrame(() => {
        item.style.transition = 'all 0.3s ease';
        item.style.height = '0';
        item.style.opacity = '0';
        item.style.padding = '0';
        
        setTimeout(() => {
          item.remove();
          // Update count after removing notification
          const newCount = document.querySelectorAll('.notification-item.unread').length;
          updateNotificationCount(newCount);
          
          // Show empty state if no notifications left
          const notificationsList = document.querySelector('.notifications-list');
          if (notificationsList && notificationsList.children.length === 0) {
            notificationsList.innerHTML = '<li class="no-notifications">No notifications</li>';
          }
          
          // Store the updated state
          storeNotificationsState();
        }, 300);
      });
    });
    
    item.appendChild(dismissBtn);
  }

  // Add dismiss buttons to all notifications
  document.querySelectorAll('.notification-item').forEach(item => {
    attachDismissButton(item);
  });

  // Handle notification clicks (mark as read)
  document.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', function(e) {
      if (e.target.closest('.notification-actions') || e.target.closest('.notification-dismiss')) {
        return;
      }
      if (this.classList.contains('unread')) {
        this.classList.remove('unread');
        const newCount = document.querySelectorAll('.notification-item.unread').length;
        updateNotificationCount(newCount);
        storeNotificationsState();
      }
    });
  });

  // Handle notification action buttons
  document.querySelectorAll('.notification-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const action = this.textContent.trim();
      const notificationItem = this.closest('.notification-item');
      
      // Remove unread class if notification is unread
      if (notificationItem && notificationItem.classList.contains('unread')) {
        notificationItem.classList.remove('unread');
        const newCount = document.querySelectorAll('.notification-item.unread').length;
        updateNotificationCount(newCount);
        storeNotificationsState();
      }
      
      // Handle different actions
      switch(action) {
        case 'View Grade':
          const resultsModal = document.getElementById('resultsModal');
          if (resultsModal) {
            resultsModal.style.display = 'block';
            const stage3Tab = resultsModal.querySelector('.results-tab[data-target="stage3Content"]');
            if (stage3Tab) stage3Tab.click();
          }
          break;
          
        case 'Register Now':
          showSuccessBanner('Opening exam registration portal...');
          setTimeout(() => {
            alert('Exam Registration Portal\n\nRegistration period: April 1-30, 2025\nExam dates: May 15-30, 2025');
          }, 500);
          break;
          
        case 'Submit Now':
          showSuccessBanner('Opening submission portal...');
          setTimeout(() => {
            alert('NOVA Submission Portal\n\nModule: 6042CEM\nDeadline: March 10, 2025\nSubmission type: Group Report');
          }, 500);
          break;
          
        case 'Mark Done':
          notificationItem.style.height = notificationItem.offsetHeight + 'px';
          requestAnimationFrame(() => {
            notificationItem.style.transition = 'all 0.3s ease';
            notificationItem.style.height = '0';
            notificationItem.style.opacity = '0';
            notificationItem.style.padding = '0';
            setTimeout(() => {
              notificationItem.remove();
              const newCount = document.querySelectorAll('.notification-item.unread').length;
              updateNotificationCount(newCount);
              showSuccessBanner('Notification marked as done');
              storeNotificationsState();
            }, 300);
          });
          break;
          
        case 'View Chat':
          showSuccessBanner('Opening group chat...');
          setTimeout(() => {
            alert('Group Chat - 6042CEM Project\n\nNew messages from:\n- Sarah: "Updated the requirements doc"\n- Mike: "Added my part to the report"\n- Emma: "Meeting tomorrow at 2pm?"');
          }, 500);
          break;
      }
      
      // Close the notifications modal
      const modal = document.getElementById('modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Handle mark all as read
  const markAllReadBtn = document.querySelector('.mark-all-read');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.notification-item.unread').forEach(item => {
        item.classList.remove('unread');
      });
      updateNotificationCount(0);
      showSuccessBanner('All notifications marked as read');
      storeNotificationsState();
    });
  }
}

// Function to initialize personal info handlers
function initializePersonalInfoHandlers() {
  const saveBtn = document.querySelector('.save-info-btn');
  const cancelBtn = document.querySelector('.cancel-info-btn');
  
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      // Get all editable fields
      const editableFields = document.querySelectorAll('.personal-info-container input:not(.readonly-field), .personal-info-container textarea');
      
      // Create an object to store the updated values
      const updatedInfo = {};
      editableFields.forEach(field => {
        updatedInfo[field.id] = field.value;
      });
      
      // Update the welcome message with the new first name
      const firstNameInput = document.getElementById('firstName');
      if (firstNameInput) {
        updateWelcomeMessage(firstNameInput.value);
      }
      
      // In a real application, you would send this data to a server
      console.log('Saving updated information:', updatedInfo);
      
      // Show success message
      showSuccessBanner('Personal information updated successfully');
      
      // Close the modal
      modal.style.display = 'none';
    });
  }
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to discard your changes?')) {
        modal.style.display = 'none';
      }
    });
  }
}

// Function to update welcome message with the given name
function updateWelcomeMessage(firstName) {
  const greetingElement = document.getElementById('timeBasedGreeting');
  if (greetingElement) {
    const hour = new Date().getHours();
    let greeting = 'Good ';
    
    if (hour < 12) greeting += 'Morning';
    else if (hour < 17) greeting += 'Afternoon';
    else greeting += 'Evening';
    
    greetingElement.textContent = `${greeting}, ${firstName}!`;
  }
}

// Export calendar functionality
function exportCalendar() {
  // Get all class slots that have data
  const classSlots = document.querySelectorAll('.class-slot');
  let calendarData = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\n';

  classSlots.forEach(slot => {
    if (slot.dataset.classInfo) {
      const classInfo = JSON.parse(slot.dataset.classInfo);
      const today = new Date();
      const dayOffset = classInfo.day - 1; // 0 = Monday, 6 = Sunday
      const timeHour = parseInt(classInfo.time) + 8; // Starting from 9:00 AM (9 = 8 + 1)
      
      // Set the date to next occurrence of this weekday
      const date = new Date(today);
      const currentDay = date.getDay() || 7; // Convert Sunday from 0 to 7
      date.setDate(date.getDate() + ((dayOffset + 1 - currentDay + 7) % 7));
      
      // Set the time
      date.setHours(timeHour, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(timeHour + 1, 0, 0);

      // Format dates for iCal
      const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      calendarData += `BEGIN:VEVENT\r\n`;
      calendarData += `SUMMARY:${classInfo.module} - ${classInfo.subject}\r\n`;
      calendarData += `LOCATION:${classInfo.room}\r\n`;
      calendarData += `DESCRIPTION:${classInfo.type} with ${classInfo.lecturer}\r\n`;
      calendarData += `DTSTART:${formatDate(date)}\r\n`;
      calendarData += `DTEND:${formatDate(endDate)}\r\n`;
      calendarData += `RRULE:FREQ=WEEKLY;COUNT=12\r\n`; // Repeat for 12 weeks
      calendarData += `END:VEVENT\r\n`;
    }
  });

  calendarData += 'END:VCALENDAR';

  // Create and trigger download
  const blob = new Blob([calendarData], { type: 'text/calendar' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'timetable.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  // Show success message
  showSuccessBanner('Calendar exported successfully!');
}

// Attendance Record System
const modules = [
    { code: '6001CEM', name: 'Individual Project', time: '14:00', day: 'Tuesday' },
    { code: '6042CEM', name: 'Management Information Systems', time: '09:00', day: 'Thursday' },
    { code: '6068CEM', name: 'Project Management', time: '11:00', day: 'Wednesday' }
];

// Initialize attendance record system
function initializeAttendanceRecord() {
    const viewAttendanceBtn = document.querySelector('.view-attendance-btn');
    const attendanceModal = document.getElementById('attendanceModal');
    const monthSelector = document.getElementById('monthSelector');
    
    if (viewAttendanceBtn) {
        viewAttendanceBtn.addEventListener('click', () => {
            if (attendanceModal) {
                attendanceModal.style.display = 'block';
                // Set current month
                const currentMonth = new Date().getMonth() + 1;
                monthSelector.value = currentMonth;
                generateAttendanceData(currentMonth);
            }
        });
    }

    // Month change handler
    if (monthSelector) {
        monthSelector.addEventListener('change', function() {
            generateAttendanceData(parseInt(this.value));
        });
    }

    // Close modal handler
    const closeBtn = attendanceModal?.querySelector('.close-button');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            attendanceModal.style.display = 'none';
        });
    }

    // Click outside to close
    window.addEventListener('click', (e) => {
        if (e.target === attendanceModal) {
            attendanceModal.style.display = 'none';
        }
    });
}

// Generate random attendance data for a given month
function generateAttendanceData(month) {
    const tableBody = document.getElementById('attendanceTableBody');
    if (!tableBody) return;

    // Clear existing data
    tableBody.innerHTML = '';
    
    // Get number of days in the month
    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, month, 0).getDate();
    
    let totalClasses = 0;
    let attendedClasses = 0;
    const attendanceData = [];

    // Generate data for each day
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Skip weekends
        if (dayOfWeek === 0 || dayOfWeek === 6) continue;
        
        // Check each module
        modules.forEach(module => {
            const moduleDay = getDayNumber(module.day);
            
            // If this module runs on this day
            if (dayOfWeek === moduleDay) {
                totalClasses++;
                
                // Random attendance (85% chance of attendance to match the widget)
                const attended = Math.random() < 0.85;
                if (attended) attendedClasses++;
                
                // Add to attendance data
                attendanceData.push({
                    date: date.toLocaleDateString('en-GB', { 
                        day: 'numeric',
                        month: 'short'
                    }),
                    module: module.code,
                    time: module.time,
                    attended: attended
                });
            }
        });
    }

    // Sort by date
    attendanceData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Populate table
    attendanceData.forEach((record, index) => {
        const row = document.createElement('tr');
        row.className = record.attended ? 'attended' : 'absent';
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.module}</td>
            <td>Lecture ${index + 1}</td>
            <td>${record.time}</td>
            <td>
                <span class="status-badge ${record.attended ? 'present' : 'absent'}">
                    ${record.attended ? 'Present' : 'Absent'}
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Update summary stats
    updateAttendanceSummary(totalClasses, attendedClasses);
}

// Helper function to convert day name to number
function getDayNumber(day) {
    const days = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5
    };
    return days[day] || 1;
}

// Update attendance summary statistics
function updateAttendanceSummary(total, attended) {
    const totalElement = document.getElementById('totalClasses');
    const attendedElement = document.getElementById('attendedClasses');
    const rateElement = document.getElementById('attendanceRate');
    
    if (totalElement) totalElement.textContent = total;
    if (attendedElement) attendedElement.textContent = attended;
    if (rateElement) {
        const rate = total > 0 ? Math.round((attended / total) * 100) : 0;
        rateElement.textContent = `${rate}%`;
    }
}

// Support Services button handlers
document.querySelectorAll('.service-card .services-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const service = this.getAttribute('data-service');
    const modal = document.getElementById('servicesModal');
    
    // Hide the services modal
    modal.style.display = 'none';
    
    // Show appropriate response based on service type
    switch(service) {
      case 'wellbeing':
        showSuccessBanner('Connecting to Wellbeing Services...');
        setTimeout(() => {
          alert('Wellbeing Support Portal\n\n' +
                '24/7 Support Line: +44 (0)24 7765 7777\n' +
                'Email: wellbeing@coventry.ac.uk\n\n' +
                'Drop-in Hours: Mon-Fri, 10am-4pm\n' +
                'Location: Student Centre, Ground Floor');
        }, 500);
        break;
        
      case 'academic':
        showSuccessBanner('Opening Academic Support Portal...');
        setTimeout(() => {
          alert('Academic Support Services\n\n' +
                'Available Support:\n' +
                '- One-to-one Study Skills Sessions\n' +
                '- Writing Development Workshops\n' +
                '- Math & Stats Drop-in Sessions\n\n' +
                'Book your session through the Student Portal');
        }, 500);
        break;
        
      case 'career':
        showSuccessBanner('Loading Career Services Portal...');
        setTimeout(() => {
          alert('Career Development Services\n\n' +
                'Upcoming Events:\n' +
                '- CV Workshop (Next Tuesday)\n' +
                '- Mock Interview Day (Next Thursday)\n' +
                '- Graduate Fair (15th March)\n\n' +
                'Book your career consultation online');
        }, 500);
        break;
        
      case 'financial':
        showSuccessBanner('Accessing Financial Support Services...');
        setTimeout(() => {
          alert('Student Financial Support\n\n' +
                'Available Support:\n' +
                '- Hardship Fund Applications Open\n' +
                '- Student Money Advisers Available\n' +
                '- Scholarship Deadlines: April 30th\n\n' +
                'Contact: finance.support@coventry.ac.uk');
        }, 500);
        break;
        
      case 'housing':
        showSuccessBanner('Opening Housing Support Portal...');
        setTimeout(() => {
          alert('Student Housing Services\n\n' +
                'Current Services:\n' +
                '- Accommodation Search Tool\n' +
                '- Housing Advice Drop-ins\n' +
                '- Emergency Housing Support\n\n' +
                'Visit the Housing Office: Mon-Fri, 9am-5pm');
        }, 500);
        break;
        
      case 'international':
        showSuccessBanner('Connecting to International Support...');
        setTimeout(() => {
          alert('International Student Support\n\n' +
                'Services Available:\n' +
                '- Visa & Immigration Advice\n' +
                '- Cultural Adaptation Support\n' +
                '- English Language Courses\n\n' +
                'Book an appointment with our International Office');
        }, 500);
        break;
    }
  });
});
