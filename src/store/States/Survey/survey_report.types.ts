import { IChoice } from "./survey_content.types";

export interface ChoiceQASetAnswer {
  orderNumber: number
  choice: IChoice
}

export interface InputQASetAnswer {
  orderNumber: number
  answerDescription: string
}

export interface ISurveyReport {
  consumerUsers: string[]
  surveyID: string
  ChoiceQASetAnswers: ChoiceQASetAnswer[]
  InputQASetAnswers: InputQASetAnswer[]
}

export interface ISurveyReportDoc extends ISurveyReport {
  _id: string
  createdAt?: string
  updatedAt?: string
}

export interface ISurveyReportInput {
  consumerUsers: string[]
  surveyID: string
  userID: string
  ChoiceQASetAnswers: ChoiceQASetAnswer[]
  InputQASetAnswers: InputQASetAnswer[]
}