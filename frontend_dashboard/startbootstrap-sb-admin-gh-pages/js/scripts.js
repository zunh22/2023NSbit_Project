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

// const form = document.getElementById("form");
// const Arr = new Array();

// form.addEventListener("submit", function(e) {
//     e.preventDefault();
//     addArr();
// });

<<<<<<< HEAD
// function addArr(){
//     alert("Rulset 입력 완료");
//     // var action = document.getElementById("Action").value;
//     // var Protocol = document.getElementById("Protocol").value;
//     // var Source = document.getElementById("Source").value;
//     // var Destination = document.getElementById("Destination").value;
//     // var msg = document.getElementById("msg").value;
//     // var sid = document.getElementById("sid").value;
//     // Arr.push([action, Protocol, Source, Destination, msg, sid]);
//     save_ruleset();
=======
function addArr(){
    alert("Rulset 입력 완료");
    var protocol = document.getElementById("protocol").value;
    var src_ip = document.getElementById("src_ip").value;
    var src_port = document.getElementById("src_port").value;
    var dst_ip = document.getElementById("dst_ip").value;
    var dst_port = document.getElementById("dst_port").value;
    var option = document.getElementById("option").value;
    var flag = document.getElementById("flag").value;
    Arr.push([protocol, src_ip, src_port, dst_ip, dst_port, option, flag]);
>>>>>>> 75c0280f4f011f86659616408500a9d96f256901


//     // updateTable();
// }

// // function updateTable(){
// //     const outputTable = document.getElementById("datatablesSimple");
// //     if(outputTable){
// //         var tbody = outputTable.getElementsByTagName('tbody')[0];
// //     }
// //     const row = document.createElement("tr");

// //     for (let j = 0; j < Arr[Arr.length-1].length; j++) {
// //         const cell = document.createElement("td");
// //         cell.textContent = Arr[Arr.length-1][j];
// //         row.appendChild(cell);
// //     }
// //     tbody.appendChild(row);
// //     save_ruleset();

// // }

// function save_ruleset() {
  
//     // 폼 데이터를 가져와서 서버로 전송하는 함수
//     async function sendDataToServer(title, content) {
//       try {
//         const response = await fetch('localhost:3500/hi', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ title, content })
//         });
  
//         if (response.ok) {
//           console.log("check");
//           alert('데이터가 성공적으로 저장되었습니다.');
//         } else {
//           console.log("non-check");
//           alert('데이터 저장 중 오류가 발생했습니다.');
//         }
//       } catch (error) {
//         console.error('서버 통신 중 오류 발생:', error);
//         alert('서버 통신 중 오류가 발생했습니다.');
//       }
//     }
  
//   }

//   form.addEventListener("submit", function (e) {
//     e.preventDefault(); // 폼 제출 기본 동작 막기

//     // 폼 데이터 가져오기
//     const content = document.getElementById('content').value;
//     const Protocol = document.getElementById('Action').value;
//     const Source = document.getElementById('Source').value;
//     const Destination = document.getElementById('Destination').value;
//     const msg = document.getElementById('msg').value;
//     const sid = document.getElementById('sid').value;
    
//     // 서버로 데이터 전송
//     sendDataToServer(content, Protocol, Source, Destination, msg, sid);
//   });

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