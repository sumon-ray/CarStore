// car.controller.ts
import { Request, Response } from 'express';
import CarService from './car.service';
import { ICar } from './car.interface';

// Controller for creating a car
export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const carData: ICar = req.body;
    console.log(carData)
    const car = await CarService.createCar(carData);
    res.status(201).json(car);
    console.log(car)
  } catch (error) {
    res.status(400).json({ message: 'Error creating car', error });
  }
};

// Controller for getting all cars
export const getAllCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars = await CarService.getAllCars();
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching cars', error });
  }
};

// Controller for getting a car by ID
export const getCarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await CarService.getCarById(req.params.id);
    if (!car) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching car', error });
  }
};

// Controller for updating a car
export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await CarService.updateCar(req.params.id, req.body);
    if (!car) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ message: 'Error updating car', error });
  }
};

// Controller for deleting a car
export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await CarService.deleteCar(req.params.id);
    if (!car) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting car', error });
  }
};
