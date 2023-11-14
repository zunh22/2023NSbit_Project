// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

function getArrayFromLocalStorage(key){
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
function saveArrayToLocalStorage(key, array){
  localStorage.setItem(key, JSON.stringify(array));
}

import {loadData, dataToExport} from '../../js/readPacket_1.js';

function processData(data){
  const myData = dataToExport;
  const array = getArrayFromLocalStorage('myArray1') || [];
  array .push(myData);
  
  var ctx = document.getElementById("myAreaChart1");
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9", "time10"],
      datasets: [{
        label: "Sessions",
        lineTension: 0.3,
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: "rgba(2,117,216,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(2,117,216,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(2,117,216,1)",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: array,
      }],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 10
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 15000,
            maxTicksLimit: 5
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
  if(array.length==10){
    for(var i = 0; i<10; i++){
      array.pop();
    }
  }
  saveArrayToLocalStorage('myArray1', array);

}

loadData((result)=>{
  const myData = dataToExport;
  processData(myData);
});