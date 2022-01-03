import { useState } from 'react'
import { Card, Divider, CardContent, Box, TextField, MenuItem, Button } from "@mui/material"
import { IQuestionTypes } from "src/store/States/Survey/survey.types"
import AnswerElement from './answer_element'
import CloseIcon from '@mui/icons-material/CloseRounded';
import { SurveyContentTypes } from 'src/store/States/Survey/survey_content.types';

interface IProps {
  removeQuestion: () => void
  handleQuestionType: (questionType: string) => void
  handleTitleChange: (title: string) => void
  data: any
  error: any
}

export default ({
  removeQuestion, data, handleQuestionType, handleTitleChange, error
}: IProps) => {
  const [questionType, setQuestionType] = useState(data.questionType)

  const handleChange = (event: any) => {
    setQuestionType(event.target.value)
    handleQuestionType(event.target.value)
  }

  return (
    <Card style={{ marginBottom: 25 }}>
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
            <TextField
              id="outlined-select-industry"
              select
              label="Select Question Type"
              defaultValue={data.questionType}
              onChange={handleChange}
              value={data.questionType}
            >
              {Object.values(IQuestionTypes).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <AnswerElement
              error={error}
              questionType={data.questionType}
              title={data.title}
              index={data.idx}
              handleChange={(event: any) => {
                handleTitleChange(event.target.value)
              }}
            />
          </div>
          <div>
            <Button
              aria-label="reduce"
              onClick={() => removeQuestion()}
            >
              <CloseIcon />
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}