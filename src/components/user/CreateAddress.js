import React, {useState} from 'react'
import { Button, Checkbox, Col, Form, Input, message, Row, Select } from 'antd'
import Link from 'next/link';
import RequestUtils from 'libs/RequestUtils';
import { Controller, useForm } from 'react-hook-form';

const { Option } = Select;
const layout = {
    labelCol: { span: 24},
  };

  const createItem = data => {
    return data.map(({name, id}) => {
      return { label: name, value: id }
    })
  }
  

const CreateAddress = () => {
    const [form] = Form.useForm();
    const { handleSubmit, control} = useForm();

    const [provice, setProvice] = useState({});
    const [listProvince, setListProvice] = useState([]);

    const [district, setDistrict] = useState({});
    const [listDistrict, setListDistrict] = useState([]);

    const [ward, setWard] = useState({});
    const [listWard, setListWard] = useState([]);
    const [isDefault, setIsDefault] = useState(false);

    const onFinish = async(values) => {
      try {
        const sub = {
          wardId: ward.value, districtId: district.value, provinceId: provice.value,
          isDefault: isDefault ? 1 : 0, address: values.address, mobilePhone: values.mobilePhone, receiverName: values.receiverName
        }
        const addUserInfo = await RequestUtils.postCdp('/customer/create-address', sub);        
        if(addUserInfo){
          return message.success('Cập nhập thông tin thành công');
        }
      } catch (error) {
        if(error.response.data){
          return message.error('Cập nhập thông tin thất bại');
        }
      }
    };

    const onChange = (checked) => {
      setIsDefault(checked);
    };

    React.useEffect( () => {
      RequestUtils.openCdp('/province/lists', {'parent-id': 0}, []).then(provices => setListProvice(createItem(provices)));

    }, []);
    
    const onChangeProvince = async(value) => {
      const item = listProvince.find(item => item.value === value);
      setProvice(item || {});
      await RequestUtils.openCdp('/province/lists', {'parent-id': value}, []).then(data => {
        const items = createItem(data);
        setListDistrict(items);
        if(district) {
          const dit = items.filter(item => item.value === district).shift();
          setDistrict(dit || {});
        }
      });
    }

    const onChangeDistrict = async(value) => {
      const item = listDistrict.find(item => item.value === value);
      setDistrict(item || {});
      await RequestUtils.openCdp('/province/lists', {'parent-id': value}, []).then(data => {
        const items = createItem(data);
        setListWard(items);
        if(ward) {
          const dit = items.find(item => item.value === ward);
          setWard(dit || {});
        }
      });
    }

    const onChangeWard = (value) => {
      const item = listWard.find(item => item.value === value);
      setWard(item || {});
    }
  
  return (
    <div>
        <Form {...layout} form={form} name="basic" onFinish={handleSubmit(onFinish)} initialValues={{remember: true,}} autoComplete="off">
          <Controller
            control={control}
            name="receiverName"
            rules={{required: false}}
            render={({field}) => (
              <Form.Item {...field} label="Người nhận"rules={[{required: true, message: 'Người nhận không được để trống.'}]}>
              <Input type={'text'} style={{height: 40}}/>
            </Form.Item>
            )}
          />

          <Controller
          control={control}
          name="address"
          rules={{required: false}}
          render={({field}) => (
            <Form.Item {...field} label="Địa chỉ" rules={[{required: true, message: 'Địa chỉ không được để trống.'}]}>
            <Input type={'text'} style={{height: 40}}/>
         </Form.Item>
          )}

          /> 
           <Row gutter={[16, 16]}>
               <Col span={8}>
               <Form.Item label="Tỉnh" rules={[{required: true, message: 'Tỉnh/Thành phố không được để trống.'}]}>
                   <Select placeholder="Tỉnh/Thành phố" allowClear onChange={onChangeProvince}>
                     {
                       listProvince.map((item, id) => (
                        <Option key={id} value={item.value}>{item.label}</Option>
                       ))
                     }
                </Select>
             </Form.Item>
               </Col>
               <Col span={8}>
                <Form.Item label="Quận" rules={[{required: true, message: 'Quận huyện không được để trống.'}]}>
                <Select placeholder="Quận/Huyện" allowClear onChange={onChangeDistrict}>
                  {
                    listDistrict.map((item, id) => (
                      <Option key={id} value={item.value}>{item.label}</Option>
                    ))
                  }
                </Select>
            </Form.Item>
               </Col>
               <Col span={8}>
                <Form.Item label="Huyện"rules={[{required: true, message: 'Phường xã không được để trống'}]}>
              <Select placeholder="Phường/xã" allowClear onChange={onChangeWard}>
                  {
                    listWard.map((item, id) => (
                      <Option key={id} value={item.value}>{item.label}</Option>
                    ))
                  }
              </Select>
            </Form.Item>
               </Col>
           </Row>
           <Controller
           control={control}
           name="mobilePhone"
           rules={{required: false}}
           render={({field}) => (
            <Form.Item {...field} label="Điện thoại di động" name={'phone'} rules={[{required: true, message: 'Điện thoại di động không được để trống.'}]}>
            <Input type={'text'} style={{height: 40}}/>
          </Form.Item>
           )}
           />
       
           <Checkbox value={isDefault} onChange={onChange} style={{marginTop: 10}}>Mặc định</Checkbox>
           <div style={{display: 'flex', marginTop: 10, justifyContent: 'flex-start', alignItems: 'center', gap: 10}}>
           <Button type="primary" htmlType="submit">Tạo mới</Button>
           <Button type="primary" danger><Link href={'/customer/pay'}>Hủy</Link></Button>
           </div>
        </Form>
    </div>
  )
}

export default CreateAddress