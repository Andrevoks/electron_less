const electron = require('electron');
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const async = require('async');

let meta_data;
let switcher = false;
const tasks = [
    // [
    //     {type: "load_url", url: 'https://www.youtube.com/'},
    //     {type: "page_ready"},
    //     {type: "set_value", selector: '#masthead-search-term', text: 'не пизди коняра'},
    //     {type: "submit", selector: '#masthead-search'},
    //     {type: "click", selector: '#results .item-section li:first .contains-addto a'},
    //     {type: "wait", time: 5000},
    //     //{type: "wait", page_ready: true},
    // ],
    [
        {type: "load_page", url: 'html/questions.html'},
        {type: "page_ready"},
        {type: "collect_data"},
        {type: "load_url", url: 'https://vk.com/search?c%5Bname%5D=1&c%5Bphoto%5D=1&c%5Bsection%5D=people'},
        // {type: "focus", selector: '#ts_wrap #ts_input'},
        {type: "set_value", selector: '.selector_input', text: 'lol'},
        {type: "key_press", selector: '#ts_wrap #ts_input'},
        // {type: "click", selector: '#results .item-section li:first .contains-addto a'},
        // {type: "wait", time: 5000}
    ]
];

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
      width: 1500,
      height: 600,
      fullscreen: false,
      'webPreferences': {
          'web-security': false,
          nodeIntegration: false,
          preload: path.join(__dirname, 'worker.js')
      }
  }); //основная конфигуация
  // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'second.html'),
        protocol: 'file:',
        slashes: true
    }));

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  // win.on('closed', () => {
  //   // Dereference the window object, usually you would store windows
  //   // in an array if your app supports multi windows, this is the time
  //   // when you should delete the corresponding element.
  //   win = null
  // });

    // win.on('close', function (event) {
    //   if (!switcher) {
    //       win.webContents.send('async', 12312);
    //       event.preventDefault();
    //   } else {
    //       win = null
    //   }
    //
    // });
}

ipcMain.on('send_message', (event, msg) => {
    messanges.second.get_message = msg;
});

ipcMain.on('exit', () => {
    switcher = true;
    win.close();
});


ipcMain.on('position',(event,msg)=>{
    console.log(msg);
});
ipcMain.on('element',(event,msg)=>{
    win.webContents.send('find_element',msg);
});

app.on('page-title-updated', () => {
    console.log('page-title-updated', this)
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


app.on('ready', () => {
    createWindow();

    async.timesSeries(tasks.length, (nArr, nextArrayResult) => {
        let curr_task_array = tasks[nArr];
        async.timesSeries(curr_task_array.length, (n, nextResult) => {
            let curr_task = curr_task_array[n];
            console.log(curr_task.type);
            switch (curr_task.type) {
                case 'load_url':
                    win.loadURL(curr_task.url);
                    setTimeout(nextResult,1000);
                    break;
                case 'page_ready':
                    ipcMain.once(curr_task.type, () => {
                        nextResult();
                    });
                    win.webContents.send(curr_task.type);
                    break;
                case 'set_value':
                    ipcMain.once(curr_task.type, () => {
                        nextResult();
                    });
                    win.webContents.send(curr_task.type, curr_task);
                    break;
                case 'submit':
                    ipcMain.once('page_ready', () => {
                        nextResult();
                    });
                    win.webContents.send(curr_task.type, curr_task);
                    break;
                case 'click':
                    ipcMain.once(curr_task.type, () => {
                        nextResult();
                    });
                    win.webContents.send(curr_task.type, curr_task);
                    break;
                case 'wait':
                    setTimeout(nextResult, curr_task.time);
                    break;
                case 'load_page':
                    win.loadURL(url.format({
                        pathname: path.join(__dirname, curr_task.url),
                        protocol: 'file:',
                        slashes: true
                    }));
                    nextResult();
                    break;
                case 'collect_data':
                    ipcMain.once(curr_task.type, (event, msg) => {
                        meta_data = msg;
                        nextResult();
                    });
                    win.webContents.send(curr_task.type);
                    break;
                case 'focus':
                    ipcMain.once(curr_task.type, () => {
                        nextResult();
                    });
                    win.webContents.send(curr_task.type, curr_task.selector);
                    break;
                case 'key_press':
                    ipcMain.once(curr_task.type, () => {
                        nextResult();
                    });
                    win.webContents.send(curr_task.type, curr_task.selector);
                    break;
            }

            // if(done)nextArrayResult();
            //     win.webContents.send('new_task', curr_task);
            //     ipcMain.once('task_done', (event, msg) => {
            //         nextResult();
            //     });
            // });
        }, ()=>{
            console.log('nextArrayResult');
            nextArrayResult();
        });
    }, () => {
        console.log('win.loadURL');
        // win.loadURL(url.format({
        //     pathname: path.join(__dirname, 'index.html'),
        //     protocol: 'file:',
        //     slashes: true
        // }));

    });

});

// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// });

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
});


