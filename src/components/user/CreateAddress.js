import React, {useState, useEffect} from 'react'
import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Select } from 'antd'

import RequestUtils from 'libs/RequestUtils';

import { useStore } from 'StoreContext';
import { updateStore } from 'methods/user';
const { Option } = Select;
const layout = {
    labelCol: { span: 24},
  };

  const createItem = data => {
    return data.map(({name, id}) => {
      return { label: name, value: id }
    })
  }
  

const CreateAddress = ({address, onClose}) => {

  const [form] = Form.useForm()
  const { state: { user } } = useStore();
  const [province, setProvice] = useState({});
  const [listProvince, setListProvice] = useState([]);

  const [district, setDistrict] = useState({});
  const [listDistrict, setListDistrict] = useState([]);

  const [ward, setWard] = useState({});
  const [listWard, setListWard] = useState([]);
 
  useEffect( () => {
    RequestUtils.openCdp('/province/lists', {'parent-id': 0}, []).then(provices => setListProvice(createItem(provices)));
  }, []);
 
  useEffect( () => {
    if(address?.id) {
      const item = listProvince.find(item => item.value === address.provinceId);
      const {provinceId, districtId} = address;
      setProvice(item || {});
      setIsDefault(address.isDefault)
      form.setFieldsValue(address);
      onChangeProvince(provinceId);
      onChangeDistrict(districtId);
    } else {
      setProvice({});
      setDistrict({});
      setWard({});
      form.resetFields();
    }
  }, [listProvince, address]);
 

  const onChangeProvince = async(value) => {
    const item = listProvince.find(item => item.value === value);
    setProvice(item || {});
    await RequestUtils.openCdp('/province/lists', {'parent-id': value}, []).then(data => {
      const items = createItem(data);
      
      setListDistrict(items);
        const dit = items.filter(item => item.value === district).shift(); 
        setDistrict(dit || {});
    });
  }

  const onChangeDistrict = async (value) => {
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

  const [isDefault, setIsDefault] = useState(false);

  const onChange = (e) => {
    setIsDefault(e.target.checked)
  }

  const onFinish = async(values) => {
      // Submit and reload
      const sub = {
        wardId: ward.value, districtId: district.value, provinceId: province.value, 
        isDefault: isDefault ? 1 : 0, address: values.address, mobilePhone: values.mobilePhone,
         receiverName: values.receiverName, id: address?.id || null
      }

      const service = sub.id ? '/customer/update-address' : '/customer/create-address';
      const data = await RequestUtils.postCdp(service, sub, null);
      if(data) {
        sub.id ? message.success('Update địa chỉ thành công .!') : message.success('Cập nhập thành công .!')
        if(isDefault) {
          const newUser = {...user, ...sub }
          updateStore(newUser);
        }
        onClose();
      } else {
        message.error('Lỗi update địa chỉ .!', 2);
      }
  }
  
  return (
    <div>
      <Modal
       visible={address ? true : false}
       style={{width: '960px'}}
       maskClosable={false}
       closable={false}
       footer={false}
       onClose={onClose}
       title={address?.id ? <h2>Thông tin địa chỉ</h2> : <h2>Thêm mới địa chỉ</h2>}
      >
        <Form {...layout} form={form} style={{padding: 20, paddingBottom: 40 , paddingTop: 0}} onFinish={onFinish} autoComplete="off"> 
            <Form.Item name={'receiverName'} label="Người nhận"rules={[{required: true, message: 'Người nhận không được để trống.'}]}>
              <Input type={'text'} style={{height: 40}}/>
            </Form.Item>
      
          <Form.Item name={'address'} label="Địa chỉ" rules={[{required: true, message: 'Địa chỉ không được để trống.'}]}>
          <Input  type={'text'} style={{height: 40}}/>
         </Form.Item>

           <Row gutter={[16, 16]}>
               <Col span={8}>
               <Form.Item name="provinceId" label="Tỉnh" rules={[{required: true, message: 'Tỉnh/Thành phố không được để trống.'}]}>
                   <Select placeholder="Tỉnh/Thành phố" allowClear onChange={onChangeProvince}>
                     {
                       listProvince.map((item, id) => (
                        <Option key={id} value={item.value} >{item.label}</Option>
                       ))
                     }
                </Select>
             </Form.Item>
               </Col>
               <Col span={8}>
                <Form.Item name='districtId' label="Quận" rules={[{required: true, message: 'Quận huyện không được để trống.'}]}>
                <Select placeholder="Quận/Huyện" allowClear onChange={onChangeDistrict}>
                  {
                    listDistrict.map((item, id) => (
                      <Option key={id} value={item.value} >{item.label}</Option>
                    ))
                  }
                </Select>
            </Form.Item>
               </Col>
               <Col span={8}>
                <Form.Item name='wardId' label="Phường xã"rules={[{required: true, message: 'Phường xã không được để trống'}]}>
              <Select placeholder="Phường/xã" allowClear onChange={onChangeWard}>
                  {
                    listWard.map((item, id) => (
                      <Option key={id}  value={item.value} >{item.label}</Option>
                    ))
                  }
              </Select>
            </Form.Item>
               </Col>
           </Row>

            <Form.Item name={'mobilePhone'} label="Điện thoại di động" rules={[{required: true, message: 'Điện thoại di động không được để trống.'}]}>
            <Input  type={'text'} style={{height: 40}}/>
          </Form.Item>
           <Checkbox onChange={onChange} style={{marginTop: 10}}>Mặc định</Checkbox>
           <div style={{display: 'flex', marginTop: 10, justifyContent: 'flex-start', alignItems: 'center', gap: 10}}>
           <Button type="primary" htmlType="submit">{address?.id ? 'Cập nhập' : 'Thêm mới'}</Button>
           <Button type="primary" onClick={onClose} danger>Hủy</Button>
           </div>
        </Form>
      </Modal>
    </div>
  )
}

export default React.memo(CreateAddress)