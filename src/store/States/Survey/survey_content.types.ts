import { IQuestionTypes } from "./survey.types";

export interface ISurveyContentInput {
  ChoiceQASetInputs: IChoiceQAInput[];
  InputQASetInputs: InputQAInput[];
}

export interface ISurveyContentDoc extends ISurveyContentInput {
  _id: string
}

export type SurveyContentTypes = {
  ChoiceQASetInputs: TypeChoiceQA[];
  InputQASetInputs: TypeInputQA[];
}

export type TypeInputQA = {
  questionDescription: string;
  questionType: IQuestionTypes.INPUT;
  orderNumber: number;
}

export type TypeChoiceQA = {
  questionDescription: string
  questionType: IQuestionTypes.MULTIPLE_CHOICE
  orderNumber: number
  choices: IChoice[]
}

export interface IChoiceQAInput {
  questionDescription: string
  questionType: IQuestionTypes.MULTIPLE_CHOICE
  orderNumber: number
  choices: IChoice[]
}

export interface InputQAInput {
  questionDescription: string;
  questionType: IQuestionTypes.INPUT;
  orderNumber: number;
}

export interface IChoice {
  id: string;
  text: string;
}