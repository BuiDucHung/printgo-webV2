import styles from 'styles/myOrder.module.css';

export const InanHopCungDetail = ({data}) => {
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
            <div className={styles.ct__content}>
                <div>Công nghệ in</div>
                <div>{data?.extraData?.V2_congnghein}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Kiểu in</div>
                <div>{data?.extraData?.V2_kieuIn}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Số lượng</div>
                <div>{data?.extraData?.V2_soLuong}</div>
            </div>
        </div>
    )
}

export const VatlieuHopCungDetail = ({data}) => {
    return (
        <div>
            <div className={styles.ct__content}>
                <div>Vỏ ngoài</div>
                <div>{data?.extraData?.V2_voNgoai}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Định lượng vỏ ngoài</div>
                <div>{data?.extraData?.V2_voNgoai}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Cốt vỏ ngoài</div>
                <div>{data?.extraData?.V2_cotVoNgoai}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Cốt vỏ ngoài định lượng</div>
                <div>{data?.extraData?.V2_cotVoNgoaiDinhLuong}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Tờ gạc vỏ hộp</div>
                <div>{data?.extraData?.V2_toGacVoHop}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Định lượng tờ gạc V.H</div>
                <div>{data?.extraData?.V2_toGacVoHopDinhLuong}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Khay định hình</div>
                <div>{data?.extraData?.V2_khayDinhHinh}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Định lượng khay Đ.H</div>
                <div>{data?.extraData?.V2_khayDinhHinhDinhLuong}</div>
            </div>
            <div className={styles.ct__content}>
                <div>Ghi chú khay định hình</div>
                <div>{data?.extraData?.V2_noteKhayDinhHinh}</div>
            </div>
        </div>
    )
}

export const GiacongHopCungDetail = ({data}) => {
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