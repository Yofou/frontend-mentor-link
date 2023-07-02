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
import './api/auth'

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

Route.get('/dashboard', async ({ inertia, auth }) => {
  console.log(auth.user)
  return inertia.render('Dashboard', {
    user: {
      email: auth.user?.email ?? '',
      first: auth.user?.first ?? '',
      last: auth.user?.last ?? '',
    },
  })
}).middleware('auth')

Route.get('/playground', async ({ inertia }) => {
  return inertia.render('Playground')
})