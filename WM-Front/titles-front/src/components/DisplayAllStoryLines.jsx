import * as React from 'react';
import {Table, Container, Row, Col, Badge, Card, CardBody, CardText, Collapse, Button} from 'reactstrap';

export default class DisplayAllStoryLines extends React.Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = { 
            collapse: false,
            storyLines: [],
         };
      }

      componentDidMount(){
          this.setState({
              storyLines: this.props.storyLines,
          })
      }

      toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: !this.state.collapse });
      }

      renderStoryLines(storyLines){
        return(
            <div>
                <Table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Language</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*Map awards to rows */
                            storyLines.map((storyLine, i) => 
                                <tr key={i}>
                                    <td>{storyLine.type}</td>
                                    <td>{storyLine.language}</td>
                                    <td>{storyLine.description}</td>
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
                    <Button outline color="secondary" block onClick={this.toggle}>All Storylines</Button>
                    <Card sm={{size: 'auto'}}>
                        <Collapse isOpen={collapse}>
                            <CardBody>
                                <Row sm={{size: 'auto'}}>
                                    {/* Render storylines */}
                                    <Col>
                                        {this.renderStoryLines(this.state.storyLines)}
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