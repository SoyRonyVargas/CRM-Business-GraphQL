import { createWriteStream , createReadStream } from 'fs'

const almacenarImagen = ({ stream, filename }) => {
    
    const uploadDir = '../static';
    
    const path = `${uploadDir}/${filename}`;
    
        // return new Promise((resolve, reject) => createReadStream().pipe())
}

export default almacenarImagen