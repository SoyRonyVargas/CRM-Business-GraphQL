import bcrypt from 'bcrypt'

const saltsRounds = 10

const hashPassword = async ( text : string ) : Promise<string> => {
  
    const salt = await bcrypt.genSalt(saltsRounds)

    const hash = bcrypt.hash( text , salt )

    return hash

}

export default hashPassword