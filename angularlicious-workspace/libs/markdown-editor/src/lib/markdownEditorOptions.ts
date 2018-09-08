import * as SimpleMDE from 'simplemde'; // MUST NPM INSTALL @types/simplemde@1.11.6

export class MarkdownEditorOptions implements SimpleMDE.Options {
  autoDownloadFontAwesome?: boolean;
  autofocus?: boolean;
  autosave?: SimpleMDE.AutoSaveOptions;
  blockStyles?: SimpleMDE.BlockStyleOptions;
  element?: HTMLElement;
  forceSync?: boolean;
  hideIcons?: string[];
  indentWithTabs?: boolean;
  initialValue?: string;
  insertTexts?: SimpleMDE.InsertTextOptions;
  lineWrapping?: boolean;
  parsingConfig?: SimpleMDE.ParsingOptions;
  placeholder?: string;
  previewRender?: (
    markdownPlaintext: string,
    previewElement?: HTMLElement
  ) => string;
  promptURLs?: boolean;
  renderingConfig?: SimpleMDE.RenderingOptions;
  shortcuts?: SimpleMDE.ShortcutsArray;
  showIcons?: string[];
  spellChecker?: boolean;
  status?: boolean | Array<string | SimpleMDE.StatusBarItem>;
  styleSelectedText?: boolean;
  tabSize?: number;
  toolbar?: boolean | Array<string | SimpleMDE.ToolbarIcon>;
  toolbarTips?: boolean;
}
