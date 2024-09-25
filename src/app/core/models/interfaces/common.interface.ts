import { AlertStatus } from "../../enums/common.enum";

export interface User{
  id?: number;
  username: string;
  email?: string;
  roles?: Array<string>;
  password?: string;
}

export interface LoginResponse{
  accessToken?: string;
  refreshToken?: string;
  user_id?: string;
}

export interface MusclePath{
  name: string;
  d: string;
  selected: boolean;
  partOf?: string;
  side?: "left"|"right";
}

export interface MusclePathGroup{
  groupName: string;
  selected: boolean;
  groupSide?: string;
  muscles: MusclePath[];
}

export interface Alert {
  title ?: string;
  description?: string;
  alertStatus?: AlertStatus,
  show: boolean;
}
