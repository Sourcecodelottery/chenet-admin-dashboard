import { SurveyInputTypes } from "./survey.types"
import { ISurveyContentInput } from './survey_content.types'
import { ChoiceQASetAnswer, InputQASetAnswer } from "./survey_report.types"

export const FetchSurveysBody = () => ({
  query: `{
    fetchSurveys {
      _id
      title
      description
      gender
      demographicDetails {
        country
        region
        zone
      }
      ageLimit {
        max
        min
      }
      ownerID
      surveyType
      consumerUsers
    }
  }`
})

export const AddSurveyTag = "postSurvey"
export const AddSurveyBody = (input: SurveyInputTypes) => ({
  query: `mutation {
    postSurvey(input: {
      title: "${input.title}",
      description: "${input.description}",
      gender: "${input.gender}",
      surveyType: "${input.surveyType}",
      consumerLimit: 10,
      demographicDetails: {
        country: [${input.demographicDetails.country.map(country => `"${country}"`).toLocaleString()}],
        region: [${input.demographicDetails.region.map(region => `"${region}"`).toLocaleString()}],
        zone: [${input.demographicDetails.zone.map(zone => `"${zone}"`).toLocaleString()}],
      },
      ageLimit: {
        max: ${input.ageLimit.max},
        min: ${input.ageLimit.min}
      },
      ownerID: "611aca476033500c226f8dc2",
      targetingOptions: {
        education: [${input.targetingOptions.education.map(country => `"${country}"`).toLocaleString()}],
        employmentStatus: [${input.targetingOptions.employmentStatus.map(country => `"${country}"`).toLocaleString()}],
        industry: [${input.targetingOptions.industry.map(country => `"${country}"`).toLocaleString()}],
        martialStatus: [${input.targetingOptions.martialStatus.map(country => `"${country}"`).toLocaleString()}],
        parentalStatus: [${input.targetingOptions.parentalStatus.map(country => `"${country}"`).toLocaleString()}],
        ethnicity: ["ethnicity"],
        religion: ["religion"]
      }
    }) {
      _id
      title
      description
      gender
      ownerID
      ageLimit {
        max
        min
      }
      demographicDetails {
        country
        region
        zone
      }
      targetingOptions {
        education
        employmentStatus
        industry
        martialStatus
        parentalStatus
        ethnicity
        religion
      }
    }
  }`
})

export const AddSurveyContentTag = "postSurveyContent"
export const AddSurveyContentBody = (input: ISurveyContentInput, surveyID: string) => {
  return {
    query: `mutation ($ChoiceQASetInputs: [ChoiceQASetInput]!, $InputQASetInputs: [InputQASetInput]!) {
      postSurveyContent(input: {
        consumerUsers: [],
        surveyID: "${surveyID}",
        ChoiceQASetInputs: $ChoiceQASetInputs,
        InputQASetInputs: $InputQASetInputs
      }) {
        _id
        consumerUsers
        surveyID
        ChoiceQASetInputs {
          questionDescription
          questionType
          orderNumber
          choices {
            id
            text
          }
        }
        InputQASetInputs {
          questionDescription
          questionType
          orderNumber
        }
        createdAt
        updatedAt
      }
    }`,
    variables: {
      ChoiceQASetInputs: input.ChoiceQASetInputs,
      InputQASetInputs: input.InputQASetInputs
    }
  }
}

export const FetchOneSurveyBodyTag = "fetchSurveyByID"
export const FetchOneSurveyBody = (_id: string) => ({
  query: `{
    fetchSurveyByID(_id: "${_id}") {
      _id
      title
      description
      gender
      demographicDetails {
        country
        region
        zone
      }
      ageLimit {
        max
        min
      }
      ownerID
      targetingOptions {
        education
        employmentStatus
        industry
        martialStatus
        parentalStatus
      }
      surveyType
      createdAt
      updatedAt
    }
  }`
})

export const FetchOneSurveyContentsBodyTag = "fetchSurveyContentByID"
export const FetchOneSurveyContentsBody = (_id: string) => ({
  query: `{
    fetchSurveyContentByID(_id: "${_id}") {
      _id
      surveyID
      ChoiceQASetInputs {
        questionDescription
        questionType
        orderNumber
        choices {
          id
          text
        }
      }
      InputQASetInputs {
        questionDescription
        questionType
        orderNumber
      }
      createdAt
      updatedAt
    }
  }`
})

export const FetchSurveyContentsBySurveyIDBodyTag = "fetchSurveyContentBySurveyID"
export const FetchSurveyContentsBySurveyIDBody = (_id: string) => ({
  query: `{
    fetchSurveyContentBySurveyID(_id: "${_id}") {
      _id
      surveyID
      ChoiceQASetInputs {
        questionDescription
        questionType
        orderNumber
        choices {
          id
          text
        }
      }
      InputQASetInputs {
        questionDescription
        questionType
        orderNumber
      }
      createdAt
      updatedAt
    }
  }`
})

export const FetchSurveyReportsBySurveyIDBodyTag = "fetchSurveyReportBySurveyID"
export const FetchSurveyReportsBySurveyIDBody = (_id: string) => ({
  query: `{
    fetchSurveyReportBySurveyID(_id: "${_id}") {
      _id
      consumerUsers
      surveyID
      userID
      ChoiceQASetAnswers {
        orderNumber
        choice {
          id
          text
        }
      }
      InputQASetAnswers {
        orderNumber
        answerDescription
      }
    }
  }`
})

export const PostSurveyReportBodyTag = "postSurveyReport"
export const PostSurveyReportBody = (surveyID: string, ChoiceQASetAnswers: ChoiceQASetAnswer[], InputQASetAnswers: InputQASetAnswer[]) => ({
  query: `mutation ($ChoiceQASetAnswers: [ChoiceQASetAnswerInput]!, $InputQASetAnswers: [InputQASetAnswerInput]!) {
    postSurveyReport(input: {
      userID: "6143c2b7e832ca41a08dd902"
      consumerUsers: [],
      surveyID: "${surveyID}",
      ChoiceQASetAnswers: $ChoiceQASetAnswers,
      InputQASetAnswers: $InputQASetAnswers
    }) {
      _id
      consumerUsers
      surveyID
      ChoiceQASetAnswers {
        orderNumber
        choice {
          id
          text
        }
      }
      InputQASetAnswers {
        orderNumber
        answerDescription
      }
      error {
        type
        message
      }
      createdAt
      updatedAt
    }
  }`,
  variables: {
    ChoiceQASetAnswers, InputQASetAnswers
  }
})