import React from 'react';
import styles from './alertboxComponent.module.css';
import CloseIcon from '@material-ui/icons/Close';

function AlertboxComponent(props){
    return(
        <div className={styles.alertbox}>
            <div className={styles.cancel} onClick={props.close}><CloseIcon/></div>
            <p className={styles.alertmessage}>{props.message}</p>
            {props.children}
        </div>
    )
}

export default AlertboxComponent;