import { ExerciseValueCounter } from './../../enums/valueCounter.enum';
export interface ValueCounter {
  id: number;
  name: ExerciseValueCounter
  description?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
