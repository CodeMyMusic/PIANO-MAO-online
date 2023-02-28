import { readFile } from 'fs';
import express from 'express' 

let app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (request, response) => {
<<<<<<< HEAD
  response.render('pages/login')
=======
  response.render('pages/index', {f:'fff'})
>>>>>>> 29309eda69f1aff67fbeac5c436e02a06129be79
})

app.listen(8080)