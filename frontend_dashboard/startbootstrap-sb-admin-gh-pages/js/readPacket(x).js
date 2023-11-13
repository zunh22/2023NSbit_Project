// 파일 읽기 - XMLHttpRequest 객체 생성
var xhr = new XMLHttpRequest();

// 'packet.txt' 파일 경로
var filePath = 'tcpdump_test3.txt';
var currentPage = 1;
var countRow = 20;

xhr.open('GET', filePath, true);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var fileContent = xhr.responseText;

        const regex = /(\d{2}:\d{2}:\d{2}.\d{6})\s+(\d+\.\d+\.\d+\.\d+)\.(\d+)\s+>\s+(\d+\.\d+\.\d+\.\d+)\.(\d+):\s+([\da-f:]+)\s+>\s+([\da-f:]+),\s+ethertype\s+(\w+)\s+\(0x\w+\),\s+length\s+(\d+)/g;
  
        let resultArray = [];
        let match;
        const num = 1;
        while((match = regex.exec(fileContent)) !== null) {
          const [, timestamp, sourceIP, sourcePort, destinationIP, destinationPort, sourceMac, destinationMac, protocol, length] = match;
          const lineArray = [num, timestamp, sourceIP, sourcePort, sourceMac, destinationIP, destinationPort, destinationMac, protocol, 'length ${length}'];
          resultArray.push(lineArray);
          num++;
          document.write(resultArray);
        }

        var tbody = document.querySelector("#datatablesSimple tbody");

        for (var i = 0; i < resultArray.length; i++) {
            var row = tbody.insertRow(-1);
            row.setAttribute('data-index', i+1); 
            
            for (var j = 0; j < resultArray[i].length; j++) {
                var cell = row.insertCell(j);
                cell.textContent = resultArray[i][j];
            }
        }
    }
};

xhr.send();
