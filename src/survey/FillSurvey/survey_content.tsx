import { Card, Divider, CardContent, Box } from "@mui/material"
import { IQuestionTypes } from "src/store/States/Survey/survey.types"
import AnswerElement from './answer_element'

interface IProps {
  data: any
  handleAnswerUpdate: (idx: number, questionType: IQuestionTypes, value: any) => void
  error: any
}

export default ({
  data, handleAnswerUpdate, error
}: IProps) => {
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
            <br />
            <AnswerElement
              idx={data.idx}
              questionType={data.questionType}
              title={data.title}
              fetchedChoices={data.choices? data.choices : []}
              handleAnswerUpdate={handleAnswerUpdate}
              error={error}
            />
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}