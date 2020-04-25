const express = require('express')
const app = express()

app.use(express.static('dist'))

app.use('*', (res, req) => {
    res.sendFile('dist/index.html')
})

// app.get('/', (req, res) => {
//     res.sendFile('index.html', {root: './'})
// })

app.listen(3000, () => {
    console.log('App running on port 3000')
})