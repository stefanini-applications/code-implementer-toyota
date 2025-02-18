/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Container } from './styled';

ClassicEditor.defaultConfig = {
  language: 'en',
};

const CkEditor = ({
  onChange,
  data,
  id,
  name,
  isReadOnly,
  overFlowHide,
  onClickNotify,
}) => {
  const editorRef = useRef(null); // Ref to store editor instance

  // Helper function to set styles for read-only mode and overflow handling
  const applyEditorStyles = (editor, writer) => {
    const root = editor.editing.view.document.getRoot();

    if (!isReadOnly) {
      writer.setStyle('height', '235px', root);
    } else {
      writer.setStyle('border', 'none', root);
      writer.setStyle('padding', '0px', root);
      writer.setStyle('margin', '0px', root);
      if (overFlowHide) {
        writer.setStyle('text-overflow', 'ellipsis', root);
        writer.setStyle('overflow', 'hidden', root);
        writer.setStyle('white-space', 'nowrap', root);
      }
    }
  };

  const handleEditorReady = (editor) => {
    if (editor) {
      editor?.setData(data);
      editor.editing.view.change((writer) => applyEditorStyles(editor, writer));

      if (isReadOnly) {
        editor.isReadOnly = true;
        editor.ui.view.toolbar.element.style.display = 'none';
      }

      // Attach click listener to the toolbar, if provided
      editor.ui.view.toolbar.element.addEventListener('click', () => {
        if (onClickNotify) onClickNotify();
      });
    }
  };

  // Cleanup event listener when component unmounts
  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.ui.view.toolbar.element.removeEventListener('click', onClickNotify);
      }
    };
  }, [onClickNotify]);

  return (
    <Container>
      <div className="CkEditor">
        <CKEditor
          id={id}
          name={name}
          editor={ClassicEditor}
          data={data || ''}
          config={{
            toolbar: {
              items: [
                'bold',
                'italic',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'undo',
                'redo',
              ],
              shouldNotGroupWhenFull: true,
            },
            plugins: [
              'Bold',
              'Italic',
              'Heading',
              'Essentials',
              'List',
              'Autoformat',
              'Indent',
            ],
          }}
          onReady={handleEditorReady}
          onChange={onChange}
          onFocus={() => {
            if (onClickNotify) {
              onClickNotify();
            }
          }}
        />
      </div>
    </Container>
  );
};

CkEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  isReadOnly: PropTypes.bool,
  overFlowHide: PropTypes.bool,
  onClickNotify: PropTypes.func,
};

CkEditor.defaultProps = {
  data: '',
  id: '',
  name: '',
  isReadOnly: false,
  overFlowHide: false,
  onClickNotify: null,
};

export default CkEditor;
