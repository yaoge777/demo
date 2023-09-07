import axios from 'axios'

const http = axios.create({
  baseURL:'JSON',
  timeout:10000
})

export const getNameData = () => {
  return http({
    url: './nameData.json',
    method: 'get'
  })
}