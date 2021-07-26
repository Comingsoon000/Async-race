type ValueOrArray<T> = T | Array<ValueOrArray<T>>;

export const appendElements = (parent: HTMLElement, ...children: ValueOrArray<HTMLElement>[]): void => {
  (<HTMLElement[]>children).reduce((acc, child) => {
    if (Array.isArray(child)) {
      const result = acc;
      child.forEach((item) => {
        (<HTMLElement>result).appendChild(<HTMLElement>item);
      });
      return result;
    }
    return (<HTMLElement>acc).appendChild(child);
  }, parent);
};
