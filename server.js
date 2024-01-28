const express = require('express')
const path = require('path')
const {mergePDF} = require('./merge')
const app = express()
const port = 3000
// Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files. 
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })




app.use('/static',express.static('./public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./templates/index.html'))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res) =>{
    // console.log(req.files) 
    // res.send({data:req.files})

    let d = await mergePDF(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)

  })
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})