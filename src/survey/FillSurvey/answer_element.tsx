import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { IQuestionTypes } from "src/store/States/Survey/survey.types"

interface IProp {
  title?: string;
  questionType: string;
  fetchedChoices: any[];
  idx: number;
  handleAnswerUpdate: (idx: number, questionType: IQuestionTypes, value: any) => void
  error: any
}

const AnswerElement = ({ questionType, title, fetchedChoices, handleAnswerUpdate, idx: questionIdx, error }: IProp) => {
  const [choices, setChoices] = useState([
    { idx: 0, value: "Some things" },
    { idx: 1, value: "JK things" },
    { idx: 2, value: "JN things" },
    { idx: 3, value: "LM things" },
  ])
  const [choiceValues, setChoiceValues] = useState([])

  useEffect(() => {
    if (fetchedChoices.length > 0) {
      setChoices(fetchedChoices.map(choice => ({ idx: Number(choice.id), value: choice.text })))
      setChoiceValues(fetchedChoices.map(() => false))
    }
  }, [fetchedChoices, setChoices, setChoiceValues])

  const handleChoice = (idx: number) => {
    let newValues = choiceValues.map((_, _idx) => _idx === idx)
    setChoiceValues(newValues)
    handleAnswerUpdate(questionIdx, IQuestionTypes.MULTIPLE_CHOICE, choices[idx])
  }

  const choiceLabels = ['A', 'B', 'C', 'D']

  const getValue = (idx: number) => {
    const index = choices.findIndex(choice => choice.idx === idx)
    return index >= 0 ? choices[index].value : ""
  }

  return questionType === IQuestionTypes.INPUT ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        id="outlined-helperText"
        style={{ width: 520 }}
        value={title}
        disabled
        variant="standard"
      />
      <TextField
        id="outlined-helperText"
        style={{ width: 820 }}
        onChange={(event) => handleAnswerUpdate(questionIdx, IQuestionTypes.INPUT, event.target.value)}
        error={Boolean(error.value)}
        helperText={error.value}
      />
    </div>
  ) : questionType === IQuestionTypes.MULTIPLE_CHOICE ? (
    <>
      <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
        <TextField
          id="outlined-helperText"
          style={{ width: 340 }}
          value={title}
          variant="standard"
          disabled
          error={Boolean(error.value)}
          helperText={error.value}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {choices.length <= 2 ?
          choices.map((choice, idx) => (
            <div style={{ display: "flex", alignItems: "center", marginRight: 70 }}>
              <RadioGroup row aria-label="choice" name="row-radio-buttons-group">
                <FormControlLabel checked={choiceValues[idx]} onChange={() => handleChoice(idx)} control={<Radio />} label="" />
              </RadioGroup>
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
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <div>
                {choices.filter(item => item.idx < 2).map((choice, idx) => (
                  <div style={{ display: "flex", alignItems: "center", marginRight: 70 }}>
                    <RadioGroup row aria-label="choice" name="row-radio-buttons-group">
                      <FormControlLabel checked={choiceValues[idx]} onChange={() => handleChoice(idx)} control={<Radio />} label="" />
                    </RadioGroup>
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
                    <RadioGroup row aria-label="choice" name="row-radio-buttons-group">
                      <FormControlLabel checked={choiceValues[2 + idx]} onChange={() => handleChoice(2 + idx)} control={<Radio />} label="" />
                    </RadioGroup>
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