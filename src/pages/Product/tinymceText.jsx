import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Editor } from '@tinymce/tinymce-react';

// 富文本编辑器
const TinymceText = forwardRef((props, ref) => {

        const editorRef = useRef(null);

        // 从父组件获取图片
        const { detail } = props;

        const [userContent, setUserContent] = useState();

        const handleEditorChange = (content, editor) => {
                // Handle editor content change    
                //console.log('文本里的内容:', content);
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
        const uploadImage = (blobInfo, progress) => new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', '/goods/uploadPicture');

                xhr.upload.onprogress = (e) => {
                        progress(e.loaded / e.total * 100);
                };

                xhr.onload = () => {
                        if (xhr.status === 403) {
                                reject({ message: '接口请求错误: ' + xhr.status, remove: true });
                                return;
                        }
                        if (xhr.status < 200 || xhr.status >= 300) {
                                reject('接口请求错误: ' + xhr.status);
                                return;
                        }
                        const json = JSON.parse(xhr.responseText);

                        if (!json || typeof json.result.data.url != 'string') {
                                reject('无效的json: ' + xhr.responseText);
                                return;
                        }
                        // 返回图片的url
                        resolve(json.result.data.url);
                };
                xhr.onerror = () => {
                        reject('由于XHR传输错误，图像上传失败。代码:' + xhr.status);
                };

                const formData = new FormData();
                formData.append('image', blobInfo.blob(), blobInfo.filename());
                xhr.send(formData);
        });



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
                                selector: 'textarea',
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





