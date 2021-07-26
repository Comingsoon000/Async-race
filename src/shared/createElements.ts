export const createElements = (...[descriptions]: string[][][]): HTMLElement[] => {
  const result = descriptions.map((description) => {
    const [tag, cssClass, content] = description;
    const element = document.createElement(tag);
    element.classList.add(cssClass);
    element.textContent = content;
    return element;
  });
  return result;
};
