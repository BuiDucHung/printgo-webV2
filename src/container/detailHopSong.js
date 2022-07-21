import styles from 'styles/myOrder.module.scss';

export const InanHopSongDetail = ({data}) => {
    return (
        <div>
          <div className={styles.ct__content}>
                <div>Dạng kết cấu</div>
                <div>{data?.extraData?.V2_dangKetCau}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Kích thước</div>
                <div>{data?.extraData?.V2_kichthuoc}</div>
            </div>
        </div>
    )
}

export const VatlieuHopSongDetail = ({data}) => {
    return (
        <div>
            <div className={styles.ct__content}>
               <div>Tờ bồi Carton</div>
               <div>{data?.extraData?.V2_toBoiCarton}</div>
            </div>
            <div className={styles.ct__content}>
               <div>Đinh lượng tờ bồi</div>
               <div>{data?.extraData?.V2_dinhLuongToBoi}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Số lớp sóng</div>
                <div>{data?.extraData?.V2_soLopSong}</div>
            </div>
            <div className={styles.ct__content}>
               <div>Loại sóng</div>
               <div>{data?.extraData?.V2_loaiSong}</div>
            </div>
            <div className={styles.ct__content}>
              <div>Số lượng</div>
              <div>{data?.extraData?.V2_soLuong}</div>
            </div>
        </div>
    )
}

export const GiacongHopSongDetail = ({data}) => {
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