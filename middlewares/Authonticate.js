var jwt = require('jsonwebtoken');



const Auth = (req, res, next) => {
   
    if (req.headers.authorization) {
         const token = req.headers.authorization.split(" ")[1]
      try {
        var decoded = jwt.verify(token, "secret");
        if (decoded) {
          req.body.userID = decoded.userID;
          next();
        }
      } catch (error) {
        res.send({ mesg: "something  went wrong" });
      }
    } else {
      res.send({ response: "please login.." });
    }
};

module.exports = {Auth}