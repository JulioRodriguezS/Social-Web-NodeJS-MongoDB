const path = require('path')
const fs = require('fs')
const {Image} = require('../models')
const helpers = require('../helpers/libs')

const ctrl = {}

ctrl.index = async  (req, res, next)=>{
    const image = await Image.findOne({partFileName:req.params.image_id}).lean()
    res.render('image', {image})
}

ctrl.create = async (req, res, next)=>{
    ctrl.saveImage(req,res,next)
}

ctrl.saveImage = async (req,res,next)=>{
    let randomName = helpers.randomName()
    let findImage = Image.find({fileName:randomName})
    if(findImage.lenght > 0){
        ctrl.saveImage(req,res,next)
    }
    else{
        const ext = path.extname(req.file.originalname).toLowerCase()
        const tempPath = req.file.path
        const targetPath = path.resolve(`src/public/upload/${randomName}${ext}`)
        
        if(ext==".jpg" || ext==".jpeg" || ext==".png" || ext==".gif"){
            await fs.rename(tempPath, targetPath)
            let newImage = new Image({
                title: req.body.title,
                description: req.body.description,
                fullFileName: randomName + ext,
                partFileName: randomName
            })
    
            await newImage.save()
            .then(()=>{
                console.log('image data saved')
                res.redirect(`/images/${randomName}`)
            })
            .catch()
        }   
        else{
            await fs.unlink(tempPath)
            res.status(500).json({error:"only images are allowed"})
        }
    }
}

ctrl.like = (req, res, next)=>{

}

ctrl.comment = (req, res, next)=>{
    console.log(req.body)
    res.send('image commented')
}

ctrl.delete = (req, res, next)=>{

}

module.exports = ctrl