import React from 'react';
import '../../index.css';

/**
 * This react component will focus on displaying the search box as well as having the 
 * action to search through the data it is given
 */
class SearchFilter extends React.Component
{
    constructor(props)
    {
        super(props);
        this.applyFilterSearch = this.applyFilterSearch.bind(this);
    }

    render()
    {
        return (
            <div class='form-group'>
                <label>Search:</label>
                <input type="text" class="form-control" placeholder="Search by tag or keywords" 
                    onKeyUp={this.applyFilterSearch}
                    // max character length to limit length of time to complete the search
                    maxLength='250'
                    aria-label="Search" aria-describedby="basic-addon2" />
            </div>
        );
    }

    applyFilterSearch(event)
    {
        let searchString = event.target.value;
        if(this.props.data)
        {
            // FIXME TODO search for parts of the searchString in the array 
            console.log(searchString);
        }
    }
}
export default SearchFilter;