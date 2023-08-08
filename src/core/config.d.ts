export interface TabBarItem {
  label: string
  icon: string
  route: string
}

export interface AppConfig {
  projectId: string
  apiUrl: string
  defaultPath: string
  tabBar: Record<string, Array<TabBarItem>>
}
