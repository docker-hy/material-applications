import axios from 'axios'

export const sendToCalculate = async (val1, val2, operation) => {
  const payload = {
    val1,
    val2,
    operation
  }
  // const { data } = await axios.post('http://localhost:3000', payload)
  const { data } = await axios.post('http://compute.localtest.me', payload)
  return data
}
