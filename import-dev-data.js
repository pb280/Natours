const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const Tour = require('../../models/tourModel')

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

/*
For Local Database 
const DB = process.env.DATABASE_LOCAL
*/

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB Connection Successful')
  })

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync('../data/tours.json', 'utf-8'))

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours)
  } catch (err) {
    console.log('Error 💥', err)
  }
}
