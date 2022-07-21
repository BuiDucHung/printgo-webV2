import styles from 'styles/myOrder.module.scss';

export const InanTuiGiayDetail = ({data}) => {
    return (
        <div>
            <div className={styles.ct__content}>
                <div>Kích thước</div>
                <div>{data?.extraData?.V2_kichthuoc}</div>
            </div>
        </div>
    )
}

export const VatlieuTuiGiayDetail = ({data}) => {
    return (
        <div>
            <div className={styles.ct__content}>
               <div>Chất liệu túi</div>
               <div>{data?.extraData?.V2_chatLieuTui}</div>
            </div>
            <div className={styles.ct__content}>
               <div>Định lượng túi</div>
               <div>{data?.extraData?.V2_dinhLuongTui}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Vật liệu khác</div>
                <div>{data?.extraData?.V2_vatLieuKhac}</div>
            </div>
            <div className={styles.ct__content}>
               <div>Chất liệu quai túi</div>
               <div>{data?.extraData?.V2_chatLieuQuaiTui}</div>
            </div>
            <div className={styles.ct__content}>
              <div>Số lượng</div>
              <div>{data?.extraData?.V2_soLuong}</div>
            </div>
        </div>
    )
}

export const GiacongTuiGiayDetail = ({data}) => {
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