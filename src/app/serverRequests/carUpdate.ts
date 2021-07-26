import { Car } from "./getters";

export const carUpdate = async (id: number, name: string, color: string): Promise<Car> => {
  const body = { name, color };
  const url = "http://127.0.0.1:3000";
  const response = await fetch(`${url}/garage/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const newCar = await response.json();
  return newCar;
};
