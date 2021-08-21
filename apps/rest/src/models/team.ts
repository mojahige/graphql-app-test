export interface TeamModel {
  id: number;
  name: string;
  description: string;
  country: string;
}

export type Teams = Array<TeamModel>;
