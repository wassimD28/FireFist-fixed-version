import { ExerciseDifficulty } from "../../enums/exerciseDifficulty.enum";

export interface Difficulty{
  id: number;
  name : ExerciseDifficulty;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
