const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: (req, res, next) => {
        try {
            let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
            next()
        } catch (error) {
            // throw new Error('eror')
            return res.status(500).json({
                message: 'Please sign in to access this page!'
            })
        }
    },

    isAdmin: (req, res, next) =>  {
        // console.log(req.headers.apptoken)
        try {
            let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)
            if(decoded.role == 'admin') {
                next()
            } else {
                throw new Error('You are not Admin')
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Admin only can access this page!',
                err: error
            })
        }
    },

    authorization: (req, res, next) => {
        try {
            let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)
            if(decoded.role == 'admin') {
                next()
            }
            else if(req.params.userId == decoded.id) {
                next()
            } else {
                throw new Error('You are not Admin')
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Admin only can access this page!',
                err: error
            })
        }
    }

}
