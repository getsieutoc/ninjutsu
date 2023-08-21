import { type FC, useRef } from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import SunEditorCore from 'suneditor/src/lib/core';
import 'suneditor/dist/css/suneditor.min.css';

type PropTypes = {
  autoFocus?: boolean;
  width?: string;
  height?: string;
  onChange?: ((content: string) => void) | undefined;
  placeholder?: string;
  onSave?: ((content: string) => void) | undefined;
};
const PagePostEditor: FC<PropTypes> = (props) => {
  const {
    autoFocus = true,
    width = '100%',
    height = '300px',
    onChange,
    placeholder,
    onSave,
  } = props;
  const editor = useRef<SunEditorCore>();
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  return (
    <SunEditor
      autoFocus={autoFocus}
      width={width}
      height={height}
      onChange={onChange}
      placeholder={placeholder}
      onSave={onSave}
      setOptions={{
        buttonList: [
          ['undo', 'redo'],
          ['font', 'fontSize', 'formatBlock'],
          ['paragraphStyle', 'blockquote'],
          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
          ['fontColor', 'hiliteColor', 'textStyle'],
          ['removeFormat'],
          //  '/', // Line break
          ['outdent', 'indent'],
          ['align', 'horizontalRule', 'list', 'lineHeight'],
          ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
          /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
          ['fullScreen', 'showBlocks', 'codeView'],
          ['preview', 'print'],
          ['save'],
        ],
        // Other option
      }}
      getSunEditorInstance={getSunEditorInstance}
    />
  );
};
export default PagePostEditor;
