function openMenu() {
    document.body.classList.add('menu--open')
}

function closeMenu() {
    document.body.classList.remove('menu--open')
}

window.onload = function() {
  // Function to get the CSS variable value for threshold
  function getThresholdFromCSS() {
    // Use getComputedStyle to access the CSS variable set in :root
    const rootStyles = getComputedStyle(document.documentElement);

    return parseFloat(rootStyles.getPropertyValue("--scroll-animation-threshold")) || 0.05; // Default fallback
  }


  function createObserver() {
    // Clean up the previous observer if it exists
    if (window.scrollObserver) {
      window.scrollObserver.disconnect();
    }

    // Create a new Intersection Observer with the dynamic threshold
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-animation-show");
        } else {
          entry.target.classList.remove("scroll-animation-show");
        }
          // observer.unobserve(entry.target); // Optional: Stop observing after animation triggers
        
      });
    }, { threshold: getThresholdFromCSS() });

    // Attach the observer to each target element
    document.querySelectorAll(".from-the-left, .from-the-right").forEach((el) => observer.observe(el));

    // Store the observer globally for potential future management
    window.scrollObserver = observer;
  }

  // Initialize the observer on page load
  createObserver();

  // Recreate the observer on resize to adjust the threshold dynamically
  window.addEventListener('resize', createObserver);
};