import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { IQuestionTypes } from "src/store/States/Survey/survey.types"
import AddIcon from '@mui/icons-material/AddRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import { Actions } from "src/store/States/Survey/"
import { connect } from "react-redux"

interface IProp {
  title?: string;
  questionType: string;
  handleChange?: (event: any) => void;
  saveChoicesBuffer?: (choices: any) => void;
  index: number;
  error: any;
}

const AnswerElement = ({ questionType, title, handleChange, error, saveChoicesBuffer, index }: IProp) => {
  const [choices, setChoices] = useState([{ idx: 0, value: "" }])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    saveChoicesBuffer({ [index]: choices })
  }, [choices])

  const getError = (idx: number) => {
    const index = errors.findIndex(error => error.idx === idx)
    return index >= 0 ? errors[index] : {}
  }

  const choiceLabels = ['A', 'B', 'C', 'D']

  const removeChoice = (idx: number) => {
    setChoices(choices.filter(choice => choice.idx !== idx))
  }

  const handleValueChange = (idx: number, event: any) => {
    const value = event.target.value
    setChoices(
      choices.map(choice => choice.idx === idx ? { ...choice, value } : choice)
    )
  }

  const getValue = (idx: number) => {
    const index = choices.findIndex(choice => choice.idx === idx)
    return index >= 0 ? choices[index].value : ""
  }

  const addChoice = () => {
    let _errors: any[] = []
    choices.forEach(choice => {
      let error: any = {}
      if (!choice.value) {
        error.value = "Choice is required"
      }
      if (Object.values(error).length > 0) {
        _errors.push({ ...error, idx: choice.idx })
      }
    })
    if (_errors.length === 0 && choices.length < 4) {
      setChoices(choices.concat({ idx: choices.length, value: "" }))
    }
    setErrors(_errors)
  }

  return questionType === IQuestionTypes.INPUT ? (
    <TextField
      id="outlined-helperText"
      label="Title"
      style={{ width: 540 }}
      onChange={handleChange}
      value={title}
      error={Boolean(error.title)}
      helperText={error.title ? error.title : ""}
    />
  ) : questionType === IQuestionTypes.MULTIPLE_CHOICE ? (
    <>
      <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
        <TextField
          id="outlined-helperText"
          label="Question"
          style={{ width: 540 }}
          onChange={handleChange}
          value={title}
          error={Boolean(error.title)}
          helperText={error.title ? error.title : ""}
        />
        <Button onClick={() => addChoice()}>
          <AddIcon />
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {choices.length <= 2 ?
          choices.map((choice, idx) => (
            <div style={{ display: "flex", alignItems: "center", marginRight: 70 }}>
              <label>{choiceLabels[idx]}</label>
              <TextField
                id="outlined-helperText"
                label="Choice"
                style={{ width: 320 }}
                onChange={(event) => handleValueChange(choice.idx, event)}
                value={getValue(choice.idx)}
                error={Boolean(getError(choice.idx).value)}
                helperText={getError(choice.idx).value ? getError(choice.idx).value : ""}
              />
              <Button onClick={() => removeChoice(choice.idx)}>
                <RemoveIcon />
              </Button>
            </div>
          )) : (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <div>
                {choices.filter(item => item.idx < 2).map((choice, idx) => (
                  <div style={{ display: "flex", alignItems: "center", marginRight: 70 }}>
                    <label>{choiceLabels[idx]}</label>
                    <TextField
                      id="outlined-helperText"
                      label="Choice"
                      style={{ width: 320 }}
                      onChange={(event) => handleValueChange(choice.idx, event)}
                      value={getValue(choice.idx)}
                      error={Boolean(getError(choice.idx).value)}
                      helperText={getError(choice.idx).value ? getError(choice.idx).value : ""}
                    />
                    <Button onClick={() => removeChoice(choice.idx)}>
                      <RemoveIcon />
                    </Button>
                  </div>
                ))}
              </div>
              <div>
                {choices.filter(item => item.idx >= 2).map((choice, idx) => (
                  <div style={{ display: "flex", alignItems: "center", marginRight: 70 }}>
                    <label>{choiceLabels[2 + idx]}</label>
                    <TextField
                      id="outlined-helperText"
                      label="Choice"
                      style={{ width: 320 }}
                      onChange={(event) => handleValueChange(choice.idx, event)}
                      value={getValue(choice.idx)}
                      error={Boolean(getError(choice.idx).value)}
                      helperText={getError(choice.idx).value ? getError(choice.idx).value : ""}
                    />
                    <Button onClick={() => removeChoice(choice.idx)}>
                      <RemoveIcon />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </>
  ) : <></>
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
})

const mapDispatchToProps = (dispatch: any) => ({
  saveChoicesBuffer: (choices: any[]) => dispatch(Actions.saveChoicesBuffer(choices))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnswerElement)