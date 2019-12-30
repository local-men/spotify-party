import React from 'react';
import SearchResultComponent from "./searchResult";
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List'
import styles from './styles';

class SearchWindowComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            searchResultsArr: []
        }
    }

    componentDidMount() {
        this.setState({searchResultsArr:[{songTitle: 'zambi', artistName: "zombo"}, {songTitle: 'xaci', artistName: 'wazoo'}]})
    }

    render(){

        const {classes} = this.props;

        return(
            <div className={classes.searchWindow}>
                Search Window Component
                <div className={classes.searchBoxParent}>
                    <Input />
                </div>
                <div>
                    {
                        this.state.searchResultsArr.map((_result, _index) => {
                            console.log(_result);
                            return(
                                <div key={_index}>
                                    <SearchResultComponent
                                        songTitle={_result.songTitle}
                                        artistName={_result.artistName}
                                    />
                                </div>

                            )
                        })
                    }

                </div>


            </div>
        );
    }
}

export default withStyles(styles)(SearchWindowComponent);