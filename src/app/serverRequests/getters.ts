export type Car = {
  name: string;
  color: string;
  id: number;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type Sort = "id" | "wins" | "time";
export type Order = "ASC" | "DESC";

const url = "http://127.0.0.1:3000";

export const getCars = async (page: number): Promise<Car[]> => {
  const garageLimit = 7;
  const response = await fetch(`${url}/garage?_page=${page}&_limit=${garageLimit}`);
  const cars = await response.json();
  return cars;
};

export const getCarsCount = async (): Promise<number> => {
  const response = await fetch(`${url}/garage?_limit=1`);
  const count = Number(response.headers.get("X-Total-Count"));
  return count;
};

export const getCar = async (id: number): Promise<Car> => {
  const response = await fetch(`${url}/garage/${id}`);
  const car = await response.json();
  return car;
};

export const engineControl = async (id: number, status: string): Promise<{ velocity: number; distance: number }> => {
  const response = await fetch(`${url}/engine/?id=${id}&status=${status}`);
  const engine = await response.json();
  return engine;
};

export const drive = async (id: number): Promise<{ success: boolean }> => {
  const response = await fetch(`${url}/engine/?id=${id}&status=drive`);
  const carDrive = await response.json();
  return carDrive;
};

export const getAllWinners = async (): Promise<Winner[]> => {
  const response = await fetch(`${url}/winners`);
  const winners = await response.json();
  return winners;
};

export const getWinners = async (page: number, limit: number, sort: Sort, order: Order): Promise<Winner[]> => {
  const response = await fetch(`${url}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  const winners = await response.json();
  return winners;
};

export const getWinnersCount = async (): Promise<number> => {
  const pageLimit = 10;
  const response = await fetch(`${url}/winners?_limit=${pageLimit}`);
  const count = Number(response.headers.get("X-Total-Count"));
  return count;
};

export const getWinner = async (id: number): Promise<Winner> => {
  const response = await fetch(`${url}/winners/${id}`);
  const winner = await response.json();
  return winner;
};
