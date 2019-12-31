import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Button from '@material-ui/core/Button';
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

    render(){
        const {classes} = this.props;
        return(
            <Row className={classes.searchResultContainer}>
                <Col sm={3}>
                    <img className={classes.searchResultImg} src={this.props.imageSrc}/>
                </Col>
                <Col sm={9}>
                    <div className={classes.searchResultTitle}>song name : {this.props.songTitle} </div>
                    <div className={classes.searchResultArtist}>artist : {this.props.artistName} </div>
                </Col>
                <Button>+</Button>
            </Row>
        )
    }
}

export default withStyles(styles)(SearchResultComponent)