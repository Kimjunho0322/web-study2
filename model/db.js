var Sequelize = require('sequelize');
var sequelize;

sequelize = new Sequelize('myServer', 'root', 'ksj97413506^^',{
    host:"localhost",
    port:3306,
    dialect:'mysql',
    timezone:'+09:00',
    define: {
        charset:'utf8',
        collate:'utf8-general_ci',
        timestamp:true,
        freezeTableName:true
    }
        
})

var db = {};

db.sequelize = sequelize;
db.sequelize = Sequelize;

module.exports = db;