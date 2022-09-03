import React from 'react';
import classes from './Loader.module.css'

function Loader(props) {
    return (
        <div className={classes.loader}>
            <div className={classes['loader-pulse']}></div>
        </div>
    )
}

export default Loader;