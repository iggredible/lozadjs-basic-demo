const lozad = window.lozad;

window.onload = () => {
  console.log("loaded!");
  const observer = lozad(".lozad", {
    loaded: el => {
      el.classList.add("fade");
      el.src = el.dataset.src;
    }
  });
  observer.observe();
};
