import Route from '@ioc:Adonis/Core/Route'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Link from 'App/Models/Link'
import Database from '@ioc:Adonis/Lucid/Database'

const DashboardSchema = schema.create({
  first: schema.string([rules.alpha(), rules.maxLength(50)]),
  last: schema.string([rules.alpha(), rules.maxLength(50)]),
})

Route.put('/api/dashboard/profile', async ({ auth, request, response }) => {
  const payload = await request.validate({
    schema: DashboardSchema,
    messages: {
      alpha: 'Must be alphanumeric',
      maxLength: 'must be less than 50 characters',
      required: 'field is required',
    },
  })

  auth.user!.first = payload.first
  auth.user!.last = payload.last
  await auth.user?.save()

  return response.redirect().back()
}).middleware('auth')

const AvatarSchema = schema.create({
  avatar: schema.file(),
})

Route.post('/api/dashboard/avatar', async ({ auth, request, response }) => {
  const payload = await request.validate({
    schema: AvatarSchema,
  })

  await payload.avatar.moveToDisk('./')
  auth.user!.avatar = `https://pub-71cf1d8a0a7a41b7b79f85fc7f634d80.r2.dev/${payload.avatar.fileName}`
  await auth.user?.save()

  return response.redirect().back()
}).middleware('auth')

const LinksSchema = schema.create({
  links: schema.array().members(
    schema.object().members({
      provider: schema.object().members({
        value: schema.enum([
          'Github',
          'Frontend Mentor',
          'Twitch',
          'Twitter',
          'LinkedIn',
          'Youtube',
          'Dev.To',
          'Codewars',
          'Codepen',
          'freeCodeCamp',
          'Gitlab',
          'Hashnode',
          'Stack Overflow',
          'Facebook',
        ]),
        valueId: schema.enum([
          'github',
          'frontend-mentor',
          'twitch',
          'twitter',
          'youtube',
          'linkedin',
          'dev-to',
          'codewars',
          'codepen',
          'freecodecamp',
          'gitlab',
          'hashnode',
          'stackoverflow',
          'facebook',
        ]),
      }),
      link: schema.string([rules.url()]),
    })
  ),
})

Route.put('/api/dashboard/links', async ({ auth, request, response }) => {
  const { links } = await request.validate({
    schema: LinksSchema,
    messages: {
      required: 'Field is required',
      url: 'Must be a valid url',
    },
  })

  const trx = await Database.transaction()
  await Link.query({ client: trx }).where('userId', auth.user!.id).delete()

  await Link.createMany(
    links.map((link, index) => ({
      platform: link.provider.value,
      platformId: link.provider.valueId,
      userId: auth.user!.id,
      url: link.link,
      index,
    })),
    { client: trx }
  )

  await trx.commit()

  return response.redirect().back()
}).middleware('auth')
