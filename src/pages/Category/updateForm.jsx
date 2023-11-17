
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const { Item } = Form;

const UpdateForm = (props) => {

    const { categoryName, changeName } = props;

    //console.log('子组件收到的名：', categoryName)

    // 调用父组件来更新数据
    function changeNameChild(name) {
        //console.log('子组件的输入的name：', name)
        changeName(name)
    }
    

    return (
        <div>
            <Form>
                <Item name={categoryName} initialValue={categoryName} value = {categoryName} >
                    <Input placeholder='请输入分类名称' onChange={(event) => changeNameChild(event.target.value)}></Input>
                </Item>
            </Form>
        </div>
    )
}

UpdateForm.propTypes = {
    categoryName: PropTypes.string.isRequired,
};

export default UpdateForm;