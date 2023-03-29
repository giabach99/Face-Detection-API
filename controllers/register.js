const registerHandler = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission');
    }   
    const hash = bcrypt.hashSync(password);
    console.log("logging register hash", hash);
    console.log("logging register email", email);
    console.log("register db", db);
    db.transaction(trx => {
        console.log("logging register trx: ", trx);
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            console.log("logging login table insertion response", loginEmail);
            console.log('I am adding to login table');
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    console.log("logging signedin user extracted", user);
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register, err: ', err));
}

module.exports = {
    registerHandler: registerHandler
};