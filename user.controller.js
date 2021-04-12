const { User } = require('../models');
const jwt = require('jsonwebtoken');
const {mongoUrl, privateKey} = require('../config');

var custId;

const create = async (req, res) => {
    console.log('create User');
  
    const { name,age,address,pinCode,city,district,state,country,email,password } = req.body;
  
    let status;
    let message;
  
    try {
      const user = new User({ 
          custId:name+age,
          name:name,
          age:age,
          address:address,
          pinCode:pinCode,
          city:city,
          district:district,
          state:state,
          country:country,
          email:email,
          password:password

      });
      await user.save();
      status = 200;
      message = 'User create successfully';
    } catch (err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request';
    }
  
    res.status(status).send({ message });
  }

  const getAllUser = async (req, res) => {
    let status;
    let message;
  
    const { filterByName } = req.query;
    
    console.log(filterByName);
    try {
      const query = {};
      if (filterByName) {
        query['name'] = filterByName;
      }
      message = await User.find(query);
      status = 200;
    } catch(err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request'
    }
    res.status(status).send({ message: message.map((user) => ({
        custId:user.custId,
        name:user.name,
        age:user.age,
        address:user.address,
        pinCode:user.pinCode,
        city:user.city,
        district:user.district,
        state:user.state,
        country:user.country,
        email:user.email,
        password:user.password
    })) });
  }

  const deleteByCustID = async (req, res) => {
    console.log(req.params);
    const { custId } = req.params;
  
    let status;
    let message;
  
    try {
      const user = await User.findOneAndDelete({ custId: custId });
      status = 200;
      message = custId+" deleted";
  
    } catch(err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request!!!'
    }
  
    res.status(status).send({ message });
  }

const encrypt = (t) =>t; 

const loginFunction= async (req, res) => {
  const { email, password } = req.body;
  const usersInfo = await User.find({email:email});

  //let user = getAllUser(req,res).filter((x) => x.email === email) || null;
  //user = (user  && user[0] ) || null;
  console.log(usersInfo[0].password);

if (usersInfo !== null) {
  if (usersInfo[0].password === encrypt(password)) {
    // login should be successfull
    token = jwt.sign({ username: email }, privateKey);
    res.status(200).send({ message: "Login Success", token })
  } else {
    // login pwd / email mismatch
    res.status(401).send({ message: "Unauthorized Access"})
  }
} else {
  // user does not exit;
  res.status(404).send({ message: "Not found"});
}
}


  const auth = (req, res, next) => {
    if (req.headers) {
      console.log(req.headers);
      if (req.headers.authorization) {
        const [bearer, token] = req.headers.authorization.split(" "); // Bearer <token>
        const decode = jwt.verify(token, privateKey);
        console.log(decode);
        if (decode['username']) {
          req.username = decode['username'];
          next()
        }
      }
    }
    res.status(401).send('Unauthorised from middleware');
  }
  
  module.exports = {
    create,
    getAllUser,
    deleteByCustID,
    auth,
    loginFunction
  }