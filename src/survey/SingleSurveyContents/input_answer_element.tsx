import { TextField } from "@mui/material"

interface IProp {
  answers: string[]
}

const InputAnswerElement = ({ answers }: IProp) => {
  return (
    <div style={{ height: 200, overflow: "scroll" }}>
      {answers.map(answer => (
        <TextField
          id="outlined-input-answer"
          variant="standard"
          style={{ width: 420, backgroundColor: "white" }}
          value={answer}
          disabled
        />
      ))}
    </div>
  )
}

export default InputAnswerElement