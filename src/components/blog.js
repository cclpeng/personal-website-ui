import React from 'react';
import ServicesRequester from '../services/http-requests/ServicesRequester.js'
import GetPosts from './blog/getPosts';
import SearchFilter from './blog/searchFilter';
import '../index.css'

function CreateBlogForm(props)
{
    return (
        // TODO FIXME maybe make this sticky to the top, but also make it an accordian to make it minimizable
        <form id='create-blog-post-form-padding'>
            <div class='form-group'>
                <label >Title:</label> 
                <input value={props.postTitle} onChange={props.handleChgTitle} onFocus={props.highlight} class='form-control'/>
            </div>

            <div class='form-group'>
                <label>Content:</label>
                <textarea type='text' className='form-control textarea-min-height' placeholder='Enter your blog post here!' 
                        value={props.blogContent} onChange={props.handleContentChg} 
                />
            </div>

            {/* FIXME TODO add a select dropdown to select the Folder, and add button to add a new Folder
                Also add the new field Folder to the blogpost object... */}

            <div class='form-group'>
                <label>Tags:</label>
                <input placeholder='Enter comma separated tags' value={props.tags} 
                    onChange={props.handleTagChange} class='form-control'/>
                
                <button onClick={props.makePost} class='btn btn-primary'>Submit</button>
            </div>

            <hr/>
        </form>
    );
}

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
        let postHtmlArr =  await ServicesRequester.getPosts();
        this.setState({posts:postHtmlArr.data});
    }

    render()
    { 
        let hasPendingChange = this.state.blogContent || this.state.title;
        return(
            <div class='blog-page-wrapper'>
                {/* form to add a blog post FIXME should only be visible if we're logged in*/}
                <CreateBlogForm 
                    postTitle={this.state.title} handleChgTitle={this.handleChgTitle} highlight={this.highlight} 
                    blogContent={this.state.blogContent} handleContentChg={this.handleContentChg}
                    tags={this.state.tags} handleTagChange={this.handleTagChange} 
                    makePost={this.makePost}
                />

                {/* FIXME TODO filter to search for blog posts */}
                <SearchFilter data={this.state.posts}/>

                {/* table displaying current blog posts */}
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

            ServicesRequester.postPost(data, {headers:{'Content-type':'application/json'}}).then(post =>
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

    handleContentChg(event){ this.setState({ blogContent: event.target.value }) }
    handleTagChange(event){ this.setState({ tags: event.target.value }) }
    handleChgTitle(event){ this.setState({ title: event.target.value }) }

    highlight(event) //highlights input tag event.target
    { 
        event.target.selectionStart = 0;
        event.target.selectionEnd = event.target.value.length;
    }
}
export default Blog;