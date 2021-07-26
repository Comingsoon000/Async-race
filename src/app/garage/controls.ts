import { addAttributes } from "../../shared/addAttributes";
import { appendElements } from "../../shared/appendElements";
import { createElements } from "../../shared/createElements";

export const [
  controls,
  createCar,
  createCarName,
  createCarColor,
  createCarButton,
  updateCar,
  updateCarName,
  updateCarColor,
  updateCarButton,
  buttonsWrapper,
  raceButton,
  resetButton,
  generateCarsBtn,
] = createElements([
  ["div", "controls", ""],
  ["form", "create-car", ""],
  ["input", "create-car__name-input", ""],
  ["input", "create-car__color-input", ""],
  ["button", "create-car__submit-btn", "create"],
  ["form", "update-car", ""],
  ["input", "update-car__name-input", ""],
  ["input", "update-car__color-input", ""],
  ["button", "update-car__submit-btn", "update"],
  ["div", "buttons__wrapper", ""],
  ["button", "buttons__race-btn", "race"],
  ["button", "buttons__reset-btn", "reset"],
  ["button", "buttons__generate-cars-btn", "generate cars"],
]);

addAttributes(
  [createCar, "id", "createCar"],
  [createCarName, "type", "text"],
  [createCarColor, "type", "color"],
  [createCarButton, "type", "button"],
  [createCarButton, "form", "createCar"],
  [updateCar, "id", "updateCar"],
  [updateCarName, "type", "text"],
  [updateCarName, "disabled", "true"],
  [updateCarColor, "type", "color"],
  [updateCarColor, "disabled", "true"],
  [updateCarButton, "type", "button"],
  [updateCarButton, "form", "updateCar"],
  [updateCarButton, "disabled", "true"],
  [raceButton, "type", "button"],
  [resetButton, "type", "button"],
  [resetButton, "disabled", "true"],
  [generateCarsBtn, "type", "button"]
);

(<HTMLInputElement>createCarColor).value = "#e43003";
(<HTMLInputElement>updateCarColor).value = "#db9806";

export const controlsRender = (): void => {
  appendElements(createCar, [createCarName, createCarColor, createCarButton]);
  appendElements(updateCar, [updateCarName, updateCarColor, updateCarButton]);
  appendElements(buttonsWrapper, [raceButton, resetButton, generateCarsBtn]);
  appendElements(document.body, controls, [createCar, updateCar, buttonsWrapper]);
};
