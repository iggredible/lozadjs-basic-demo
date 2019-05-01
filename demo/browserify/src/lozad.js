const getElems = (selector, root = document) => {
  if (selector instanceof Element) {
    return [selector];
  }
  if (selector instanceof NodeList) {
    return selector;
  }
  return root.querySelectorAll(selector);
};

const markElemAsLoaded = elem => {
  elem.setAttribute("data-loaded", true);
  return;
};

const loadElem = elem => {
  if (elem.getAttribute("data-src")) {
    elem.src = elem.getAttribute("data-src");
  }
  return;
};

const onIntersectionCallback = () => (entries, observer) => {
  console.log("observer:", observer);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      loadElem(target);
      markElemAsLoaded(target);
      target.classList.add("fade");
      observer.unobserve(target);
    }
  });
};

export default (selector = ".lozad") => {
  const elements = getElems(selector);
  let observer;
  if (elements) {
    observer = new IntersectionObserver(onIntersectionCallback());
  }
  return {
    observe() {
      elements.forEach(element => {
        observer.observe(element);
      });
    }
  };
};
