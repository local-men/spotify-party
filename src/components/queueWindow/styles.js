const styles = theme => ({
    songQueueContainer:{
        backgroundColor: 'light-red',
        color: ''
    },
    queuedSongImg: {
        width: '100%',
        maxWidth: '50px',
        maxHeight: '50px'
    },
    queuedSongTitle:{
        [theme.breakpoints.up('xs')]:{
            fontSize: '15px'
        },
        [theme.breakpoints.down('xs')]:{
            fontSize: '2.8vw'
        }
    },
    queuedSongArtist:{
        [theme.breakpoints.up('xs')]:{
            fontSize: '14px'
        },
        [theme.breakpoints.down('xs')]:{
            fontSize: '2.7vw'
        }
    }
});

export default styles;
