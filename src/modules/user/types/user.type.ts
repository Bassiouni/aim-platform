export type UserType = {
  id: number;
  email: string;
  name: string;
  isActive: boolean;
} & Express.User;
