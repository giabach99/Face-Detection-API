const registerHandler = (req, res, db, bcrypt) => {
    console.log(req);
    const {email, name, password} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission');
    }   
    const hash = bcrypt.hashSync(password);
    console.log("logging register hash", hash);
    console.log("logging register email", email);
    // console.log("register db");   


    //  db.transaction(trx => {
    //     console.log("logging register trx: ", trx);
    //     trx.insert({
    //         hash: hash,
    //         email: email
    //     }).into('login').returning('*').then(value => console.log("after login insertion: ", value))});
    // res.json('registered tested OK');


    db.transaction(trx => {
        console.log("logging register trx: ", trx);
        trx.insert({
            hash: hash,
            email: email
        }).into('login').returning('email').then(loginEmail => {
            console.log("logging login table insertion response", loginEmail);
            console.log('I am adding to login table');
            return trx('users').returning('*').insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                }).then(user => {
                    console.log("logging signedin user extracted", user);
                    return res.status(200).json(user[0]);
                })
        }).then(trx.commit).catch(trx.rollback);}).catch(err => res.status(400).json('Unable to register'));
}

module.exports = {
    registerHandler: registerHandler
};