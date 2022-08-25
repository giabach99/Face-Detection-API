const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '4373bc2f4120435ea075b849b8490186'
});

const apiCallHandler = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
            .then(data => {
                res.json(data);
            })
            .catch(err => res.status(400).json('unable to work with API'))

}

const imageHandler = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('Unable acessing entries'))
}

module.exports = {
    imageHandler: imageHandler,
    apiCallHandler: apiCallHandler
}