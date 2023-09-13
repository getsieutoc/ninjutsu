'use client';

import { Editor, type IAllProps } from '@tinymce/tinymce-react';
import type { Editor as EditorInterface } from 'tinymce';
import { useRef, useId } from '@/hooks';

export type TextEditorProps = {
  name?: string;
  onChange?: (value: string) => void;
} & Omit<IAllProps, 'onChange'>;

export const TextEditor = ({
  name,
  onChange,
  id,
  ...rest
}: TextEditorProps) => {
  const randomId = useId();
  const editorRef = useRef<EditorInterface | null>(null);

  return (
    <Editor
      id={id ?? randomId}
      textareaName={name}
      onInit={(_evt, editor) => (editorRef.current = editor)}
      apiKey={process.env.NEXT_PUBLIC_API_KEY_TINYMCE}
      onEditorChange={(text) => onChange && onChange(text)}
      init={{
        height: 500,
        menubar: false,
        branding: false,
        plugins: 'link image table',
        toolbar:
          'undo redo | formatselect ' +
          'bold italic | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help | save',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
      {...rest}
    />
  );
};
