// controllers/projectController.js
const db = require('../models/maria');
const { pool } = db;



// SELECT (조회하기)
const getAllRules = async (req, res) => {
  const ruleLists = await rules.findAll();/*{
      attributes: {
      exclude: ['email', 'password']
    }
  });
  */
  res.send(ruleLists);
};


const getRule = async (req, res) => {
  const { data } = req.body; // 클라이언트에서 전달된 데이터를 요청에서 추출합니다.

  const rule = await rules.findOne({
    where: {
      // 클라이언트에서 전달한 데이터와 데이터베이스 열을 비교하여 일치 여부를 확인합니다.
      action: data.action,
      protocol: data.protocol,
      src_ip: data.src_ip,
      src_port: data.src_port,
      d: data.d,
      dst_ip: data.dst_ip,
      dst_port: data.dst_port,
      option: data.option
    }
  });

  if (rule) {
    res.send(rule); // 일치하는 규칙을 클라이언트에게 반환
  } else {
    res.status(404).send({ message: '일치하는 데이터를 찾을 수 없습니다' });
  }
};


/*const getRule = async (req, res) => {
  const { id } = req.params;

  const rule = await rules.findOne({
      attributes: {
      exclude: ['email', 'password']
    },
    
    where: { id }
  });

  if (rule) res.send(rule);
  else res.status(404).send({ message: '존재하지 않는 ID 입니다' });
};
*/

// INSERT (추가하기)
const postRule = async (req, res) => {
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
    connection.release(); // 연결 반환
  }
};

// UPDATE (갱신하기)
const putRule = async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;

  const result = await rules.update(newInfo, { where: { id } });
  if (result[0]) {
    const rule = await rules.findOne({
/*      attributes: {
        exclude: ['email', 'password']
      },*/
      where: { id }
    });
    res.send(rule);
  } else res.status(404).send({ message: '존재하지 않는 ID 입니다' });
};


module.exports = {
  getAllRules,
  getRule,
  postRule,
  putRule,
};