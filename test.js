const axios = require('axios');
import fetch from "node-fetch";

// 데이터를 JSON 형식으로 구성
const newRule = {
  action: 'sampleAction',
  protocol: 'sampleProtocol',
  src_ip: 'sampleSrcIP',
  src_port: 'sampleSrcPort',
  d: 'sampleD',
  dst_ip: 'sampleDstIP',
  dst_port: 'sampleDstPort',
  option: 'sampleOption',
};

// HTTP POST 요청을 보내어 데이터 추가
fetch('http://localhost:3500/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newRule),
})
  .then(response => response.json())
  .then(data => {
    console.log('데이터가 성공적으로 추가되었습니다.');
    console.log(data);
  })
  .catch(error => {
    console.error('데이터 추가 중 오류 발생:', error);
  });

