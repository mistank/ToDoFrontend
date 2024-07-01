// csrf.js
export function getCsrfToken() {
  console.log(document.cookie);
  const value = `; ${document.cookie}`;
  const parts = value.split(`; X-CSRF-Token=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
