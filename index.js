const express = require('express')
const cors = require('cors')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const authRoute = require('./routes/authRoute')
const competencieRoutes = require('./routes/competenciesRoutes')
const documentsRoutes = require('./routes/documentsRoutes')
const compeAthletesRoutes = require('./routes/compeAthletesRoutes')

const app = express()
const PORT = process.env.PORT || 3900

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static('uploads', {
    setHeaders: (res, path) => {
        res.set('Access-Control-Allow-Origin', '*')
    }
}))

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoute)
app.use('/api/competencies', competencieRoutes)
app.use('/api/documents', documentsRoutes)
app.use('/api/compeAthletes', compeAthletesRoutes)
app.listen(PORT,()=>{
    console.log(`Server corriendo en el puerto ${PORT}`)
})