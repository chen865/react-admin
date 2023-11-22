
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const { Item } = Form;

const UpdateForm = (props) => {

    const { categoryName, saveForm } = props;

    const [form] = Form.useForm();

    useEffect(() => {
        saveForm(form);
    }, [form, saveForm]);

    return (
        <div>
            <Form form={form}>
                <Item name='updateName' initialValue={categoryName} value={categoryName}
                    rules={[{
                        required: true,
                        message: '分类名称必须输入'
                    }]} >
                    <Input placeholder='请输入分类名称'></Input>
                </Item>
            </Form>
        </div>
    )
}

UpdateForm.propTypes = {
    categoryName: PropTypes.string.isRequired,
};

export default UpdateForm;