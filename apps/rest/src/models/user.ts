export interface UserModel {
  id: number;
  name: string;
  email: string;
  teamId: number | null;
}

export type Users = Array<UserModel>;
