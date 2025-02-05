# Deep Seek VSCode Extension

## Overview

Deep Seek VSCode is a Visual Studio Code extension that integrates the Ollama API to provide AI-powered chat capabilities directly within the editor. This extension allows users to send prompts and receive responses in real time using the `deepseek-r1:8b` model.

## Features

- AI-powered chat inside VSCode
- Streamed responses for real-time interaction
- Simple and user-friendly UI
- Easy installation and activation

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system
- VSCode installed

### Steps

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd deepseek-vscode
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Open the project in VSCode and run the extension:
   ```sh
   code .
   npm run compile
   npm run start
   ```

## Usage

1. Open VSCode.
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
3. Run `Deep Seek VsCode` to open the chat UI.
4. Type your message and click the `Send` button.
5. Receive and view the AI-generated response in real time.

## Development

To modify or enhance the extension:

- Edit `src/extension.ts` for backend logic.
- Modify the `getWebviewContent()` function to update the UI.
- Use `npm run watch` for live development.

## Dependencies

- [VSCode API](https://code.visualstudio.com/api)
- [Ollama](https://ollama.com)
- [TypeScript](https://www.typescriptlang.org/)

## License

This project is licensed under the MIT License.
