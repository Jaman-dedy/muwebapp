/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

function TextEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(),
  );
  const handleOnchange = editorState => {
    setEditorState(editorState);
  };
  const _onBoldClick = () => {
    handleOnchange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleOnchange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  return (
    <div>
      <button type="button" onClick={_onBoldClick}>
        Bold
      </button>
      <Editor
        editorState={editorState}
        onChange={handleOnchange}
        handleKeyCommand={handleKeyCommand}
        placeholder="Type your text here"
        
      />
    </div>
  );
}

export default TextEditor;
