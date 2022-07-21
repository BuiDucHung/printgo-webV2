import React from "react";

 interface IconProps  {
    type: any;
    className?: string | undefined;
    size?: string | undefined;
    style?: {} | undefined;
    onClick?: any;

}

const CustomeIcon: React.FC<IconProps> = ({type, className = '' , size = 'md', style={}, onClick}) => (
    <img onClick={onClick} src={type} style={style} alt="icon" className={`am-icon am-icon-${type.substr(1)} am-icon-${size} ${className}`}/>
)
export default CustomeIcon;