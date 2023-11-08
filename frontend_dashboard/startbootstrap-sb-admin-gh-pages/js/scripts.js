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

    //outputTable.innerHTML = ""; // 표 초기화

    const row = document.createElement("tr");

    for (let j = 0; j < Arr[Arr.length-1].length; j++) {
        const cell = document.createElement("td");
        cell.textContent = Arr[Arr.length-1][j];
        row.appendChild(cell);
    }
    outputTable.appendChild(row);

    /*for (let i = 0; i < Arr.length; i++) {
        const row = document.createElement("tr");

        
        for (let j = 0; j < Arr[i].length; j++) {
          const cell = document.createElement("td");
          cell.textContent = Arr[i][j];
          row.appendChild(cell);
        }
        outputTable.appendChild(row);
      }*/
}


// // 표 머릿말과 바닥글 데이터
// const tableHeadData = ["Action", "Protocol", "Source IP", "Destination IP", "MSG", "SID"];
// const tableFootData = ["Action", "Protocol", "Source IP", "Destination IP", "MSG", "SID"];

// // 표 머릿말 생성 함수
// function createTableHead() {
//   const tableHead = document.querySelector("thead tr");

//   for (let i = 0; i < tableHeadData.length; i++) {
//     const th = document.createElement("th");
//     th.textContent = tableHeadData[i];
//     tableHead.appendChild(th);
//   }
// }

// // 표 바닥글 생성 함수
// function createTableFoot() {
//   const tableFoot = document.querySelector("tfoot tr");

//   for (let i = 0; i < tableFootData.length; i++) {
//     const th = document.createElement("th");
//     th.textContent = tableFootData[i];
//     tableFoot.appendChild(th);
//   }
// }

// // 초기 테이블 머릿말과 바닥글 생성
