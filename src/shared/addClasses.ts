export const addClasses = (...items: [HTMLElement, string][]): void => {
  items.forEach((item) => {
    const [elem, cssClass] = item;
    elem.classList.add(cssClass);
  });
};
