// script.js - For interactive features or enhancements
document.addEventListener('DOMContentLoaded', () => {
  // Example: Show alert for a feature or dynamic year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});