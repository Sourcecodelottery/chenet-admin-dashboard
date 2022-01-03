import { useState, useEffect } from 'react'
import { Card, Divider, CardContent, Box, TextField, MenuItem, Button } from "@mui/material"
import { IQuestionTypes } from "src/store/States/Survey/survey.types"
import AnswerElement from './answer_element'
import CloseIcon from '@mui/icons-material/CloseRounded';
import { SurveyContentTypes } from 'src/store/States/Survey/survey_content.types';
import InputAnswerElement from "./input_answer_element"
import ChoiceAnswerElement from "./choice_answer_element"

interface IProps {
  data: any
  answers: any[]
}

export default ({
  data, answers
}: IProps) => {

  const getQuestionAnswers = () => {
    return answers.filter(answer => Number(answer.idx) === Number(data.idx))
  }

  useEffect(() => {
    getQuestionAnswers()
  }, [data, answers])

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Card style={{ marginBottom: 25, width: "45%", marginRight: 80 }}>
        <Divider />
        <CardContent>
          <Box
            component="data"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
          >
            <div aria-label="industry-input">
              <br />
              <AnswerElement
                questionType={data.questionType}
                title={data.title}
                fetchedChoices={data.choices? data.choices : []}
              />
            </div>
          </Box>
        </CardContent>
      </Card>
      <Card style={{ marginBottom: 25, width: "40%" }}>
        <Divider />
        <CardContent>
          <Box
            component="data"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
          >
            <div aria-label="industry-input">
              <br />
              {data.questionType === IQuestionTypes.INPUT ?
                <InputAnswerElement answers={getQuestionAnswers().map(answer => answer.answerText)} /> :
                <ChoiceAnswerElement
                  answers={getQuestionAnswers().map(answer => ({
                    id: Number(answer.choice.id),
                    text: answer.choice.text
                  }))}
                />}
            </div>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}