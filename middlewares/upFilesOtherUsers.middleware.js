const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userNames = req.userNames

        if (!userNames) {
            return cb(new Error('Nombre de usuario no encontrado en req.userNames'), null)
        }

        const dir = path.join(__dirname, '..', 'uploads', userNames)

        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                return cb(err, null)
            }
            cb(null, dir)
        })
    },
    filename: (req, file, cb) => {
        const userNames = req.userNames || 'unknownUser'
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const originalName = path.basename(file.originalname).replace(/\s+/g, '_')

        const finalName = `${userNames}-${uniqueSuffix}-${originalName}`
        cb(null, finalName)
    }
})

const upload = multer({ storage: storage })

module.exports = upload
