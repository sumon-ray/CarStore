// car.route.ts
import { Router } from 'express';
import {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar
} from './car.controller';

const router = Router();

// Route for creating a new car
router.post('/create', createCar);

// Route for getting all cars
router.get('/all-cars', getAllCars);

// Route for getting a car by ID
router.get('/:id', getCarById);

// Route for updating a car by ID
router.put('/update/:id', updateCar);

// Route for deleting a car by ID
router.delete('/delete/:id', deleteCar);

export const CarRouter = router;

