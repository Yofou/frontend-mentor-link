import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

const LoginSchema = schema.create({
  email: schema.string([rules.email()]),
  password: schema.string(),
})

Route.post('/api/auth/login', async ({ auth, request, response, session }) => {
  const { email, password } = await request.validate({
    schema: LoginSchema,
    messages: {
      'required': '{{ field }} is required',
      'email.email': 'Must be a valid email',
    },
  })

  try {
    await auth.use('web').attempt(email, password)
    return response.redirect('/dashboard')
  } catch {
    session.flash('errors', { message: 'Invalid email or password' })
    return response.redirect().back()
  }
})

const RegisterSchema = schema.create({
  email: schema.string([rules.email()]),
  password: schema.string([rules.minLength(8), rules.maxLength(32), rules.confirmed('confirm')]),
  confirm: schema.string(),
})

Route.post('/api/auth/register', async ({ auth, request, response, session }) => {
  const { email, password } = await request.validate({
    schema: RegisterSchema,
    messages: {
      'required': '{{ field }} is required',
      'email.email': 'Must be a valid email',
      'password.minLength': 'Minimum 8 character length',
      'password.maxLength': 'Maximum 32 character length',
      'confirm.confirmed': 'Must mach password field',
    },
  })

  const doesUserExist = await User.findBy('email', email)

  if (doesUserExist) {
    session.flash('errors', { message: 'Email already taken' })
    return response.redirect().back()
  }

  const user = new User()

  user.email = email
  user.password = password
  await user.save()

  try {
    await auth.use('web').attempt(email, password)
    return response.redirect('/dashboard')
  } catch {
    session.flash('errors', { message: 'Unknown error, please try again' })
    return response.redirect().back()
  }
})

Route.any('/api/auth/logout', async ({ auth, response }) => {
  await auth.check()

  if (auth.user) {
    await auth.logout()
    return response.redirect('/auth/login')
  } else {
    return response.badRequest({
      message: 'Cannot logout of an account, when you are not logged in',
    })
  }
})
