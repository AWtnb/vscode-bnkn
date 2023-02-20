import * as vscode from "vscode";

import { BracketSelector } from "./bracket-selector";
import { Bnkn } from "./bnkn";

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("bnkn");
  const skipUnselected: boolean = config.get("skipUnselected") || false;

  const getLineRange = (editor: vscode.TextEditor, cursorLine: number): vscode.Range => {
    const lineStart = new vscode.Position(cursorLine, 0);
    const lineEnd = new vscode.Position(cursorLine, editor.document.lineAt(cursorLine).text.length);
    return new vscode.Range(lineStart, lineEnd);
  };

  const formatSelections = (editor: vscode.TextEditor, formatter: Function) => {
    editor.edit((editBuilder) => {
      editor.selections
        .map((sel) => {
          if (sel.isEmpty) {
            if (skipUnselected) {
              return null;
            }
            return getLineRange(editor, sel.active.line);
          }
          return sel;
        })
        .forEach((sel) => {
          if (!sel) {
            return;
          }
          const text = editor.document.getText(sel);
          const newText = formatter(text);
          if (text != newText) {
            editBuilder.replace(sel, newText);
          }
        });
    });
  };

  const MAIN_MENU = new Map();
  MAIN_MENU.set("fix dumb-quotes", Bnkn.fixDumbQuotes);
  MAIN_MENU.set("format horizontal bars", Bnkn.formatHorizontalBars);
  MAIN_MENU.set("format period and comma", Bnkn.formatPunctuation);
  MAIN_MENU.set("swap familyname position", Bnkn.swapHumanNamePosition);
  MAIN_MENU.set("to double-brackets", Bnkn.toDouble);
  MAIN_MENU.set("to full-width", Bnkn.toFullWidth);
  MAIN_MENU.set("to full-width-brackets", Bnkn.toFullWidthBracket);
  MAIN_MENU.set("to half-width", Bnkn.toHalfWidth);
  MAIN_MENU.set("to half-width-brackets", Bnkn.toHalfWidthBracket);
  MAIN_MENU.set("to single-brackets", Bnkn.toSingle);
  MAIN_MENU.set("to to-tortoise-brackets", Bnkn.toTortoiseBracket);
  MAIN_MENU.set("toggle Comma type", Bnkn.toggleCommaType);
  MAIN_MENU.set("toggle Oxford-comma", Bnkn.toggleOxfordComma);
  MAIN_MENU.set("trim brackets", Bnkn.trimBrackets);

  const mainMenu = (editor: vscode.TextEditor) => {
    const commands = Array.from(MAIN_MENU.keys());
    vscode.window.showQuickPick(commands).then((cmd) => {
      if (cmd) {
        const func = MAIN_MENU.get(cmd);
        formatSelections(editor, func);
      }
    });
  };

  const wrapSelection = (editor: vscode.TextEditor, pair: string) => {
    const prefix = pair.charAt(0);
    const suffix = pair.charAt(1);
    formatSelections(editor, (s: string) => prefix + s + suffix);
  };

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("bnkn.mainMenu", (editor: vscode.TextEditor) => {
      mainMenu(editor);
    })
  );

  const BRACKET_SELECTOR = new BracketSelector();
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("bnkn.selectBracket", (editor: vscode.TextEditor) => {
      editor.selections = BRACKET_SELECTOR.getSelections(editor);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("bnkn.wrapByFullWidthDoubleQuotes", (editor: vscode.TextEditor) => {
      wrapSelection(editor, "“”");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("bnkn.wrapByFullWidthSingleQuotes", (editor: vscode.TextEditor) => {
      wrapSelection(editor, "‘’");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("bnkn.wrapByFullWidthParens", (editor: vscode.TextEditor) => {
      wrapSelection(editor, "（）");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("bnkn.wrapByTortoiseBrackets", (editor: vscode.TextEditor) => {
      wrapSelection(editor, "〔〕");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("bnkn.wrapByCornarBrackets", (editor: vscode.TextEditor) => {
      wrapSelection(editor, "「」");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("bnkn.wrapByDoubleCornarBrackets", (editor: vscode.TextEditor) => {
      wrapSelection(editor, "『』");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("bnkn.wrapByFullWidthBrackets", (editor: vscode.TextEditor) => {
      wrapSelection(editor, "［］");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("bnkn.wrapByBlackBrackets", (editor: vscode.TextEditor) => {
      wrapSelection(editor, "【】");
    })
  );
}

export function deactivate() {}
