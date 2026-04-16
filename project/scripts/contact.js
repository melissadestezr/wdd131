// =============================================
// Purrfect Companions – contact.js
// Form validation, submission, localStorage
// =============================================

const form           = document.getElementById('contactForm');
const formSuccess    = document.getElementById('formSuccess');
const successName    = document.getElementById('successName');
const successMsg     = document.getElementById('successMsg');
const lastSubmission = document.getElementById('lastSubmission');
const lastSubText    = document.getElementById('lastSubmissionText');

// ── Show Previous Submission from localStorage ──
function loadLastSubmission() {
  if (!lastSubmission || !lastSubText) return;

  try {
    const saved = localStorage.getItem('lastContactSubmission');
    if (saved) {
      const data = JSON.parse(saved);
      lastSubText.textContent = `${data.name} submitted "${data.subject}" on ${data.date}.`;
      lastSubmission.style.display = 'block';
    }
  } catch {
    // Silently ignore parse errors
  }
}

loadLastSubmission();

// ── Validation Helpers ─────────────────────────
/**
 * Displays or clears an error message for a field.
 * @param {string} fieldId
 * @param {string} errorId
 * @param {string} message
 */
function setFieldError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (!field || !error) return;

  if (message) {
    error.textContent = message;
    field.classList.add('error');
    field.setAttribute('aria-describedby', errorId);
  } else {
    error.textContent = '';
    field.classList.remove('error');
    field.removeAttribute('aria-describedby');
  }
}

/**
 * Validates the email format.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/**
 * Validates all form fields and returns true if valid.
 * @param {Object} values - form field values
 * @returns {boolean}
 */
function validateForm(values) {
  let isValid = true;

  // Full Name
  if (!values.fullName || values.fullName.trim().length < 2) {
    setFieldError('fullName', 'nameError', 'Please enter your full name (at least 2 characters).');
    isValid = false;
  } else {
    setFieldError('fullName', 'nameError', '');
  }

  // Email
  if (!values.email || !isValidEmail(values.email)) {
    setFieldError('email', 'emailError', 'Please enter a valid email address.');
    isValid = false;
  } else {
    setFieldError('email', 'emailError', '');
  }

  // Subject
  if (!values.subject) {
    setFieldError('subject', 'subjectError', 'Please select a subject.');
    isValid = false;
  } else {
    setFieldError('subject', 'subjectError', '');
  }

  // Message
  if (!values.message || values.message.trim().length < 10) {
    setFieldError('message', 'messageError', 'Please enter a message (at least 10 characters).');
    isValid = false;
  } else {
    setFieldError('message', 'messageError', '');
  }

  return isValid;
}

// ── Subject Labels Map ─────────────────────────
const subjectLabels = {
  question: 'Ask a question',
  photo:    'Submit cat photo',
  breed:    'Breed recommendation',
  care:     'Care tip',
  other:    'Other'
};

// ── Form Submission ────────────────────────────
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const values = {
      fullName: document.getElementById('fullName')?.value.trim() || '',
      email:    document.getElementById('email')?.value.trim() || '',
      catName:  document.getElementById('catName')?.value.trim() || '',
      subject:  document.getElementById('subject')?.value || '',
      message:  document.getElementById('message')?.value.trim() || '',
      newsletter: document.getElementById('newsletter')?.checked || false
    };

    if (!validateForm(values)) return;

    const submissionDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    // Save to localStorage
    const submissionData = {
      name:    values.fullName,
      subject: subjectLabels[values.subject] || values.subject,
      date:    submissionDate
    };

    try {
      localStorage.setItem('lastContactSubmission', JSON.stringify(submissionData));
    } catch {
      // localStorage unavailable — not critical
    }

    // Build success message
    const catPart = values.catName ? ` about ${values.catName}` : '';
    const newsletterPart = values.newsletter ? ' We will also add you to our newsletter.' : '';

    if (successName) {
      successName.textContent = `Thank you, ${values.fullName}!`;
    }

    if (successMsg) {
      successMsg.textContent = `Your message${catPart} regarding "${subjectLabels[values.subject] || values.subject}" has been received.${newsletterPart} We will get back to you at ${values.email} soon.`;
    }

    // Show success, hide form
    if (formSuccess) formSuccess.style.display = 'flex';
    form.style.display = 'none';

    // Update sidebar
    loadLastSubmission();
  });
}

// ── Live Validation (on blur) ──────────────────
const liveFields = [
  { id: 'fullName', errorId: 'nameError', check: (v) => v.trim().length >= 2 ? '' : 'Please enter your full name.' },
  { id: 'email',    errorId: 'emailError', check: (v) => isValidEmail(v) ? '' : 'Please enter a valid email address.' },
  { id: 'message',  errorId: 'messageError', check: (v) => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.' }
];

liveFields.forEach(({ id, errorId, check }) => {
  const field = document.getElementById(id);
  if (field) {
    field.addEventListener('blur', () => {
      const message = check(field.value);
      setFieldError(id, errorId, message);
    });
  }
});
