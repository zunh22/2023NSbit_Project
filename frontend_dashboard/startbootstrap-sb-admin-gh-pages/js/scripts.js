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
      const response = await fetch('http://localhost:3500/save');
      const ruleSets = await response.json();

      // 처리된 룰셋 정보를 웹 페이지에 출력하는 로직을 작성
      const ruleSetListElement = document.getElementById('ruleSetList');
      ruleSets.forEach(ruleSet => {
          const ruleSetItem = document.createElement('div');
          ruleSetItem.textContent = JSON.stringify(ruleSet);
          ruleSetListElement.appendChild(ruleSetItem);
      });
  } catch (error) {
      console.error('Error fetching rule sets:', error);
  }
}