import config from '@/config'
import { client } from './dataProvider'
import { AuthBindings } from '@refinedev/core'

export const TOKEN_KEY = 'refine-auth'

export const authProvider: AuthBindings = {
  login: async ({ username, email, password, layout }) => {
    if (!layout) {
      return {
        success: false,
        error: {
          name: 'ParamsError',
          message: 'Missing layout parameters',
        },
      }
    }

    try {
      const response = await client.post(
        config.apiUrl + '/' + layout + '/' + config.basePath.login,
        {
          email: email,
          password: password,
        }
      )
      console.log(response)
      return {
        success: true,
      }
    } catch (error: any) {
      console.log(error)
      return {
        success: false,
        error: {
          name: 'LoginError',
          message: error?.message,
          statusCode: error?.statusCode,
          data: error?.data,
        },
      }
    }

    // if ((username || email) && password) {
    //   localStorage.setItem(TOKEN_KEY, username)
    //   return {
    //     success: true,
    //     redirectTo: '/admin',
    //   }
    // }

    // return {
    //   success: false,
    //   error: {
    //     name: 'LoginError',
    //     message: 'Invalid username or password',
    //   },
    // }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY)
    return {
      success: true,
      redirectTo: '/admin/login',
    }
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      return {
        authenticated: true,
      }
    }

    return {
      authenticated: false,
      redirectTo: '/admin/login',
    }
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      return {
        id: 1,
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/300',
      }
    }
    return null
  },
  onError: async (error) => {
    console.error(error)
    return { error }
  },
}
