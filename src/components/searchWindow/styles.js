const styles = theme => ({
    //Styles for the whole search window
    listItem: {
        cursor: 'pointer'
    },
    searchBoxParent: {

    },
    searchWindow:{
        backgroundColor: 'orange'
    },

    //Styles for individual search results
    searchResultContainer:{
        backgroundColor: 'yellow',
        color: 'black',
        margin: '5px'
    },
    searchResultTitle:{
        fontSize: '2.8vw;'
    },
    searchResultArtist:{
        fontSize: '2.7vw;'
    },
    searchResultImg:{
        width: '100%'
    }
});

export default styles;
