import mongoose from 'mongoose'
import app from './app'
import config from './config'

function server() {
  try {
    mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`)
    })
  } catch (error) {
    console.error('Error connecting to the database: ', error)
  }
}
console.log('mongodb:', config.database_url)
server()
