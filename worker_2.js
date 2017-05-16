const $  = require('jquery');
const chart  = require('chart.js');
const {ipcRenderer} = require('electron');

const canv = $('#chart');
const but = $('.update');



let data_num =[];
const randomizator = (count)=>{
    let arr = [];
    for (let i = 0; i < count; i++){
        arr.push(Math.floor((Math.random() * 100) + 1));
    }
    return arr;
};
data_num = randomizator(7);
let data = {
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: data_num
        },
    ]
};
const myRadarChart = new chart(canv, {
    type: 'radar',
    data: data,
    options: {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
});
but.on('click', () => {
    myRadarChart.data.datasets[0].data = randomizator(7);
    myRadarChart.update()
});
//
ipcRenderer.on('async', msg => {
    console.log('ping received', msg) // 'ping received hello!!
    if(confirm('are you sure fuck without us?')){
        ipcRenderer.send('exit',true);
    }
});

// ipcRenderer.on('async', (event, arg) => {
//     // Print 1
//     console.log(arg);
//     // Reply on async message from renderer process
//     event.sender.send('async-reply', 2);
// });