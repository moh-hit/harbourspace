import axios from 'axios'

export const ApiRequest = axios.create({
  baseURL: 'https://harbour.space/api/v1',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
  },
  timeout: 45000,
})

export const getRequest = async (
  url, params, headers = {}, extraParams = {}, sendType, timeout,
) => {
  const modHeaders = { ...headers }
  const final_url = url
  const data = await ApiRequest.get(final_url,
    { headers: modHeaders, timeout: timeout || 45000, ...extraParams })
    .then((resp) => {
      if (sendType) {
        return {
          data: resp.data,
          contentType: resp.headers['content-type'],
        }
      }
      return resp.data
    })
    .catch((err) => {
      const error_msg = 'Error fetching data'
      const err_code = err.response && err.response.status

      return {
        error: true,
        error_msg,
        err_code,
      }
    })
  // debugger
  return data
}
