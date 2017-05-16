const $  = require('./js/jquery');
const chart  = require('./js/Chart.min.js');
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
            backgroundColor: "rgba(0,0,0, 0.5)",
            borderColor: "rgba(255,255,198,1)",
            pointBackgroundColor: "rgba(179,255,255,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: data_num
        },
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
// but.on('click', () => {
setInterval(function () {
    myRadarChart.data.datasets[0].data = randomizator(7);
    myRadarChart.data.datasets[1].data = randomizator(7);
    myRadarChart.data.datasets[2].data = randomizator(7);
    myRadarChart.update()
},200)

// });
//
ipcRenderer.on('async', msg => {
    console.log('ping received', msg) // 'ping received hello!!
    if(confirm('are you sure fuck without us?')){
        ipcRenderer.send('exit',true);
    }
});

ipcRenderer.on('check_link', (event, msg) => {
    let result = {
        top: 'undef',
        left: 'undef'
    };
    $('a').each(function () {
       if($(this).attr('href') === msg){
           result = $(this).position();
           ipcRenderer.send('element', cssPath($(this)[0]));
       }
    });
    $('<div>Top position :'+result.top+'</div><div>Left position: '+ result.left+'</div>').appendTo('body');
    ipcRenderer.send('position',result);
});

ipcRenderer.on('find_element', (event, element)=>{
    console.log(element);
    $(element).css({
        border: '5px solid black'
    })
});
const cssPath =  (el) => {
    if (!(el instanceof Element))
        return;
    let path = [];
    while (el.nodeType === Node.ELEMENT_NODE) {
        let selector = el.nodeName.toLowerCase();
        if (el.id) {
            selector += '#' + el.id;
            path.unshift(selector);
            break;
        } else {
            let sib = el, nth = 1;
            while (sib = sib.previousElementSibling) {
                if (sib.nodeName.toLowerCase() === selector)
                    nth++;
            }
            if (selector !== 'html')
                selector += ":nth-of-type(" + nth + ")";
        }
        path.unshift(selector);
        el = el.parentNode;
    }
    return path.join(" > ");
};

$(document).ready(function () {
    ipcRenderer.send('page_ready')
});