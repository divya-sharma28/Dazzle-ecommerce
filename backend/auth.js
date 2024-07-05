import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.access_token;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            // const token = authHeader
            jwt.verify(token, process.env.SECRETKEY, (error, user) => {
                if (error) {
                    res.status(401).json({
                        message: 'Invalid token'
                    })
                }
                else {
                    req.user = user;
                    next()
                }
            });

        }
        else {
            res.status(401).json({
                message: 'Token not found!'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }

}


export const verifyUser = (req, res, next) => {
    try {
        verifyToken(req, res, () => {
            console.log(req.user._id)
            console.log(req.params.userID)
            if (req.user._id === req.params.userID || req.user.isAdmin) {
                next()
            }
            else {
                res.status(403).json({
                    message: 'You are not authorized!'
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }
}
export const verifyAdmin = (req, res, next) => {
    try {
        verifyToken(req, res,  () => {
            // console.log(req.user.isAdmin)
            if (req.user.isAdmin) {
                next()
            }
            else {
                res.status(403).json({
                    message: 'You are not authorized!'
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }
}