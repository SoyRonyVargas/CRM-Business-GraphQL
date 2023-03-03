import mongoose, { Query } from "mongoose";

export const populateFields = ( params: mongoose.Schema ) => {
    
    // let pathsDeep = []
    let paths = ""

    params.eachPath( ( path , schemaType ) => {

        // console.log('path');
        // console.log(path);
        // console.log('schemaType');
        // console.log(schemaType);

        if( path == "_id" ) return;

        if( schemaType.options.ref || schemaType.instance == "Array" )
        {
            paths += ' ' + path;
        }
        
        // if( schemaType.options.ref )
        // {
        //     paths += ' ' + path;
        // }
        
        // if( schemaType.instance == "Array" )
        // {
        //     paths+=""
        //     // pathsDeep.push({ path , populate: "producto" })
        // }

    })

    console.log('PATH POPULATE');
    console.log(paths);
    
    paths = paths.trim()
    
    params.pre("find" , handler)
    params.pre("findOne" , handler)

    function handler(next){
        
        try
        {
            this.populate(paths)
            // this.populate(pathsDeep)
            next()
        }
        catch(err)
        {
            console.log(err);
        }

    }

}