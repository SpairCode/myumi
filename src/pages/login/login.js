import React from 'react'
import styles from './login.css'
import router from 'umi/router'
import { connect } from 'dva'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'

@connect(({ login }) => ({ login }))

class Login extends React.Component {

  state = {}

  componentDidMount () {
    localStorage.clear()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 预先存储至localStroage,之后存储至Redux
        const { dispatch } = this.props
        dispatch({
          type: 'login/saveUserName',
          payload: { 
            'userName': values.userName
          }
        })
        router.push('/analysis/analysis')
      } else {
        message.error('用户名或密码输入错误!')
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.login}>
        <header></header>
        <div className={styles.content}>
          <div className={styles.forms}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Just type in whatever you want Name" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Just type in whatever you want Password" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
            </Form.Item>
            <Button onClick={this.handleSubmit} className={styles.auto} type="primary" size="large"> Login </Button>
          </Form>
          </div>
        </div>
        <footer>
          <p> Design By Fan </p>
        </footer>
      </div>
    )
  }
}

export default  Form.create()(Login)