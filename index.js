// scrolling to the FAQ section when FAQ button is clicked in the navbar
document.getElementById("FAQ-btn").addEventListener("click", function () {
  document
    .getElementById("main-container")
    .scrollIntoView({ behavior: "smooth" });
});
