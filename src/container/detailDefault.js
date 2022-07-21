import styles from 'styles/myOrder.module.scss';

export const Inan = ({data}) => {
 
    return (
        <div>
            <div className={styles.ct__content}>
                <div>Kích thước</div>
                <div>{data?.kichthuoc}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Công nghệ in</div>
                {
                    data?.inan?.congnghein?.map((item, i) => (
                        <div key={i}>{item.name}</div>
                    ))
                } 
            </div>
            <div className={styles.ct__content}>
                <div>Số mặt</div>
                {
                    data?.inan?.somat.map((item, i) => (
                    <div key={i}>{item.name}</div>
                    ))
                }
            </div>
        </div>
    )
}

export const Vatlieu = ({data}) => {
    return (
        <div>
            <div className={styles.ct__content}>
                <div>Chất liệu</div>
                <div>{data?.vatLieu?.name}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Định lượng</div>
                {
                    data?.vatLieu?.dingluong.map((item, i) => (
                    <div key={i}>{item} gsm</div>
                    )) 
                }
            </div>
        </div>
    )
}

export const Giacong = ({data}) => {
    return (
        <div>
            <div className={styles.ct__content}>
                <div></div>
                <div>
                {
                    data?.giacong?.map((item,id) => ( 
                        <div className={styles.flexWapGiaCong} key={id}>
                        <div style={{textAlign: 'end'}}>{item.name}</div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export const Other = ({data}) => {
    if(!Array.isArray(data) || !data.length) {
      return '';
    }
    return <> 
    <div><b>Qui cách in ấn khác</b></div>
    {data.map( (item, id) => (
      <div key={id} className={styles.ct__content}>
        <div>{item.libraryGroupName}</div>
        <div>{item.name}</div>
      </div>
    ))}
    </>
  }