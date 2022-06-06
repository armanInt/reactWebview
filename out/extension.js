"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path_1 = require("path");
const vscode = require("vscode");
const vscode_1 = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('reactwebview.start', () => {
        const panel = vscode.window.createWebviewPanel('react', 'react', vscode.ViewColumn.One, {});
        const jsFile = "vscode.js";
        const cssFile = "vscode.css";
        const localServerUrl = "http://localhost:3000";
        let scriptUrl = null;
        let cssUrl = null;
        const isProduction = context.extensionMode === vscode_1.ExtensionMode.Production;
        console.log(isProduction);
        if (isProduction) {
            console.log("scriptURL");
            scriptUrl = panel.webview.asWebviewUri(vscode_1.Uri.file((0, path_1.join)(context.extensionPath, 'dist', jsFile))).toString();
            console.log(scriptUrl);
            console.log("cssUrl");
            cssUrl = panel.webview.asWebviewUri(vscode_1.Uri.file((0, path_1.join)(context.extensionPath, 'dist', cssFile))).toString();
            console.log(cssUrl);
        }
        else {
            scriptUrl = `${localServerUrl}/${jsFile}`;
            console.log("else scriptURL:");
            console.log(scriptUrl);
        }
        panel.webview.html = getWebviewContent(context, isProduction, cssUrl, scriptUrl);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
// <script src="${scriptUrl}" />
function deactivate() { }
exports.deactivate = deactivate;
const getWebviewContent = (context, isProduction, cssUrl, scriptUrl) => {
    return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		${isProduction ? `<link href="${scriptUrl}" rel="stylesheet">` : ''}
	</head>
	<body>
		<noscript>Your browser does not support JavaScript!</noscript>
		<div id="root"></div>
		<script src="${scriptUrl}" />
	</body>
	</html>`;
};
//# sourceMappingURL=extension.js.map