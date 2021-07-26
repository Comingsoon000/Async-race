import { getAllWinners } from "../serverRequests/getters";
import { winnerCreate } from "../serverRequests/winnerCreate";
import { winnerUpdate } from "../serverRequests/winnerUpdate";

export const addWinner = (id: number, time: number): void => {
  const addWinnerHandler = async () => {
    let winsCounter: number;
    let newTime: number;
    const winners = await getAllWinners();
    const winner = winners.find((car) => car.id === id);
    if (winner) {
      winsCounter = winner.wins + 1;
      newTime = time > winner.time ? winner.time : time;
      await winnerUpdate(id, winsCounter, newTime);
    } else {
      winsCounter = 1;
      await winnerCreate(id, winsCounter, time);
    }
  };
  addWinnerHandler();
};
