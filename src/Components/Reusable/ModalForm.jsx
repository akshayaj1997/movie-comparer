import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Tooltip} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
                <Tooltip title="Close this window" placement="left" arrow>
                  <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
            ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

/**
 * Renders the modal form component
 * @param {Object} props {children,enableSaveButton,isopen,maxWidth,header,
 * toggle,savefunc,SaveButton=,...other}
 * @param {JSXElement} props.children Children to render inside modal body
 * @param {boolean} [props.enableSaveButton=true]  enable save button in Modal
 * @param {boolean} props.isopen show the modal
 * @param {string/bool} props.maxWidth maximum width of the modal to render
 * @param {string} props.header header/title of the modal
 * @param {function} props.toggle function on toggling the modal (open/close)
 * @param {function} props.SaveFunction function to call on save
 * @param {string} props.SaveButton text in save button
 * @param {any} props.other any other additional parameters you want to pass
 * @return {ReactNode} Modal form component
 */
function ModalForm({
  children,
  enableSaveButton = true,
  isopen,
  maxWidth,
  header,
  toggle,
  savefunc,
  SaveButton='Save',
  ...other
}) {
  const [open, setOpen] = React.useState(isopen);
  React.useEffect(() => {
    setOpen(isopen);
  }, [isopen]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'scroll';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const handleToggle = () => {
    setOpen(!open);

    if (toggle) toggle();
  };
  const save = () => {
    savefunc();
  };
  return (
    <Dialog
      {...other}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={maxWidth || 'md'}
      fullWidth= {true}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleToggle}>
        {header}
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{children}</Typography>
      </DialogContent>
      <DialogActions>
        {enableSaveButton ? (
                    <Tooltip title="Save the changes" placement="left" arrow>
                      <Button type="button" onClick={save} color="primary">
                        {SaveButton}
                      </Button>
                    </Tooltip>
                ) : (
                    <></>
                )}
      </DialogActions>
    </Dialog>
  );
}

ModalForm.propTypes = {
  children: PropTypes.any.isRequired,
  enableSaveButton: PropTypes.bool,
  isopen: PropTypes.bool.isRequired,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  header: PropTypes.string,
  savefunc: PropTypes.func,
  toggle: PropTypes.func,
  SaveButton: PropTypes.string,
  other: PropTypes.any,
};
export default ModalForm;
