const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + "755086080ae04e1ca901539b6619fb53");

const handleApiCall = (req, res) => {

    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": "clarifai",
                "app_id": "main"
            },
            model_id: "face-detection",
            inputs: [
                { data: { image: { url: req.body.input } } }
            ]
        },
        metadata,
        (err, response) => {
            if (err) {
                res.status(400).json("error fetching api");
                throw new Error(err);
                return;
            }

            if (response.status.code !== 10000) {
                throw new Error("Post model outputs failed, status: " + response.status.description);
                return;
            }

            // Since we have one input, one output will exist here.
            const output = response.outputs[0];
            // console.log("Predicted concepts:");
            // for (const concept of output.data.concepts) {
            //     console.log(concept.name + " " + concept.value);
            // }
            res.json(response)
        }
    );
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