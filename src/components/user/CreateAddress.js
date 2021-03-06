import React, {useState, useEffect} from 'react'
import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Select } from 'antd'

import RequestUtils from 'libs/RequestUtils';

import { useStore } from 'StoreContext';
import { update } from 'methods/user';
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

  const [form] = Form.useForm();
  const {setFieldsValue, resetFields} = form
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
      setFieldsValue(address);
      onChangeProvince(provinceId);
      onChangeDistrict(districtId);
    } else {
      setProvice({});
      setDistrict({});
      setWard({});
      resetFields();
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
  
      const sub = {
        wardId: ward.value, districtId: district.value, provinceId: province.value, 
        isDefault: isDefault ? 1 : 0, address: values.address, mobilePhone: values.mobilePhone,
         receiverName: values.receiverName, id: address?.id || null
      }

      const service = sub.id ? '/customer/update-address' : '/customer/create-address';
      const data = await RequestUtils.postCdp(service, sub, null);
      if(data) {
        sub.id ? message.success('Update ?????a ch??? th??nh c??ng .!') : message.success('C???p nh???p th??nh c??ng .!')
        if(isDefault) {
          const newUser = {...user, ...sub }
          update(newUser);
        }
        onClose();
      } else {
        message.error('L???i update ?????a ch??? .!', 2);
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
       getContainer={false}
       onClose={onClose}
       title={address?.id ? <h2>Th??ng tin ?????a ch???</h2> : <h2>Th??m m???i ?????a ch???</h2>}
      >
        <Form {...layout} form={form} style={{padding: 20, paddingBottom: 40 , paddingTop: 0}} initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off"> 
            <Form.Item name={'receiverName'} label="Ng?????i nh???n"rules={[{required: true, message: 'Ng?????i nh???n kh??ng ???????c ????? tr???ng.'}]}>
              <Input type={'text'} style={{height: 40}}/>
            </Form.Item>
      
          <Form.Item name={'address'} label="?????a ch???" rules={[{required: true, message: '?????a ch??? kh??ng ???????c ????? tr???ng.'}]}>
          <Input  type={'text'} style={{height: 40}}/>
         </Form.Item>

           <Row gutter={[16, 16]}>
               <Col span={8}>
               <Form.Item name="provinceId" label="T???nh" rules={[{required: true, message: 'T???nh/Th??nh ph??? kh??ng ???????c ????? tr???ng.'}]}>
                   <Select placeholder="T???nh/Th??nh ph???" allowClear onChange={onChangeProvince}>
                     {
                       listProvince.map((item, id) => (
                        <Option key={id} value={item.value} >{item.label}</Option>
                       ))
                     }
                </Select>
             </Form.Item>
               </Col>
               <Col span={8}>
                <Form.Item name='districtId' label="Qu???n" rules={[{required: true, message: 'Qu???n huy???n kh??ng ???????c ????? tr???ng.'}]}>
                <Select placeholder="Qu???n/Huy???n" allowClear onChange={onChangeDistrict}>
                  {
                    listDistrict.map((item, id) => (
                      <Option key={id} value={item.value} >{item.label}</Option>
                    ))
                  }
                </Select>
            </Form.Item>
               </Col>
               <Col span={8}>
                <Form.Item name='wardId' label="Ph?????ng x??"rules={[{required: true, message: 'Ph?????ng x?? kh??ng ???????c ????? tr???ng'}]}>
              <Select placeholder="Ph?????ng/x??" allowClear onChange={onChangeWard}>
                  {
                    listWard.map((item, id) => (
                      <Option key={id}  value={item.value} >{item.label}</Option>
                    ))
                  }
              </Select>
            </Form.Item>
               </Col>
           </Row>

            <Form.Item name={'mobilePhone'} label="??i???n tho???i di ?????ng" rules={[{required: true, message: '??i???n tho???i di ?????ng kh??ng ???????c ????? tr???ng.'}]}>
            <Input  type={'text'} style={{height: 40}}/>
          </Form.Item>
           <Checkbox onChange={onChange} style={{marginTop: 10}}>M???c ?????nh</Checkbox>
           <div style={{display: 'flex', marginTop: 10, justifyContent: 'flex-start', alignItems: 'center', gap: 10}}>
           <Button type="primary" htmlType="submit">{address?.id ? 'C???p nh???p' : 'Th??m m???i'}</Button>
           <Button type="primary" onClick={onClose} danger>H???y</Button>
           </div>
        </Form>
      </Modal>
    </div>
  )
}

export default React.memo(CreateAddress)