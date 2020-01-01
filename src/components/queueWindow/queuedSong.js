import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {Row, Col} from "react-bootstrap";

class QueuedSongComponent extends React.Component {

    constructor(){
        super();
        this.state = {
        }
    }

    componentDidMount() {

    }

    render(){
        const {classes, songTitle, artistName, imageSrc, songUri, votes} = this.props;

        return(
            <Row className={classes.songQueueContainer}>
                <Col sm={2} xs={2}>
                    <img className={classes.queuedSongImg} src={imageSrc}/>
                </Col>
                <Col sm={8} xs={8}>
                    <Row>
                        <div className={classes.queuedSongTitle}>
                            {songTitle}
                        </div>
                    </Row>
                    <Row>
                        <div className={classes.queuedSongArtist}>
                            {artistName}
                        </div>
                    </Row>
                </Col>
                <Col sm={2} xs={1} align={'right'}>
                    votes {votes}
                </Col>
            </Row>
        );
    }
}

export default withStyles(styles)(QueuedSongComponent);
