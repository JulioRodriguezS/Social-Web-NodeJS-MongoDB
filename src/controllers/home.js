const ctrl = {}
const {Image} = require('../models')

ctrl.index = async (req,res,next)=>{
    const images = await Image.find({}).lean().sort({savedDate:-1})
    res.render('index',{images})
}   


module.exports = ctrl