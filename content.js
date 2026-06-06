// Match/replace values
const ORIGINAL = "https://google.com/search";
const REPLACEMENT = "https://duckduckgo.com";

// Extra guard: ensure script really runs on intended origin
if (location.origin !== "https://comick.dev") throw 0;

function waitForElement(selector) {
  return new Promise((resolve) => {
    // First, check if the element already exists.
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    // If not, create an observer to watch for changes.
    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect(); // Stop observing once the element is found.
        resolve(document.querySelector(selector));
      }
    });

    // Start observing the document body for child list changes.
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function rewriteLinks() {
  document.querySelectorAll(".-mx-2 a[href]").forEach((link) => {
    try {
      const resolved = new URL(link.getAttribute("href"), location.href).href;
      if (resolved.startsWith(ORIGINAL)) {
        link.setAttribute("href", link.getAttribute("href").replace(ORIGINAL, REPLACEMENT));
      }
    } catch (e) {}
  });
}

rewriteLinks();

const observer = new MutationObserver(() => rewriteLinks());
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});
