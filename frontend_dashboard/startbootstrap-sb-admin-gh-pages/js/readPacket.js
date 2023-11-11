// 파일 읽기를 위한 XMLHttpRequest 객체 생성
var xhr = new XMLHttpRequest();

// 'packet.txt' 파일 경로
var filePath = 'packet.txt';

// GET 요청을 사용하여 파일 읽기 시도
xhr.open('GET', filePath, true);

xhr.onreadystatechange = function () {
    // 요청이 성공적으로 완료되었을 때
    if (xhr.readyState == 4 && xhr.status == 200) {
        // 읽어온 텍스트를 JSON 파싱하여 배열로 저장
        var dataArray = JSON.parse(xhr.responseText);

        // 테이블의 tbody 찾기
        var tbody = document.querySelector("#datatablesSimple tbody");

        // 각 행을 반복하여 tbody에 추가
        for (var i = 0; i < dataArray.length; i++) {
            // 새로운 행(tr) 엘리먼트 생성
            var row = tbody.insertRow(-1);

            // 각 셀(td)에 데이터 추가
            for (var j = 0; j < dataArray[i].length; j++) {
                var cell = row.insertCell(j);
                cell.textContent = dataArray[i][j];
            }
        }
    }
};

// 요청 전송
xhr.send();
