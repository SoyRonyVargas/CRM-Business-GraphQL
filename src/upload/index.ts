import { v4 as uuidv4 } from 'uuid'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/uploads')
    },
    filename: function (req, file, cb) {
      
        const extension = path.extname(file.originalname)
        
        const uuid = uuidv4()

        const name = `${uuid}${extension}`

        cb( null, name )

    }
})

export const upload = multer({ dest: "./src/public/uploads", storage: storage })
