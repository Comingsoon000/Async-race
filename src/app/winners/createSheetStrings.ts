import { addAttributes } from "../../shared/addAttributes";
import { removeAttributes } from "../../shared/removeAttributes";
import { getCar, getWinners, getWinnersCount, Order, Sort } from "../serverRequests/getters";
import { sheetStringRender } from "./sheetString";

export const createSheetStrings = (
  parent: HTMLElement,
  winnersTitle: HTMLElement,
  winnersNextButton: HTMLElement,
  winnersPrevButton: HTMLElement,
  page: number,
  limit: number,
  sort: Sort,
  order: Order
): void => {
  parent.innerHTML = "";
  const handler = async () => {
    const winnersCount = await getWinnersCount();
    winnersTitle.textContent = `Winners (${winnersCount})`;
    if (winnersCount <= page * limit) {
      addAttributes([winnersNextButton, "disabled", "true"]);
    } else {
      removeAttributes([winnersNextButton, "disabled"]);
    }
    if (page * limit <= limit) {
      addAttributes([winnersPrevButton, "disabled", "true"]);
    } else {
      removeAttributes([winnersPrevButton, "disabled"]);
    }
    const winners = await getWinners(page, limit, sort, order);
    winners.forEach((winner) => {
      const winnerHandler = async () => {
        const car = await getCar(winner.id);
        sheetStringRender(parent, winner.id, car.color, car.name, winner.wins, winner.time);
      };
      winnerHandler().then();
    });
  };
  handler().then();
};
