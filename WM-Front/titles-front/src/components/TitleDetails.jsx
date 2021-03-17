import * as React from 'react';
import {wmtConfig} from '../Config/config';
import {Table, Container, Row, Col, Badge, Card, CardBody, CardText, Collapse, Button, CardTitle} from 'reactstrap';
import {Link} from 'react-router-dom';
import { loading } from './DisplayLoadingSpinner';
import DisplayAwardsCard from './DisplayAwardsCard';
import DisplayAllStoryLines from './DisplayAllStoryLines';
import DisplayParticipants from './DisplayParticipants';

export default class TitleDetails extends React.Component {

    constructor(props){
        super(props);


        this.state = {
            titleId: 0,
            titleParticipants: [],
            storyLines: [],
            loading: true,
            loadingError: false
        }
    }

    
    async componentDidMount() {

        const tId = this.props.location.state.titleId;      // check props.location.state for id state within router
        await this.setState({titleId: tId});

        //console.log("Location: " + this.props.location.state.titleId)

        this.getDetailedTitleData();
    }

    
    // Renders all related title information
    renderTitleDetails() {
       let genreNames = this.state.titleGenres.map(x => x.genreName);

        return (
            <Container>
                <Row>
                    <Col>
                        {/*Render base information */}
                        <h4>{this.state.titleName} ({this.state.releaseYear})</h4>
                        <p>{this.genreBadges(this.state.titleGenres)}</p>
                        <p>{this.state.baseStory}</p>
                        <hr />

                        <DisplayParticipants titleParticipants={this.state.titleParticipants} />
                    </Col>
                </Row>
                {/*Render Awards Section*/}
                <Row>
                    <Col>
                        <DisplayAwardsCard awardsWon={this.state.awardsWon} awardsNominated={this.state.awardsNominated} />
                    </Col>
                </Row>
                {/*Render StoryLine Section*/}
                <Row>
                    <Col>
                        <DisplayAllStoryLines storyLines={this.state.storyLines} />
                    </Col>
                </Row>
            </Container>
        );
    }

    // Create Genre badges using TitleGenre collection
    genreBadges(genres){
        const genreBadgeCollection = genres.map(genre =>
            <Badge color="secondary" id={genre.id}>
                {genre.genreName}
            </Badge>
        );

        return(
            genreBadgeCollection    
        );
        
    }

    // Create participant badges
    participantBadges(participants){
        const participantBadgeCollection = participants.map((participant, i) =>
            <Badge color="secondary" key={i}>
                {participant}
            </Badge>
        );

        return(
            participantBadgeCollection    
        );
    }

    // renderStoryLines(storyLines){
    //     return(
    //         <div>
    //             <h6>All Storylines</h6>
    //             <Table className='table table-striped'>
    //                 <thead>
    //                     <tr>
    //                         <th>Type</th>
    //                         <th>Language</th>
    //                         <th>Description</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {/*Map awards to rows */
    //                         storyLines.map(storyLine => 
    //                             <tr key={storyLine.Id}>
    //                                 <td>{storyLine.type}</td>
    //                                 <td>{storyLine.language}</td>
    //                                 <td>{storyLine.description}</td>
    //                             </tr>
    //                         )
    //                     }
    //                 </tbody>
    //             </Table>
    //         </div>
    //     )
    // }

    render() {
        let contents = this.state.loading ? loading : this.renderTitleDetails();
        if(this.state.loadingError){
            contents = (<div>Error Loading Details</div>)
        }

        return(
            <div>
                <Link to={{
                    pathname: "/",
                    state: {

                    }
                }} 
                style={{display: 'flex', justifyContent: 'right'}}>
                        Return to search
                </Link>

                {contents}
            </div>
        );
    }

    async getDetailedTitleData(){
        if(this.props.location.state.titleId == null){
            console.log("TitleId is null");
            this.setState({
                loadingError: true
            })
            return;
        }
        try{
            // call id endpoint
            const response = await fetch(wmtConfig.apiBase + wmtConfig.apiTitleDetail + this.state.titleId);
            const data = await response.json();
            
            // set state using retrieved data object
            this.setState({
                titleName: data.titleName,
                releaseYear: data.releaseYear,
                baseStory: data.baseStoryLine,
                processedDateTimeUtc: data.processedDateTimeUtc,
                awardsWon: data.awardsWon,
                awardsNominated: data.awardsNominated,
                alternateNames: data.alternateNames,
                storyLines: data.storyLines,
                titleGenres: data.titleGenres,
                titleParticipants: data.titleParticipants,
                loading: false
            })

        }catch (err) {
            console.log("Error: " + err);
            this.setState({
                loadingError: true
            })
        }        
    }
}