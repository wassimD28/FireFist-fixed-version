import { ExerciseCategory } from "../../enums/exerciseCategory.enum";
import { ExerciseDifficulty } from "../../enums/exerciseDifficulty.enum";
import { ExerciseValueCounter } from "../../enums/valueCounter.enum";
import { Category } from "./category.interface";
import { Difficulty } from "./difficulty.interface";
import { Equipment } from "./equipment.interface";
import { TargetedMuscle } from "./targetedMuscle.interface";
import { ValueCounter } from "./valueCounter.interface";

export interface Exercise {
  id: number;
  name: string;
  description: string;
  image: string;
  category: ExerciseCategory;
  valueCounter?: ValueCounter;
  equipment?: Equipment;
  difficulty : ExerciseDifficulty;
  targetedMuscles: TargetedMuscle[];
  createdAt?: Date;
  updatedAt?: Date;
}
