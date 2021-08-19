export interface UserModel {
  id: number;
  name: string;
  nickname: string;
  email: string;
}

export type Users = Array<UserModel>
