/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

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

const form = document.getElementById("form");
const Arr = new Array();

form.addEventListener("submit", function(e) {
    e.preventDefault();
    addArr();
});

function addArr(){
    alert("Rulset 입력 완료");
    var action = document.getElementById("Action").value;
    var Protocol = document.getElementById("Protocol").value;
    var Source = document.getElementById("Source").value;
    var Destination = document.getElementById("Destination").value;
    var msg = document.getElementById("msg").value;
    var sid = document.getElementById("sid").value;
    Arr.push([action, Protocol, Source, Destination, msg, sid]);

    console.log(Arr);   
    updateTable();
}

function updateTable(){
    const outputTable = document.getElementById("datatablesSimple");
    console.log(outputTable);

    if(outputTable){
        var tbody = outputTable.getElementsByTagName('tbody')[0];
    }
    console.log(tbody);
    //outputTable.innerHTML = ""; // 표 초기화

    const row = document.createElement("tr");

    for (let j = 0; j < Arr[Arr.length-1].length; j++) {
        const cell = document.createElement("td");
        cell.textContent = Arr[Arr.length-1][j];
        row.appendChild(cell);
    }
    tbody.appendChild(row);

}

function save_ruleset() {
    const form = document.getElementById('dataForm');
  
    // 폼 데이터를 가져와서 서버로 전송하는 함수
    async function sendDataToServer(title, content) {
      try {
        const response = await fetch('localhost:3500/hi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content })
        });
  
        if (response.ok) {
          alert('데이터가 성공적으로 저장되었습니다.');
        } else {
          alert('데이터 저장 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('서버 통신 중 오류 발생:', error);
        alert('서버 통신 중 오류가 발생했습니다.');
      }
    }
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // 폼에서 데이터 가져오기
      const title = form.title.value;
      const content = form.content.value;
  
      // 서버로 데이터 전송
      await sendDataToServer(title, content);
    });
  }
  
