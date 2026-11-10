//SQL
//MySQL
const connection = require('../config/db');
//GET
exports.getAllUsers = (req, res) => {
    connection.query('SELECT * FROM water_bills', (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    });
};



//POST
exports.createUser=(req,res)=>{
    const {meter,consumer,cubic,amount,status}=req.body;
    connection.query('INSERT INTO water_bills (meter_number,consumer_name,cubic_meters_used,total_amount,status) VALUES (?,?,?,?,?)',[meter,consumer,cubic,amount,status],(err,result)=>{
        if(err) throw err;
        res.json({message:'User created successfully',id:result.insertId});
    });
}


//UPDATE
exports.updateUser=(req,res)=>{
    const {consumer,cubic,amount,status,meter}=req.body;
    connection.query('UPDATE water_bills SET consumer_name=?,cubic_meters_used=?,total_amount=?,status=? WHERE meter_number=? ',[consumer,cubic,amount,status,meter],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0)
            res.json({message:'User updated successfully'});
        else
            res.status(404).json({message:'User not found'});
});
}



