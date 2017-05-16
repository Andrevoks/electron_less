const {ipcRenderer} = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    const $ = require('./js/jquery');

    window.jQuery = $;

    ipcRenderer.on('collect_data', ()=>{
        $('#startSearch').on('click', () => {
            const country = $('#county').val();
            const city = $('input[name="city"]').val();
            const gender = $('input[name="pol"]:checked').attr('id');
            ipcRenderer.send('collect_data', {
                country,
                city,
                gender
            });

        });
    });

    ipcRenderer.on('page_ready', () => {
        $(document).ready(function () {
            ipcRenderer.send('page_ready');
        });
    });

    ipcRenderer.on('set_value', (event, task) => {
        $(task.selector).val(task.text);
        ipcRenderer.send('set_value');
    });

    ipcRenderer.on('focus', (event, task) => {
        $(task.selector).click();
        ipcRenderer.send('focus');
    });

    ipcRenderer.on('key_press', (event, task) => {
        $(task.selector).keypress('13');
        ipcRenderer.send('key_press');
    });

    ipcRenderer.on('submit', (event, task) => {
        $(task.selector).submit();
        ipcRenderer.send('submit');
    });

    ipcRenderer.on('click', (event, task) => {
        window.location.href = $(task.selector).attr('href');
        ipcRenderer.send('click');
    });

    $(document).ready(function () {
        ipcRenderer.send('page_ready');
        // ipcRenderer.on('new_task', (event, task) => {
        //     switch(task.type){
        //         case "set_value":
        //             $(task.selector).val(task.text);
        //             console.log('1')
        //             ipcRenderer.send('task_done');
        //             break;
        //         case "submit":
        //             $(task.selector).submit();
        //             ipcRenderer.send('task_done');
        //             console.log('2')
        //             break;
        //         case "click":
        //             $(task.selector).click();
        //             console.log('3')
        //             ipcRenderer.send('task_done');
        //             break;
        //         default:
        //             console.log(task.type);
        //     }
        // });
    });
});
