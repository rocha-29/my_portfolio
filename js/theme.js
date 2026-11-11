/*
 * Runs in <head> before the page paints, so the saved theme applies without a flash.
 * Also marks the document as script-enabled, which is what collapses the mobile menu.
 */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");
  var saved = null;
  try {
    saved = window.localStorage.getItem("theme");
  } catch (err) {
    saved = null;
  }
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  }
})();
