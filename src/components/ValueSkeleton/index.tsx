import React from 'react'
import styled from 'styled-components'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const ValueSkeleton: React.FC<{ height?: number, width?: number }> = ({ height, width }) => {
  return (
    <SkeletonTheme baseColor={'rgba(100,100,100,.1)'} highlightColor={'rgba(255,255,255,.1)'}>
      <ValueSkeletonPadding height={height} >
        <Skeleton height={height} width={width} />
      </ValueSkeletonPadding>
    </SkeletonTheme>
  )
}

const ValueSkeletonPadding = styled.div<{ height?: number, width?: number }>`
  height:${props => `${props.height}px`};
  ${props => props.width ? `width:${props.width}px` : null}
  /* width:200px; */
`;
export default ValueSkeleton