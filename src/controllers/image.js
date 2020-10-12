const path = require('path')
const fs = require('fs')
const { Image, Comment } = require('../models')
const helpers = require('../helpers/libs')
const md5 = require('md5')
const image = require('../models/image')
const ctrl = {}
let viewModel = { image: {}, comments: {} }
let sidebar = require('../helpers/sidebar')

ctrl.index = async (req, res, next) => {
    const tmpImage = await Image.findOne({ partFileName: req.params.image_id })
    if (tmpImage) {
        tmpImage.views++
        await tmpImage.save()
        const image = await Image.findOne({ partFileName: req.params.image_id }).lean()
        viewModel.image = image
        let comments = await Comment.find({ imageId: image._id }).lean().sort({ savedDate: -1 })
        viewModel.comments = comments
        viewModel = await sidebar(viewModel)
        res.render('image', viewModel)
    } else {
        res.redirect('/')
    }
}

ctrl.create = async (req, res, next) => {
    await saveImage(req, res, next)
}

async function saveImage (req, res, next) {
    let randomName = helpers.randomName()
    let findImage = Image.find({ fileName: randomName })
    if (findImage.lenght > 0) {
        await ctrl.saveImage(req, res, next).catch((err)=>{console.log('error:',err)})
    }
    else {
        const ext = path.extname(req.file.originalname).toLowerCase()
        const tempPath = req.file.path
        const targetPath = path.resolve(`src/public/upload/${randomName}${ext}`)

        if (ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".gif") {
            await fs.rename(tempPath, targetPath)
            let newImage = new Image({
                title: req.body.title,
                description: req.body.description,
                fullFileName: randomName + ext,
                partFileName: randomName
            })

            await newImage.save().catch((err)=>{console.log('error:',err)})
            res.redirect(`/images/${randomName}`)
               
        }
        else {
            await fs.unlink(tempPath)
            res.status(500).json({ error: "only images are allowed" })
        }
    }
}

ctrl.like = async (req, res, next) => {
    console.log('params ', req.params)

    const image = await Image.findOne({ partFileName: req.params.image_id })
    if (image) {
        image.likes ++
        await image.save()
        res.json({likes:image.likes})
    }else{
        res.status(500).json({error:'internal error'})
    }
}

ctrl.comment = async (req, res, next) => {
    const partFileName = req.params.image_id
    let image = await Image.findOne({ partFileName: partFileName })

    if (image) {
        const newComment = new Comment(req.body)
        newComment.imageId = image._id
        newComment.gravatar = md5(newComment.email)
        await newComment.save()
        res.redirect(`/images/${partFileName}`)
    } else {
        res.redirect(`/`)
    }
}

ctrl.delete = async (req, res, next) => {
    let partFileName = req.params.image_id
    let image = await Image.findOne({partFileName})
    if(image){
        await fs.unlink(`./src/public/upload/${image.fullFileName}`)
        await Comment.deleteOne({imageId:image._id})
        await image.remove()
        res.json(true)
    }else{
        res.status(500).json({error:'Internal Server Error'})
    }
}

module.exports = ctrl