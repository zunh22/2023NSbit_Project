window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});


// submit 클릭시 실행
document.getElementById('ruleSetForm').addEventListener('submit', function (event) {
    event.preventDefault(); // 기본 제출 동작 막기
    saveRuleSet(); // saveRuleSet 함수 호출
});

// 룰셋 저장
async function saveRuleSet() {
  const protocol= document.getElementById('protocol').value;
  const src_ip = document.getElementById('src_ip').value;
  const src_port = document.getElementById('src_port').value;
  const dst_ip = document.getElementById('dst_ip').value;
  const dst_port = document.getElementById('dst_port').value;
  const option = document.getElementById('option').value;
  const flag = document.getElementById('flag').value;

  const data = {
      protocol,
      src_ip,
      src_port,
      dst_ip,
      dst_port,
      option,
      flag
  };
//try
  try {
      const response = await fetch('http://localhost:3500/save', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (response.ok) {
          alert('Rule set saved successfully');
      } else {
          alert('Error saving rule set');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Error saving rule set');
  }
}


// 룰셋 출력
async function fetchRuleSets() {
    try {
      const response = await fetch('http://localhost:3500/get');
      const ruleSets = await response.json();
  
      const ruleSetListElement = document.querySelector('#datatablesSimple tbody');

      ruleSets.forEach(ruleSet => {
        const row = document.createElement('tr');
        // 룰셋의 속성에 따라서 <td>에 정보 입력
        const properties = ['protocol', 'src_ip', 'src_port', 'dst_ip', 'dst_port', 'option', 'flag'];
        properties.forEach(property => {
            const cell = document.createElement('td');
            cell.textContent = ruleSet[property];
            row.appendChild(cell);
        });

        ruleSetListElement.appendChild(row);
    });
    } catch (error) {
      console.error('Error fetching rule sets:', error);
      // 사용자에게 에러 메시지 표시
      const errorElement = document.createElement('div');
      errorElement.textContent = '룰셋을 불러오는 중에 오류가 발생했습니다.';
      document.body.appendChild(errorElement);
    }
  }
  
  document.addEventListener('DOMContentLoaded', fetchRuleSets);