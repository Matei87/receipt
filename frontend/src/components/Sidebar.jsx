import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

import LogoIcon from '../assets/logo.svg';
import MenuIcon from '../assets/menu.svg';
import ChartIcon from '../assets/chart.svg';
import UserIcon from '../assets/image.svg';
import BackgroundImage from '../assets/back.jpg';

const MySidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <Sidebar
      collapsed={!isExpanded}
      image={BackgroundImage}
      className='border-0 vh-100'
    >
      <div className='d-flex align-items-center px-4 py-0 h-auto mt-4 mb-4'>
        <div className='d-flex align-items-center w-100 overflow-hidden'>
          <img
            src={LogoIcon}
            alt='LogoIcon'
            width={35}
            height={35}
            className='d-flex justify-content-center me-2'
          />

          <p
            className='fs-4 m-0 text-uppercase lh-lg text-dark'
            style={{ whiteSpace: 'nowrap', fontWeight: 600 }}
          >
            Receipt App
          </p>
        </div>
      </div>

      <div
        className='d-flex align-items-center px-4 mb-4'
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <img
          src={MenuIcon}
          alt='MenuIcon'
          width={35}
          height={35}
          style={{
            cursor: 'pointer',
          }}
        />
      </div>

      <Menu menuItemStyles={{ button: { padding: ' 0 24px' } }}>
        <MenuItem
          component={<Link to='/' />}
          icon={<img src={UserIcon} alt='UserIcon' width={35} height={35} />}
          hide-label='true'
          className='text-dark'
        >
          Home
        </MenuItem>
        <MenuItem
          component={<Link to='/dashboard' />}
          icon={<img src={ChartIcon} alt='ChartIcon' width={35} height={35} />}
          hide-label='true'
          className='text-dark'
        >
          Dashboard
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default MySidebar;
