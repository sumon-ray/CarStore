// car.service.ts
// import Car from './car.model';
import { ICar } from './car.interface';
import { Car } from './car.model';

class CarService {
  // Create a new car
  async createCar(carData: ICar): Promise<ICar> {
    const car = new Car(carData);
    await car.save();
    return car;
  }

  // Get all cars
  async getAllCars(): Promise<ICar[]> {
    return await Car.find();
  }

  // Get car by ID
  async getCarById(carId: string): Promise<ICar | null> {
    return await Car.findById(carId);
  }

  // Update a car
  async updateCar(carId: string, updateData: Partial<ICar>): Promise<ICar | null> {
    return await Car.findByIdAndUpdate(carId, updateData, { new: true });
  }

  // Delete a car
  async deleteCar(carId: string): Promise<ICar | null> {
    return await Car.findByIdAndDelete(carId);
  }
}

export default new CarService();
