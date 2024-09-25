import { ViewAngle, ViewMode } from './../../enums/common.enum';
import { Side } from "../../enums/common.enum";

export interface Path {
  id: number;
  name: string;
  side: Side;
  path: string;
  viewMode?: string;
  ViewAngle?: ViewAngle;
  selected?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
