import { Form, Select, Input } from 'antd';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const { Item } = Form;
const { Option } = Select;

const AddForm = (props) => {

    const { categorys, parentId, saveForm } = props;

    const [form] = Form.useForm();

    useEffect(() => {
        saveForm(form);
    }, [form, saveForm]);

    return (
        <div>
            <Form form={form}>
                <Item name='addId' initialValue={parentId} >
                    <Select>
                        <Option value={0} >一级分类</Option>
                        {
                            categorys.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)
                        }
                    </Select>
                </Item>

                <Item name='addName' rules={[{
                        required: true,
                        message: '分类名称必须输入'
                    }]}>
                    <Input placeholder='请输入分类名称'></Input>
                </Item>

            </Form>
        </div>
    )
}
AddForm.propTypes = {
    // 一级分类
    categorys: PropTypes.array.isRequired,
    // 父id
    parentId: PropTypes.number.isRequired,
};
export default AddForm;