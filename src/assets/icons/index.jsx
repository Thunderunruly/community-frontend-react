import React from 'react';

const icons = {
  github: require('./github.svg'),
  google: require('./google.svg'),
};

const SvgIcon = ({ icon, size = 24, ...props }) => {
  const SvgImage = icons[icon];

  if (!SvgImage) {
    return null;
  }

  return (
    <img
      src={SvgImage.default}
      alt={`${icon} icon`}
      width={size}
      height={size}
      style={{display: "block"}}
      draggable={false}
      {...props}
    />
  );
};

export default SvgIcon;
