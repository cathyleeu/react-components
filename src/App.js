import React, { useState } from 'react';
import './App.scss';


const TAG_ITEM = [
  {id: 0, value: 'A'},
  {id: 1, value: 'B'},
  {id: 2, value: 'C'},
]
const TagItem = (props) => {
  const {tags, deleteTag} = props;
  return tags.map((tag, i) => (
    <div className="tag-input-form__item" key={tag.id}>
      <span>{tag.value}</span>
      <button className="tag-input-form__delete" onClick={() => deleteTag(tag.id)}>X</button>
    </div>
  ))
}
const TagInput = () => {
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState(TAG_ITEM);
  const handleChange = (e) => {
    setTag(e.target.value);
  }
  const handleDownKey = (e) => {
    // NOTE: 한글 입력시 keydown 두번 발생 방지
    if (e.isComposing || e.keyCode === 229) {
      return;
    }
    // NOTE: e.preventDefault() 경우 handleChange 가 실행이 안됨;
    switch (e.code) {
      case 'Tab':
        if(tag.trim().length === 0) {
          e.preventDefault();
          return;
        }
        setTags(tags => [...tags, {id: tags.length, value: tag }])
        setTag('');
        e.preventDefault();
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
      <input className="tag-input-form__input" name="tag" placeholder="# tag" value={tag} onChange={handleChange} onKeyDown={handleDownKey}/>
    </div>
  )
}
function App() {
  return (
    <div className="App">
      <h1>Tag Input</h1>
      <TagInput />
    </div>
  );
}

export default App;
