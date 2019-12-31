import React from 'react';
import SearchResultComponent from "./searchResult";
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import debounce from '../../helpers';
import styles from './styles';
import SpotifyWebApi from 'spotify-web-api-js';

var spotifyApi = new SpotifyWebApi();

class SearchWindowComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            searchQuery: '',
            searchResultsArr: [],
            token: '',
            searching: false
        }
    }

    componentDidMount() {
        this.setState({
            searchResultsArr:[{songTitle: 'zambi', artistName: "zombo"}, {songTitle: 'xaci', artistName: 'wazoo'}],
            token: this.props.token
        })
    }

    render(){
        const {classes} = this.props;
        spotifyApi.setAccessToken(this.state.token);

        return(
            <div className={classes.searchWindow}>
                Search Window Component
                <div className={classes.searchBoxParent}>
                    <Input
                        onChange={(e) => this.updateSearch(e.target.value)}
                    />
                </div>
                <div>
                    {
                        //If the user is searching... render search results
                        this.state.searching ?

                            this.state.searchResultsArr.map((_result, _index) => {
                                // console.log(_result);
                                return(
                                    <div key={_index}>
                                        <SearchResultComponent
                                            songTitle={_result.songTitle}
                                            artistName={_result.artistName}
                                        />
                                    </div>
                                )
                            })
                        :
                            null
                    }

                </div>


            </div>
        );
    }

    //Updates the search query text and calls the debounce update function
    updateSearch = async (text) =>{
        await this.setState({searchQuery: text});
        this.update();
    };

    //This function runs the api query, sets 'searching' to true,
    searchSpotify = async() =>{
        await spotifyApi.searchTracks("track:" + this.state.searchQuery, {limit: 10})
            .then(function(data) {
                console.log('Search Query', data);
            }, function(err) {
                console.error(err);
            });
        this.setState({searching: true});
        console.log("yeetzus");
    };

    update = debounce(() =>{
        this.searchSpotify();
    }, 400);
}

export default withStyles(styles)(SearchWindowComponent);