const multer = require('multer')
const path = require('path')
const fs = require('fs')
const userModel = require('../models/userModel')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let userNames = req.user.names
        
        if (!userNames) {
            return cb(new Error('Usuario no autenticado'), null)
        }
        userNames = userNames.trim().replace(/[^a-zA-Z0-9_\-\s]/g, '').replace(/\s+/g, ' ')
        const dir = path.join(__dirname, '..', 'uploads', 'images', userNames)
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                return cb(err, null)
            }
            cb(null, dir)
        })
    },
    filename: (req, file, cb) => {
        let userNames = req.body?.names || req.user?.names || req.query?.names || 'unknownUser'
        userNames = userNames.trim().replace(/[^a-zA-Z0-9_\-\s]/g, '').replace(/\s+/g, ' ')
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const originalName = path.basename(file.originalname).replace(/\s+/g, '_')
        const finalName = `${userNames}-${uniqueSuffix}${path.extname(originalName)}`
        cb(null, finalName)
    }
})

const upload = multer({ storage: storage })

module.exports = upload