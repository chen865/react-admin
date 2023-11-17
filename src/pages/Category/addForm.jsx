import { Form, Select, Input } from 'antd';

const { Item } = Form;
const { Option } = Select;

const AddForm = () => {

    const [form] = Form.useForm();

    return (
        <div>
            <Form>
                <Item name='parentId' initialValue='0'>
                    <Select>
                        <Option value='0' >一级分类</Option>
                        <Option value='1'>电脑</Option>
                        <Option value='2'>图书</Option>
                    </Select>
                </Item>

                <Item name='name'>
                    <Input placeholder='请输入分类名称'></Input>
                </Item>

            </Form>
        </div>
    )
}
export default AddForm;