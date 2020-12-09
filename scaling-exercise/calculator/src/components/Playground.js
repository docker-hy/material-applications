import React, { useState, useEffect } from 'react'
import { Button, Input } from 'semantic-ui-react'
import { sendToCalculate } from '../commons'

const Playground = () => {
  const [val1, setVal1] = useState(0)
  const [val2, setVal2] = useState(0)
  const [pending, setPending] = useState([])
  const [solutions, setSolutions] = useState([])
  const [newSolution, setNewSolution] = useState({})

  useEffect(() => {
    const newPending = pending.filter(ps => !solutions.find(s => s.id === ps.id))
    setPending(newPending)
  }, [solutions.length])

  useEffect(() => {
    if (!newSolution.id) return

    const newSolutions = [...solutions, newSolution]
    setSolutions(newSolutions)
    setNewSolution({})
  }, [newSolution.id])


  const handleCalculate = operation => async () => {
    console.log(val1, val2, operation)
    const id = Math.random() * 5000
    const newPending = [...pending, { solution: `Waiting for ${val1} ${operation} ${val2}`, id, status: 'pending' }]
    setPending(newPending)
    const data = await sendToCalculate(val1, val2, operation)
    setNewSolution({ ...data, id: id, status: 'solved' })
  }

  const setNumber = func => e => isNaN(e.target.value) ? null : func(Number(e.target.value))
  const list = [...solutions, ...pending]
  return (
    <div>
      <h4>Go ahead and test what happens</h4>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <b>Value 1</b>
        <Input onChange={setNumber(setVal1)} value={val1} />
        <b>Value 2</b>
        <Input onChange={setNumber(setVal2)} value={val2} />
        <b>Calculate</b>
        <Button onClick={handleCalculate('+')}>+</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', height: '15em', flexWrap: 'wrap' }}>
        {list.map(s => (
          <div key={s.id + s.status}>
            {s.solution}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Playground