import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class SearchResultComponent extends React.Component{

    constructor(){
        super();
        this.state = {
            songTitle: '',
            artistName: ''
        }
    }

    componentDidMount() {
        this.setState({
            songTitle: this.props.songTitle,
            artistName: this.props.artistName
        });
    }

    render(){
        return(
            <div>
                <div>song name : {this.state.songTitle} </div>

                <div>artist : {this.state.artistName} </div>
            </div>
        )
    }
}

export default withStyles(styles)(SearchResultComponent)