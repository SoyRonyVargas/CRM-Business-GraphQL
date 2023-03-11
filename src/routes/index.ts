
import parseImagenes from '../utils/parseImagenes';
import { upload } from '../upload'
import { Router } from 'express'

const router = Router()

interface MulterRequest extends Request {
    files: [
        {
            filename: string
        }
    ];
}

router.post( "/upload", upload.array("imagenes"), ( req   , res ) => {
        
    const files  = (req as unknown as MulterRequest).files;
 
    const _files = files.map( file => (file.filename))

    const imagenes = parseImagenes(_files , req)

    res.send(imagenes)

})

module.exports = router