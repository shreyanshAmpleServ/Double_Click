import axios from "axios"
import { toast } from "react-toastify"
import { LogoutBusiness } from "Shared/ProfileMenu"

/**
 * Base URL for API requests.
 * @type {string}
 */

// export const baseURL = "http://192.168.1.71:9091/"
export const baseURL = process.env.REACT_APP_API_URL

/**
 * Axios instance with baseURL set.
 * @type {import("axios").AxiosInstance}
 */

const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use(
  /**
   * Interceptor function to add Authorization header to the request config.
   * @param {import("axios").AxiosRequestConfig} config - Axios request config.
   * @returns {import("axios").AxiosRequestConfig} - Updated Axios request config.
   */
  (config) => {
    const method = config.method?.toLowerCase() || "get"
    let token = ""

    if (method === "post") {
      token =
        "4eff03a4fd762ef586b0401cc481aabd088c94d24b39bc4997b9b8794260ea263fba65ea21e61f93c8ff26dc5cba31e1ebde82adb8c7ecbcd5972108329d3372ddf904e2d5f6953b865ea5bf232958c96d857993bf5e13463bdfdef96c3b907e5d4ee6ec5d26c31c567cb8ed99f78d1df578e07c30eba9442f417861710b1998"
    } else {
      token =
        "19fedf7a1241d1bc4cb899fd5f39b11c21e55212fbf385771f5b91598d2fd221ee8e59bc578488e7e1491f7996bddfc2182d59515eb96561c09bbbd6fb66c06606aab9aec4c116def856c145c3ea38ac3bfad293382f21510ca1b38b02108ebe77debe9c256f53489cb338c9bcbbc3c165c2e722b40d2e4ae1d1449c7cbd72b4"
    }

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
    // const token = "9d15c4e4596b49219bc83766bd8952f1c51049870af7529c7fc2e7cce5f982e6c4ab392085c5957b53737488deebf87cffd99cb9b4a9e496744d92ecfcaf83df8638846578505adb626f750b32dc75e1fb10d1f152303948f889bde545ca39ca5bc1e46a7bf4e21505bfcaeb43dfa757e9a1e84188346bc71dfa0ce0fa87419b"
    // config.headers = { Authorization: `Bearer ${token}`, ...config.headers }
    return config
  },

  /**
   *? Interceptor error handler for request.
   * @param {import("axios").AxiosError} error - Axios error object.
   * @returns {Promise<never>} - Promise rejection with error.
   */
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  /**
   * Interceptor function for successful response.
   * @param {import("axios").AxiosResponse} response - Axios response object.
   * @returns {import("axios").AxiosResponse} - The response object.
   */
  (response) => response,
  /**
   * Interceptor error handler for response.
   * @param {import("axios").AxiosError} error - Axios error object.
   * @returns {Promise<never>} - Promise rejection with error.
   */
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.warning(error.response.message)
      setTimeout(LogoutBusiness, 2000)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
