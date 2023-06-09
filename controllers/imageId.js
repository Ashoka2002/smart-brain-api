const imageIdHandler = (req,res,db)=>{
    const { id } = req.params;
    db.select('*').from('users')
        .where({ id })
        .then(user => {

            if (user.length) {
                res.json(user[0]);
            }
            else {
                res.status(404).json("not found");
            }
        })
        .catch(err => res.status(400).json("error getting profile"))
}

module.exports = {
    imageIdHandler:imageIdHandler
}