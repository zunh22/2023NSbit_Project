const maria = require('mysql');
 
const conn = maria.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234pkj',
    database: 'project'
});
 
const pool = maria.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234pkj',
  database: 'project',
  connectionLimit: 5,
});

const Rule = {
  create: (data, callback) => {
    const query = 'INSERT INTO rule (protocol, src_ip, src_port, dst_ip, dst_port, option, flag) VALUES (?, ?, ?, ?, ?, ?, ?)';
    conn.query(query, [data.protocol, data.src_ip, data.src_port, data.dst_ip, data.dst_port, data.option, data.flag], (error, results) => {
      if (error) {
        console.error('룰 생성 오류:', error);
        if (callback) callback(error);
        return;
      }
      if (callback) callback(null, results);
    });
  },
  findAll: (callback) => {
        const query = 'SELECT * FROM rule';
        conn.query(query, (error, results) => {
            if (error) {
                console.error('룰 조회 오류:', error);
                
                return;
            }
            console.log('조회된 룰:', results);
           
        });
    }
};

conn.connect((err) => {
    if (err) {
        console.error('MariaDB connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MariaDB');
});

const newRule = {
  protocol: 'TCP',
  src_ip:'1',
  src_port:'1',
  dst_ip:'1',
  dst_port:'1',
  option:'1',
  flag:'1',
};
Rule.create(newRule,(error, results)=>{
  if (error){
    console.error('룰 생성 중 오류:',error);
  }else{
    console.log('룰이 성공적으로 저장되었습니다.');
  }

});


module.exports = { conn, pool, Rule };



/*
// models/index.js
const { Sequelize, Op, QueryTypes } = require('sequelize');

const sequelize = new Sequelize('project', 'root', '1234pkj', {host: 'localhost', dialect: 'mysql' });

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;
db.QueryTypes = QueryTypes;


db.rules = require('./rules')(sequelize, Sequelize.DataTypes); // companies 대신 rules로 수정


sequelize
  .sync({ force: false })
  .then(() => {
    console.log('성공 ~');
  })
  .catch((error) => {
    console.log('실패 ~');
    throw error;
  });

module.exports = db;
*/
