

module.exports ={ 
    autherize:(req, res, next) => {
        console.log(req.session.name);
        console.log(req.session.userId);

        next();
    }
}