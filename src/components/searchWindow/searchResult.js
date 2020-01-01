import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {IconButton, Button} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {Row, Col} from "react-bootstrap";

class SearchResultComponent extends React.Component{

    constructor(){
        super();
        this.state = {
            songTitle: '',
            artistName: '',
            imageSrc: '',
            songUri: '',
        }
    }

    componentDidMount() {

    }

    render(){
        //Declaring props
        const {classes, songTitle, artistName, imageSrc, songUri} = this.props;

        return(
            <Row className={classes.searchResultContainer}>
                <Col sm={2} xs={2}>
                    <img className={classes.searchResultImg} src={imageSrc}/>
                </Col>
                <Col sm={8} xs={8}>
                    <Row>
                        <div
                            className={classes.searchResultTitle}>
                            {songTitle}
                        </div>
                    </Row>
                    <Row>
                        <div
                            className={classes.searchResultArtist}>
                            {artistName}
                        </div>
                    </Row>
                </Col>
                <Col sm={2} xs={1} align={'right'}>
                    <IconButton
                        size={'small'}
                        onClick={() => this.queueSong(songUri)}>
                            <AddIcon />
                    </IconButton>
                </Col>
            </Row>
        )
    }

    queueSong = (songUri) => this.props.queueSong(songUri);
}

export default withStyles(styles)(SearchResultComponent)
