cript · JS
// =====================================================
// script.js — Contact Form Validation & Submission
// =====================================================
 
// ---------- Phone: allow only digits, spaces, +, -, (, ) ----------
document.getElementById('phone').addEventListener('input', function () {
  this.value = this.value.replace(/[^\d\s+\-()]/g, '');
});
 
// ---------- Live validation: clear error on user input ----------
['fullname', 'email', 'phone', 'country', 'message'].forEach(function (id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', function () {
    clearError(id);
  });
  el.addEventListener('change', function () {
    clearError(id);
  });
});
 
document.querySelectorAll('input[name="gender"]').forEach(function (radio) {
  radio.addEventListener('change', function () {
    clearError('gender');
  });
});
 
// ---------- Form submit ----------
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateForm()) {
    showSuccess();
  }
});
 
// ---------- Validation Logic ----------
function validateForm() {
  let isValid = true;
 
  // Full Name
  const name = document.getElementById('fullname').value.trim();
  if (!name) {
    showError('fullname', 'Full name is required.');
    isValid = false;
  } else if (name.length < 2) {
    showError('fullname', 'Name must be at least 2 characters.');
    isValid = false;
  } else {
    clearError('fullname');
  }
 
  // Email
  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError('email', 'Email address is required.');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearError('email');
  }
 
  // Phone
  const phone = document.getElementById('phone').value.trim();
  const phoneRegex = /^[\d\s+\-()]{7,}$/;
  if (!phone) {
    showError('phone', 'Phone number is required.');
    isValid = false;
  } else if (!phoneRegex.test(phone)) {
    showError('phone', 'Please enter a valid phone number (digits only).');
    isValid = false;
  } else {
    clearError('phone');
  }
 
  // Country
  const country = document.getElementById('country').value;
  if (!country) {
    showError('country', 'Please select your country.');
    isValid = false;
  } else {
    clearError('country');
  }
 
  // Gender
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    showError('gender', 'Please select your gender.');
    isValid = false;
  } else {
    clearError('gender');
  }
 
  // Message
  const message = document.getElementById('message').value.trim();
  if (!message) {
    showError('message', 'Message is required.');
    isValid = false;
  } else if (message.length < 10) {
    showError('message', 'Message must be at least 10 characters.');
    isValid = false;
  } else {
    clearError('message');
  }
 
  return isValid;
}
 
// ---------- Helpers ----------
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errEl = document.getElementById('err-' + fieldId);
  if (field) field.classList.add('invalid');
  if (errEl) errEl.textContent = message;
}
 
function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const errEl = document.getElementById('err-' + fieldId);
  if (field) field.classList.remove('invalid');
  if (errEl) errEl.textContent = '';
}
 
function showSuccess() {
  // Hide any lingering errors
  document.querySelectorAll('.err').forEach(function (el) {
    el.textContent = '';
  });
 
  // Show success banner
  const successEl = document.getElementById('success-msg');
  successEl.classList.add('visible');
  successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
 
  // Disable the submit button to prevent duplicate sends
  const btn = document.querySelector('.submit-btn');
  btn.disabled = true;
  btn.textContent = 'Message Sent ✓';
  btn.style.backgroundColor = '#3b6d11';
  btn.style.cursor = 'default';
  btn.style.boxShadow = 'none';
}