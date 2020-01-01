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
        [theme.breakpoints.up('xs')]:{
            fontSize: '15px'
        },
        [theme.breakpoints.down('xs')]:{
            fontSize: '2.8vw;'
        }
    },
    searchResultArtist:{
        [theme.breakpoints.up('xs')]:{
            fontSize: '14px'
        },
        [theme.breakpoints.down('xs')]:{
            fontSize: '2.7vw;'
        }
    },
    searchResultImg:{
        width: '100%',
        maxWidth: '40px',
        maxHeight: '40px'
    },
    queueButton: {
        width: '20px'
    }
});

export default styles;
