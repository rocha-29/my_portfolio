/*
 * Turns the content in data.js into HTML strings.
 * Used in two places so the markup can never drift apart:
 *   - in the browser (main.js), to render from data.js
 *   - in Node (tools/build-static.mjs), to write the no-JavaScript fallback into index.html
 */
(function (root) {
  "use strict";

  var STATUS_CLASS = {
    "Published": "published",
    "Write-up in progress": "writeup",
    "Building": "building",
    "Planned": "planned"
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Only http(s) links are ever written into the page. */
  function safeUrl(url) {
    return typeof url === "string" && /^https?:\/\//i.test(url) ? url : "";
  }

  function link(url, text, label) {
    return '<a href="' + esc(url) + '" rel="noopener noreferrer" aria-label="' + esc(label) + '">' + esc(text) + "</a>";
  }

  function lab(item, headingLevel) {
    var h = "h" + (headingLevel || 4);
    var statusClass = STATUS_CLASS[item.status] || "planned";
    var out = [];
    out.push('        <li class="lab" id="' + esc(item.id) + '" data-category="' + esc(item.category) + '">');
    out.push('          <div class="lab-head">');
    out.push("            <" + h + ' class="lab-title">' + esc(item.title) + "</" + h + ">");
    out.push('            <p class="lab-meta"><span class="category">' + esc(item.category) + '</span> <span class="badge badge--' + statusClass + '">' + esc(item.status) + "</span></p>");
    out.push("          </div>");
    out.push('          <p class="lab-summary">' + esc(item.summary) + "</p>");
    if (item.highlights && item.highlights.length) {
      out.push('          <ul class="lab-highlights">');
      item.highlights.forEach(function (text) {
        out.push("            <li>" + esc(text) + "</li>");
      });
      out.push("          </ul>");
    }
    if (item.tags && item.tags.length) {
      out.push('          <ul class="tags" aria-label="Tools and topics">');
      item.tags.forEach(function (tag) {
        out.push("            <li>" + esc(tag) + "</li>");
      });
      out.push("          </ul>");
    }
    var links = item.links || {};
    var repo = safeUrl(links.repo);
    var writeup = safeUrl(links.writeup);
    if (repo || writeup) {
      out.push('          <p class="lab-links">');
      if (writeup) { out.push("            " + link(writeup, "Read the write-up", "Read the write-up for " + item.title)); }
      if (repo) { out.push("            " + link(repo, "View the repository", "View the repository for " + item.title)); }
      out.push("          </p>");
    }
    out.push("        </li>");
    return out.join("\n");
  }

  function labs(data) {
    return (data.labGroups || []).map(function (group) {
      var out = [];
      out.push('      <section class="lab-group lab-group--' + esc(group.layout || "rows") + '" id="labs-' + esc(group.id) + '" aria-labelledby="labs-' + esc(group.id) + '-title">');
      out.push('        <h3 id="labs-' + esc(group.id) + '-title">' + esc(group.title) + "</h3>");
      if (group.note) { out.push('        <p class="group-note">' + esc(group.note) + "</p>"); }
      out.push('        <ul class="lab-list">');
      out.push((group.items || []).map(function (item) { return lab(item, 4); }).join("\n"));
      out.push("        </ul>");
      out.push("      </section>");
      return out.join("\n");
    }).join("\n");
  }

  function certs(data) {
    return (data.certifications || []).map(function (c) {
      var verify = safeUrl(c.verifyUrl);
      var out = [];
      out.push('        <li class="cert">');
      out.push('          <span class="cert-name">' + esc(c.name) + "</span>");
      out.push('          <span class="cert-issuer">' + esc(c.issuer) + "</span>");
      out.push('          <span class="cert-date">' + esc(c.date) + "</span>");
      if (verify) {
        out.push('          <span class="cert-verify">' + link(verify, "Verify", "Verify " + c.name + " from " + c.issuer) + "</span>");
      }
      out.push("        </li>");
      return out.join("\n");
    }).join("\n");
  }

  function categories(data) {
    var seen = [];
    (data.labGroups || []).forEach(function (group) {
      (group.items || []).forEach(function (item) {
        if (seen.indexOf(item.category) === -1) { seen.push(item.category); }
      });
    });
    return seen;
  }

  var api = { labs: labs, certs: certs, categories: categories, esc: esc };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.PORTFOLIO_RENDER = api;
  }
})(typeof window !== "undefined" ? window : this);
