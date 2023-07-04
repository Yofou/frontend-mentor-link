import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, SnakeCaseNamingStrategy } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { string } from '@ioc:Adonis/Core/Helpers'

class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {
  //... define all the required methods

  public columnName(_model: typeof BaseModel, propertyName: string) {
    return string.camelCase(propertyName)
  }
}

export default class Link extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()

  @column({ isPrimary: true })
  public id: string

  @column()
  public index: number

  @column()
  public platform: string

  @column()
  public platformId: string

  @column()
  public url: string

  @column()
  public userId: number

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
