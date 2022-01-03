import { Container, Grid, Card, CardHeader, Divider, CardContent, Box, Button, TextField, MenuItem, CircularProgress } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import PageTitle from "src/components/PageTitle"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import routes from "src/constants/routes"
import { IQuestionTypes, ISurvey } from "src/store/States/Survey/survey.types"
import { IChoice, ISurveyContentDoc, SurveyContentTypes } from "src/store/States/Survey/survey_content.types"
import SurveyContent from "./survey_content"
import { useForm } from "react-hook-form"
import { selectMainSurveyBuffer, selectChoicesBuffer, FetchSurveyContentsBySurveyID, PostSurveyReport } from "src/store/States/Survey"
import { useNavigate, useParams } from "react-router"
import { connect } from "react-redux"
import { ISurveyReportDoc } from "src/store/States/Survey/survey_report.types"

const FillSurvey = ({ mainSurveyBuffer, choicesBuffer }) => {
  const [questions, setQuestions] = useState([{
    title: "",
    questionType: String(IQuestionTypes.INPUT),
    idx: 0
  }])
  const [answers, setAnswers] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState([])

  const onSubmit = () => {
    let _errors: any[] = []
    answers.forEach(answer => {
      let error: any = {}
      if (answer.value === "") {
        error.value = "This field is requried"
      }
      if (Object.values(error).length > 0) {
        _errors.push({ ...error, idx: answer.idx })
      }
    })
    setErrors(_errors)
    if (_errors.length === 0) {
      PostSurveyReport({
        surveyID: params.id,
        ChoiceQASetAnswers: answers.filter(answer => answer.questionType === IQuestionTypes.MULTIPLE_CHOICE)
          .map(answer => ({
            choice: { id: String(answer.value.idx), text: answer.value.value },
            orderNumber: Number(answer.idx)
          })),
        InputQASetAnswers: answers.filter(answer => answer.questionType === IQuestionTypes.INPUT)
          .map(answer => ({
            answerDescription: answer.value,
            orderNumber: Number(answer.idx)
          }))
      }, (error, data: ISurveyReportDoc) => {
        if (error) throw error
        navigate(routes.STATUS.THANK_YOU_PAGE.ROUTE, { replace: true })
      })
    }
  }

  const getError = (idx: number) => {
    const index = errors.findIndex(error => error.idx === idx)
    return index >= 0 ? errors[index] : {}
  }

  const handleAnswerUpdate = (idx: number, questionType: IQuestionTypes, value: any) => {
    setAnswers(
      answers.map(answer => answer.idx === idx? {
        ...answer, questionType, value
      } : answer)
    )
  }

  const params = useParams()
  useEffect(() => {
    FetchSurveyContentsBySurveyID(params.id, (err, data: ISurveyContentDoc) => {
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
      setAnswers(_Questions.map(question => ({ idx: question.idx, value: "", questionType: question.questionType })))
    })
  }, [params, setQuestions, setAnswers])

  return (
    <>
      <Helmet>
        <title>Fill Survey</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Fill Survey Contents"
          subHeading="Fill survey contents dependeing on your opinion."
          noButton={true}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Grid
              direction="row"
              justifyContent="space-between"
              alignItems="stretch"
              display="flex"
            >
              <CardHeader title="Survey Questions" />
            </Grid>
            {questions.map((question) => (
              <SurveyContent
                data={question}
                handleAnswerUpdate={handleAnswerUpdate}
                error={getError(question.idx)}
              />
            ))}
          </Grid>
        </Grid>
        <Card>
          <CardContent>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                sx={{ margin: 1 }} variant="contained" color="primary" type="submit"
                onClick={onSubmit}
              >
                Submit Survey
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  mainSurveyBuffer: selectMainSurveyBuffer(state),
  choicesBuffer: selectChoicesBuffer(state)
})

export default connect(mapStateToProps)(FillSurvey)