import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import logo from '../logo.png';

import 'antd/dist/antd.css';

class Banner extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 'profile',
    };
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            height="90px"
            style={{
              marginLeft: '30px',
              marginTop: '30px',
              marginRight: '30px',
              marginBottom: '10px',
            }}
          />
        </Link>
        <Menu.Item key="profile">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="events">
          <Link to="/events">Events</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Banner;
