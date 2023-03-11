
import { upload } from '../upload'
import { Router } from 'express'

const router = Router()

router.post<any , any , any, any, any>( "/upload", upload.array("imagenes"), ( req  , res ) => {
        
    console.log(req);
    
    // console.log(req)

    // upload( req , res , (err) => {

    // })

    res.send("endopoint listo")

})

module.exports = router