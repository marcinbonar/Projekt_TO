import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface PrintButtonProps {
  className: string;
  onClick: () => void;
  buttonText?: string;
  iconName: IconProp;
  disabled?: boolean;
}

const PrintButton: React.FC<PrintButtonProps> = ({
  className,
  onClick,
  buttonText,
  iconName,
  disabled = false,
}) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      <FontAwesomeIcon size='xl' icon={iconName}/>
    </button>
  );
};

export default PrintButton;
