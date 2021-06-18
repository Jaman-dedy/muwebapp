/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import propTypes from 'prop-types';
import './react-draft-wysiwyg.scss';
import saveTemporarily from 'helpers/uploadImages/saveTemporarily';

const TextEditor = ({ setText, isSent }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  useEffect(() => {
    if (isSent) {
      setEditorState(EditorState.createEmpty());
    }
  }, [isSent]);
  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };
  const uploadImageTemp = async file => {
    const supportImg = await saveTemporarily({
      supportImg: file,
    });
    return { data: { link: supportImg.data[0].url } };
  };
  setText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  return (
    <div className="editor">
      <Editor
        editorClassName="edit-text-custum"
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            'inline',
            'fontSize',
            'textAlign',
            'embedded',
            'image',
            'remove',
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          blockType: { inDropdown: true },
          image: {
            uploadCallback: uploadImageTemp,
            alt: { present: true, mandatory: true },
            previewImage: true,
          },
        }}
        placeholder={global.translate('Type your inquiry here')}
        hashtag={{
          separator: ' ',
          trigger: '#',
        }}
      />
    </div>
  );
};

TextEditor.propTypes = {
  setText: propTypes.func.isRequired,
  isSent: propTypes.bool.isRequired,
};

export default TextEditor;
