// @ts-nocheck
export function register(req, res, next) {
 res.send('Register Controller')
}

export function login(req,res, next) {
   res.json({
   msg : 'Login Controller',
   body : req.body
 })
}

export const getMe = (req,res, next) => {
 res.json({msg : 'GetMe controller'})
}
