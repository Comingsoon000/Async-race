export const removeAttributes = (...items: [HTMLElement, string][]): void => {
  items.forEach((item) => {
    const [elem, attributeName] = item;
    elem.removeAttribute(`${attributeName}`);
  });
};
