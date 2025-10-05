import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Card from 'react-bootstrap/Card';
import { Button, Col, Accordion, Modal, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Firebase from '../firebase/Firebase';


export default class PrivacyPolicy extends Component {
    constructor(props) {
        super(props);
        let html = '<p>Write here</p>';
        let contentBlock = htmlToDraft(html);
        Firebase.firestore().collection('pages').doc("privacyPolicy").get().then(snapshot => {
            console.log(snapshot.data()["content"])
            contentBlock = htmlToDraft(snapshot.data()["content"]); 
            console.log(contentBlock)
            let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState,
            });
        });
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }

    }

    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
        Firebase.firestore().collection("pages").doc("privacyPolicy").update(
            {content: draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        )

        console.log();
    };

    render() {
        const { editorState } = this.state;
        return (
            <div className="text-right p-3">

                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header className="p-0">
                            <Accordion.Toggle as={Button} variant="light" size="lg" eventKey="0" block>
                                <FontAwesomeIcon icon={faPencilAlt} /> تحديث المحتوى
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Editor
                                    editorState={editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    textAlignment="right"
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

            </div>
        );
    }
}