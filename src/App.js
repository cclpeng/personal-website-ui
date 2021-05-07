import React from 'react';
import {HashRouter, NavLink, Route} from 'react-router-dom';

import './components/home';
import Home from './components/home';
import Contact from './components/contact';
import Blog from './components/blog';

function App() {
  return (
   <div>
      <HashRouter>
         <h1>Cindy Peng</h1>
         <ul className="header">
         {/* NavLink makes the /#name appended to the link, like a table of contents */}
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/blog">Programming Blog</NavLink></li>
            <li><a href='#'>Calculator</a></li>
            <li><a href='#'>Timers</a></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
         </ul>

         {/* below the nav bar should be the place you put content */}
         <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/blog" component={Blog}/>
            <Route path="/contact" component={Contact}/>
         </div>
      </HashRouter>
   </div>
  );
}

export default App;
