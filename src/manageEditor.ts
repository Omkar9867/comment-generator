import * as vscode from "vscode";

export function getCurrLine(editor: vscode.TextEditor) {
  const line1 = editor.document.lineAt(editor.selection.active.line);
  const line2 = editor.selection.active.line;
  console.log("Line LineAT", line1);
  console.log("Line active", line2);
  return line2;
}

export async function addCommentToFile(
  fileURI: vscode.Uri,
  fileName: string,
  currentLine: number,
  generatedComment: string
) {
  try {
    const edit = new vscode.WorkspaceEdit();
    edit.insert(
      fileURI,
      new vscode.Position(currentLine, 0),
      generatedComment + "\n"
    );
    await vscode.workspace.applyEdit(edit);
    vscode.window.showInformationMessage(
      `Comment added to ${fileName} at line ${currentLine + 1}`
    );
  } catch (error) {
    console.error("Error adding comment: ", error);
    vscode.window.showErrorMessage("Error adding comment");
  }
}
