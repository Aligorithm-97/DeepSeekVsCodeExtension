import * as vscode from "vscode";
import ollama from "ollama";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "deepvscode.helloWorld",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "deepVsCode",
        "Deep Seek VsCode",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );
      panel.webview.html = getWebviewContent();

      panel.webview.onDidReceiveMessage(async (message: any) => {
        if (message.command === "chat") {
          const usePrompt = message.text;
          let responseText = "";
          try {
            const streamResponse = await ollama.chat({
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
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent(): string {
  return /*html*/ `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <style> 
body {font-family:sans-serif;margin:1rem;}
#prompt {width:100%;box-sizing:border-box;}
#response {border:1px solid #ccc; margin-top:1rem;padding:0.5rem}
  </style>
	</head>
	<body>
		<h2>Deep VsCode</h2>
		<textarea id="prompt" rows="3" placeholder="..."></textarea><br/>
		<button id="deepBtn">Send</button>
		<div id="response"></div>
	</body>

	<script>
		const vscode = acquireVsCodeApi();

		document.getElementById('deepBtn').addEventListener('click',()=>{
			const text = document.getElementById('prompt').value;
			vscode.postMessage({command:'chat',text});

		})

		window.addEventListener('message',event=>{
			const {command,text} = event.data;
			if(command==='chatResponse'){
				document.getElementById('response').innerText= text;
			}
		})

	</script>
  <html>
  `;
}

export function deactivate() {}
