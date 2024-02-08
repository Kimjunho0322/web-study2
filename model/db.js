var Sequelize = require('sequelize');
var sequelize;

sequelize = new Sequelize('myServer', 'root', 'ksj97413506^^',{
    host:"localhost",
    port:3306,
    dialect:'mysql',
    timezone:'+09:00',
    define: {
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci',
        timestamp:true,  //시간을 자동으로 생성해줌
        freezeTableName:true
    }   
})


var db = {};

db.users = sequelize.import(__dirname + '/users.js')

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;