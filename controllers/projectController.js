// controllers/projectController.js
const db = require('../models/maria');
const { pool } = db;

// INSERT (추가하기)
const postRule = async (req, res) => {
  res.send('Hello from /post!');
  const {protocol, src_ip, src_port, dst_ip, dst_port, option, flag} = req.body;

  try {
    const connection = await pool.getConnection(); // 풀에서 연결 가져오기
    const query = 'INSERT INTO rule (protocol, src_ip, src_port, dst_ip, dst_port, option, flag) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await connection.query(query, [protocol, src_ip, src_port, dst_ip, dst_port, option, flag]); // 쿼리 실행
    res.status(200).send('데이터가 성공적으로 저장되었습니다.');
  } catch (error) {
    console.error('데이터 저장 오류:', error);
    res.status(500).send('데이터 저장 중 오류가 발생했습니다.');
  } finally {
    //res.status(200).send('데이터가 성공적으로 저장되었습니다.');
    res.send('Hello from /post!');
    connection.release(); // 연결 반환
  }
};

/*
// UPDATE (갱신하기)
const putRule = async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;

  const result = await rules.update(newInfo, { where: { id } });
  if (result[0]) {
    const rule = await rules.findOne({
      attributes: {
        exclude: ['email', 'password']
      },
      where: { id }
    });
    res.send(rule);
  } else res.status(404).send({ message: '존재하지 않는 ID 입니다' });
};
*/

module.exports = {
 // getAllRules,
 // getRule,
  postRule,
 // putRule,
};