import * as React from 'react';
import {Link} from 'react-router-dom';
import {wmtConfig} from '../Config/config';

// todo add exportable table class
export default class TitleTable extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            titleSearchResults: []
        }

    }

    render(){
        //const titleseachText = this.props.titleSearchText;

        const titleRows = [];

        // build collection of title rows based search results passed
        this.props.titleSearchResults.forEach((title, i) => {
            titleRows.push(
              <TitleTableRow key={i}
                titleId={title.titleId} 
                titleNameSortable={title.titleNameSortable}
                genre={title.genre}
                releaseYear={title.releaseYear}
             />);
        });

        return (
            <div>
                <h5>Search Results</h5>
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Release Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {titleRows}
                    </tbody>
                </table>
            </div>
        );
    }
}


class TitleTableRow extends React.Component {
    render() {
        const titleId = this.props.titleId;

        const titleNameSortable = this.props.titleNameSortable;
        // console.log("TitleRow: " + titleNameSortable + "; TitleId: " + titleId);

        // const genre = this.props.genre;
        const releaseYear = this.props.releaseYear;
        
        return (
            <tr key={titleId}>
                {/**Link to object location for loading details page*/}
                <td><Link to= {{
                    pathname: "/title-details",
                    state: {
                        titleId: titleId,
                        titleName: titleNameSortable
                    }
                }}>
                {titleNameSortable}
                </Link></td>
                {/* <td>{genre}</td> */}
                <td>{releaseYear}</td>
            </tr>
        );
    }
}