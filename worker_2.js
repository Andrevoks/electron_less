const $  = require('jquery');
const {ipcRenderer} = require('electron');

$(document).ready(function () {
    ipcRenderer.send('page_ready','second')
});

ipcRenderer.on('get_message',(event, msg)=>{
    $('.text').text(msg.get_message);
});