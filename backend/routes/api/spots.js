const express = require('express')

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot ,SpotImage, User, ReviewImage, Review} = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const { check } = require('express-validator');

const router = express.Router();

 const validateSpot = [
    check('address').exists({checkFalsy:true}).withMessage('Street address is required'),
    check('city').exists({checkFalsy:true}).withMessage('City is required'),
    check('state').exists({checkFalsy:true}).withMessage("State is required"),
    check('country').exists({checkFalsy:true}).withMessage("Country is required"),
    check('lat').isDecimal({min:-90,max:90}).withMessage('Latitude is not valid'),
    check('lng').isDecimal({min:-180,max:180}).withMessage("Longitude is not valid"),
    check('name').exists({checkFalsy:true}).isLength({max:50}).withMessage("Name must be less than 50 characters"),
    check('description').exists({checkFalsy:true}).withMessage("Description is required"),
    check('price').exists({checkFalsy:true}).withMessage("Price per day is required"),
    handleValidationErrors

 ]
 const validateReview = [
    check('review').exists({checkFalsy:true}).withMessage("Review text is required"),
    check('stars').exists({checkFalsy:true}).isInt({min:1,max:5}).withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors

 ]
//get review by spot
 router.get('/:spotId/reviews',async(req,res)=>{
    const reviews = await Review.findAll({
        where:{
            spotId:req.params.spotId
        },
        include:[
            {
                model:User,
                as:'User',
                attributes:['id','firstName','lastName']
            },
            {
                model:ReviewImage,
                as:'ReviewImages',
                attributes:['id','url']
            }

        ]
    });
    return res.json(reviews)


 })

 //create review for a spot
 router.post('/:spotId/reviews',validateReview, async(req,res)=>{
    const {user} = req;
    if(user){
        const {review,stars} = req.body;
        const spot =await Spot.findByPk(parseInt(req.params.spotId),{
            include:[
                {
                    model:Review,
                    as:'Reviews'
                }
            ]
        });
        if(!spot){
            return res.status(404).json({
                message:"Spot couldn't be found"
            })
        }
        const existedReview =await Review.findOne({
            where:{
                spotId:req.params.spotId,
                userId:user.id
            }
        })
        if(existedReview){
            return res.status(500).json({
                message: "User already has a review for this spot"
            })
        }
        
        const newReview =await Review.create({
            spotId:req.params.spotId,
            userId:user.id,
            review,
            stars
        });
       
       

        const totalStars =await Review.sum('stars',{
            where:{
                spotId:req.params.spotId
            }
        })
        let notRoundedStarRating = totalStars/spot.Reviews.length;
        spot.avgStarRating = Number(notRoundedStarRating).toFixed(1);
        spot.numReviews = spot.Reviews.length;
        
        await spot.save();
        console.log(spot.avgStarRating)
        return res.json(newReview);


    }else{
        return res.status(401).json({
            message:"Authentication required"
        })
    }

 })


//get spot owned by current user
 router.get('/current',async(req,res)=>{
    const {user} = req;
    if(user){
        const id = user.id;
        const ownedSpots = await Spot.findAll({
            where:{
                ownerId:id
            }
        });
        return res.json(ownedSpots)
    }
    
    return res.status(401).json({
        message:"Authentication required"
    })


});

//get spot detail by id
router.get('/:spotId',async(req,res)=>{
    const spot = await Spot.findByPk(parseInt(req.params.spotId),{
        attributes:['id','ownerId','address','city','state','country','lat','lng','name','description','price','createdAt','updatedAt','numReviews','avgStarRating'],
        include:[{
            model:SpotImage,
            as:'SpotImages',
            attributes:['id','url','preview']
        },
    {
        model:User,
        as:'Owner',
        attributes:['id','firstName','lastName']
    }]
        
    });
    return res.json(spot);
})

//get all spots
router.get('/',async(req,res)=>{
    const spots =await Spot.findAll();
   return res.json(spots)

});

//create new spot
router.post('/',validateSpot,async(req,res)=>{
    const {user} = req;
    if(user){
    const {address,city,state,country,lat,lng,name,description,price} = req.body;
    const id =user.id;
    const newSpot = await Spot.create({
        ownerId:id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    return res.json(newSpot)
}else{
    return res.status(401).json({
        message:"Authentication required"
    })
}
})

//create image for spot
router.post('/:spotId/images',async(req,res)=>{

    const {user} = req;
    if(user){
        const id = user.id;
        const ownedSpots = await Spot.findByPk(parseInt(req.params.spotId))
            if(!ownedSpots){
                return res.status(404).json({
                    message:"Spot couldn't be found"
                })
            }
        if(ownedSpots.ownerId===id){
            const {url,preview} = req.body
            const newImage = await SpotImage.create({
                spotId:req.params.spotId,
                url,
                preview
            });
            return res.json(newImage);
        }else{
            return res.status(403).json({
                message:"Forbidden"
            })
        }

        

    }
    return res.status(401).json({
        message:"Authentication required"
    })
    
})

//update spot information
router.put('/:spotId',async(req,res)=>{
    const {user} = req;
    if(user){
        const spotToUpdate = await Spot.findByPk(parseInt(req.params.spotId),{
            attributes:['id','ownerId','address','city','state','country','lat','lng','name','description','price']
        });
        if(spotToUpdate){
            if(spotToUpdate.ownerId===user.id){
            const {address,city,state,country,lat,lng,name,description,price} = req.body;
           if(address) spotToUpdate.set({address});
           if(city) spotToUpdate.set({city});
           if(state) spotToUpdate.set({state});
           if(country) spotToUpdate.set({country});
           if(lat) spotToUpdate.set({lat});
           if(lng) spotToUpdate.set({lng});
           if(name) spotToUpdate.set({name});
           if(description) spotToUpdate.set({description});
           if(price) spotToUpdate.set({price});
            await spotToUpdate.save();
            return res.json(spotToUpdate);
        }else{
            return res.status(403).json({
                message:"Forbidden"})
        }

        }else{
            return res.status(404).json({
                message:"Spot couldn't be found"})
        }

    }else{
        return res.status(401).json({
            message:"Authentication required"})
    }
});

//delete spot
router.delete('/:spotId',async(req,res)=>{
    const{user}=req;
    if(user){
        const spotToDelete = await Spot.findByPk(parseInt(req.params.spotId));
        if(spotToDelete){
            if(spotToDelete.ownerId===user.id){
                await spotToDelete.destroy();
                return res.json({
                    message:"Successfully deleted"
                })
            }else{
                return res.status(403).json({
                    message:"Forbidden"})
            }
        }else{
            return res.status(404).json({
                message:"Spot couldn't be found"})
        }
    }
    return res.status(401).json({
        message:"Authentication required"})
})
    


module.exports = router;