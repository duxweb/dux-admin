import { faker } from '@faker-js/faker'

// eslint-disable-next-line no-var
export const articles: Record<string, any>[] = []
// eslint-disable-next-line no-var
export const categories: Record<string, any>[] = []

const generateArticle = (id: number) => {
  return {
    id,
    categorie_id: Math.floor(Math.random() * 10) + 1,
    title: faker.lorem.sentences(),
    image: faker.image.url(),
    status: faker.datatype.boolean(),
    create_at: faker.date.past().toISOString(),
  }
}

const generateCategory = (id: number) => {
  return {
    id,
    name: faker.lorem.words(),
    create_at: faker.date.past().toISOString(),
  }
}

const generateData = () => {
  for (let i = 1; i <= 100; i++) {
    articles.push(generateArticle(i))
  }

  for (let i = 1; i <= 10; i++) {
    categories.push(generateCategory(i))
  }
}

generateData()

export const users: Record<string, any>[] = [
  {
    id: 1,
    role_id: 1,
    username: 'admin',
    password: '123456',
    nickname: 'dux',
    avatar: '',
  },
]
export const roles: Record<string, any>[] = [
  {
    id: 1,
    name: 'Admin Group',
    permission: {},
  },
]

export const setting: Record<string, any> = {
  title: 'Dux Web',
  logo: '',
  favicon: '',
  footer: '',
  theme: 'default',
  layout: 'side',
  fixedHeader: true,
  fixedSideBar: true,
  fixedTabs: true,
}
