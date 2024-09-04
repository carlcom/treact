function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

function createObserver() {
  // Disconnect any existing observers to avoid duplicates
  if (window.scrollObserver) {
    window.scrollObserver.disconnect();
  }

  // Calculate the threshold based on element size relative to the viewport height
  const elements = document.querySelectorAll(".from-the-left, .from-the-right");
  elements.forEach((element) => {
    const threshold = Math.min(1, (window.innerHeight / element.clientHeight) * 0.2); // Element fills 20% of the viewport

    // Create an IntersectionObserver for each element with the calculated threshold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if near the bottom (Don't show a lot of white above the footer)
          const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-animation-show");
          } else if (!nearBottom) {
            entry.target.classList.remove("scroll-animation-show");
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 80% 0px 80%", // Expand detection area horizontally for .from-the- translateX(80vw)
      }
    );

    observer.observe(element);
    // Store observer for future reference if needed
    window.scrollObserver = observer;
  });
}

// Skip animations if user prefers-reduced-motion
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Set up the observer on load and resize
  window.onload = createObserver;
  window.addEventListener("resize", createObserver);
}
