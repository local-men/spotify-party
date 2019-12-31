import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Row, Col} from "react-bootstrap";

class SearchResultComponent extends React.Component{

    constructor(){
        super();
        this.state = {
            songTitle: '',
            artistName: '',
            imageSrc: ''
        }
    }

    componentDidMount() {
    }


    //TODO: FIX FUCKED MOBILE Styling, maybe look for withStyles media query?
    render(){
        const {classes} = this.props;
        return(
            <Row className={classes.searchResultContainer}>
                <Col sm={2} xs={2}>
                    <img className={classes.searchResultImg} src={this.props.imageSrc}/>
                </Col>
                <Col sm={8} xs={8}>
                    <Row>
                        <div
                            className={classes.searchResultTitle}>
                            {this.props.songTitle}
                        </div>
                    </Row>
                    <Row>
                        <div
                            className={classes.searchResultArtist}>
                            {this.props.artistName}
                        </div>
                    </Row>
                </Col>
                <Col sm={2} xs={1} align={'right'}>
                    <Button
                        size={'small'}>
                            +
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default withStyles(styles)(SearchResultComponent)
