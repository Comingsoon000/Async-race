type Engine = { breaked: boolean };
type Stop = { click: boolean };

export const animate = (car: HTMLElement, road: HTMLElement, duration: number, engine: Engine, stop: Stop): number => {
  let requestId: number;
  const start = performance.now();
  const carWidth = 64;
  const distance = road.offsetWidth - carWidth;
  const moveToLeft = (movingDuration: number): void => {
    const time = performance.now();
    let timeFraction = (time - start) / movingDuration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    car.style.left = `${timeFraction * distance}px`;
    if (timeFraction < 1) {
      requestId = requestAnimationFrame(() => moveToLeft(movingDuration));
    }
    if (stop.click) {
      cancelAnimationFrame(requestId);
      car.style.left = "0";
    }
    if (engine.breaked) {
      cancelAnimationFrame(requestId);
    }
  };
  moveToLeft(duration);
  return requestId;
};
