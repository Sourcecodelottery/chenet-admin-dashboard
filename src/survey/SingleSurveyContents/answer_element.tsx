import { TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { IQuestionTypes } from "src/store/States/Survey/survey.types"

interface IProp {
  title?: string;
  questionType: string;
  fetchedChoices: any[]
}

const AnswerElement = ({ questionType, title, fetchedChoices }: IProp) => {
  const [choices, setChoices] = useState([
    { idx: 0, value: "Some things" },
    { idx: 1, value: "JK things" },
    { idx: 2, value: "JN things" },
    { idx: 3, value: "LM things" },
  ])

  useEffect(() => {
    if (fetchedChoices.length > 0) {
      setChoices(fetchedChoices.map(choice => ({ idx: Number(choice.id), value: choice.text })))
    }
  }, [fetchedChoices, setChoices])

  const choiceLabels = ['A', 'B', 'C', 'D']

  const getValue = (idx: number) => {
    const index = choices.findIndex(choice => choice.idx === idx)
    return index >= 0 ? choices[index].value : ""
  }

  return questionType === IQuestionTypes.INPUT ? (
    <TextField
      id="outlined-helperText"
      label="Title"
      style={{ width: 420 }}
      value={title}
      disabled
    />
  ) : questionType === IQuestionTypes.MULTIPLE_CHOICE ? (
    <>
      <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
        <TextField
          id="outlined-helperText"
          label="Question"
          style={{ width: 340 }}  
          value={title}
          disabled
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {choices.length <= 2 ?
          choices.map((choice, idx) => (
            <div style={{ display: "flex", alignItems: "center", marginRight: 70 }}>
              <label>{choiceLabels[idx]}</label>
              <TextField
                id="outlined-helperText"
                style={{ width: 320 }}
                value={getValue(choice.idx)}
                disabled
                variant="standard"
              />
            </div>
          )) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div>
                {choices.filter(item => item.idx < 2).map((choice, idx) => (
                  <div style={{ display: "flex", alignItems: "center", marginRight: 70 }}>
                    <label>{choiceLabels[idx]}</label>
                    <TextField
                      id="outlined-helperText"
                      style={{ width: 320 }}
                      value={getValue(choice.idx)}
                      disabled
                      variant="standard"
                    />
                  </div>
                ))}
              </div>
              <div>
                {choices.filter(item => item.idx >= 2).map((choice, idx) => (
                  <div style={{ display: "flex", alignItems: "center", marginRight: 70 }}>
                    <label>{choiceLabels[2 + idx]}</label>
                    <TextField
                      id="outlined-helperText"
                      style={{ width: 320 }}
                      value={getValue(choice.idx)}
                      disabled
                      variant="standard"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </>
  ) : <></>
}

export default AnswerElement