import { IAccountSimple } from "../Account/account.types";

export interface INewsSimple {
  _id: string;
  content: IContent
  targetingOptions: ITargetingOptions,
  sender: string,
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INewsDoc {
  _id: string;
  content: IContent
  targetingOptions: ITargetingOptions,
  sender: IAccountSimple,
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContent {
  title: string,
  description: string,
}

export interface INewsInput {
  content: IContent
  targetingOptions: ITargetingOptions,
}

export interface ITargetingOptions {
  min_age: number
  max_age: number
  sex: string[]
  location: string
  // mlData?: any
  isForAll: boolean
}