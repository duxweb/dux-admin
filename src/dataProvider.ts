import { DataProvider, HttpError, CrudOperators, CrudFilters } from '@refinedev/core'
import axios, { AxiosHeaderValue } from 'axios'

const client = axios.create({
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

client.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    }

    return Promise.reject(customError)
  }
)

export const dataProvider = (apiUrl: string): DataProvider => ({
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const url = `${apiUrl}/${resource}`
    const { current = 1, pageSize = 10 } = pagination ?? {}

    const quertSorts: Record<string, any> = {}
    sorters?.map((item) => {
      quertSorts[item.field + '_sort'] = item.order
    })

    const queryFilters = generateFilters(filters)

    const { data } = await client.get(url, {
      params: {
        ...{
          page: current,
          pageSize: pageSize,
        },
        ...meta?.params,
        ...queryFilters,
        ...quertSorts,
      },
    })
    const total = data?.total || data?.list?.length || 0
    return {
      data: data,
      total,
    }
  },
  create: async ({ resource, variables, meta }) => {
    const url = `${apiUrl}/${resource}`
    const { data } = await client.post(url, variables, {
      params: meta?.params,
    })
    return {
      data,
    }
  },
  update: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`
    const { data } = await client.post(url, variables, {
      params: meta?.params,
    })
    return {
      data,
    }
  },
  deleteOne: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`
    const { data } = await client.delete(url, {
      data: variables,
      params: meta?.params,
    })
    return {
      data,
    }
  },
  getOne: async ({ resource, id, meta }) => {
    console.log('meta', meta)
    const url = `${apiUrl}/${resource}/${id}`
    const { data } = await client.get(url, {
      params: meta?.params,
    })
    return {
      data,
    }
  },
  getApiUrl: () => apiUrl,
  getMany: async ({ resource, ids, meta }) => {
    const { data } = await client.get(`${apiUrl}/${resource}`, {
      params: {
        ids: ids.join(','),
        ...meta?.params,
      },
    })
    return {
      data,
    }
  },
  createMany: async ({ resource, variables, meta }) => {
    const url = `${apiUrl}/${resource}`
    const { data } = await client.post(url, variables, {
      params: meta?.params,
    })
    return {
      data,
    }
  },
  deleteMany: async ({ resource, ids, meta }) => {
    const url = `${apiUrl}/${resource}`
    const { data } = await client.delete(url, {
      params: {
        ids: ids.join(','),
        ...meta?.params,
      },
    })
    return {
      data,
    }
  },
  updateMany: async ({ resource, ids, variables, meta }) => {
    const url = `${apiUrl}/${resource}`
    const { data } = await client.post(
      url,
      { variables },
      {
        params: {
          ids: ids.join(','),
          ...meta?.params,
        },
      }
    )

    return {
      data,
    }
  },
  custom: async ({ url, method, filters, sorters, payload, query, headers, meta }) => {
    const requestUrl = `${url}?`

    const quertSorts: Record<string, any> = {}
    sorters?.map((item) => {
      quertSorts[item.field] = item.order
    })

    const queryFilters = generateFilters(filters)

    if (headers) {
      client.defaults.headers = {
        ...client.defaults.headers,
        ...(headers as { [key: string]: AxiosHeaderValue }),
      }
    }

    const params = {
      ...query,
      ...meta?.params,
      ...queryFilters,
      ...quertSorts,
    }

    let axiosResponse
    switch (method) {
      case 'put':
      case 'post':
      case 'patch':
        axiosResponse = await client[method](url, payload, {
          params: params,
        })
        break
      case 'delete':
        axiosResponse = await client.delete(url, {
          data: payload,
          params: params,
        })
        break
      default:
        axiosResponse = await client.get(requestUrl, {
          params: params,
        })
        break
    }
    const { data } = axiosResponse
    return { data }
  },
})

const generateFilters = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {}

  filters?.map((filter): void => {
    if ('field' in filter) {
      const { field, operator, value } = filter
      const mappedOperator = mapOperator(operator)
      queryFilters[`${field}${mappedOperator}`] = value
    }
  })

  return queryFilters
}

const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case 'ne':
    case 'gte':
    case 'lte':
      return `_${operator}`
    case 'contains':
      return '_like'
    case 'eq':
    default:
      return ''
  }
}