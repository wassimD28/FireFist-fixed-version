import { Path } from "./path.interface";

export interface Muscle {
  id?: number;
  name: string;
  description?: string;
  image?: string;
  partOf?: string;
  paths?: Path[];
  createdAt?: Date;
  updatedAt?: Date;
}
