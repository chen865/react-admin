import { Form, Input } from 'antd';
import { forwardRef, useImperativeHandle } from 'react';

const { Item } = Form;

const AddForm = forwardRef((props, ref) => {


    const [form] = Form.useForm();

    // 将数据传递给父组件
    const getRoleName = () => {
        return form.getFieldValue('roleName');
    }

    useImperativeHandle(ref, () => ({
        getRoleName,
    }));

    return (
        <div>
            <Form form={form}>

                <Item name='roleName' rules={[{
                    required: true,
                    message: '角色名称必须输入'
                }]} label='角色名称'>
                    <Input placeholder='请输入角色名称' ></Input>
                </Item>

            </Form>
        </div>
    )
})
export default AddForm;