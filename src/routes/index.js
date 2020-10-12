const home = require('../controllers/home')
const image = require('../controllers/image')

module.exports = (app, express)=>{
    
    const router = express.Router()

    router.get('/',home.index)
    router.get('/images/:image_id',image.index)
    router.post('/images',image.create)
    router.post('/images/:image_id/like/',image.like)
    router.post('/images/:image_id/comment/',image.comment)
    router.delete('/images/:image_id',image.delete)

    app.use(router)
}