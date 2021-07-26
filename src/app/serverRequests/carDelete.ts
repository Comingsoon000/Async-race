import { Car } from "./getters";

export const carDelete = async (id: number): Promise<Car> => {
  const url = "http://127.0.0.1:3000";
  const response = await fetch(`${url}/garage/${id}`, {
    method: "DELETE",
  });
  const car = await response.json();
  return car;
};
