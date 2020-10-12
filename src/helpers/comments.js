const { Comment, Image } = require('../models')

module.exports = {

    async newest() {

        let comments = await Comment.find({}).lean()
            .limit(5)
            .sort({ savedDate: -1 })

        for (let comment of comments) {
            const image = await Image.findOne({ _id: comment.imageId }).lean()
            comment.image = image
        }
        return comments
    }
}