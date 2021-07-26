import { carCreate } from "../serverRequests/carCreate";

const autoBrands1 = ["Fiat", "Jaguar", "BYD", "Changan", "Chery", "CheryExeed", "DongFeng", "FAW", "Foton", "GAC"];
const autoBrands2 = ["Smart", "Volvo", "ZAZ", "Brilliance", "Geely", "Great Wall", "Haima", "Haval", "JAC", "Lifan"];
const autoBrands3 = ["Audi", "BMW", "Honda", "Hyundai", "Kia", "Lada", "Mazda", "Mercedes", "Renault", "Skoda"];
const autoBrands4 = ["Toyota", "Volkswagen", "Acura", "Daihatsu", "Datsun", "Infiniti", "Isuzu", "Lexus", "Opel"];
const autoBrands5 = ["Porsche", "Daewoo", "Genesis", "SsangYong", "Alfa Romeo", "Aston Martin", "Bentley", "Bugatti"];
const autoBrands6 = ["Citroen", "Ferrari", "Mitsubishi", "Nissan", "Scion", "Subaru", "Suzuki", "Buick", "Cadillac"];
const autoBrands7 = ["Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "Hummer", "Jeep", "Lincoln", "Mercury", "Volga"];
const autoBrands8 = ["Oldsmobile", "Pontiac", "Tesla", "Aurus", "GAZ", "Lamborghini", "Lancia", "Land Rover"];
const autoBrands9 = ["Maserati", "Maybach", "Mini", "Peugeot", "Ravon", "Rolls-Royce", "Rover", "Saab", "SEAT"];
const autoBrands10 = ["Zotye", "Luxgen", "Moskvich", "Uaz", "Togaz", "Cord ", "Triumph Stag", "Chaika", "Pobeda"];
const allAutoBrands = [
  ...autoBrands1,
  ...autoBrands2,
  ...autoBrands3,
  ...autoBrands4,
  ...autoBrands5,
  ...autoBrands6,
  ...autoBrands7,
  ...autoBrands8,
  ...autoBrands9,
  ...autoBrands10,
];

export const generateCars = (): void => {
  for (let i = 0; i < 100; i += 1) {
    const ramdomIndex = Math.floor(Math.random() * allAutoBrands.length);
    const randomNumber = Math.floor(Math.random() * 100);
    const name = `${allAutoBrands[ramdomIndex]} ${randomNumber}`;
    const color = `#${Math.random().toString(16).slice(3, 9)}`;
    const carCreateHandler = async () => {
      await carCreate(name, color);
    };
    carCreateHandler().then();
  }
};
