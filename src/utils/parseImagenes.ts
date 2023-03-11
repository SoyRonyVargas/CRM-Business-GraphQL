import { Request } from 'express'

const parseImagenes = ( imagenes : string[] , req : Request ) : string[] => {
  
    const mapeo = imagenes.map( imagen => {
        
        const fullUrl = req.protocol + '://' + req.get('host') + '/uploads/' + imagen 
        
        return fullUrl

    })
    
    return mapeo

}

export default parseImagenes