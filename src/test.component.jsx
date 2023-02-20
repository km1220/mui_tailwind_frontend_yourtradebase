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
  const [state, setState] = useState({
    key: "defaultKey",
    value: "defaultContent"
  })

  let xxx;
  console.log("xxx ?? '123123'")
  console.log(xxx ?? '123123')
  return (
    <>
      <button onClick={() => setState({
        key: "newKey",
        value: "newContent"
      })}>
        Simulate new value arrived
      </button>
      <MUIRichTextEditor
        key={state.key}
        value={state.value}

        label="Type something here..."
      />
    </>
  )
}