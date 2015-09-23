var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

var spawn = require('child_process').spawn;
var spawnOptions = {cwd: __dirname + '/web/'}
var server = spawn('python', ['-m', 'SimpleHTTPServer'], spawnOptions); // FIXME: This should be docker
server.on('error', function (err) {
  console.error('Failed to start child process.');
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // Stops the server
  server.kill();
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 1000});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/web/index.html');
  // mainWindow.loadUrl('http://localhost:8000');

  // Open the devtools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
