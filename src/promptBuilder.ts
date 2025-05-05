import { text } from 'stream/consumers';
import * as vscode from 'vscode';

function getScriptContext(editor: vscode.TextEditor) {
    let document = editor.document;
    const context = document.getText();
    return context;
}

async function getCodeBlock() {
    const codeBlock = await vscode.env.clipboard.readText().then((text) => {
        return text;
    });
    return codeBlock;   
}

function selectCommentSyntax(editor: vscode.TextEditor) {
    const fileExtension = editor.document.fileName.toLowerCase().split('.').at(-1);
    const commentSyntax = fileExtension === 'js' || fileExtension === 'ts' ? '//' : '#';
    return commentSyntax;
}

export async function buildPrompt(editor: vscode.TextEditor) {
    const codeBlock = await getCodeBlock();
    const codeContext = getScriptContext(editor);
    const commentSyntax = selectCommentSyntax(editor);
    if (!codeBlock || !codeContext){
        return;
    }
    const prompt = `You are a code comment generator. Your task is to generate a comment for the following code block. The comment should be in the same language as the code block and should be prefixed with ${commentSyntax}. The code block is as follows:\n\n${codeBlock}\n\n The context of the code is as follows:\n\n${codeContext}\n\nPlease generate a comment that describes the purpose and functionality of the code block. The comment should be concise and clear, and should not include any unnecessary information. The comment should be prefixed with ${commentSyntax}.\n\nComment:`;
    return prompt;
}