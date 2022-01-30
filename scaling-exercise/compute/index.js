// index.js
const express = require('express');
const app = express();
const cors = require('cors')

const queue = []
let loopOngoing = false

app.use(cors({ credentials: true, origin: true }))
app.use(express.json())

app.get('*', (req, res) => {
  console.log('I just received a GET request!');
  res.send('Hello World!');
});

const simpleWait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

app.post('*', async (req, res) => {
  queue.push({ req, res });
  console.log('Added to queue')
  const handle = async (req, res) => {
    const { val1, val2, operation } = req.body
    console.log(`Started calculations for ${val1} ${operation} ${val2}`)
    const solution = val1 + val2
    await simpleWait(3000 + (Math.random() * 1000))
    console.log(`Calculated ${val1} ${operation} ${val2}: ${solution}`)
    res.send({ solution: `Calculated for ${val1} ${operation} ${val2} = ${solution}` })
    return true
  }

  if (!loopOngoing) {
    console.log('Started resolving loop')
    loopOngoing = true
    const handleQueue = async () => {
      const { req, res } = queue.shift()
      await handle(req, res)
      if (queue.length) {
        handleQueue()
      } else {
        loopOngoing = false
      }
    }
    handleQueue()
  }
});

app.listen(3000, () => console.log('I am alive in port 3000!'));

process.once('SIGTERM', () => process.exit(0));
process.once('SIGINT', () => process.exit(0));
