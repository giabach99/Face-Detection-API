const signInHandler = (req, res, db, bcrypt) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json('Incorrect form submission');
    }
    console.log('logging db', db);
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(response => {
            console.log('logging signin response:', response);
            const match = bcrypt.compareSync(req.body.password, response[0].hash);
            console.log('logging match var:', match)
            if (match){
                return db.select('*').from('users').where('email', '=', req.body.email)
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json('User not found'))
            }
            else{
                res.status(400).json('Wrong credentials');
            }           
            
        }).catch(err => res.status(400).json('Error signing in, err: ', err))
}

module.exports = {
    signInHandler: signInHandler
};