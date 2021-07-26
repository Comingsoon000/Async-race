export const removeClasses = (...items: [HTMLElement, string][]): void => {
  items.forEach((item) => {
    const [elem, cssClass] = item;
    elem.classList.remove(cssClass);
  });
};
