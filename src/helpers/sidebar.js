const stats = require('./stats')
const images = require('./images')
const comments = require('./comments')

module.exports = async (viewModel) =>{
    
    const results = await Promise.all([
        images.popular(),
        stats(),
        comments.newest()
    ])

    viewModel.sidebar = {
        popular: results[0],
        stats: results[1],
        comments: results[2]
    }

    return viewModel
}