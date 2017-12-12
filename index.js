const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const MongoClient = require("mongodb").MongoClient;

// 启动窗口程序
var mainWindow = null;

app.on('window-all-closed',function(){
    if(process.platform != 'darwin'){
        app.quit();
    }
});

app.on('ready',function(){
    mainWindow = new BrowserWindow({
            width: 1024, 
            height: 768,
            webPreferences:{
                nodeIntegration: false
            }
    });

    mainWindow.loadURL('file://'+__dirname+'/index.html');

    mainWindow.on('closed',function(){
        mainWindow = null;
    });
});

// 启动node服务
var server = require("./server.js");
var router = require("./router.js");

// 处理程序
var checkName = require("./router/check-name.js");
var deposit = require("./router/deposit.js");

var handle = {};
handle["/checkName"] = checkName.checkName;
handle["/deposit"] = deposit.deposit;

server.start(router.route,handle);