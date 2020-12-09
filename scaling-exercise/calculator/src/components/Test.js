import React, { useState, useEffect } from 'react'
import { Button, Loader, Progress } from 'semantic-ui-react'
import { sendToCalculate } from '../commons'

const TIME_LIMIT = 30000
const TOTAL_REQUESTS = 10

const simpleWait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const Test = () => {
  const [passed, setPassed] = useState(false)
  const [ongoingCalc, setOngoingCalc] = useState(false)
  const [completedCalculations, setCompletedCalculations] = useState(0)
  const [time, setTime] = useState(TIME_LIMIT)
  const [started, setStarted] = useState(false)

  const shouldAcuallyEndPlz = time <= 0 || completedCalculations >= TOTAL_REQUESTS
  const checkStatus = () => {
    if (time > 0 && completedCalculations >= TOTAL_REQUESTS && started) {
      setPassed(true)
    }
    if (shouldAcuallyEndPlz) {
      setStarted(false)
    }
  }

  useEffect(() => { if (started && !shouldAcuallyEndPlz) clock(time) }, [time, started])
  useEffect(() => { if (started && !shouldAcuallyEndPlz) calculate(completedCalculations) }, [completedCalculations, started])
  useEffect(() => { if (started) checkStatus() }, [time, completedCalculations, started])

  const clock = async () => {
    const PAUSE = 500
    const newTime = time - PAUSE
    await simpleWait(PAUSE)
    setTime(newTime)
  }

  const calculate = async () => {
    setOngoingCalc(true)
    if (ongoingCalc) return
    const promises = []
    let sent = 0
    let responded = 0
    const handleSendCalculate = async () => {
      sent++
      const res = await sendToCalculate(sent, sent, '+')
      responded++
      setCompletedCalculations(responded)
      return res
    }
    for (let i = 0; i < TOTAL_REQUESTS; i++) {
      promises.push(handleSendCalculate())
    }
    await Promise.all(promises)
    setOngoingCalc(false)
  }

  const testSpeed = async () => {
    if (ongoingCalc) return
    if (shouldAcuallyEndPlz) {
      setCompletedCalculations(0)
      setTime(TIME_LIMIT)
    }
    setStarted(true)
  }

  let progress = 0
  let timer = 100
  if (!shouldAcuallyEndPlz && started) {
    progress = (completedCalculations / TOTAL_REQUESTS) * 100
    timer = (time / TIME_LIMIT) * 100
  }
  return (
    <div>
      <h4>Your aim is to get the bottom bar to fill before the first depletes!</h4>
      <div>
        <Button color={passed ? "green" : "orange"} onClick={testSpeed} {...{ disabled: ongoingCalc ? true : false }}>
          Press here to test your solution
        </Button>
        {passed ? <span>Congratulations!</span> : null}
      </div>
      <span>Timer</span>
      <Progress percent={timer} indicating />
      <Loader {...{ active: ongoingCalc ? true : false }} indeterminate>Calculating</Loader>
      <span>Responses</span>
      <Progress percent={progress} indicating />
    </div>
  )
}

export default Test