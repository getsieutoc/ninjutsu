'use client';
import { useRef, type FC, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
type PropTypes = {
  value?: string;
  onChange?: (value: string) => void;
};

export const TextEditor: FC<PropTypes> = ({ value, onChange }) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      apiKey={process.env.NEXT_PUBLIC_API_KEY_TINYMCE}
      onEditorChange={(text) => onChange && onChange(text)}
      value={value}
      init={{
        height: 500,
        menubar: false,
        branding: false,
        plugins: 'link image table',
        // setup: function (editor) {
        //   editor.ui.registry.addButton('save', {
        //     icon: 'save',
        //     tooltip: 'Save',
        //     onAction: () =>
        //       onSave && onSave(editorRef.current?.getContent() ?? ''),
        //   });
        // },
        toolbar:
          'undo redo | formatselect ' +
          'bold italic | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help | save',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
};
