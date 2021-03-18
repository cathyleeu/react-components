
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TagInput from './projects/TagInput';
import MixinEditor from './projects/MixinEditor';
import ThumbnailFull from './projects/ThumbnailFull';
import Cursor from './projects/Cursor';
import HorizontalScroll from './projects/HorizontalScroll';
import './App.scss';


function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tag">Tag componenet</Link>
          </li>
          <li>
            <Link to="/editor">Mixin Editor</Link>
          </li>
          <li>
            <Link to="/button-components">Button CSS</Link>
          </li>
          <li>
            <Link to="/thumbnail-full">Thumbname Full</Link>
          </li>
          <li>
            <Link to="/gsap-cursor">Gsap Cursor</Link>
          </li>
          <li>
            <Link to="/horizontal-scroll">HorizontalScroll</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            
          </Route>
          <Route path="/tag">
            {/* TODO : ADD animation */}
            <h1>Tag Input</h1>
            <TagInput />
          </Route>
          <Route path="/editor">
            <h1>Mixin Editor</h1>
            <MixinEditor />
          </Route>
          <Route path="/button-components">
            <h1>Button CSS</h1>
          </Route>
          <Route path="/thumbnail-full">
            <ThumbnailFull />
          </Route>
          <Route path="/gsap-cursor">
            <Cursor />
          </Route>
          <Route path="/horizontal-scroll">
            <HorizontalScroll />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
