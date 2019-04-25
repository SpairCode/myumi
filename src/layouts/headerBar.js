import React from 'react'
import Link  from 'umi/link'
import { Menu, Icon, Layout, Badge, Dropdown, Avatar } from 'antd'
import { connect } from 'dva'

@connect(({ userName }) => ({ userName }))

class headerBar extends React.Component {
  render () {
    // const { dispatch } = this.props
    // dispatch({
    //   type: 'login/queryUserName',
    // })
    // console.log(this)
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
              <span style={{ margin: '0px 5px' }}> Demo </span>
              <Icon type="caret-down"/>
            </span>
          </Dropdown>
        </div>
      </Header>
    )
  }
}

export default headerBar