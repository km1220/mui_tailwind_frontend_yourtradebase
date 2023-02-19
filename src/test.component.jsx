import React, { useState } from 'react';
// import { Editor, EditorState } from 'draft-js';

// const SimpleEditorExample = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   return (
//     <div>
//       <h1>dsaf ksad sl jdl</h1>
//       <Editor
//         editorState={editorState}
//         onChange={setEditorState}
//       />
//     </div>
//   );
// }
// export default SimpleEditorExample

import MUIRichTextEditor from "mui-rte";


export default () => {
  return <MUIRichTextEditor label="Type something here..." />
}