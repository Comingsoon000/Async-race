import { addAttributes } from "../../shared/addAttributes";
import { addClasses } from "../../shared/addClasses";
import { appendElements } from "../../shared/appendElements";
import { createElements } from "../../shared/createElements";
import { removeClasses } from "../../shared/removeClasses";
import { controls } from "../garage/controls";
import { garage } from "../garage/garage";
import { winners, winnersRender } from "../winners/winners";

export const [header, garageBtn, winnersBtn] = createElements([
  ["header", "header", ""],
  ["button", "header__garage-btn", "to garage"],
  ["button", "header__winners-btn", "to winners"],
]);

addAttributes([garageBtn, "type", "button"], [winnersBtn, "type", "button"]);

export const headerRender = (): void => {
  appendElements(document.body, header, [garageBtn, winnersBtn]);
};

garageBtn.addEventListener("click", () => {
  removeClasses([garage, "hidden"], [controls, "hidden"]);
  addClasses([winners, "hidden"]);
});

winnersBtn.addEventListener("click", () => {
  winnersRender();
  removeClasses([winners, "hidden"]);
  addClasses([garage, "hidden"], [controls, "hidden"]);
});
