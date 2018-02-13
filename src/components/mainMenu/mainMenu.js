import React, { Fragment } from 'react';
import { Tab, Tabs as ToolboxTabs } from 'react-toolbox/lib/tabs';
import Drawer from 'react-toolbox/lib/drawer';
import MenuBar from '../menuBar';
import styles from './mainMenu.css';
import logo from '../../assets/images/Lisk-Logo.svg';
import * as menuLogos from '../../assets/images/main-menu-icons/*.svg'; //eslint-disable-line
import { FontIcon } from '../fontIcon';
import Setting from '../setting';

const getIndex = (history, tabs) =>
  tabs.map(t => t.route)
    .indexOf(history.location.pathname);

const isCurrent = (history, index, tabs) =>
  history.location.pathname.indexOf(tabs[index].route) === 6; // after: /main/

const TabTemplate = ({ img, label }) => (
  <div>
    <img src={img} />
    <span>{label}</span>
  </div>
);


class MainMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
      setting: false,
      index: 0,
    };
  }

  menuToggle() {
    const setting = !this.state.active ? false : this.state.setting;
    this.setState({ active: !this.state.active, setting });
  }

  navigate(history, tabs, index) {
    if (!isCurrent(history, index, tabs)) {
      this.setState({ active: false, index });
      history.push(tabs[index].route);
    }
  }

  settingToggle() {
    this.setState({
      setting: !this.state.setting,
    });
  }

  render() {
    const { history, t, showDelegate, account } = this.props;
    const tabs = [
      {
        label: t('Explorer'),
        route: '/explorer/search',
        id: 'explorer',
        image: menuLogos.search,
      }, {
        label: t('Dashboard'),
        route: '/main/dashboard',
        id: 'dashboard',
        image: menuLogos.dashboard,
      }, {
        label: t('Wallet'),
        route: '/main/transactions',
        id: 'transactions',
        image: menuLogos.wallet,
      }, {
      /* TODO: uncomment when the page is created
        label: t('Buy Lisk'),
        route: '/main/buyLisk',
        id: 'buyLisk',
        image: menuLogos.buyLisk,
      }, {
      */
      /* TODO: uncomment when the page is updated
        label: t('Delegates'),
        route: '/main/voting',
        id: 'voting',
        image: menuLogos.delegates,
      }, {
      */
      /* TODO: uncomment when the page is updated
        label: t('Forging'),
        route: '/main/forging',
        id: 'forging',
        image: menuLogos.sidechains,
      }, {
      */
        label: t('Sidechains'),
        route: '/main/sidechains',
        id: 'sidechains',
        image: menuLogos.sidechains,
      },
    ];

    if (showDelegate) {
      tabs.push({
        label: t('Delegates'),
        id: 'voting',
        route: '/main/voting',
        image: menuLogos.delegates,
      });
    }
    return (
      <Fragment>
        <aside className={styles.aside}>
          <div className={styles.sideBarWrapper}>
            <img src={logo} className={styles.logo} />
            <ToolboxTabs index={getIndex(history, tabs)}
              theme={styles}
              onChange={this.navigate.bind(this, history, tabs)}
              disableAnimatedBottomBorder={true}
              className={`${styles.tabs} main-tabs`}>
              {tabs.map(({ label, image, id }, index) =>
                <Tab
                  key={index}
                  label={<TabTemplate label={label} img={image} />}
                  className={styles.tab}
                  id={id}
                  disabled={(isCurrent(history, index, tabs) || !account.address) && index > 0 }
                />)}
            </ToolboxTabs>
            <div onClick={this.menuToggle.bind(this)}
              className={`${styles.more} more-menu`}>
              <FontIcon value='more' className={styles.readMoreIcon} />
              <span className={styles.readMoreText}>{t('more')}</span>
            </div>
            <Drawer theme={styles}
              className='drawer'
              active={this.state.active}
              onOverlayClick={this.menuToggle.bind(this)}>
              <div>
                <header className={styles.header}>
                  <img src={logo} className={styles.logo} />
                  <FontIcon value='close' className={styles.close} onClick={this.menuToggle.bind(this)} />
                </header>
                <ToolboxTabs index={getIndex(history, tabs)}
                  theme={styles}
                  onChange={this.navigate.bind(this, history, tabs)}
                  disableAnimatedBottomBorder={true}
                  className={`${styles.tabs} main-tabs`}>
                  {tabs.map(({ label, image, id }, index) =>
                    <Tab
                      key={index}
                      label={<TabTemplate label={label} img={image} />}
                      id={id}
                      disabled={(isCurrent(history, index, tabs) || !account.address) && index > 0 }
                    />)}
                </ToolboxTabs>
              </div>
              <Setting showSetting={this.state.setting} />
            </Drawer>
          </div>
        </aside>
        <MenuBar
          menuToggle={this.menuToggle.bind(this)}
          settingToggle={this.settingToggle.bind(this)}
          menuStatus={this.state.active}
          settingStatus={this.state.setting} />
      </Fragment>
    );
  }
}

export default MainMenu;
