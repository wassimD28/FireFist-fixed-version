import { ExerciseCategory } from "../../enums/exerciseCategory.enum";

export interface Category {
  id?: number;
  name: ExerciseCategory;
  description?: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
