import { PressureLevel } from '../../enums/common.enum';
import { Muscle } from './muscle.interface';

export interface TargetedMuscle extends Muscle {
  pressureLevel: PressureLevel;
}

export interface TargetedMusclePayload {
  muscle_id:  string;
  pressureLevel: PressureLevel;
}
