import { Winner } from "./getters";

export const winnerUpdate = async (id: number, wins: number, time: number): Promise<Winner> => {
  const body = { wins, time };
  const url = "http://127.0.0.1:3000";
  const response = await fetch(`${url}/winners/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const newWinner = await response.json();
  return newWinner;
};
