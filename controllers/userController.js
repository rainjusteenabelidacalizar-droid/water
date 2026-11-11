
// //SQL (query) — mySQL
const connection = require('../config/db');

exports.getAllUsers = (req, res) => {
    connection.query('SELECT * FROM enrollment_bills', (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    });
};

//POST — Create
exports.createUser=(req,res)=>{
    const {studId,name,course,units,tuition}=req.body;  
    connection.query('INSERT INTO enrollment_bills (student_id,student_name,course_program,units_enrolled,tuition_total,) VALUES (?,?,?,?,?)',[studId,name,course,units,tuition],(err,result)=>{
        if(err) throw err;
        res.json({message:'enrollment created successfully',id:result.insertId});
    });
};

//PUT (update/edit)
exports.updateUser=(req,res)=>{
    const {id,studId,name,course,units,tuition}=req.body; 
    connection.query(
        "UPDATE enrollment_bills SET student_id=?, student_name=?, course_program=?, units_enrolled=?, tuition_total=?, department=? WHERE id=?",[studId,name,course,units,tuition,id], (err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0)
            res.json({message:'enrollment updated successfully'});
        else
            res.status(404).json({message: 'User not found'});
    });
};
