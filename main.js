const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

process.env.NODE_ENV = 'production';

let mainWindow;
let addWindow;

app.on('ready', function(){
    
    mainWindow = new BrowserWindow({});
    
    mainWindow.loadURL(`https://messages.google.com/web/authentication`);
    
    mainWindow.on('closed', function(){
      app.quit();
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = [
    {  
        label: '',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : " Ctrl+Q",
        click(){
            app.quit();
        }
    }
    
];

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
      label: 'Developer Tools',
      submenu:[
        {
          role: 'reload'
        },
        {
          label: 'Toggle DevTools',
          accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
          click(item, focusedWindow){
            focusedWindow.toggleDevTools();
          }
        }
      ]
    });
}