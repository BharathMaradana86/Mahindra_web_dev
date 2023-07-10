
const {getdatafromdate} = require('./dashboard.services')

module.exports = {
    getData: (req,res) => {
        const body = "";
        getdatafromdate(body,(err,results) => {
                    if(err){
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection errror"
                          });
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results
                      });
                })
    }
}
