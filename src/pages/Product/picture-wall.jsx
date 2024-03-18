import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import { reqDeletePicture } from '../../api';


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const PictureWall = forwardRef((props, ref) => {

  // 从父组件获取图片
  const { imgs } = props;
  
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-4',
    //   name: 'image.png',
    //   status: 'done',
    //   url: './picture/IMG_5658.JPG',
    // },
    // {
    //   uid: '-xxx',
    //   percent: 50,
    //   name: 'image.png',
    //   status: 'uploading',
    //   url: 'http://localhost:3000/product/picture/IMG_5658.JPG',
    // },
    // {
    //   uid: '-5',
    //   name: 'image.png',
    //   status: 'error',
    // },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = async ({ file,fileList: newFileList }) => {
    //console.log('上传一次成功？',file)
    // 这里有个bug，上传图片后已经成功了，但是显示的是uploading状态 加了这个set后图片可以正常上传了
    setFileList(newFileList);

    if (file.status === 'uploading') {
      // 上传中状态，可以执行一些 loading 相关的操作
      console.log('文件上传中...');
    } else if (file.status === 'done') {
      const result = file.response;

      if(result.code === 1){
        message.success('上传图片成功')
        const {name,url} = file.response.result.data;
        file.name = name;
        file.url = url;
  
        setFileList(newFileList);
      }else{
        message.error('上传图片失败')
      }
    }else if(file.status === 'removed'){
      // 删除图片
      const result = await reqDeletePicture(file.name);
      //console.log('删除图片1111:',result);
      if(result.data.code === 1){
        message.success('删除图片成功');  
      }else{
        message.error('删除图片失败');
      }
    }
  }

  // 获取上传图片的名字，用于提交表单
  const getImages = () =>{
    return fileList.map((file) => file.name);
  }

  useImperativeHandle(ref, () => ({
    getImages,
  }));

  useEffect(() => {
    // 从父组件获取图片-加载图片
    if(imgs){
      const objPicture = JSON.parse(imgs);

      const newFileList = objPicture.map((img,index) => ({
        uid: -index,
        name: img.name,
        status: 'done',
        url: img.url,
      }))
      setFileList(newFileList);

    }
  },[imgs] )
  
  
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <>
      <Upload
        action="/goods/uploadPicture"
        name='image'
        // 只接受图片格式
        accept='image/*'
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
})
export default PictureWall;