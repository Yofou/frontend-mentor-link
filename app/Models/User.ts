import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Link from './Link'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public avatar: string | null

  @column()
  public first: string | null

  @column()
  public last: string | null

  @hasMany(() => Link, {
    foreignKey: 'userId',
  })
  public links: HasMany<typeof Link>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
