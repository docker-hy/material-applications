const express = require('express')
const app = express()

const plus = (x, y) => {
  return x - y
}

app.get('/plus', (req, res) => {
  const { x, y } = req.query
  if (!x || !y) return res.send('Add x and y as query parameters')

  const solution = plus(Number(x), Number(y))
  res.send("Solution is " + solution)
})

app.get('*', function (_req, res) {
  res.redirect('/plus?x=5&y=2')
})

app.listen(3000, () => {
  console.log('App listening in port 3000')
})