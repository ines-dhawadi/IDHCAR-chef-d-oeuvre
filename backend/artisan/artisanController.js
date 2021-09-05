const artisanModel = require('./artisanModel')

module.exports={


    // get artisan 
 getArtisan: async (req,res)=>{
     try{
const artisan = await artisanModel.find()
res.json(artisan)
     }catch(error){
         console.log(error.message);
     }
    
 },

 // get by id
 getArtisanById:async(req,res)=>{
    try {
      const publication = await PUBLICATION.findById(req.params.id);
      res.json(publication);
  }
  catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  },


 // add artisan 
 addArtisan: async (req,res)=>{
     const nom = req.body.nom,
     prenom = req.body.prenom,
     role = req.body.role,
     desc = req.body.desc,
     latitude = req.body.latitude,
     longitude = req.body.longitude ,
     imageP = req.body. imageP,
     image1 = req.body.image1 ,
     image2= req.body.image2 ,
     image3= req.body.image3 ,
     image4= req.body.image4 ,
     Ntelf= req.body. Ntelf,
     adress= req.body.adress ,
     gouvernorat=req.body.adress
     try{
         const artisan = new artisanModel({
             nom,
             prenom,
             role,
             desc,
             latitude,
             longitude,
             imageP,
             image1,
             image2,
             image3,
             image4,
             Ntelf,
             adress,
             gouvernorat

              })

        await artisan.save()
         res.json(artisan)
     }catch(error){
         console.log(error.message)
     }
 },

deleteArtisan: async  (req,res)=>{
    try{
        const artisan = await artisanModel.findByIdAndDelete(req.params.id,);
            res.json(artisan)
    }catch(error){
        console.log(error.message);
    }
},


updateArtisan: async (req,res)=>{
try{    const artisan = await artisanModel.findByIdAndUpdate(
    req.params.id,
        req.body,
        {new:true}
        );
        res.json(artisan);
}catch(error){
console.log(error.message);
}
}







};


