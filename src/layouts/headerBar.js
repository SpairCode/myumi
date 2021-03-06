import React from 'react'
import Link  from 'umi/link'
import { Menu, Icon, Layout, Badge, Dropdown, Avatar } from 'antd'
import { connect } from 'dva'

@connect(({ login }) => ({ login }))

class headerBar extends React.Component {
  render () {
    const menulist = (
      <Menu>
        <Menu.Item>
          <Link to='/user/user'>
            <Icon type="user" /> 个人中心
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link to='/systemSetting/systemSetting'>
            <Icon type="setting"  /> 设置
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link to='/login/login'> <Icon type="logout" /> 退出登录 </Link>
        </Menu.Item>
      </Menu>
    )
    const { Header } = Layout
    return (
      <Header style={{ background: '#fff', padding: 0 }} >
        <div className="headerBar" style={{ float: 'right', }}>
          <Badge dot>
            <Icon style={{ fontSize: 22 }} type="bell"></Icon>
          </Badge>
          <Dropdown overlay={menulist}>
            <span>
              <Avatar src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2637329911,3521077389&fm=58&bpow=649&bpoh=808" />
              <span style={{ margin: '0px 5px' }}> { this.props.login.userName } </span>
              <Icon type="caret-down"/>
            </span>
          </Dropdown>
        </div>
      </Header>
    )
  }
}

export default headerBar