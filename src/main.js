const { app, BrowserWindow, session, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow, mainWindow2, mainWindow3;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

let PythonShellLibrary = require("python-shell");
let { PythonShell } = PythonShellLibrary;
let shell;

const file = require("../config.json");
const file2 = require("../camConfig.json");

const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		// x: 1920 + 1920,
		y: 0,
		// frame: false,
		show: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	mainWindow2 = new BrowserWindow({
		// x: 1920 + 1920,
		y: 0,
		// frame: false,
		show: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	mainWindow3 = new BrowserWindow({
		// x: 1920 + 1920,
		y: 0,
		// frame: false,
		show: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	// ---------------------------------------TRACKING SCRIPT-------------------------------------------- //

	shell = new PythonShell("OAKscripts/roi/roiData2.py", {
		// The '-u' tells Python to flush every time
		pythonOptions: ["-u"],
		args: [],
	});

	shell.send(JSON.stringify(file2));

	shell.on("message", function (message) {
		// sending data to frontend window
		// console.log(message);

		if (mainWindow) {
			mainWindow.webContents.send("main-to-render", message);
		}
		if (mainWindow2) {
			mainWindow2.webContents.send("main-to-render", message);
		}

		if (mainWindow3) {
			mainWindow3.webContents.send("main-to-render", message);
		}
	});

	// ---------------------------------------TRACKING SCRIPT-------------------------------------------- //

	mainWindow.once("ready-to-show", () => {
		mainWindow.show();
		mainWindow.focus();
	});

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
	// mainWindow.setFullScreen(true);

	mainWindow2.once("ready-to-show", () => {
		mainWindow2.show();
		mainWindow2.focus();
	});

	// and load the index.html of the app.
	mainWindow2.loadURL(MAIN_WINDOW2_WEBPACK_ENTRY);

	mainWindow3.once("ready-to-show", () => {
		mainWindow3.show();
		mainWindow3.focus();
	});

	// and load the index.html of the app.
	mainWindow3.loadURL(MAIN_WINDOW3_WEBPACK_ENTRY);

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();
	// mainWindow2.webContents.openDevTools();
	// mainWindow3.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

ipcMain.on("render-to-main", (event, arg) => {
	const msgTemplate = (pingPong) => `${pingPong}`;

	if (msgTemplate(arg[0]) === "wall1") {
		file.Wall1Animation1.left = msgTemplate(arg[1]);
		file.Wall1Animation1.top = msgTemplate(arg[2]);
		file.Wall1Animation2.left = msgTemplate(arg[3]);
		file.Wall1Animation2.top = msgTemplate(arg[4]);
		file.Wall1Animation3.left = msgTemplate(arg[5]);
		file.Wall1Animation3.top = msgTemplate(arg[6]);
		file.Wall1Animation4.left = msgTemplate(arg[7]);
		file.Wall1Animation4.top = msgTemplate(arg[8]);
		file.Wall1Animation5.left = msgTemplate(arg[9]);
		file.Wall1Animation5.top = msgTemplate(arg[10]);

		fs.writeFile(
			"./config.json",
			JSON.stringify(file, null, 2),
			function writeJSON(err) {
				if (err) return console.log(err);
				console.log(JSON.stringify(file));
			}
		);
	}
	if (msgTemplate(arg[0]) === "wall2") {
		file.Wall2Animation1.left = msgTemplate(arg[1]);
		file.Wall2Animation1.top = msgTemplate(arg[2]);
		file.Wall2Animation2.left = msgTemplate(arg[3]);
		file.Wall2Animation2.top = msgTemplate(arg[4]);
		file.Wall2Animation3.left = msgTemplate(arg[5]);
		file.Wall2Animation3.top = msgTemplate(arg[6]);
		file.Wall2Animation4.left = msgTemplate(arg[7]);
		file.Wall2Animation4.top = msgTemplate(arg[8]);

		fs.writeFile(
			"./config.json",
			JSON.stringify(file, null, 2),
			function writeJSON(err) {
				if (err) return console.log(err);
				console.log(JSON.stringify(file));
			}
		);
	}
	if (msgTemplate(arg[0]) === "wall3") {
		file.Wall3Animation1.left = msgTemplate(arg[1]);
		file.Wall3Animation1.top = msgTemplate(arg[2]);
		file.Wall3Animation2.left = msgTemplate(arg[3]);
		file.Wall3Animation2.top = msgTemplate(arg[4]);
		file.Wall3Animation3.left = msgTemplate(arg[5]);
		file.Wall3Animation3.top = msgTemplate(arg[6]);
		file.Wall3Animation4.left = msgTemplate(arg[7]);
		file.Wall3Animation4.top = msgTemplate(arg[8]);
		file.Wall3Animation5.left = msgTemplate(arg[9]);
		file.Wall3Animation5.top = msgTemplate(arg[10]);

		fs.writeFile(
			"./config.json",
			JSON.stringify(file, null, 2),
			function writeJSON(err) {
				if (err) return console.log(err);
				// console.log(JSON.stringify(file));
			}
		);
	}

	
	//   event.reply('ipc-example', msgTemplate('pong'));
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", async () => {
	if (process.platform !== "darwin") {
		session.defaultSession.clearStorageData();
		app.quit();
	}
	shell.end((err) => {
		if (err) throw err;
	});
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
