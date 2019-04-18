import styles from './index.css';
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import Link  from 'umi/link'
import { Layout, Menu, Icon, Badge, Avatar, Dropdown } from 'antd'

function BasicLayout(props) {
  if (props.location.pathname === '/login/login' || props.location.pathname === '/404') {
    return <div className={`${styles.w100} ${styles.h100} `}>{ props.children }</div>
  } else {
    const menulist = (
      <Menu>
        <Menu.Item>
          <Icon type="user" /> 个人中心
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
        <Icon type="setting" /> 设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link to='/login/login'> <Icon type="logout" /> 退出登录 </Link>
        </Menu.Item>
      </Menu>
    )
    const { Header, Content, Footer, Sider } = Layout
    const Name = localStorage.getItem('name')
    return (
      <div className={styles.normal}>
        <div className={styles.content}>
        <div className={styles.normal}>
          <Layout className={styles.antWH}>
              <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {  }}
                onCollapse={(collapsed, type) => {  }}
                theme="light"
              >
                <div className={styles.logo}> System </div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1">
                    <Icon type="bars" />
                    <span className="nav-text"> <Link to='/analysis/analysis'> 参会列表 </Link> </span>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Icon type="appstore" />
                    <span className="nav-text"> <Link to='/dataAnalysis/dataAnalysis'> 数据分析 </Link> </span>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Icon type="cluster" />
                    <span className="nav-text"> <Link to='/weather/weather'> Weather </Link> </span>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Icon type="setting" />
                    <span className="nav-text"> <Link to='/systemSetting/systemSetting'> 系统设置 </Link> </span>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Icon type="user" />
                    <span className="nav-text"> <Link to='/user/user'> 个人中心 </Link> </span>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Icon type="form" />
                    <span className="nav-text"> <Link to='/meetingForm/meetingForm'> 会议提交 </Link> </span>
                  </Menu.Item>
                  <Menu.Item key="7">
                    <Icon type="environment" />
                    <span className="nav-text"> <Link to='/meetingMap/meetingMap'> 会议地图 </Link> </span>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <Icon type="book" />
                    <span className="nav-text"> <Link to='/note/note'> 工作便签 </Link> </span>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout style={{ backgroundColor: '#ebeef6' }}>
                {/* Gobal Header */}
                <Header style={{ background: '#fff', padding: 0 }} >
                  <div className={styles.header} style={{ float: 'right', }}>
                    <Badge dot>
                      <Icon style={{ fontSize: 22 }} type="bell"></Icon>
                    </Badge>
                    <Dropdown overlay={menulist}>
                      <span>
                        <Avatar src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2637329911,3521077389&fm=58&bpow=649&bpoh=808" />
                        <span style={{ margin: '0px 5px' }}> { Name } </span>
                        <Icon type="caret-down"/>
                      </span>
                    </Dropdown>
                  </div>
                </Header>
                {/* Gobal Content */}
                <Content style={{ margin: '50px 50px 0', minHeight : 'auto' }}>
                  <div style={{ height: 'auto' }}>
                    { props.children }
                  </div>
                </Content>
                {/* Gobal Footer */}
                <Footer style={{ textAlign: 'center', backgroundColor: '#ebeef6' }}>
                  AntD & UmiJS & Dva & Mock
                </Footer>
              </Layout>
            </Layout>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(connect()(BasicLayout))
