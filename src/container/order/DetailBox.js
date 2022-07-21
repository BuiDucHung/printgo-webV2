import React, {useMemo} from 'react'
import { Typography } from 'antd';

import { GiacongHopCungDetail, InanHopCungDetail, VatlieuHopCungDetail } from "container/detailHopCung"
import { GiacongHopSongDetail, InanHopSongDetail, VatlieuHopSongDetail } from 'container/detailHopSong';
import { GiacongTuiGiayDetail, InanTuiGiayDetail, VatlieuTuiGiayDetail } from 'container/detailTuiGiay';
import { GiacongHopKhacDetail, InanHopKhacDetail, VatlieuHopKhacDetail } from 'container/detailHopKhac';
import { Giacong, Inan, Other, Vatlieu } from 'container/detailDefault';
import { PRINT_V2_TYPE } from "utils";


const {Title} = Typography;
export const DetailBox = ({productPractice, decode, libary}) => {
    
    const MemoListDetail = useMemo(() => {
        switch(productPractice?.extraData?.V2_type){
            case PRINT_V2_TYPE.hopCung: 
                return (
                    <div style={{marginTop: 20}}>
                    <Title level={5}>Kỹ thuật in</Title>
                    <InanHopCungDetail data={productPractice || ''} />
                    <hr/>
                    <Title level={5}>Vật liệu</Title>
                    <VatlieuHopCungDetail data={productPractice || ''}/>
                    <hr/>
                    <Title level={5}>Kiểu gia công</Title>
                    <GiacongHopCungDetail data={productPractice || ''}/>
                    <hr/>
                    <Other data={libary}/>
                </div>
                )
            case PRINT_V2_TYPE.hopSong:
                return (
                    <div style={{marginTop: 20}}>
                    <Title level={5}>Kỹ thuật in</Title>
                    <InanHopSongDetail data={productPractice || ''} />
                    <hr/>
                    <Title level={5}>Vật liệu</Title>
                    <VatlieuHopSongDetail data={productPractice || ''}/>
                    <hr/>
                    <Title level={5}>Kiểu gia công</Title>
                    <GiacongHopSongDetail data={productPractice || ''}/>
                    <hr/>
                    <Other data={libary}/>
                </div>
                )
            case PRINT_V2_TYPE.tuiGiay:
                return (
                    <div style={{marginTop: 20}}>
                    <Title level={5}>Kỹ thuật in</Title>
                    <InanTuiGiayDetail data={productPractice || ''} />
                    <hr/>
                    <Title level={5}>Vật liệu</Title>
                    <VatlieuTuiGiayDetail data={productPractice || ''}/>
                    <hr/>
                    <Title level={5}>Kiểu gia công</Title>
                    <GiacongTuiGiayDetail data={productPractice || ''}/>
                    <hr/>
                    <Other data={libary}/>
                </div>
                )
            case PRINT_V2_TYPE.other:
                return (
                    <div style={{marginTop: 20}}>
                    <Title level={5}>Kỹ thuật in</Title>
                    <InanHopKhacDetail data={productPractice || ''} />
                    <hr/>
                    <Title level={5}>Vật liệu</Title>
                    <VatlieuHopKhacDetail data={productPractice || ''}/>
                    <hr/>
                    <Title level={5}>Kiểu gia công</Title>
                    <GiacongHopKhacDetail data={productPractice || ''}/>
                    <hr/>
                    <Other data={libary}/>
                </div>
                )    
            default:
            return (
                <div style={{marginTop: 20}}>
                    <Title level={5}>Kỹ thuật in</Title>
                    <Inan data={decode || ''} />
                    <hr/>
                    <Title level={5}>Vật liệu</Title>
                    <Vatlieu data={decode || ''}/>
                    <hr/>
                    <Title level={5}>Kiểu gia công</Title>
                    <Giacong data={decode || ''}/>
                </div>
            )
        }
    },[decode, productPractice])
    return MemoListDetail
} 
