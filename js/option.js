document.querySelectorAll(".pill-options").forEach((group) => {
  const buttons = group.querySelectorAll("button");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});
