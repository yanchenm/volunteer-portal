/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import S3 from 'aws-s3';
import { Upload, Icon, message, PageHeader } from 'antd';
import { UserConsumer } from '../../user.context';

import { policeSubmitted, vulnerableSubmitted } from '../../civicrm/UserUpdate';
import { checkUserExists } from '../../civicrm/QueryUsers';

const config = {
  bucketName: '***REMOVED***',
  region: 'ca-central-1',
  accessKeyId: '***REMOVED***',
  secretAccessKey: '***REMOVED***',
};

const S3Client = new S3(config);

const { Dragger } = Upload;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const DocumentUpload = ({ match }) => {
  return (
    <UserConsumer>
      {context => {
        const { user } = context;
        const { type } = match.params;

        const fileName = `${user.id}_${type}`;

        const uploadProps = {
          name: 'file',
          multiple: false,
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          async onChange(info) {
            const { status } = info.file;
            console.log(info.file.originFileObj);

            if (status === 'done') {
              message.success(`${info.file.name} file uploaded successfully.`);
              S3Client.uploadFile(info.file.originFileObj, fileName)
                .then(data => console.log(data))
                .catch(err => console.error(err));

              if (type === 'police') {
                policeSubmitted(user.id);
              } else if (type === 'vulnerable') {
                vulnerableSubmitted(user.id);
              }

              await sleep(1500);

              checkUserExists(user.email).then(res => {
                const obj = Object.values(res.values)[0];
                context.signIn(obj);
              });
            } else if (status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          },
        };

        return (
          <div>
            <div
              style={{
                padding: 24,
              }}
            >
              <PageHeader ghost={false} onBack={() => window.history.back()} title="Back" />
            </div>

            <div style={{ width: 1200, margin: '10px auto' }}>
              <h1>Upload Documents</h1>
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from uploading company data
                  or other band files
                </p>
              </Dragger>
              <Link to="/">Back Home</Link>
            </div>
          </div>
        );
      }}
    </UserConsumer>
  );
};

export default DocumentUpload;
