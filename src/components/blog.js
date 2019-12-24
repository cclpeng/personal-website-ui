import React from 'react';
import Axios from 'axios';
import GetPosts from './blog/getPosts';
import '../index.css'

class Blog extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            modelHasResolved: false,

            blogContent: '',
            tags:'',
            title:'',

            posts:null,
        };
        this.handleContentChg = this.handleContentChg.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleChgTitle = this.handleChgTitle.bind(this);
        this.makePost = this.makePost.bind(this);
    }

    async componentDidMount() //hook to get your model loaded
    {
        let postHtmlArr =  await Axios.get('http://localhost:8080/post/get-all')
        this.setState({posts:postHtmlArr.data});
    }

    handleContentChg(event){ 
        this.setState({ blogContent: event.target.value }) }
    handleTagChange(event){ this.setState({ tags: event.target.value }) }
    handleChgTitle(event){ this.setState({ title: event.target.value }) }

    highlight(event) //highlights input tag event.target
    { 
        event.target.selectionStart = 0;
        event.target.selectionEnd = event.target.value.length;
    }

    render()
    { 
        let hasPendingChange = this.state.blogContent || this.state.title;
        return(
            <div>
                <label>Title:</label> <br/>
                <input value={this.state.title} onChange={this.handleChgTitle} onFocus={this.highlight}/> <br/>

                <label>Content:</label> <br/>
                <textarea type='text' className='post-content' placeholder='Enter your blog post here!' value={this.state.blogContent} 
                        height="30px" onChange={this.handleContentChg} 
                /><br/>
                
                <label>Tags:</label> <br/>
                <input placeholder='Enter comma separated tags' value={this.state.tags} onChange={this.handleTagChange} /> <br/>  
                
                <button onClick={this.makePost}>Submit</button>

                <br/><br/>
                <GetPosts data={this.state.posts} editBoxHasPendingChange={hasPendingChange}/>
            </div>
        );
    }

    makePost()
    {
        if(this.state.blogContent && this.state.title)
        {
            let tagsArr = (this.state.tags === '') ? [] : this.state.tags.split(',');
            let data = {
                tags: tagsArr, 
                content: this.state.blogContent, 
                title: this.state.title[0].toLocaleUpperCase() + this.state.title.slice(1),
            };

            //reset the text fields
            this.setState({blogContent:'', tags:'', title:''});

            Axios.post('http://localhost:8080/post/save', JSON.stringify(data), 
                        {headers:{'Content-type':'application/json'}}).then(post =>
            {
                if(post.data)
                {
                    let newBlogEntry = post.data;
                    const postsCopy = this.state.posts.slice();
                    this.setState({posts: postsCopy.concat([newBlogEntry])});
                }
            });
        }

        else { alert('Please do not leave the title or blog content empty') }
    }

}
export default Blog;