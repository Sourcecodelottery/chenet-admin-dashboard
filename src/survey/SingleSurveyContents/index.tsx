import { Container, Grid, CardHeader } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import PageTitle from "src/components/PageTitle"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import { IQuestionTypes } from "src/store/States/Survey/survey.types"
import { ISurveyContentDoc } from "src/store/States/Survey/survey_content.types"
import SurveyContent from "./survey_content"
import {
  FetchSurveyContentsBySurveyID, selectMainSurveyBuffer, selectChoicesBuffer, selectSelectedSurvey,
  FetchSurveyReportsBySurveyID
} from "src/store/States/Survey"
import { connect } from "react-redux"
import { ISurveyReportDoc } from "src/store/States/Survey/survey_report.types"

const SurveyContents = ({ selectedSurvey, choicesBuffer }) => {
  const [questions, setQuestions] = useState([{
    title: "",
    questionType: String(IQuestionTypes.INPUT),
    idx: 0
  }])

  const [answers, setAnswers] = useState([])

  useEffect(() => {
    FetchSurveyReportsBySurveyID(selectedSurvey, (err: any, data: ISurveyReportDoc[]) => {
      if (err) throw err
      let _Answers: any[] = []
      data.forEach(report => {
        report.ChoiceQASetAnswers.forEach(answer => {
          _Answers.push({
            questionType: IQuestionTypes.MULTIPLE_CHOICE,
            choice: answer.choice,
            answerText: "",
            idx: Number(answer.orderNumber)
          })
        })
        report.InputQASetAnswers.forEach(answer => {
          _Answers.push({
            questionType: IQuestionTypes.INPUT,
            choice: {},
            idx: Number(answer.orderNumber),
            answerText: answer.answerDescription
          })
        })
      })
      setAnswers(_Answers)
    })
  }, [selectedSurvey, setAnswers])

  useEffect(() => {
    FetchSurveyContentsBySurveyID(selectedSurvey, (err: any, data: ISurveyContentDoc) => {
      if (err) throw err
      let _Questions: any[] = []
      data.ChoiceQASetInputs.forEach(choiceQA => {
        _Questions.push({
          title: choiceQA.questionDescription,
          questionType: IQuestionTypes.MULTIPLE_CHOICE,
          idx: choiceQA.orderNumber,
          choices: choiceQA.choices
        })
      })
      data.InputQASetInputs.forEach(inputQA => {
        _Questions.push({
          title: inputQA.questionDescription,
          questionType: IQuestionTypes.INPUT,
          idx: inputQA.orderNumber,
          choices: []
        })
      })
      _Questions.sort((question1: any, question2: any) => question1.idx - question2.idx)
      setQuestions(_Questions)
    })
  }, [setQuestions])

  return (
    <>
      <Helmet>
        <title>Survey Contents</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Survey Contents"
          subHeading="Survey contents dependeing on your opinions."
          noButton={true}
        />
      </PageTitleWrapper>
      <form>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              {/* <Card> */}
              <Grid
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
                display="flex"
              // style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <CardHeader title="Survey Questions" />
              </Grid>
              {questions.map((question) => (
                <SurveyContent
                  data={question}
                  answers={answers}
                />
              ))}
            </Grid>
          </Grid>
        </Container>
      </form>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  mainSurveyBuffer: selectMainSurveyBuffer(state),
  choicesBuffer: selectChoicesBuffer(state),
  selectedSurvey: selectSelectedSurvey(state)
})

export default connect(mapStateToProps)(SurveyContents)