import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import { faker } from '@faker-js/faker'
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

// 模拟文章数据和分类数据
let articles = []
let categories = []

// 生成随机的文章数据
const generateArticle = (id) => {
  return {
    id,
    categorie_id: Math.floor(Math.random() * 10) + 1,
    title: faker.lorem.sentences(),
    image: faker.image.url(),
    status: true,
    create_at: faker.date.past().toISOString(),
  }
}

// 生成随机的分类数据
const generateCategory = (Id) => {
  return {
    Id,
    name: faker.lorem.words(),
    create_at: faker.date.past().toISOString(),
  }
}

// 生成模拟数据
const generateData = () => {
  for (let i = 1; i <= 100; i++) {
    articles.push(generateArticle(i))
  }

  for (let i = 1; i <= 10; i++) {
    categories.push(generateCategory(i))
  }
}

// 生成模拟数据
generateData()

// 返回统一格式的响应
const sendResponse = (res, data) => {
  res.json({
    code: 200,
    message: 'success',
    data,
  })
}

// 文章列表接口
app.get('/articles', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 10
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedArticles = articles.slice(startIndex, endIndex)

  sendResponse(res, {
    list: paginatedArticles,
    total: articles.length,
    Page: page,
  })
})

// 文章详情接口
app.get('/articles/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const article = articles.find((a) => a.id === id)

  if (article) {
    sendResponse(res, article)
  } else {
    res.status(404).json({
      code: 404,
      message: 'Article not found',
      data: null,
    })
  }
})

// 文章创建接口
app.post('/articles', (req, res) => {
  const newArticle = req.body

  if (!newArticle) {
    res.status(500).json({
      code: 500,
      message: 'Content is empty',
    })
  }

  if (!newArticle.title) {
    res.status(422).json({
      code: 422,
      message: 'Incomplete information',
      data: [
        {
          title: ['Article title is empty'],
        },
      ],
    })
    return
  }

  newArticle.id = articles.length + 1
  articles.push(newArticle)

  sendResponse(res, newArticle)
})

// 文章编辑接口
app.put('/articles/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const updatedArticle = req.body

  const articleIndex = articles.findIndex((a) => a.id === id)

  if (articleIndex !== -1) {
    articles[articleIndex] = { ...articles[articleIndex], ...updatedArticle }
    sendResponse(res, articles[articleIndex])
  } else {
    res.status(404).json({
      code: 404,
      message: 'Article not found',
      data: null,
    })
  }
})

// 文章删除接口
app.delete('/articles/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const articleIndex = articles.findIndex((a) => a.id === id)

  if (articleIndex !== -1) {
    articles.splice(articleIndex, 1)
    sendResponse(res, null)
  } else {
    res.status(404).json({
      code: 404,
      message: 'Article not found',
      data: null,
    })
  }
})

// 分类列表接口
app.get('/categories', (req, res) => {
  sendResponse(res, categories)
})

// 分类详情接口
app.get('/categories/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const category = categories.find((c) => c.Id === id)

  if (category) {
    sendResponse(res, category)
  } else {
    res.status(404).json({
      code: 404,
      message: 'Category not found',
      data: null,
    })
  }
})

// 分类创建接口
app.post('/categories', (req, res) => {
  const newCategory = req.body
  newCategory.Id = categories.length + 1
  categories.push(newCategory)
  sendResponse(res, newCategory)
})

// 分类编辑接口
app.put('/categories/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const updatedCategory = req.body

  const categoryIndex = categories.findIndex((c) => c.Id === id)

  if (categoryIndex !== -1) {
    categories[categoryIndex] = { ...categories[categoryIndex], ...updatedCategory }
    sendResponse(res, categories[categoryIndex])
  } else {
    res.status(404).json({
      code: 404,
      message: 'Category not found',
      data: null,
    })
  }
})

// 分类删除接口
app.delete('/categories/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const categoryIndex = categories.findIndex((c) => c.Id === id)

  if (categoryIndex !== -1) {
    categories.splice(categoryIndex, 1)
    sendResponse(res, null)
  } else {
    res.status(404).json({
      code: 404,
      message: 'Category not found',
      data: null,
    })
  }
})

app.post('/upload', (req, res) => {
  sendResponse(res, {
    list: [
      {
        url: 'https://picsum.photos/id/124/200/200',
        name: 'Image 1',
        ext: 'jpg',
        size: 1024,
        mime: 'image/jpeg',
      },
    ],
  })
})

// 登录接口
app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === '123456') {
    sendResponse(res, {
      userInfo: {
        username: 'admin',
        nickname: 'dux',
        avatar: '',
      },
      token: 'admin',
      permission: {
        articles: false,
      },
    })
  } else {
    res.status(500).json({
      code: 500,
      message: 'Invalid username or password',
    })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
