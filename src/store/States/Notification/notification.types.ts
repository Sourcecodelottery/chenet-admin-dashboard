import { IAccountSimple } from "../Account/account.types";

export interface INotificationSimple {
  _id: string;
  content: IContent
  targeted_users: string[],
  sender: string,
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INotificationDoc {
  _id: string;
  content: IContent
  targeted_users: string[],
  sender: IAccountSimple,
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContent {
  title: string,
  description: string,
  images: any[]
}

export interface INotificationInput {
  content: IContent
  targeted_users: string[],
}