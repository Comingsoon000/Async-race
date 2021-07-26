import { addAttributes } from "../../shared/addAttributes";
import { appendElements } from "../../shared/appendElements";
import { createElements } from "../../shared/createElements";
import { removeAttributes } from "../../shared/removeAttributes";
import { carRender, race } from "./car";
import { carCreate } from "../serverRequests/carCreate";
import { createCarButton, createCarColor, createCarName, generateCarsBtn, raceButton, resetButton } from "./controls";
import { getAllWinners, getCars, getCarsCount } from "../serverRequests/getters";
import { carDelete } from "../serverRequests/carDelete";
import { winnerDelete } from "../serverRequests/winnerDelete";
import { generateCars } from "./generateCars";

const garagePage = { current: 1 };

export const [garage, garageTitle, page, cars, garageButtons, garagePrevButton, garageNextButton] = createElements([
  ["div", "garage", ""],
  ["div", "garage__title", ""],
  ["div", "garage__page", `Page #${garagePage.current}`],
  ["div", "garage__cars", ""],
  ["div", "garage__page-buttons", ""],
  ["button", "garage__prev-btn", "prev"],
  ["button", "garage__next-btn", "next"],
]);

const carsRender = (): void => {
  cars.innerHTML = "";
  getCars(garagePage.current).then((carsFromServer) => {
    if (carsFromServer.length === 0) {
      garageTitle.textContent = "garage (0)";
    }
    carsFromServer.forEach((car) => {
      const [newCar, removeButton] = carRender(cars, garageTitle, car.name, car.color);
      addAttributes([newCar, "id", `${car.id}`]);
      removeButton.addEventListener("click", () => {
        carDelete(car.id).then(() => {
          getAllWinners().then((winners) => {
            const winner = winners.find((winnerFromServer) => car.id === winnerFromServer.id);
            if (winner) {
              winnerDelete(car.id).then();
            }
            carsRender();
          });
        });
      });
    });
  });
  getCarsCount().then((carsCount) => {
    const pageLimit = 7;
    if (carsCount <= garagePage.current * pageLimit) {
      addAttributes([garageNextButton, "disabled", "true"]);
    } else {
      removeAttributes([garageNextButton, "disabled"]);
    }
    if (garagePage.current * pageLimit <= pageLimit) {
      addAttributes([garagePrevButton, "disabled", "true"]);
    } else {
      removeAttributes([garagePrevButton, "disabled"]);
    }
  });
};

export const garageRender = async (): Promise<void> => {
  appendElements(garageButtons, [garagePrevButton, garageNextButton]);
  appendElements(garage, [garageTitle, page, garageButtons, cars]);
  appendElements(document.body, garage);
  carsRender();
};

createCarButton.addEventListener("click", () => {
  const name = (<HTMLInputElement>createCarName).value;
  const color = (<HTMLInputElement>createCarColor).value;
  carCreate(name, color).then(() => {
    carsRender();
  });
});

raceButton.addEventListener("click", () => {
  addAttributes([raceButton, "disabled", "true"]);
  race.winner = false;
  race.begins = true;
  const startButtons = cars.querySelectorAll(".car__bot-start-btn");
  const stopButtons = cars.querySelectorAll(".car__bot-stop-btn");
  const event = new Event("click");
  let timeId = setTimeout(function enableReset() {
    let isClear = false;
    const resetReady: boolean[] = [];
    stopButtons.forEach((StopBtn) => {
      if (StopBtn.hasAttribute("disabled")) {
        resetReady.push(false);
      }
    });
    if (resetReady.length === 0) {
      removeAttributes([resetButton, "disabled"]);
      isClear = true;
    }
    timeId = setTimeout(enableReset, 300);
    if (isClear) clearTimeout(timeId);
  }, 300);
  startButtons.forEach((StartBtn) => StartBtn.dispatchEvent(event));
});

resetButton.addEventListener("click", () => {
  addAttributes([resetButton, "disabled", "true"]);
  race.begins = false;
  const startButtons = cars.querySelectorAll(".car__bot-start-btn");
  const stopButtons = cars.querySelectorAll(".car__bot-stop-btn");
  const event = new Event("click");
  let enableRace = setTimeout(function enable() {
    let isClear = false;
    const raceReady: boolean[] = [];
    startButtons.forEach((StartBtn) => {
      if (StartBtn.hasAttribute("disabled")) {
        raceReady.push(false);
      }
    });
    if (raceReady.length === 0) {
      removeAttributes([raceButton, "disabled"]);
      isClear = true;
    }
    enableRace = setTimeout(enable, 300);
    if (isClear) clearTimeout(enableRace);
  }, 300);
  stopButtons.forEach((StopBtn) => StopBtn.dispatchEvent(event));
});

garagePrevButton.addEventListener("click", () => {
  garagePage.current -= 1;
  page.textContent = `Page #${garagePage.current}`;
  carsRender();
});

garageNextButton.addEventListener("click", () => {
  garagePage.current += 1;
  page.textContent = `Page #${garagePage.current}`;
  carsRender();
});

generateCarsBtn.addEventListener("click", () => {
  generateCars();
  carsRender();
});
