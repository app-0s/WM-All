import * as React from 'react';
import {Table, Container, Row, Col, Badge, Card, CardBody, CardText, Collapse, Button} from 'reactstrap';

export default class DisplayParticipants extends React.Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = { 
            collapse: false,
            participants: [],
         };
      }

      componentDidMount(){
          this.setState({
            participants: this.props.titleParticipants,
          })
      }

      toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: !this.state.collapse });
      }

      // Create participant badges
    participantBadges(participants){
        let participantBadgeCollection = [];

        if(participants !== null){
            participantBadgeCollection = participants.map((participant, i) =>
            <Badge color="secondary" key={i}>
                {participant}
            </Badge>
        );
        
        }
    
        return(
            participantBadgeCollection    
        );
    }


    render(){
        const collapse = this.state.collapse;

        return(
            <Container>
                <Row>
                    <Button outline color="secondary" block onClick={this.toggle}>Participants</Button>
                    <Card sm={{size: 'auto'}}>
                        <Collapse isOpen={collapse}>
                            <CardBody>
                                <Row sm={{size: 'auto'}}>
                                    {/* Render participants */}
                                    <Col>
                                        {this.participantBadges(this.state.participants)}
                                    </Col>
                                </Row>
                            </CardBody>
                        </Collapse>
                    </Card>
                </Row>
            </Container>
        );
    }
}