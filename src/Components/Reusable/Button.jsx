import React from 'react';
import {Button as MuiButton} from '@material-ui/core';
import PropTypes from 'prop-types';

/**
 *
 *
 * @param {Object} props {text, size, color, variant, onClick, ...other}
 * @param {string} props.text text value to be passed to component display
 * @param {string} props.size size of the button to be rendered
 * @param {string} props.color color of the button
 * @param {string} props.variant type of the button to render
 * @param {function} props.onClick functionality to be triggered on onClick
 * @param {any}  props.other any other additional parameters you want to pass
 * @return {ReactNode} reusable button
 */
function Button({text, size, color, variant, onClick, ...other}) {
  return (
    <MuiButton
      size={size || 'large'}
      color={color || 'primary'}
      variant={variant || 'contained'}
      onClick={onClick}
      {...other}
    >
      {text}
    </MuiButton>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  other: PropTypes.any,
};

export default Button;
