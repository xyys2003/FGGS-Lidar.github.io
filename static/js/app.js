/* FGGS-LiDAR project page — interactions */
(function () {
  "use strict";

  var STORAGE_KEY = "fggs_lang";
  var root = document.documentElement;

  /* ---------- language toggle (persisted) ---------- */
  function setLang(lang) {
    if (lang !== "en" && lang !== "zh") lang = "en";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    var btns = document.querySelectorAll("#langToggle button");
    btns.forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
  }

  var saved = "en";
  try { saved = localStorage.getItem(STORAGE_KEY) || "en"; } catch (e) {}
  setLang(saved);

  var toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-lang]");
      if (btn) setLang(btn.getAttribute("data-lang"));
    });
  }

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById("navBurger");
  var links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ---------- copy BibTeX ---------- */
  var copyBtn = document.getElementById("copyBib");
  var bib = document.getElementById("bibText");
  if (copyBtn && bib) {
    copyBtn.addEventListener("click", function () {
      var text = bib.innerText;
      var done = function () {
        var isZh = root.getAttribute("data-lang") === "zh";
        copyBtn.textContent = isZh ? "已复制 ✓" : "Copied ✓";
        setTimeout(function () {
          copyBtn.innerHTML = '<span class="i18n-en">Copy</span><span class="i18n-zh">复制</span>';
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  }
})();
