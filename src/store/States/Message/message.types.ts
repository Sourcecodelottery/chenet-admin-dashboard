export interface IMessage {
  _id: string;
  content: IContent
  targetingOptions: IMessageTargetingOptions
  phoneNumbers: string[]
  sender: string,
  channel_type: string,
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContent {
  title: string,
  description: string,
}

export interface IMessageInput {
  content: IContent
  targetingOptions: IMessageTargetingOptions
  phoneNumbers: string[]
}

export interface IMessageTargetingOptions {
  age: number
  group: string
  sex: string
  location: string
}