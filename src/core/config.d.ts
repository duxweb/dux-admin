export interface TabBarItem {
  label: string
  icon: string
  route: string
}

export interface basePath {
  login: string
  check: string
  register: string
  forgotPassword: string
  updatePassword: string
}

export interface AppConfig {
  projectId: string
  apiUrl: string
  basePath: basePath
  defaultLayout: string
  tabBar: Record<string, Array<TabBarItem>>
}
