import bcrypt from 'bcrypt'

const comparePassword = async ( text1 : string , text2: string ) : Promise<boolean> => {
  
    try
    {

        const result = await bcrypt.compare( text1, text2 )

        return result

    }
    catch(err)
    {
        return false
    }

}

export default comparePassword