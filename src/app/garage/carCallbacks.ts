import { addAttributes } from "../../shared/addAttributes";
import { removeAttributes } from "../../shared/removeAttributes";
import { animate } from "./animate";
import { carUpdate } from "../serverRequests/carUpdate";
import { updateCarButton, updateCarColor, updateCarName } from "./controls";
import { displayWinner } from "./displayWinner";
import { drive, engineControl, getCar } from "../serverRequests/getters";
import { addWinner } from "../winners/addWinner";

type Race = { winner: boolean; begins: boolean };

export const updateCar = (id: number, carName: HTMLElement, carImage: HTMLElement): void => {
  removeAttributes([updateCarName, "disabled"], [updateCarColor, "disabled"], [updateCarButton, "disabled"]);

  const updateHandler = (): void => {
    const name = (<HTMLInputElement>updateCarName).value;
    const color = (<HTMLInputElement>updateCarColor).value;
    carUpdate(id, name, color).then(() => {
      carName.textContent = `${name}`;
      carImage.style.fill = `${color}`;
      addAttributes(
        [updateCarName, "disabled", "true"],
        [updateCarColor, "disabled", "true"],
        [updateCarButton, "disabled", "true"]
      );
      updateCarButton.removeEventListener("click", updateHandler);
    });
  };
  updateCarButton.addEventListener("click", updateHandler);
};

export const selectCar = (car: HTMLElement, carName: HTMLElement, carImage: HTMLElement): void => {
  const id = Number(car.getAttribute("id"));
  getCar(id).then((carObject) => {
    (<HTMLInputElement>updateCarName).value = carObject.name;
    (<HTMLInputElement>updateCarColor).value = carObject.color;
    updateCar(id, carName, carImage);
  });
};

const addStopCarBtnListener = (
  id: number,
  stopCarButton: HTMLElement,
  carImage: HTMLElement,
  stop: { click: boolean }
): void => {
  const stopStatus = "stopped";
  const stopCar = (): void => {
    engineControl(id, stopStatus).then(() => {
      addAttributes([stopCarButton, "disabled", "true"]);
      stop.click = true;
      carImage.style.left = "0";
      stopCarButton.removeEventListener("click", stopCar);
    });
  };
  stopCarButton.addEventListener("click", stopCar);
};

export const startCar = (
  car: HTMLElement,
  name: string,
  carImage: HTMLElement,
  carRoad: HTMLElement,
  stopCarButton: HTMLElement,
  startCarButton: HTMLElement,
  race: Race
): void => {
  const engine = { breaked: false };
  const stop = { click: false };
  const id = Number(car.getAttribute("id"));
  const startStatus = "started";

  addAttributes([stopCarButton, "disabled", "true"], [startCarButton, "disabled", "true"]);
  engineControl(id, startStatus).then((start) => {
    const duration = start.distance / start.velocity;
    animate(carImage, carRoad, duration, engine, stop);
    addStopCarBtnListener(id, stopCarButton, carImage, stop);
    removeAttributes([stopCarButton, "disabled"]);
    drive(id).then(
      () => {
        removeAttributes([startCarButton, "disabled"]);
        if (!race.winner && race.begins) {
          race.winner = true;
          const time = Math.round(duration / 10) / 100;
          displayWinner(name, duration);
          addWinner(id, time);
        }
      },
      () => {
        engine.breaked = true;
        removeAttributes([startCarButton, "disabled"]);
      }
    );
  });
};
