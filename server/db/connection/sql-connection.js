const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database("./maindb.db",sqlite.OPEN_READWRITE,(err) => {
    if(err) return console.log(err);
        
})

const db_1 = new sqlite.Database("./final.db",sqlite.OPEN_READWRITE,(err) => {
    if(err) return console.log(err);
}
)



module.exports = {db,db_1}