import { readFile } from 'fs';
import express from 'express' 

let app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (request, response) => {
  response.render('pages/index', {f:'fff'})
})

app.listen(8080)