import { Winner } from "./getters";

export const winnerDelete = async (id: number): Promise<Winner> => {
  const url = "http://127.0.0.1:3000";
  const response = await fetch(`${url}/winners/${id}`, {
    method: "DELETE",
  });
  const winner = await response.json();
  return winner;
};
