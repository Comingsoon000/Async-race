export const addAttributes = (...items: [HTMLElement, string, string][]): void => {
  items.forEach((item) => {
    const [elem, attributeName, attributeValue] = item;
    elem.setAttribute(`${attributeName}`, `${attributeValue}`);
  });
};
