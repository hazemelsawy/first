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

export default class Services extends Component {
    constructor(props) {
        super(props);
        let html = '<p>Write here</p>';
        let contentBlock = htmlToDraft(html);
        Firebase.firestore().collection('pages').doc("services").get().then(snapshot => {
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
        Firebase.firestore().collection("pages").doc("services").update(
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
                                    toolbar={{colorPicker: {
                                        colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                                          'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                                          'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                                          'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                                          'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                                          'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)', 'rgb(174,133,47)'],
                                      }}}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

            </div>
        );
    }
}