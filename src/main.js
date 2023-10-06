const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow, mainWindow2, mainWindow3;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

let PythonShellLibrary = require("python-shell");
let { PythonShell } = PythonShellLibrary;

// ---------------TRAINED YOLOv5 TRACKING SCRIPT-------------------------------------------- //

let shell = new PythonShell("backend/demo/depthai_demo.py", {

	// The '-u' tells Python to flush every time
	pythonOptions: ["-u"],
	args: [],
});

shell.on("message", function (message) {
	// sending data to frontend window
	if (mainWindow) {
		//console.log(message)
		mainWindow.webContents.send("main-to-render", message);
	}
	// if (mainWindow2) {
	// 	mainWindow2.webContents.send("main-to-render", message);
	// }
	// if (mainWindow3) {
	// 	mainWindow3.webContents.send("main-to-render", message);
	// }
});
//-------------------------------------------------------------------------------------- //

const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		x: 1920 + 1920,
		y: 0,
		width: 1920,
		height: 1200,
		frame: false,
		show: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	// mainWindow2 = new BrowserWindow({
	// 	x: 1920,
	// 	y: 0,
	// 	width: 800,
	// 	height: 600,
	// 	show: false,
	// 	webPreferences: {
	// 		preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
	// 	},
	// });

	// mainWindow3 = new BrowserWindow({
	// 	x: 1920,
	// 	y: 0,
	// 	width: 800,
	// 	height: 600,
	// 	show: false,
	// 	webPreferences: {
	// 		preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
	// 	},
	// });

	mainWindow.once("ready-to-show", () => {
		mainWindow.show();
		mainWindow.focus();
	});

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
	mainWindow.setFullScreen(true);

	// Open the DevTools.
	//mainWindow.webContents.openDevTools();


	// mainWindow2.once("ready-to-show", () => {
	// 	mainWindow2.show();
	// 	mainWindow2.focus();
	// });

	// // and load the index.html of the app.
	// mainWindow2.loadURL(MAIN_WINDOW2_WEBPACK_ENTRY);

	// // Open the DevTools.
	// //mainWindow3.webContents.openDevTools();

	// mainWindow3.once("ready-to-show", () => {
	// 	mainWindow3.show();
	// 	mainWindow3.focus();
	// });

	// // and load the index.html of the app.
	// mainWindow3.loadURL(MAIN_WINDOW3_WEBPACK_ENTRY);

	// Open the DevTools.
	//mainWindow3.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
	shell.end((err) => {
		if (err) throw err
	})
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
