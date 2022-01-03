export interface ISurvey {
  _id: string
  title: string
  description: string
  gender: IGender
  demographicDetails: IDemographicDetails
  ageLimit: IAgeLimit
  ownerID: string
  targetingOptions: ITargetingOptions
  admins: string[]
  surveyType: ISurveyType
  consumerUsers: string[]
  consumerLimit: number
  unitCost: number
}

export interface ISurveyInput {
  title: string
  description: string
  gender: IGender
  demographicDetails: IDemographicDetails
  ageLimit: IAgeLimit
  ownerID: string
  targetingOptions: ITargetingOptions
  surveyType: ISurveyType
}

export type DemographyDetailsType = {
  country: string[]
  region: string[]
  zone: string[]
}

export type TargetingOptionsType = {
  education: string[]
  employmentStatus: string[]
  industry: string[]
  martialStatus: string[]
  parentalStatus: string[]
}

export type SurveyInputTypes = {
  title: string
  description: string
  gender: IGender
  demographicDetails: DemographyDetailsType
  ageLimit: IAgeLimit
  ownerID: string
  targetingOptions: TargetingOptionsType
  surveyType: ISurveyType
}

export enum ISurveyType {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
  FOR_SALE = "FOR SALE",
}

export enum IQuestionTypes {
  MULTIPLE_CHOICE = "MULTIPLE CHOICE",
  INPUT = "INPUT",
  RANGE = "RANGE"
}

export enum IGender {
  "MALE" = "MALE",
  "FEMALE" = "FEMALE"
}

export interface IDemographicDetails {
  country: string[]
  region: string[]
  zone: string[]
}

export interface IAgeLimit {
  max: number, min: number
}

export interface ITargetingOptions {
  education: string[]
  employmentStatus: string[]
  industry: string[]
  martialStatus: string[]
  parentalStatus: string[]
}