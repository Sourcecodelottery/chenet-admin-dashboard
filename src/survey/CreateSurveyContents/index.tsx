import { Container, Grid, Card, CardHeader, Divider, CardContent, Box, Button, TextField, MenuItem } from "@mui/material"
import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import PageTitle from "src/components/PageTitle"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import routes from "src/constants/routes"
import { IQuestionTypes, ISurvey } from "src/store/States/Survey/survey.types"
import { IChoice, ISurveyContentDoc, SurveyContentTypes } from "src/store/States/Survey/survey_content.types"
import SurveyContent from "./survey_content"
import { useForm } from "react-hook-form"
import { CircularProgress } from "@mui/material"
import { AddSurvey, AddSurveyContent, selectMainSurveyBuffer, selectChoicesBuffer } from "src/store/States/Survey"
import { useNavigate } from "react-router"
import { connect } from "react-redux"

const CreateSurveyContents = ({ mainSurveyBuffer, choicesBuffer }) => {
  const [questions, setQuestions] = useState([{
    title: "",
    questionType: String(IQuestionTypes.INPUT),
    idx: 0
  }])
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState([])

  const { register: registerForm, handleSubmit: handleSurveyContentsSubmit, formState: { errors: formErrors }, control } = useForm<SurveyContentTypes>();

  const removeQuestion = (idx: number) => {
    const response = questions.map(question => {
      return question.idx === idx ? false : question
    })
    if (questions.length > 1) {
      setQuestions(response.filter(value => Boolean(value)) as any)
    }
  }

  const handleQuestionType = (idx: number, questionType: string) => {
    setQuestions(
      questions.map((question, _) => {
        return idx === question.idx ? { ...question, questionType } : question
      })
    )
  }

  const handleTitleChange = (idx: number, title: string) => {
    setQuestions(
      questions.map((question, _) => {
        return idx === question.idx ? { ...question, title } : question
      })
    )
  }

  const getChoices = (idx: number): IChoice[] => {
    const foundChoices = choicesBuffer[idx] as any[]
    return foundChoices? foundChoices.map(choice => {
      return {
        id: String(choice.idx),
        text: choice.value
      }
    }) : []
  }

  const onSubmit = (data: any) => {
    let _errors: any[] = []
    questions.forEach(question => {
      let error: any = {}
      if (!question.questionType) {
        error.questionType = "Question type is requried"
      }
      if (!question.title) {
        error.title = "Question is required"
      }
      if (Object.values(error).length > 0) {
        _errors.push({ ...error, idx: question.idx })
      }
    })

    console.log("err", _errors)
    if (_errors.length === 0) {
      setIsLoading(true)
      AddSurvey({
        ageLimit: {
          max: mainSurveyBuffer.ageLimit.max,
          min: mainSurveyBuffer.ageLimit.min,
        },
        demographicDetails: {
          country: mainSurveyBuffer.demographicDetails.country,
          region: mainSurveyBuffer.demographicDetails.region,
          zone: mainSurveyBuffer.demographicDetails.zone,
        },
        targetingOptions: {
          education: mainSurveyBuffer.targetingOptions.education,
          employmentStatus: mainSurveyBuffer.targetingOptions.employmentStatus,
          industry: mainSurveyBuffer.targetingOptions.industry,
          martialStatus: mainSurveyBuffer.targetingOptions.martialStatus,
          parentalStatus: mainSurveyBuffer.targetingOptions.parentalStatus,
        },
        description: mainSurveyBuffer.description,
        gender: mainSurveyBuffer.gender,
        ownerID: "611aca476033500c226f8dc2",
        surveyType: mainSurveyBuffer.surveyType,
        title: mainSurveyBuffer.title
      }, (err, data: ISurvey) => {
        if (err) throw err
        AddSurveyContent({
          surveyID: data._id,
          input: {
            ChoiceQASetInputs: questions.filter(question => question.questionType === IQuestionTypes.MULTIPLE_CHOICE)
              .map(question => ({
                  questionDescription: question.title,
                  questionType: IQuestionTypes.MULTIPLE_CHOICE,
                  orderNumber: question.idx,
                  choices: getChoices(question.idx)
              })),
              InputQASetInputs: questions.filter(question => question.questionType === IQuestionTypes.INPUT)
                .map(question => ({
                  orderNumber: question.idx,
                  questionDescription: question.title,
                  questionType: IQuestionTypes.INPUT
                }))
          }
        }, (err1, data1: ISurveyContentDoc) => {
          if (err1) throw err1
          setIsLoading(false)
          navigate(routes.SURVEY.HOMEPAGE.ROUTE, { replace: true })
        })
      })
    }
  
    setErrors(_errors)
  }

  const getError = (idx: number) => {
    const index = errors.findIndex(error => error.idx === idx)
    return index >= 0? errors[index] : {}
  }

  return (
    <>
      <Helmet>
        <title>Create Survey</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Create Survey Contents"
          subHeading="Create survey contents dependeing on your research."
          noButton={true}
        />
      </PageTitleWrapper>
      <form onSubmit={handleSurveyContentsSubmit(onSubmit)}>
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
                <div>
                  <Button
                    sx={{ margin: 1 }} variant="contained" color="primary" type="button"
                    onClick={() => setQuestions(questions.concat({
                      questionType: IQuestionTypes.INPUT,
                      title: "",
                      idx: questions.length
                    }))}
                    disabled={isLoading}
                  >
                    Add Survey Question
                  </Button>
                  <Button
                    sx={{ margin: 1 }} variant="contained" color="secondary" type="submit"
                    // onClick={() => handleSurveyContentsSubmit(onSubmit)}
                  >
                    {isLoading? <CircularProgress /> : "Post Survey"}
                  </Button>
                </div>
              </Grid>
              {questions.map((question) => (
                <SurveyContent
                  data={question}
                  removeQuestion={() => {
                    removeQuestion(question.idx)
                  }}
                  error={getError(question.idx)}
                  handleQuestionType={(questionType: string) => handleQuestionType(question.idx, questionType)}
                  handleTitleChange={(title: string) => {
                    handleTitleChange(question.idx, title)
                  }} />
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
  choicesBuffer: selectChoicesBuffer(state)
})

export default connect(mapStateToProps)(CreateSurveyContents)