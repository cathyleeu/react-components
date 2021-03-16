import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import React, { useState, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';


/*
  NOTE
    1) class 로 mixin 디자인 대로 수정하면 되겠따 
    2) header, caption, tag 가 따로 있는데 그것은 mirror 를 따로 건들여서 해야할까...? 
    document.getElementsByClassName('tui-editor-contents')

*/

const ToastEditor = () => {
  // get instance
  const editorRef = useRef();
  return (
    <Editor
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
      ref={editorRef}
    />
  );
};


const MixinEditor = () => {
  const [head, setHead] = useState('');
  const handleHeadline = (e) => {
    const h = document.getElementById('headline');
    setHead(e.target.value);
    h.innerText = e.target.value;
  };

  return (
    <div>
      <input className="tag-input-form__input" placeholder="Headline" onChange={handleHeadline} value={head} />
      {/* <TagInput /> */}
      <ToastEditor />
    </div>
  )
}
export default MixinEditor;