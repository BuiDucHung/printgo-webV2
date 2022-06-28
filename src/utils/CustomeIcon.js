

const CustomeIcon = ({type, className = '' , size = 'md', style={}, onCLick}) => {
    <img onCLick={onCLick} src={type} style={style} alt="icon" className={`am-icon am-icon-${type.substr(1)} am-icon-${size} ${className}`}/>
}
export default CustomeIcon;