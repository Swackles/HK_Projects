const mysql = require('mysql');

const con = mysql.createConnection({
    host: "46.101.140.99",
    user: "hk_systemRoot",
    password: "Pa55w0r6!",
    database: "hk_system"
});

module.exports.test = () => {
    con.connect((err) => {
        if (err) throw err;
        console.log("Database connected");
    });
}

module.exports.addClass = (klass, callback) => {
    con.beginTransaction((err) => {
        if (err) callback(err, null);
        con.query("INSERT INTO class (name, optional, teacher, code) VALUES (?, 0, ?, ?)", [klass.name, klass.teacher, klass.code], (err, result) => {
            if (err) con.rollback(() => { callback(err, result); });
            else con.commit((err) => { callback(err, result); });
        });
    });
}

module.exports.getClass = (callback) => {
    con.beginTransaction((err) => {
        if (err) callback(err, null);
        con.query("SELECT * FROM class", (err, result) => {
            if (err) {con.rollback(() => { callback(err, result) })};
            con.commit((err) => { callback(err, result); });
        });
    });
}

module.exports.addHomeowork = (homework, callback) => {
    con.beginTransaction((err) => {
        if (err) callback(err, null);
        con.query("INSERT INTO homework (class_id, text, date) VALUES (?, ?, ?)", [homework.id, homework.text, homework.date], (err, result) => {
            if (err) con.rollback(() => { callback(err, result); });
            else { con.commit((err) => {  callback(err, result); });
            }
        });
    });
}

module.exports.getHomework = (callback) => {
    con.beginTransaction((err) => {
        if (err) callback(err, null);
        con.query("SELECT * FROM homework", (err, result) => {
            if (err) { con.rollback(() => { callback(err, result) })};
            con.commit((err) => { callback(err, result); });
        });
    });
}