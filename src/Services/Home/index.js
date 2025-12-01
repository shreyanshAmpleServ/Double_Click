import axios from "axios"
import axiosInstance from "Config/axio.config"

export const blogFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`/api/categories/build-tree`, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const blogArticleFn = (reqbody) => {
  const articleId = reqbody.id
  console.log(reqbody.id)
  try {
    const response = axiosInstance.get(
      `api/articles?filters[slug]=${articleId}&populate[blocks][on][shared.stack-images][populate][renderBlock][populate]=*&populate[blocks][on][shared.stack-images][populate][files][populate]=file&populate[blocks][on][shared.rich-text-markdown-wrapper][populate]=*&populate[blocks][on][shared.html-markdown-wrapper][populate]=*&populate[blocks][on][shared.action-btn-wrapper][populate]=*&populate[blocks][on][shared.slider-wrapper][populate]=*&populate[blocks][on][shared.quote-wrapper][populate]=*&populate[blocks][on][shared.media-wrapper][populate]=*&populate[blocks][on][shared.carousel-button][populate]=*&populate[blocks][on][shared.rich-text][populate]=*&populate[cover]=true&populate[seo][populate]=*`
    )
    // const response = axiosInstance.get(
    //   `api/articles?filters[slug]=${articleId}&populate[blocks][populate]=*&populate[cover]=true&populate[seo][populate]=*`
    // )
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const coreServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`/api/services?populate[details][populate]=*&filters[type]=core`, {
      params: reqbody,
    })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const testimonialServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`/api/testimonials?populate=avatar`, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const postServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`/api/articles?populate=*&pagination[pageSize]=${reqbody?.size || 10}`)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const postBlogServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(
      `/api/article-types?filters[type]=blogs&populate[articles][populate]=*&populate[cover]=true&pagination[pageSize]=${
        reqbody?.size || 25
      }`
    )
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const reqQouteServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`/api/free-quote/schema`)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const qouteSchemaServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`/api/quote-request/schema`)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const crousalServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`/api/Carousels?populate[0]=action&populate[1]=image`)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const footerServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`/api/global-entities?populate=*`)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const mainServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(
      `/api/services?populate[0]=details&populate[1]=details.backgroundImage&populate[2]=details.icon&filters[type]=main`
    )
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const faqServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`/api/qnas`)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const companiesServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`/api/company-addresses`)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const aboutServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`/api/about?populate[blocks][populate]=*&populate[featuredMedia]=true`)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const teamsServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`/api/teams?populate=*&sort[0]=order:asc`)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const addQuoteFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`/api/free-quotes`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const reqQuoteFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`/api/quote-requests`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const newsLatterFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`/api/newsletters`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const contactUsFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`/api/contacts`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
// export const captchaVarifyFn = (reqBody) => {
//   try {
//     const response = axios.get(`http://10.160.5.123:1999/dcc-website/api/google/recaptcha/verify`, { params: reqBody })
//     return response
//   } catch ({ error }) {
//     throw new Error(error?.message)
//   }
// }

export const captchaVarifyFn = async (params = {}) => {
  // params should be like { token: "..." }
  try {
    const token =
      "9d15c4e4596b49219bc83766bd8952f1c51049870af7529c7fc2e7cce5f982e6c4ab392085c5957b53737488deebf87cffd99cb9b4a9e496744d92ecfcaf83df8638846578505adb626f750b32dc75e1fb10d1f152303948f889bde545ca39ca5bc1e46a7bf4e21505bfcaeb43dfa757e9a1e84188346bc71dfa0ce0fa87419b"
    const response = await axios.get("https://strapi.dcctz.com/dev/api/google/recaptcha/verify", {
      params, // → becomes ?token=xxxx
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    // return the full axios response so component can access response.data
    return response?.data || response
  } catch (err) {
    // rethrow to let react-query handle it
    // normalize message
    const message = err?.response?.data?.message || err.message || "Captcha verify failed"
    throw new Error(message)
  }
}
