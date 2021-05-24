import React, {Component} from 'react';

// https://stackoverflow.com/questions/47718289/view-download-pdf-files-in-react-router-4
import resumePdf from '../files/Resume2021.pdf';
import profilePic from '../files/cindy-profile-picture.png';

class Home extends Component{
   render(){
      return(
         <div class='home-content'>
            <span class="home-60-divider">
               <h1 class='bd-title'>Welcome</h1>
               <p>
                  &emsp;&emsp;Hello I'm Cindy, and I wanted to make a website for myself to keep some handy notes that have helped me in programming. At work when
                  I learn something new, I might type it on a notepad, so I can easily search it up later if I forget. However that notepad has become too long, and sometimes
                  it isn't easy to find the piece of information since I can only do Ctrl + F. I also wanted to gain more experience working with React, a popular javascript 
                  framework and Bootstrap, so it was awesome that I suddenly had an incentive to create this project for myself. Hopefully my notes can be helpful to others as well!
               </p>
               <p>
                  My hobbies are learning Chinese, learning React, exploring new places, and eating food.
               </p>
               <p>My future plans for this site include perhaps loading some resources for learning Chinese</p>
               <a href={resumePdf} download='ResumeCindy2020.pdf'><button class='btn btn-primary'>Click to Download My Resume</button></a>
            </span>
            <span class="home-40-divider">
               <img src={profilePic} alt="Cindy's Profile"/>
            </span>
         </div>
      );
   }
}

export default Home;