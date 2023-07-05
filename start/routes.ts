/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import './api/auth'
import './api/dashboard'

Route.get('/', async ({ response }) => {
  return response.redirect('/auth/login')
})

Route.get('/auth/login', async ({ inertia, auth, response }) => {
  await auth.check()
  if (auth.user) {
    return response.redirect('/dashboard')
  }

  return inertia.render('Login')
})

Route.get('/auth/register', async ({ inertia, auth, response }) => {
  await auth.check()
  if (auth.user) {
    return response.redirect('/dashboard')
  }

  return inertia.render('Register')
})

Route.get('/dashboard', async ({ inertia, auth, request }) => {
  const url = `${request.protocol()}://${request.host()}/u/${auth.user!.id}`
  await auth.user?.load('links')
  return inertia.render('Dashboard', {
    url,
    user: {
      email: auth.user?.email ?? '',
      first: auth.user?.first ?? '',
      last: auth.user?.last ?? '',
      avatar: auth.user?.avatar,
    },
    links: auth.user?.links.map((item) => {
      return {
        id: item.id,
        link: item.url,
        provider: {
          value: item.platform,
          valueId: item.platformId,
        },
      }
    }),
  })
}).middleware('auth')

const ShareSchema = schema.create({
  userId: schema.string([rules.exists({ table: 'users', column: 'id ' })]),
})

Route.get('/u/:user-id', async ({ inertia, request }) => {
  const userId: string = request.param('user-id')
  await request.validate({
    schema: ShareSchema,
    data: {
      userId,
    },
  })

  const url = request.completeUrl(false)
  const user = await User.find(userId)
  await user?.load('links')

  return inertia.render('Share', {
    isPreview: false,
    url: url,
    user: {
      email: user?.email ?? '',
      first: user?.first ?? '',
      last: user?.last ?? '',
      avatar: user?.avatar,
    },
    links: user?.links.map((item) => {
      return {
        id: item.id,
        link: item.url,
        provider: {
          value: item.platform,
          valueId: item.platformId,
        },
      }
    }),
  })
})
