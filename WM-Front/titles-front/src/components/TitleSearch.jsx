import * as React from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import {wmtConfig} from '../Config/config';
import TitleTable from './TitleSearchResultsDisplay';
import { loading } from './DisplayLoadingSpinner'
import {useLocation} from 'react-router-dom';

// todo add loader spinner and import

export class TitleSearch extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            titleSearchText: '',
            titleSearchResults: [], // array of titles 
            searchLoading: false,
            displaySearchResults: false
        }

        // handler events
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // check the state 
    // componentDidMount() {
    //     this.getData();
    // }

    // componentDidUpdate() {
    //     this.getData();
    // }

    // Handler Events
    // Handler for textbox of form 
    handleChange(event){
        // update state titleSearchText value
        this.setState({
            titleSearchText: event.target.value
        })
    }

    // Handler for submission of form
    handleSubmit(event){
        this.setState({
            displaySearchResults: true
        })

        this.getData();

        event.preventDefault();
    }

    // Retrieves data from 
    async getData() {
        console.log(wmtConfig.apiBase);
        if(this.props.titleSearchText !== '' || this.props.titleSearchText !== undefined){
            // Set loading to true
            this.setState({
                searchLoading: true
            })

            try{
                // get resultset response
                const response = await fetch(wmtConfig.apiBase + wmtConfig.apiTitleSearch + this.state.titleSearchText);
                const data = await response.json();

                this.setState({
                    titleSearchResults: data,
                    searchLoading: false
                })
            } catch (err){
                console.log("Error: ", err);
            }
        }
        
    }

    render() {
        // contents for display results
        let contents = <p> </p>

        // display results 
        if(this.state.displaySearchResults){
            // todo fill in loading
            contents = this.state.searchLoading ? loading :
             <TitleTable titleSearchResults={this.state.titleSearchResults} />
        }

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label for="titleName">Title Name</Label>
                        <Col>
                            <Input type="text" name="titleInput" id="titleName"
                                value={this.state.titleSearchText} onChange={this.handleChange} />
                        </Col>
                    </FormGroup>
                </Form>

                <hr />
                {contents}
            </div>
        )
    }

}