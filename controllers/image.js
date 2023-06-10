
const returnClarifaiRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = "755086080ae04e1ca901539b6619fb53";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'zl6yog5lellg';
    const APP_ID = 'my-first-application';
    // Change these to whatever model and image URL you want to use

    // const MODEL_ID = 'face-detection';
    // const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';

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

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions;

}


const handleApiCall = (req, res) => {

    fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnClarifaiRequestOptions(req.body.input))
        .then(response => response.json())
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json("unable to work with API"));

}

const imageHandler = (req, res, db) => {
    const { id } = req.body;
    db('users').where("id", "=", id)
        .increment("entries", 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json("Unable to get entreis"));
}

module.exports = {
    imageHandler: imageHandler,
    handleApiCall: handleApiCall
}