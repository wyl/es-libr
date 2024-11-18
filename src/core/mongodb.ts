import { MONGODB_URL } from '@eslibr/constants'
import { MongoClient } from 'mongodb'

export const mongoClient = new MongoClient(MONGODB_URL, {})
mongoClient.on('connect', () => {
  console.log('Connected to MongoDB')
})
mongoClient.on('close', () => {
  console.log('Disconnected from MongoDB')
})
mongoClient.on('error', console.error)
