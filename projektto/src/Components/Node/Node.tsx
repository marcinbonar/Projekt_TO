import React, { FC } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NodeData } from '../../services/types';


const Node: FC<{ id: string, data: NodeData }> = ({ id, data }) => {

  const { label, elements } = data || {};
  return <div style={{ borderRadius: 8, background: '#FFF', border: '1px solid black', padding: 16 }}>
    <p>{label}</p>
    <FontAwesomeIcon icon={faPlus} />
    <div style={{ display: 'flex' }}>
      {elements.map(({ name }) => <div>
        <span>{name}</span>
      </div>)}
    </div>
  </div>;
};

export default Node;