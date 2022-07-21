export const IconUser = ({w, h, uName}) => (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        width:w, height: h, borderRadius: w/2, backgroundColor: '#5abeb4', color:'#fff'
    }}>
        {uName? uName.charAt(0) : 'P'}
    </div>
);