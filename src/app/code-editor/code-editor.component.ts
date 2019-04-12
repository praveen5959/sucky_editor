import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import * as ace from "ace-builds";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";

const THEME = "ace/theme/github";
const LANG = "ace/mode/javascript";

@Component({
  selector: "app-code-editor",
  templateUrl: "./code-editor.component.html",
  styleUrls: ["./code-editor.component.css"]
})
export class CodeEditorComponent implements OnInit {
  @ViewChild("codeEditor") codeEditorElmRef: ElementRef;
  private codeEditor: ace.Ace.Editor;
  private editorBeautify;
  code: any;
  constructor() {}
  public beautifyContent() {
    if (this.codeEditor && this.editorBeautify) {
      const session = this.codeEditor.getSession();
      this.editorBeautify.beautify(session);
    }
  }
  private consoleCode() {
    this.code = this.codeEditor.getValue();
    console.log(this.code);
  }
  ngOnInit() {
    ace.require("ace/ext/language_tools");
    this.editorBeautify = ace.require("ace/ext/beautify");
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions = this.getEditorOptions();

    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true);
  }

  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & {
    enableBasicAutocompletion?: boolean;
  } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 14,
      maxLines: Infinity
    };

    const extraEditorOptions = {
      enableBasicAutocompletion: true
    };
    const margedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
    return margedOptions;
  }
}
