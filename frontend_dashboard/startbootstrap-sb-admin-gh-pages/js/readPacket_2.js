var xhr = new XMLHttpRequest();
var filePath = 'tcpdump_test2.txt';
var currentPage = 1;
var rowsPerPage = 10;

var dataToExport = 0;

function loadData(callback){
    xhr.open('GET', filePath, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var fileContent = xhr.responseText;
            const lines = fileContent.split('\n');
            const resultArray = [];
    
            for (let i = 0; i < lines.length; i += 2) {
                if (i + 1 < lines.length) {
                    const line1 = lines[i].trim();
                    const line2 = lines[i + 1].trim();
            
                    // line1에서 정보 추출
                    const timestampMatch1 = line1.match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d+)/);
                    const timestamp1 = timestampMatch1 ? timestampMatch1[1] : null;
    
                    const sourceMacMatch1 = line1.match(/(\w+:\w+:\w+:\w+:\w+:\w+) > (\w+:\w+:\w+:\w+:\w+:\w+)/);
                    const sourceMac1 = sourceMacMatch1 ? sourceMacMatch1[1] : null;
                    const sourceMac2 = sourceMacMatch1 ? sourceMacMatch1[2] : null;
             
                    // line2에서 정보 추출
                    const sourceIpMatch2 = line2.match(/(\d+\.\d+\.\d+\.\d+)\.(\d+) > (\d+\.\d+\.\d+\.\d+)\.(\d+)/);
                    const sourceIp2 = sourceIpMatch2 ? sourceIpMatch2[1] : null;
                    const sourcePort2 = sourceIpMatch2 ? sourceIpMatch2[2] : null;
                    const destinationIp2 = sourceIpMatch2 ? sourceIpMatch2[3] : null;
                    const destinationPort2 = sourceIpMatch2 ? sourceIpMatch2[4] : null;
            
                    const protocolTypeMatch2 = line1.match(/proto (\w+) \(\d+\)/);
                    const protocolType2 = protocolTypeMatch2 ? protocolTypeMatch2[1] : null;
            
                    const lengthMatch2 = line1.match(/length (\d+)/);
                    const length2 = lengthMatch2 ? lengthMatch2[1] : null;
            
                    // 추출된 정보를 배열에 저장
                    const infoArray = [timestamp1, sourceIp2, sourcePort2, sourceMac1, destinationIp2, destinationPort2, sourceMac2,  protocolType2, `${length2}`];
                    resultArray.push(infoArray);
                }
            }
    
            var tbody = document.querySelector("#datatablesSimple tbody");
            var startIdx = (currentPage - 1)*rowsPerPage;
            var endIdx = startIdx + rowsPerPage;
    
            tbody.innerHTML = "";
            for (var i = startIdx; i < endIdx && i < resultArray.length; i++) {
                var row = tbody.insertRow(-1);
                row.setAttribute('data-index', i + 1);
    
                for (var j = 0; j < resultArray[i].length; j++) {
                    var cell = row.insertCell(j);
                    cell.textContent = resultArray[i][j];
                }
            }
            dataToExport = resultArray.length;

            if(callback){
                callback(dataToExport);
            }
        }
    };
    
    // 요청 전송
    xhr.send();
}

function nextPage() {
    currentPage++;
    loadData();
}
function previousPage() {
    if(currentPage > 1){
        currentPage--;
        loadData();
    }
}

loadData();

export {loadData, dataToExport};
//export default dataToExport;