import React, { FC } from 'react';
import {
  BaseEdge,
} from 'reactflow';


export const getCustomBezierPath = (sourceX: any, sourceY: any, targetX: any, targetY: any, offset: any) => {
  const controlX = (sourceX + targetX) / 2 + offset;
  const controlY = (sourceY + targetY) / 2 + offset;

  return `M${sourceX},${sourceY} C${controlX},${controlY} ${controlX},${controlY} ${targetX},${targetY}`;

};

const CustomEdge: FC<any> = ({
                               id,
                               sourceX,
                               sourceY,
                               targetX,
                               targetY,
                               style = {},
                               markerEnd,
                             }) => {
  const offset = Math.floor(Math.random() * 40)

  const edgePath = getCustomBezierPath(sourceX, sourceY, targetX, targetY, offset);

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
    </>
  );
};

export default CustomEdge;