import React, {useEffect, useState} from 'react';
import '../../components/styles/Posts.css';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {Modal, Button} from 'react-bootstrap';


function PubPostItem({ postItem }) {
     let [attachmentURIs, setAttachmentURIs] = useState([]);
     const [modalShow, setModalShow] = useState(false);


    const convertCommentFromJSONToHTML = (text) => {
        return stateToHTML(convertFromRaw(JSON.parse(text)))
    }
    const MyVerticallyCenteredModal = (props) => {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {postItem.title}
                <h3 className='posts__item__category'>  {"Category - "+postItem.category} </h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div dangerouslySetInnerHTML={{__html: convertCommentFromJSONToHTML(postItem.content)}}>
                </div>
              <div className="attachment-section">
                    <IconButton className="attach icon">
                        <AttachFileIcon/>
                    </IconButton>
                    {attachmentURIs ? 
                    <div className='post_links'>
                            {
                            attachmentURIs.map(
                                (x, index) =>
                                  <div className="attachments" key={index}>
                                    <a
                                      target="_blank"
                                      rel="noreferrer"
                                      href={x.s3Link}
                                    >
                                      <img src={x.s3Link} width="100%" height="100%" alt={x.s3Link}/>
                                    </a>
                                    <br />
                                  </div>
                              )
                            }
                    </div>
                    : null}
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }
    useEffect(() => {
        (async (uri) => {
          const res = await fetch(
            uri,
            {
              "method": "GET"
            }
          );
          if (res.ok) {
            const links = await res.json();
            if (links._embedded !== undefined) {
              setAttachmentURIs(links._embedded.assetModels);
            }
          }
        })(postItem._links.attachments.href);
      }, [postItem._links.attachments.href]);

    return (
        <>{postItem.draft? null 
            :
            <>
            {/* modal css */}
            <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            />

            <div onClick ={() => setModalShow(true)} className='posts__item'>
                <div className='posts__item__info'>
                    <h5 className='posts__item__title'> {postItem.title} </h5>
                    <h3 className='posts__item__category'>  {"Category - "+postItem.category} </h3>
                    <div className='posts__item__text__preview'>
                        <div dangerouslySetInnerHTML={{ __html: convertCommentFromJSONToHTML(postItem.content) }}>
                        </div>
                    </div>
                    <div className="readMore">Read More</div>
                    <div className="attachment-section">
                        <IconButton className="attach icon">
                            <AttachFileIcon/>
                        </IconButton>
                        <div className='post_links'>
                            {
                            attachmentURIs.map(
                                (x, index) =>
                                  <div className="attachments_preview" key={index}>
                                    <a
                                      target="_blank"
                                      rel="noreferrer"
                                      href={x.s3Link}>
                                      {x.s3Link}
                                    </a>
                                    <br />
                                  </div>
                              )
                            }
                        </div>
                    </div>
                </div>
            </div>
            </>
            }
        </>
    )
}
export default PubPostItem;