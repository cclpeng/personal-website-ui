import React, {Component} from 'react';

// https://stackoverflow.com/questions/47718289/view-download-pdf-files-in-react-router-4
import resumePdf from '../files/Resume2019.pdf';

class Home extends Component{
   render(){
      return(
         <div>
            <h2>Hello!</h2>
            <p>I'm Cindy</p>
            <p>My hobbies are learning Chinese, learning React, exploring new places, and eating food.</p>
            <p>Cras facilisis urna ornare ex volutpat, et
               convallis erat elementum. Ut aliquam, ipsum vitae
               gravida suscipit, metus dui bibendum est, eget rhoncus nibh
               metus nec massa. Maecenas hendrerit laoreet augue
               nec molestie. Cum sociis natoque penatibus et magnis
               dis parturient montes, nascetur ridiculus mus.
            </p>
            <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
            <a href={resumePdf} download='ResumeCindy.pdf'><button>Click to Download My Resume</button></a>
         </div>
      );
   }
}

export default Home;