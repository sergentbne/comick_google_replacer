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

waitForElement(".-mx-2 > div:nth-child(1)").then((element) => {
  document.querySelector(".-mx-2 > div:nth-child(1)").childNodes.forEach(
    (a) => {
      try {
        const resolved = new URL(a.getAttribute("href"), location.href).href;
        if (resolved.startsWith(ORIGINAL)) {
          const current = a.getAttribute("href");
          const newHref = current.replace(ORIGINAL, REPLACEMENT);
          a.setAttribute("href", newHref);
        }
      } catch (e) {}
    },
  );
});
