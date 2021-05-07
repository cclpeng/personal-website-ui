import React, {Component} from 'react';

// https://stackoverflow.com/questions/47718289/view-download-pdf-files-in-react-router-4
import resumePdf from '../files/Resume2021.pdf';

class Home extends Component{
   render(){
      return(
         <div>
            <h2>Welcome</h2>
            <p>
               &emsp;&emsp;Hello I'm Cindy, and I wanted to make a website for myself to keep some handy notes that have helped me in programming. At work often when
               I learn something new, I might type it on a notepad, so I can easily search it up later if I forget. However that notepad has become very long, and sometimes
               it isn't easy to find the piece of information since I can only do Ctrl + F. I also wanted to gain more experience working with React, a popular javascript 
               framework and Bootstrap, so it was awesome that I suddenly had an incentive to create this project for myself. Hopefully my notes can be helpful to others as well!
            </p>
            <p>
               My hobbies are learning Chinese, learning React, exploring new places, and eating food.
            </p>
            <p>My future plans for this site include perhaps loading some resources for learning Chinese</p>
            <a href={resumePdf} download='ResumeCindy2020.pdf'><button>Click to Download My Resume</button></a>
         </div>
      );
   }
}

export default Home;