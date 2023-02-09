import React from 'react'
import PropTypes from 'prop-types'

const SpaceTag = (props) =>
	<div style={{ height: `${props.h ? props.h : 0}rem`, width: `${props.w ? props.w : 0}rem` }} />

SpaceTag.propTypes = {
	h: PropTypes.number,
	w: PropTypes.number,
}


export default SpaceTag
