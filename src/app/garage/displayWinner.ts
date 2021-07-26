import { appendElements } from "../../shared/appendElements";
import { createElements } from "../../shared/createElements";

export const displayWinner = (name: string, duration: number): void => {
  const time = Math.round(duration / 10) / 100;
  const text = `${name} won [${time}s]`;
  const [winner] = createElements([["div", "winner", text]]);
  appendElements(document.body, winner);
  setTimeout(() => winner.remove(), 5000);
};
