/*
 * Progressive enhancement only. Everything on the page is readable without this file.
 *   1. Re-render labs and certifications from data.js
 *   2. Category filter for labs
 *   3. Mobile menu
 *   4. Theme toggle
 */
(function () {
  "use strict";

  var data = window.PORTFOLIO;
  var render = window.PORTFOLIO_RENDER;

  /* ---------- 1. Render from data ---------- */
  var labsRoot = document.getElementById("labs-root");
  var certsRoot = document.getElementById("certs-root");

  if (data && render) {
    if (labsRoot) { labsRoot.innerHTML = render.labs(data); }
    if (certsRoot) { certsRoot.innerHTML = render.certs(data); }
  }

  /* ---------- 2. Lab filter ---------- */
  var filterBar = document.getElementById("lab-filters");
  var filterStatus = document.getElementById("lab-filter-status");

  function applyFilter(category) {
    var shown = 0;
    var groups = labsRoot.querySelectorAll(".lab-group");
    Array.prototype.forEach.call(groups, function (group) {
      var visibleInGroup = 0;
      Array.prototype.forEach.call(group.querySelectorAll(".lab"), function (item) {
        var match = category === "All" || item.getAttribute("data-category") === category;
        item.hidden = !match;
        if (match) { visibleInGroup += 1; }
      });
      group.hidden = visibleInGroup === 0;
      shown += visibleInGroup;
    });
    Array.prototype.forEach.call(filterBar.querySelectorAll("button"), function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-filter") === category ? "true" : "false");
    });
    if (filterStatus) {
      filterStatus.textContent = category === "All"
        ? "Showing all " + shown + " entries."
        : "Showing " + shown + (shown === 1 ? " entry" : " entries") + " in " + category + ".";
    }
  }

  if (labsRoot && filterBar) {
    var categories = [];
    Array.prototype.forEach.call(labsRoot.querySelectorAll(".lab"), function (item) {
      var c = item.getAttribute("data-category");
      if (c && categories.indexOf(c) === -1) { categories.push(c); }
    });
    if (categories.length > 1) {
      ["All"].concat(categories).forEach(function (category) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "chip";
        button.setAttribute("data-filter", category);
        button.setAttribute("aria-pressed", category === "All" ? "true" : "false");
        button.textContent = category;
        filterBar.appendChild(button);
      });
      filterBar.addEventListener("click", function (event) {
        var button = event.target.closest ? event.target.closest("button[data-filter]") : null;
        if (button) { applyFilter(button.getAttribute("data-filter")); }
      });
      filterBar.hidden = false;
    }
  }

  /* ---------- 3. Mobile menu ---------- */
  var menuButton = document.getElementById("menu-toggle");
  var menu = document.getElementById("site-menu");

  function setMenu(open) {
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    menu.classList.toggle("is-open", open);
  }

  if (menuButton && menu) {
    menuButton.hidden = false;
    menuButton.addEventListener("click", function () {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest && event.target.closest("a")) { setMenu(false); }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuButton.focus();
      }
    });
  }

  /* ---------- 4. Theme toggle ---------- */
  var themeButton = document.getElementById("theme-toggle");
  var themeLabel = document.getElementById("theme-toggle-label");
  var root = document.documentElement;

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set === "light" || set === "dark") { return set; }
    var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }

  function describeTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    themeLabel.textContent = next === "light" ? "Light theme" : "Dark theme";
    themeButton.setAttribute("aria-label", "Switch to " + next + " theme");
  }

  if (themeButton && themeLabel) {
    themeButton.hidden = false;
    describeTheme();
    themeButton.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        window.localStorage.setItem("theme", next);
      } catch (err) {
        /* Storage can be blocked. The theme still applies for this visit. */
      }
      describeTheme();
    });
  }
})();
