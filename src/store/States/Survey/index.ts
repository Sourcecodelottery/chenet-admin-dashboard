import Axios from "axios"
import { _ } from "numeral"
import endPoints from "../../../constants/endPoints"
import {
  FetchSurveysBody, AddSurveyBody, AddSurveyTag, AddSurveyContentTag, AddSurveyContentBody, FetchOneSurveyBody,
  FetchOneSurveyBodyTag, FetchOneSurveyContentsBody, FetchOneSurveyContentsBodyTag, FetchSurveyContentsBySurveyIDBody,
  FetchSurveyContentsBySurveyIDBodyTag,
  FetchSurveyReportsBySurveyIDBody,
  FetchSurveyReportsBySurveyIDBodyTag,
  PostSurveyReportBody,
  PostSurveyReportBodyTag
} from "./queries"
import { SurveyInputTypes } from "./survey.types"
import { ISurveyContentInput } from "./survey_content.types"
import { ChoiceQASetAnswer, InputQASetAnswer } from "./survey_report.types"

export const stateName = "survey_buffer"

const initialState = {
  surveys: [],
  mainSurveyBuffer: {},
  choices: {},
  selectedSurvey: "",
  selectedSurveyContent: ""
}

export const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_SURVEYS: {
      return { ...state, surveys: action.payload }
    }

    case constants.SAVE_MAIN_SURVEY_BUFFER: {
      return { ...state, mainSurveyBuffer: action.payload }
    }

    case constants.UPDATE_CHOICES: {
      return { ...state, choices: action.payload }
    }

    case constants.UPDATE_SELECTED_SURVEY: {
      return { ...state, selectedSurvey: action.payload }
    }

    case constants.UPDATE_SELECTED_SURVEY_CONTENTS: {
      return { ...state, selectedSurveyContent: action.payload }
    }

    default: return state
  }
}

export const selectMainSurveyBuffer = (state: any) => state.entities[stateName].mainSurveyBuffer

export const selectChoicesBuffer = (state: any) => state.entities[stateName].choices

export const selectSelectedSurvey = (state: any) => state.entities[stateName].selectedSurvey

export const selectSelectedSurveyContent = (state: any) => state.entities[stateName].selectedSurveyContent

export const Actions = {
  saveMainSurveyBuffer (payload: any) {
    return { type: constants.SAVE_MAIN_SURVEY_BUFFER, payload }
  },
  saveChoicesBuffer (payload: any) {
    return { type: constants.UPDATE_CHOICES, payload }
  },
  saveSelectedSurvey (payload: string) {
    return { type: constants.UPDATE_SELECTED_SURVEY, payload }
  },
  saveSelectedSurveyContents (payload: string) {
    return { type: constants.UPDATE_SELECTED_SURVEY_CONTENTS, payload }
  }
}

export const constants = {
  "FETCH_SURVEYS": "FETCH_SURVEYS",
  "SAVE_MAIN_SURVEY_BUFFER": "SAVE_MAIN_SURVEY_BUFFER",
  "UPDATE_CHOICES": "UPDATE_CHOICES",
  "UPDATE_SELECTED_SURVEY": "UPDATE_SELECTED_SURVEY",
  "UPDATE_SELECTED_SURVEY_CONTENTS": "UPDATE_SELECTED_SURVEY_CONTENTS",
}

export const FetchSurveysTag = "fetchSurveys"

export const FetchSurveys = (_: any, callback = (err: any, data: any, headers) => null) => {
  Axios.post(endPoints.surveyURL, FetchSurveysBody())
    .then(res => {
      if (res.data.data[FetchSurveysTag].error) {
        callback(res.data.data[FetchSurveysTag].error, null, null)
      } else {
        callback(null, res.data.data[FetchSurveysTag], res)
      }
    })
    .catch(err => console.log("Error", err))
}

export const AddSurvey = (input: SurveyInputTypes, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.surveyURL, AddSurveyBody(input))
    .then(res => {
      if (res.data.data[AddSurveyTag].error) {
        callback(res.data.data[AddSurveyTag].error, null)
      } else {
        callback(null, res.data.data[AddSurveyTag])
      }
    })
    .catch(err => console.log("Error", err))
}

export const AddSurveyContent = ({input, surveyID}: { input: ISurveyContentInput, surveyID: string }, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.surveyURL, AddSurveyContentBody(input, surveyID))
    .then(res => {
      if (res.data.data[AddSurveyContentTag].error) {
        callback(res.data.data[AddSurveyContentTag].error, null)
      } else {
        callback(null, res.data.data[AddSurveyContentTag])
      }
    })
    .catch(err => console.log("Error", err))
}

export const FetchOneSurvey = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.surveyURL, FetchOneSurveyBody(_id))
    .then(res => {
      if (res.data.data[FetchOneSurveyBodyTag].error) {
        callback(res.data.data[FetchOneSurveyBodyTag].error, null)
      } else {
        callback(null, res.data.data[FetchOneSurveyBodyTag])
      }
    })
    .catch(err => console.log("Error", err))
}

export const FetchOneSurveyContents = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.surveyURL, FetchOneSurveyContentsBody(_id))
    .then(res => {
      if (res.data.data[FetchOneSurveyContentsBodyTag].error) {
        callback(res.data.data[FetchOneSurveyContentsBodyTag].error, null)
      } else {
        callback(null, res.data.data[FetchOneSurveyContentsBodyTag])
      }
    })
    .catch(err => console.log("Error", err))
}

export const FetchSurveyContentsBySurveyID = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.surveyURL, FetchSurveyContentsBySurveyIDBody(_id))
    .then(res => {
      if (res.data.data[FetchSurveyContentsBySurveyIDBodyTag].error) {
        callback(res.data.data[FetchSurveyContentsBySurveyIDBodyTag].error, null)
      } else {
        callback(null, res.data.data[FetchSurveyContentsBySurveyIDBodyTag])
      }
    })
    .catch(err => console.log("Error", err))
}

export const FetchSurveyReportsBySurveyID = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.surveyURL, FetchSurveyReportsBySurveyIDBody(_id))
    .then(res => {
      if (res.data.data[FetchSurveyReportsBySurveyIDBodyTag].error) {
        callback(res.data.data[FetchSurveyReportsBySurveyIDBodyTag].error, null)
      } else {
        callback(null, res.data.data[FetchSurveyReportsBySurveyIDBodyTag])
      }
    })
    .catch(err => console.log("Error", err))
}

export const PostSurveyReport = (input: {
  surveyID: string,
  ChoiceQASetAnswers: ChoiceQASetAnswer[]
  InputQASetAnswers: InputQASetAnswer[]
}, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.surveyURL, PostSurveyReportBody(input.surveyID, input.ChoiceQASetAnswers, input.InputQASetAnswers))
    .then(res => {
      if (res.data.data[PostSurveyReportBodyTag].error) {
        callback(res.data.data[PostSurveyReportBodyTag].error, null)
      } else {
        callback(null, res.data.data[PostSurveyReportBodyTag])
      }
    })
    .catch(err => console.log("Error", err))
}