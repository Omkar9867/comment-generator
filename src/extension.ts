// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { buildPrompt } from "./promptBuilder";
import { generateComment } from "./ollama";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "commentgenerator" is now active!'
  );

  const commentGenerateCommand = vscode.commands.registerCommand(
    "commentgenerator.generateComment",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor found.");
        return;
      }
      const prompt = await buildPrompt(editor);
      console.log("Prompt: ", prompt);
      if (!prompt) {
        vscode.window.showErrorMessage("No prompt generated.");
        return;
      }
      const comment = await generateComment(prompt);
      console.log("Genrated comment: ", comment);

      if (!comment) {
        vscode.window.showErrorMessage("No Comment generated.");
        return;
      }
      vscode.window.showInformationMessage("Generating comment...");
    }
  );
  context.subscriptions.push(commentGenerateCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
