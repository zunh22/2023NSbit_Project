var xhr = new XMLHttpRequest();
    var filePath = '../tcpdump_test3.txt';
    xhr.open('GET', filePath, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var fileContent = xhr.responseText;
        const lines = fileContent.split('\n');
        const resultArray = [];
        const num = 1;

      for (let i = 0; i < lines.length; i += 2) {
          if (i + 1 < lines.length) {
              const line1 = lines[i].trim();
              const line2 = lines[i + 1].trim();

              // 정규식을 사용하여 정보 추출
              const timestampMatch = line1.match(/\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d+)\]/);
              const timestamp = timestampMatch ? timestampMatch[1] : null;

              const sourceIpMatch = line2.match(/(\d+\.\d+\.\d+\.\d+)\.(\d+)/);
              const sourceIp = sourceIpMatch ? sourceIpMatch[1] : null;
              const sourcePort = sourceIpMatch ? sourceIpMatch[2] : null;

              const destinationIpMatch = line2.match(/(\d+\.\d+\.\d+\.\d+)\.(\d+)/);
              const destinationIp = destinationIpMatch ? destinationIpMatch[1] : null;
              const destinationPort = destinationIpMatch ? destinationIpMatch[2] : null;

              const flagsMatch = line2.match(/Flags \[([^\]]+)\]/);
              const flags = flagsMatch ? flagsMatch[1] : null;

              const protocolTypeMatch = line2.match(/proto (\w+) \(\d+\)/);
              const protocolType = protocolTypeMatch ? protocolTypeMatch[1] : null;

              const lengthMatch = line2.match(/length (\d+)/);
              const length = lengthMatch ? lengthMatch[1] : null;

              // 추출된 정보를 배열에 저장
              const infoArray = [num, timestamp, sourceIp, sourcePort, destinationIp, destinationPort,0, 0, protocolType, `length ${length}`];
              resultArray.push(infoArray);
              num++;
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
  }
};
  
    // 요청 전송
    xhr.send();


    /*var tbody = document.querySelector("#datatablesSimple tbody");

        for (var i = 0; i < resultArray.length; i++) {
            var row = tbody.insertRow(-1);
            row.setAttribute('data-index', i+1); 
            
            for (var j = 0; j < resultArray[i].length; j++) {
                var cell = row.insertCell(j);
                cell.textContent = resultArray[i][j];
            }
        }
*/