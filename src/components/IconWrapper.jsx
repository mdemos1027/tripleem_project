import React, { Suspense } from "react";

// Wraps lazy-loaded icons with fallback loader
const IconWrapper = ({ Icon, className }) => (
  <Suspense fallback={<div className={className + " animate-pulse bg-gray-600 rounded w-4 h-4"} />} >
    <Icon className={className} />
  </Suspense>
);

export default IconWrapper;
