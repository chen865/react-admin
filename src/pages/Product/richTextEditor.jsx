
import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// 富文本编辑器- 这个作废了用了tinymcetext
const RichTextEditor = forwardRef((props, ref) => {

    // 从父组件获取图片
    const { detail } = props;

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const getDetail = () => {
        // 将editorState转换为html格式的文本传递给父组件
        return draftToHtml(convertToRaw(editorState.getCurrentContent()));
    }

    useImperativeHandle(ref, () => ({
        getDetail,
    }));


    useEffect(() => {
        // 从父组件获取图片-加载图片
        if (detail) {
            const contentBlock = htmlToDraft(detail);

            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        }
    }, [detail])


    function uploadImageCallBack(file) {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }


    return (
        <div>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                toolbarClassName="toolbarClassName"
                editorStyle={{ border: '1px solid black', minHeight: 200, paddingLeft: 10 }}
                onEditorStateChange={onEditorStateChange}

                toolbar={{
                    image: {
                        urlEnabled: true,
                        uploadEnabled: true,
                        alignmentEnabled: true,   // 是否显示排列按钮 相当于text-align
                        uploadCallback: uploadImageCallBack,
                        previewImage: true,
                        inputAccept: 'image/*',
                        alt: { present: true, mandatory: true }
                    },
                }}
            />

            {/* 下面是实时展示效果，这里不要来，注释 */}
            {/* <textarea
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            /> */}
        </div>
    );
})

export default RichTextEditor;
