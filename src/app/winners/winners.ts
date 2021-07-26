import { addClasses } from "../../shared/addClasses";
import { appendElements } from "../../shared/appendElements";
import { createElements } from "../../shared/createElements";
import { Order, Sort } from "../serverRequests/getters";
import { createSheetStrings } from "./createSheetStrings";

let clickCounter = 0;
const sort: Sort = "time" || "id" || "wins";
const order: Order = "ASC" || "DESC";
const winnersState = { page: 1, limit: 10, sort, order };

export const [
  winners,
  winnersTitle,
  winnersPage,
  winnersSheet,
  winnersSheetHeader,
  winnersSheetNumber,
  winnersSheetCar,
  winnersSheetName,
  winnersSheetWins,
  winnersSheetTime,
  winnersPageButtons,
  winnersPrevButton,
  winnersNextButton,
] = createElements([
  ["div", "winners", ""],
  ["div", "winners__title", ""],
  ["div", "winners__page", `Page #${winnersState.page}`],
  ["div", "winners__sheet", ""],
  ["div", "winners__sheet-header", ""],
  ["div", "winners__sheet-number", "number"],
  ["div", "winners__sheet-car", "car"],
  ["div", "winners__sheet-name", "name"],
  ["div", "winners__sheet-wins", "wins"],
  ["div", "winners__sheet-time", "best time"],
  ["div", "winners__page-buttons", ""],
  ["button", "winners__prev-btn", "prev"],
  ["button", "winners__next-btn", "next"],
]);

export const winnersRender = (): void => {
  appendElements(winnersSheetHeader, [
    winnersSheetNumber,
    winnersSheetCar,
    winnersSheetName,
    winnersSheetWins,
    winnersSheetTime,
  ]);
  appendElements(winnersPageButtons, [winnersPrevButton, winnersNextButton]);
  appendElements(document.body, winners, [
    winnersTitle,
    winnersPage,
    winnersPageButtons,
    winnersSheetHeader,
    winnersSheet,
  ]);
  addClasses([winners, "hidden"]);
  createSheetStrings(
    winnersSheet,
    winnersTitle,
    winnersNextButton,
    winnersPrevButton,
    winnersState.page,
    winnersState.limit,
    winnersState.sort,
    winnersState.order
  );
};

winnersSheetNumber.addEventListener("click", () => {
  clickCounter += 1;
  const orderSwitcher = clickCounter % 2;
  winnersState.order = orderSwitcher ? "ASC" : "DESC";
  winnersState.sort = "id";
  createSheetStrings(
    winnersSheet,
    winnersTitle,
    winnersNextButton,
    winnersPrevButton,
    winnersState.page,
    winnersState.limit,
    winnersState.sort,
    winnersState.order
  );
});

winnersSheetWins.addEventListener("click", () => {
  clickCounter += 1;
  const orderSwitcher = clickCounter % 2;
  winnersState.order = orderSwitcher ? "ASC" : "DESC";
  winnersState.sort = "wins";
  createSheetStrings(
    winnersSheet,
    winnersTitle,
    winnersNextButton,
    winnersPrevButton,
    winnersState.page,
    winnersState.limit,
    winnersState.sort,
    winnersState.order
  );
});

winnersSheetTime.addEventListener("click", () => {
  clickCounter += 1;
  const orderSwitcher = clickCounter % 2;
  winnersState.order = orderSwitcher ? "ASC" : "DESC";
  winnersState.sort = "time";
  createSheetStrings(
    winnersSheet,
    winnersTitle,
    winnersNextButton,
    winnersPrevButton,
    winnersState.page,
    winnersState.limit,
    winnersState.sort,
    winnersState.order
  );
});

winnersPrevButton.addEventListener("click", () => {
  winnersState.page -= 1;
  winnersPage.textContent = `Page #${winnersState.page}`;
  createSheetStrings(
    winnersSheet,
    winnersTitle,
    winnersNextButton,
    winnersPrevButton,
    winnersState.page,
    winnersState.limit,
    winnersState.sort,
    winnersState.order
  );
});

winnersNextButton.addEventListener("click", () => {
  winnersState.page += 1;
  winnersPage.textContent = `Page #${winnersState.page}`;
  createSheetStrings(
    winnersSheet,
    winnersTitle,
    winnersNextButton,
    winnersPrevButton,
    winnersState.page,
    winnersState.limit,
    winnersState.sort,
    winnersState.order
  );
});
