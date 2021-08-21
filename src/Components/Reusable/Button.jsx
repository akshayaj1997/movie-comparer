import React from 'react';
import {Button as MuiButton} from '@material-ui/core';
import PropTypes from 'prop-types';
/**
 * Renders reusable Button Component using MUI
 * @param {text} text value to be passed to component display
 * @param {size} size of the button to be rendered
 * @param {color} color of the button
 * @param {variant} type of the button to render
 * @param {onClick} functionality to be triggered when onClick event
 * @param {other} any other additional parameters you want to pass
 * @return {func} reusable button
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
