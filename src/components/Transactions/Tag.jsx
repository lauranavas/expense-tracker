import React from "react";
import PropTypes from "prop-types";

export default function Tag({ text }) {
  return <div className='px-3 py-1 bg-pink-600 rounded-full text-white text-xs font-bold'>{text}</div>;
}

Tag.propTypes = {
  text: PropTypes.string.isRequired,
};
