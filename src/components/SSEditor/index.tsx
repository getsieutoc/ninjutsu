import { useRef, type FC } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
type PropTypes = {
  value?: string;
  onSave?: (value: string) => void;
};
const SSEditor: FC<PropTypes> = ({ value, onSave }) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={value}
      init={{
        height: 500,
        menubar: true,
        branding: false,
        plugins: 'link image table',
        setup: function (editor) {
          editor.ui.registry.addButton('save', {
            icon: 'save',
            tooltip: 'Save',

            onAction: () =>
              onSave && onSave(editorRef.current?.getContent() ?? ''),
          });
        },
        toolbar:
          'undo redo | formatselect ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help | save',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
};
export default SSEditor;
