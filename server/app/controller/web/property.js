const propertyModel = require("../../model/propertyModel")



let getAllProperty = async (req, res) => {

    try {
        
        let {city,area,pincode,propertyType,bhk,furnishing,maxPrice,minPrice,status,amenities,sort,seller} = req.query
       
        let query = {
            status : 'sale'
        }

        if(seller) query.seller = seller
         if(city) query.city = new RegExp(city , 'i')
          if(area) query.area = new RegExp(area , 'i')
           if(pincode) query.pincode = pincode

         if(propertyType){
            query.propertyType = {$in: propertyType.toLowerCase().split(',') }
         }

         if(bhk){
            if(bhk === '5+'){
                query.bhk = { $gte: '5' }
            }
            else{
                query.bhk =bhk
            }
         }

         if(furnishing){
            let furnishingArray = furnishing.split(',')
             query.furnishing = {
                $in: furnishingArray.map((f) => new RegExp(`^${f.trim()}$` ,'i'))
             } 
         }
          if(status) query.status = status

        if(minPrice || maxPrice){
            query.price = {}
            if(minPrice  && !isNaN(minPrice)) query.price.$gte = Number(minPrice)
            if(maxPrice  && !isNaN(maxPrice)) query.price.$gte = Number(maxPrice)
            if(Object.Keys(query.price).length == 0) delete  query.price
        }
    } 
    
    catch (error) {
        
    }

    let getAllProperty = await propertyModel.find().limit(4).sort({ createdAt: -1 })
    let obj = {
        status: 1,
        message: 'Property Viw',
        staticPath: 'uploads/property/',
        data: getAllProperty
    }
    res.send(obj)
}



// get-singl-property
let getSingleProperty = async (req, res) => {
    let { id } = req.params
    let property = await propertyModel.findOne({ _id: id }).populate('seller', ' firstName lastName email')
    let obj = {
        status: 1,
        message: 'Your Property Details',
        staticPath: 'uploads/property/',
        data: property
    }
    res.send(obj)
}


//get property filters




module.exports = { getSingleProperty, getAllProperty }