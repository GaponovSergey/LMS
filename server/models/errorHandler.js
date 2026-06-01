
export default function errorHandler(req, res, err) {

    if (req.transaction) req.transaction.rollback();
        
    res.status(400);

    console.log(err)
    
    res.json({
        name: err.name,
        message: err.message
    });

}