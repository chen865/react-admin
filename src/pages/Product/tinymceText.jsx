import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { reqDeletePicture } from '../../api';


const TinymceText = forwardRef((props, ref) => {

        const editorRef = useRef(null);

        // 从父组件获取图片
        const { detail } = props;

        const [userContent, setUserContent] = useState();

        const handleEditorChange = (content, editor) => {
                // Handle editor content change    
                console.log('文本里的内容:', content);
                //console.log('文本里的内容2:', editor);
                setUserContent(content);
        };

        // 将数据传递给父组件
        const getDetail = () => {
                return userContent;
        }

        useImperativeHandle(ref, () => ({
                getDetail,
        }));


        // 自定义上传图片函数
        function uploadImage(blobInfo, succFun, failFun) {
                console.log('自定义图片上传🤔', blobInfo, succFun, failFun)
                // 获取 blob 数据
                const blob = blobInfo.blob();

                // 创建 File 对象
                const file = new File([blob], blobInfo.filename(), { type: blob.type });

                // 现在，你可以将 'file' 对象用于上传等操作
                console.log('转换后的 File 对象:', file);


        }


        return (
                <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        id={"tincyEditor"}
                        initialValue={detail}
                        onEditorChange={handleEditorChange}
                        tinymceScriptSrc={'../../tinymce/js/tinymce/tinymce.min.js'}
                        apiKey="kmw6h88qawp9lsni62izfphho2gpagfasfe67dol0c4p7lj2"
                        init={{
                                language: 'zh-Hans',
                                width: 1046,
                                min_height: 600,
                                plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link code codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help emoticons autosave autoresize ',
                                toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
                                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                                images_upload_handler: uploadImage
                        }}
                />
        )
})

export default TinymceText;





