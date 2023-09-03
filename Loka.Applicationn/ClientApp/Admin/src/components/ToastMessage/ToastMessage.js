import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Snackbar, IconButton } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

import styles from './ToastMessage.module.scss';

const cx = classNames.bind(styles);

const ToastMessage = ({ snackbarMessage, snackbarSeverity}) => {
    const [snackPack, setSnackPack] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState(undefined);
    const [severity, setSeverity] = useState("");

    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({ ...snackPack[0] });
            setSnackPack((prev) => prev.slice(1));
            setSnackbarOpen(true);
            setSeverity(severity);
        } else if (snackPack.length && messageInfo && snackbarOpen) {
            // Close an active snack when a new one is added
            setSnackbarOpen(false);
        }
    }, [snackPack, messageInfo, snackbarOpen, severity]);

    useEffect(() => {
        if (snackbarMessage) {
            setSnackPack((prev) => [...prev, { message: snackbarMessage, key: new Date().getTime() }]);
            setSeverity(snackbarSeverity);
            setSnackbarOpen(true);
        }
    }, [snackbarMessage, snackbarSeverity]);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleExited = () => {
        setMessageInfo(undefined);
    };

    return (
        <div>
            <Snackbar
                message={messageInfo ? messageInfo.message : undefined}
                key={messageInfo ? messageInfo.key : undefined}
                open={snackbarOpen}
                autoHideDuration={4000}
                TransitionProps={{ onExited: handleExited }}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                style={{ marginTop: '80px' }}
            >
                <MuiAlert
                    onClose={handleSnackbarClose}
                    elevation={6}
                    severity={severity}
                    variant="filled"
                    className={cx('mui__alert')}
                    action={
                        <div className="flex items-center">
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                sx={{ p: 0.5, marginTop: '2px' }}
                                onClick={handleSnackbarClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                    }
                >
                    <p>{messageInfo ? messageInfo.message : undefined}</p>
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default ToastMessage;
