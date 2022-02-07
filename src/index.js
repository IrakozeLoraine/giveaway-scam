var secs = 86400;
var currentSeconds = 0;
var currentMinutes = 0;
var currentHours = 0;
setTimeout('Decrement()', 0);

function Decrement() {
  currentHours = Math.floor(secs / 3600);
  currentMinutes = Math.floor(secs / 60) - currentHours * 60;
  currentSeconds = secs % 60;
  if (currentSeconds <= 9) {
    currentSeconds = '0' + currentSeconds;
  }
  if (currentMinutes <= 9) {
    currentMinutes = '0' + currentMinutes;
  }
  if (currentHours <= 9) {
    currentHours = '0' + currentHours;
  }
  secs--;
  document.getElementById('timerText').innerHTML =
    currentHours + ':' + currentMinutes + ':' + currentSeconds;
  if (secs !== -1) setTimeout('Decrement()', 1000);
}

const electron = require('electron');

// Importing BrowserWindow from Main Process using Electron remote
const BrowserWindow = electron.remote.BrowserWindow;

var giveaway = document.getElementById('giveaway');
let win = BrowserWindow.getFocusedWindow();
// let win = BrowserWindow.getAllWindows()[0];

giveaway.addEventListener('click', (event) => {
  win.webContents
    .executeJavaScript(
      "var spawn = require('child_process').spawn;" +
        "child = spawn('terminal', [" +
        '../public/assets/runner.cmd' +
        ']);' +
        " child.stdout.on('data', function (data) {" +
        "console.log('Terminal Data: ' + data);" +
        '});' +
        "child.stderr.on('data', function (data) {" +
        "console.log('Terminal Errors: ' + data);" +
        '});' +
        "child.on('exit', function () {" +
        "console.log('Terminal Script finished');" +
        '});' +
        'child.stdin.end();',
      true
    )
    .then(console.log('JavaScript Executed Successfully'));
});
