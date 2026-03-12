export default function errormidware(err, req, res, next) {
    console.error(err)
    res.status(err.status || 500)
    res.json({
        status: err.status || 500,
        message: err.message,
    })

}