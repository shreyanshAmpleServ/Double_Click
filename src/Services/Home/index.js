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
    // const response = axiosInstance.get(`/api/articles?filters[slug]=${articleId}&populate=*`,)
    const response = axiosInstance.get(
      `api/articles?filters[slug]=${articleId}&populate[blocks][populate]=*&populate[cover]=true`
    )
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const coreServiceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`/api/services?populate=*&filters[type]=core`, { params: reqbody })
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
      `/api/article-types?filters[type]=blogs&populate[articles][populate]=*&pagination[pageSize]=${
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
    const response = axiosInstance.get(`/api/Carousels?populate=image`)
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
