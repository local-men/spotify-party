import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

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
        this.setState({
            songTitle: this.props.songTitle,
            artistName: this.props.artistName,
            imageSrc: this.props.imageSrc
        });
    }

    render(){
        return(
            <div>
                <div>song name : {this.state.songTitle} </div>

                <div>artist : {this.state.artistName} </div>
                <img src={this.state.imageSrc}/>

            </div>
        )
    }
}

export default withStyles(styles)(SearchResultComponent)