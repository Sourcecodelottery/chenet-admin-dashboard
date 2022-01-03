import { TextField } from "@mui/material"
import DoughnutElement from './doughnut_element'

interface IChoiceDoc {
  id: number
  text: string
}

interface IProp {
  answers: IChoiceDoc[]
}

const ChoiceAnswerElement = ({ answers }: IProp) => {
  let uniqueAnswers: IChoiceDoc[] = []
  let frequencies: number[] = []
  answers.forEach(answer => {
    const index = uniqueAnswers.findIndex(ans => ans.id === answer.id)
    if (index < 0) {
      uniqueAnswers.push(answer)
      frequencies.push(1)
    } else {
      frequencies[index] += 1
    }
  })

  const graphData = {
    datasets: [
      {
        data: frequencies.map(frequency => Math.floor((frequency / answers.length) * 100)),
        backgroundColor: ['#ff9900', '#1c81c2', '#333', '#5c6ac0']
      }
    ],
    labels: uniqueAnswers.map(answer => answer.text)
  };

  return (
    <>
      <DoughnutElement data={graphData} frequencies={frequencies} />
    </>
  )
}

export default ChoiceAnswerElement