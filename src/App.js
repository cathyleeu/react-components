import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import React, { useState, useRef, useEffect } from 'react';
import {uuidv4} from './Helper';
import { Editor } from '@toast-ui/react-editor';
import './App.scss';


const TAG_ITEM = [];
const AUTOCOMPLETE = [
  {id: uuidv4(), value: '#apple'},
  {id: uuidv4(), value: '#age'},
  {id: uuidv4(), value: '#orange'},
  {id: uuidv4(), value: '#purple'},
];
const TagItem = (props) => {
  const {tags, deleteTag} = props;
  return tags.map((tag, i) => (
    <div className="tag-input-form__item" key={tag.id}>
      <span>{tag.value}</span>
      <button className="tag-input-form__delete" onClick={() => deleteTag(tag.id)}>X</button>
    </div>
  ))
}
const AutoItem = ({focus, value, tagging}) => {
  return <li role="button" onClick={() => tagging(value)} data-active={focus} >{value}</li>
}
const AutoList = (props) => {
  const {list, tagging, active, targetRef} = props;
  if(list.length === 0) return <></>;
  return (
    <div className="tag-input-form__auto" ref={targetRef}>
      {list.map((l, i) => <AutoItem key={l.id} focus={(i+1) === active} value={l.value} tagging={tagging} />)}
    </div>
  )
}
const TagInput = () => {
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState(TAG_ITEM);
  const [auto, setAuto] = useState([]);
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const handleChange = (e) => {
    setTag(e.target.value);
    if(e.target.value === "") {
      setAuto([]);
    } else {
      setAuto(auto => AUTOCOMPLETE.filter(v => v.value.includes(e.target.value.toLocaleLowerCase())))
    }
  }
  const tagging = (value) => {
    setTags(tags => [...tags, {id: uuidv4(), value }])
    setTag('');
    setAuto([]);
  }
  const handleDownKey = (e) => {
    // NOTE: 한글 입력시 keydown 두번 발생 방지
    if (e.isComposing || e.keyCode === 229) {
      return;
    }
    // NOTE: e.preventDefault() 경우 handleChange 가 실행이 안됨;
    switch (e.keyCode) {
      case 32: // space
      case 9: // tab
        if(tag.slice(1).trim().length === 0 || tag[0] !== '#') {
          e.preventDefault();
          return;
        }
        tagging(tag);
        e.preventDefault();
        break;
      case 51: // #
        break;
      case 38: // arrow up
        if(active === 1) return;
        setActive(active-1);
        break;
      case 40: // arrow down
        if(auto.length === active) return;
        setActive(active+1);
        break;
      case 13:
        if(!ref.current) return;
        ref.current.children[active-1].click();      
        break;
      default:
        break;
    }
  }
  const deleteTag = (id) => {
    setTags(tags.filter(tag => tag.id !== id))
  }
  return (
    <div className="tag-input-form">
      <TagItem tags={tags} deleteTag={deleteTag} />
      <input className="tag-input-form__input" name="tag" placeholder="# tag" value={tag} onChange={handleChange} onKeyDown={handleDownKey} /> 
      {/* onBlur={() => setAuto([])} */}
      <AutoList targetRef={ref} list={auto} tagging={tagging} active={active}/>
    </div>
  )
}

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

function App() {
  useEffect(() => {
    const MIRROW = document.getElementsByClassName('tui-editor-contents')[0];
    const headline = document.createElement('h1');
    const tagline = document.createElement('div');
    headline.id = 'headline';
    headline.innerText = 'HEADLINE'
    tagline.id = 'tagline';
    MIRROW.append(headline);
  }, [])
  return (
    <div className="App">
      <h1>Tag Input</h1>
      <TagInput />
      
      <h1>Mixin Editor</h1>
      <MixinEditor />
    </div>
  );
}

export default App;
