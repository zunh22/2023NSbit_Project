// 파일 읽기 - XMLHttpRequest 객체 생성
var xhr = new XMLHttpRequest();

// 'packet.txt' 파일 경로
var filePath = 'packet.txt';
var currentPage = 1;
var countRow = 20;

xhr.open('GET', filePath, true);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var dataArray = JSON.parse(xhr.responseText);

        var tbody = document.querySelector("#datatablesSimple tbody");

        for (var i = 0; i < dataArray.length; i++) {
            var row = tbody.insertRow(-1);
            
            for (var j = 0; j < dataArray[i].length; j++) {
                var cell = row.insertCell(j);
                cell.textContent = dataArray[i][j];
            }
        }
    }
};

// 요청 전송
xhr.send();
