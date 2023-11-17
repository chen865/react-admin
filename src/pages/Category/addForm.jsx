import { Form, Select, Input } from 'antd';
import PropTypes from 'prop-types';

const { Item } = Form;
const { Option } = Select;

const AddForm = (props) => {

    const { categorys, parentId,changeName } = props;

        // 调用父组件来更新数据
        function changeNameChild(name) {
            //console.log('子组件的输入的name：', name)
            changeName(name)
        }

    return (
        <div>
            <Form>
                <Item >
                    <Select defaultValue={parentId}>
                        <Option value = {0} >一级分类</Option>
                        {
                            categorys.map(c =>  <Option key={c.id} value={c.id}>{c.name}</Option>)
                        }
                    </Select>
                </Item>

                <Item name='name'>
                    <Input placeholder='请输入分类名称' onChange={(event) => changeNameChild(event.target.value)}></Input>
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