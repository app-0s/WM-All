import * as React from 'react';
import {Table, Container, Row, Col, Badge, Card, CardBody, CardText, Collapse, Button} from 'reactstrap';

export default class DisplayAllStoryLines extends React.Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = { 
            collapse: false,
            awardsWon: [],
            awardsNominated: [],
         };
      }

      componentDidMount(){
          this.setState({
              awardsWon: this.props.awardsWon,
              awardsNominated: this.props.awardsNominated,
          })
      }

      toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: !this.state.collapse });
      }

      // Creates table of awards won
      renderAwards(awards, awardText){

        return (
            <div>
                <h6>{awardText}</h6>
                <Table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Award Company</th>
                            <th>Award</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*Map awards to rows */
                            awards.map((award, i) => 
                                <tr key={i}>
                                    <td>{award.awardYear}</td>
                                    <td>{award.awardCompany}</td>
                                    <td>{award.award}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        ) 
    }

    render(){
        const collapse = this.state.collapse;

        return(
            <Container>
                <Row>
                    <Button outline color="secondary" block onClick={this.toggle}>Awards</Button>
                    <Card>
                        <Collapse isOpen={collapse}>
                            <CardBody>
                                <Row sm={{size: 'auto'}}>
                                    {/* Render awards won */}
                                    <Col>
                                        {this.renderAwards(this.state.awardsWon, "Awards Won")}                                        
                                    </Col>
                                    {/* Render awards nominated */}
                                    <Col>
                                        {this.renderAwards(this.state.awardsNominated, "Awards Nominated")}
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