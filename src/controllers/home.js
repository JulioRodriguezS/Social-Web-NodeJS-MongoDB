const ctrl = {}
const { Image } = require('../models')
const sidebar = require('../helpers/sidebar')

ctrl.index = async (req, res, next) => {
    const images = await Image.find({}).lean().sort({ savedDate: -1 })
    let viewModel = { images: [] }
    viewModel.images = images
    viewModel = await sidebar(viewModel)
    
    res.render('index', viewModel)
}


module.exports = ctrl