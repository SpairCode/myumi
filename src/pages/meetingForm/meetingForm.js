import React from 'react'
import styles from './meetingForm.css'
import { Form, Input, Button, message, DatePicker } from 'antd'

class MeetingForm extends React.Component {
  // 提交检验
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      } else {
        message.warning('Please Complete Your Information')
      }
    })
  }
 
  validatePhoneNumber = (rule, value, callback) => {
    const form = this.props.form
    let phoneReg = /^1\d{10}$/
    if (phoneReg.test(parseInt(value))) {
      form.validateFields(['phoneNumber'], { force: true })
      console.log('Success')
      callback('Success')
    } else {
      form.validateFields(['phoneNumber'], { force: false })
      console.log('Error')
      callback('Error')
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }
    const config = {rules: [{ type: 'object', required: true, message: 'Please select time!' }]} // 验证规则
    return (
      <div className={styles.meetingBox}>
        <div className={styles.meetingBoxs}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="First Name">
              {getFieldDecorator('firstName', {
                rules: [{ required: true, message: 'Please Input Your First Name!' }],
              })(
                <Input placeholder="Please Input Your First Name" />
              )}
            </Form.Item>
            <Form.Item label="Last Name">
              {getFieldDecorator('lastName', {
                rules: [{ required: true, message: 'Please Input Your Last Name!' }],
              })(
                <Input placeholder="Please Input Your Last Name" />
              )}
            </Form.Item>
            <Form.Item label="Phone Number">
              {getFieldDecorator('phoneNumber', {
                rules: [{ required: true, message: 'Please Input Your Phone Number!' }, { validator: this.validatePhoneNumber }],
              })(
                <Input placeholder="Please Input Your Phone Number" />
              )}
            </Form.Item>
            <Form.Item label="Your Birthday" style={{ textAlign: 'left' }}>
              {getFieldDecorator('date-picker', config)(
                <DatePicker />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }

}

export default Form.create()(MeetingForm)