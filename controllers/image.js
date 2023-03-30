// const Clarifai = require('clarifai');

// const app = new Clarifai.App({
//     apiKey: '4373bc2f4120435ea075b849b8490186'
// });

//app.models.predict(face-detection, req.body.input)

const fetch = require("node-fetch");

const returnClarifaiJSONRequestOptions = (imageUrl) => {    
    const PAT = '10c14f54423e4e5d9c3b8c2f9d7490d6';
    
    const USER_ID = 'giabach99';
    const APP_ID = 'my-first-application';
    
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions =  {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions;

}
const apiCallHandler = (req, res) => {    
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiJSONRequestOptions(req.body.input))
        .then(response => response.json())
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