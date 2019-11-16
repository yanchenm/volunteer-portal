import React from 'react';
import { Layout, Icon } from 'antd';

import 'antd/dist/antd.css';

const { Footer } = Layout;

const PageFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Made with &nbsp;
      <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
      &nbsp; &#183; &nbsp;
      <a href="https://www.digitalforgood.com/">&#35;DigitalForGood</a>
    </Footer>
  );
};

export default PageFooter;
