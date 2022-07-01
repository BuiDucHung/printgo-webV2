import styles from 'styles/myOrder.module.css';

export const InanHopKhacDetail = ({data}) => {
    return (
        <div>
            <div className={styles.ct__content}>
                <div>Kích thước</div>
                <div>{data?.extraData?.V2_kichthuoc}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Công nghệ in</div>
                <div>{data?.extraData?.V2_congnghein}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Số mặt</div>
                <div>{data?.extraData?.V2_somatin || 0}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Số màu in</div>
                <div>{data?.extraData?.V2_somauin || 0}</div>
            </div>
        </div>
    )
}

export const VatlieuHopKhacDetail = ({data}) => {
    return (
        <div>
            <div className={styles.ct__content}>
                <div>Chất liệu</div>
                <div>{data?.extraData?.V2_vatLieu}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Định lượng</div>
                <div>{data?.extraData?.V2_dinhLuong}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Vật liệu khác</div>
                <div>{data?.extraData?.V2_vatLieuKhac || 0}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Số lượng</div>
                <div>{data?.extraData?.V2_soLuong || 0}</div>
            </div>
        </div>
    )
}

export const GiacongHopKhacDetail = ({data}) => {
    return (
        <div>
            <div className={styles.ct__content}>
                <div></div>
                <div>
                {
                    data?.extraData?.V2_kieuGiaCong.map((item,id) => ( 
                        <div className={styles.flexWapGiaCong} key={id}>
                        <div style={{textAlign: 'end'}}>{item}</div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}