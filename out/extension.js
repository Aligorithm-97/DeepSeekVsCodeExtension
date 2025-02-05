"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const ollama_1 = __importDefault(require("ollama"));
function activate(context) {
    const disposable = vscode.commands.registerCommand("deepvscode.helloWorld", () => {
        const panel = vscode.window.createWebviewPanel("deepVsCode", "Deep Seek VsCode", vscode.ViewColumn.One, { enableScripts: true });
        panel.webview.html = getWebviewContent();
        panel.webview.onDidReceiveMessage(async (message) => {
            if (message.command === "chat") {
                const usePrompt = message.text;
                let responseText = "";
                try {
                    const streamResponse = await ollama_1.default.chat({
                        model: "deepseek-r1:8b",
                        messages: [{ role: "user", content: usePrompt }],
                        stream: true,
                    });
                    for await (const part of streamResponse) {
                        responseText += part.message.content;
                        panel.webview.postMessage({
                            command: "chatResponse",
                            text: responseText,
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    });
    context.subscriptions.push(disposable);
}
function getWebviewContent() {
    return /*html*/ `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deep VsCode</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #f4f4f4;
    }
    .container {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 600px;
      text-align: center;
    }
    h2 {
      color: black;
      margin-bottom: 1rem;
    }
    #prompt {
      width: 100%;
      height: 100px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      resize: none;
      font-size: 1rem;
      box-sizing: border-box;
    }
    #deepBtn {
      margin-top: 10px;
      width: 100%;
      padding: 12px;
      background-color: #007acc;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    #deepBtn:hover {
      background-color: #005fa3;
    }
    #response {
      margin-top: 1rem;
      padding: 10px;
      background: #eef2ff;
      color:black;
      border-radius: 5px;
      border-left: 4px solid #007acc;
      text-align: left;
      font-size: 1rem;
      white-space: pre-wrap;
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Deep VsCode</h2>
    <textarea id="prompt" placeholder="Type your message..."></textarea>
    <button id="deepBtn">Send</button>
    <div id="response">Waiting for response...</div>
  </div>

  <script>
    const vscode = acquireVsCodeApi();

    document.getElementById('deepBtn').addEventListener('click', () => {
      const text = document.getElementById('prompt').value;
      document.getElementById('response').innerText = "Processing...";
      vscode.postMessage({ command: 'chat', text });
    });

    window.addEventListener('message', (event) => {
      const { command, text } = event.data;
      if (command === 'chatResponse') {
        document.getElementById('response').innerText = text;
      }
    });
  </script>
</body>
</html>

  `;
}
function deactivate() { }
//# sourceMappingURL=extension.js.map