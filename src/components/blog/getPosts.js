import React from 'react';
import ServicesRequester from '../../services/http-requests/ServicesRequester.js';
import '../../index.css'

/**
 * helper function to decorate a blog post; Handles the format of the post but also changes if it is in edit mode
 * @param {*} post post's content
 */
function DisplayTitleContentTags(post)
{
    let titleDisplay, tags, contentDisplay;

    // put array of tags into buttons for display
    tags = post.tags.map(tag =>{ 
        return <button key={tag} className='btn btn-light tag-button'>{tag}</button>
    });

    // Sometimes there is a title, soometimes not. If there is a title, emphasize it
    titleDisplay = (post.title) ? <strong>{post.title}<br/></strong> : <span></span>;

    if(! post.isEditMode)
    {
        // newlines in content won't show in html, so replacing newlines with <br/> until the last line
        let contentArray = post.content.split('\n', -1);
        contentDisplay = contentArray.map((contentPiece, index) =>{
            if(index === contentArray.length - 1)
                return <span key={'content - ' + index}>{contentPiece}</span>;
            else
                return <span key={'content - ' + index}>{contentPiece}<br/></span>;
        });
    }
    else
    {
        // FIXME TODO add onChange
        contentDisplay = <textarea value={post.content} style={{width:'95%', minHeight: '60px'}}/>;
    }

    
    return (
        <td class='blog-post-column'>
            <div>
                {titleDisplay}
                {contentDisplay}
            </div>
            {tags}
        </td>
    );
}

/**
 * This react component will focus on displaying the data it gets from blog
 * and modifications to the data when the user interacts with that display
 */
class GetPosts extends React.Component
{
    constructor(props)
    {
        super(props);
        // this.state={
        //     data: null,
        // };

        this.deletePost = this.deletePost.bind(this);
        this.editPost = this.editPost.bind(this);
    }

    componentDidUpdate()
    {
        // this.props.data
        // this.state.data
    }

    render()
    {
        /* FIXME TODO carousel to display ten posts, with arrows to navigate through the other posts... */
        let postDisplay = null;
        //This if is important because render will happen every time something gets
        //changed. The async request on blog.js parent happens after this render
        //so the first time, props.data will have nothing
        //Later though, props.data changes, and componentDidUpdate() then render() will be called again
        if(this.props.data)
        {
            postDisplay = this.props.data.map((post, index) =>
            {
                return (
                    <tr key={post.id} id={post.id} class='bottom-border'>
                        <DisplayTitleContentTags title={post.title} content={post.content} tags={post.tags} isEditMode={post.isEditMode}/>
                        <td class='blog-post-buttons-column'>
                            <button  onClick={ this.editPost } id={index} class='btn btn-secondary'>Edit</button>
                            <button  onClick={ this.deletePost } class='btn btn-secondary'>X</button>
                        </td>
                    </tr>
                );
            });
        }

        return(
            <table class='table'>
                {postDisplay}
            </table>
        );
    }

    editPost(event)
    {
        let index = event.target.id;
        console.log(index);
        // FIXME TODO change the properties, toggle btw edit and display
    }

    async deletePost(event) //remember that event is passed by default
    {
        if(this.props.editBoxHasPendingChange)
        {
            window.alert('Please first finish your current blog entry');
            return;
        }
        // put in a window event asking for confirmation to delete
        if(window.confirm('Are you sure you want to delete this post?'))
        {
            // event is on the button, which is within <tr><td></td></tr>
            let postId = event.target.parentNode.parentNode.id; 
            await ServicesRequester.deletePost(postId);
            let tr = document.getElementById(postId);
            tr.parentNode.removeChild(tr); // remove tr from <table>
        }
    }
}
export default GetPosts;