import { ViewAngle, ViewMode } from '../../enums/common.enum';
import { Muscle } from './muscle.interface';

export interface BodyDiagram {
  id: number;
  path: string;
  viewMode: ViewMode;
  viewAngle: ViewAngle;
  muscles : Muscle[];
  createdAt?: Date;
  updatedAt?: Date;
}
