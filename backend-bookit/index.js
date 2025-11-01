import express from 'express'
import app  from './src/app.js'
import dotenv from 'dotenv'
import connectDB from './src/db/connection.js';
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})