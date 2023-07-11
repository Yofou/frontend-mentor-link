/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import { validator } from '@ioc:Adonis/Core/Validator'
import { ProvidersList } from 'resources/js/constants/providers'

type PlatformKeys = (typeof ProvidersList)[number]['valueId']
const PlatformDomainRegex: Record<PlatformKeys, RegExp> = {
  'twitch': /^(https?:\/\/)?(www\.)?twitch\.tv\/[A-Za-z0-9_]{4,25}$/,
  'twitter': /(https:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
  'youtube': /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/@([a-zA-Z0-9_-])*.$/,
  'stackoverflow': /(https?:\/\/)?(www\.)?stackoverflow\.com\/users\/\d+\/[\w-]+/,
  'dev-to': /^(https:\/\/dev.to\/[a-zA-Z0-9_-]+)$/,
  'github': /^https?:\/\/github\.com\/[A-Za-z0-9_-]+$/,
  'gitlab': /^(https?:\/\/)?(www\.)?gitlab\.com\/[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*$/,
  'codepen': /^https?:\/\/codepen.io\/[^\/]+\/?$/,
  'codewars': /^https:\/\/www\.codewars\.com\/users\/[a-zA-Z0-9_-]+$/,
  'hashnode': /^(https?:\/\/)?(www\.)?hashnode\.com\/\@([a-zA-Z0-9_]+)$/,
  'frontend-mentor': /^https:\/\/www.frontendmentor.io\/profile\/[a-zA-Z0-9_-]+$/,
  'linkedin': /^https:\/\/www\.linkedin\.com\/(mwlite|profile|in)\/[A-Za-z0-9_-]+\/?$/,
  'facebook': /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9\-_.]+\/?$/,
  'freecodecamp': /^(https?:\/\/)?(www\.)?freecodecamp\.org\/[a-zA-Z0-9_-]+$/,
}

validator.rule('platformDomain', (value, _, options) => {
  if (typeof value !== 'object') {
    return
  }

  if (
    value.id === undefined ||
    value.link === undefined ||
    value.provider === undefined ||
    value.provider.value === undefined ||
    value.provider.valueId === undefined
  ) {
    return
  }

  const link = value.link
  const platformId = value.provider.valueId

  const regex: RegExp | null = PlatformDomainRegex[platformId]

  if (!regex) {
    return
  }

  if (!regex.test(link)) {
    options.errorReporter.report(
      `${options.pointer}.link`,
      'platformDomain',
      `Must be a valid ${value.provider.value} profile url`,
      options.arrayExpressionPointer
    )
  }
})
