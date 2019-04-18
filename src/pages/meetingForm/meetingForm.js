import React from 'react'
import styles from './meetingForm.css'
import { Form, Input, Button, message, DatePicker, Upload, Icon, Modal } from 'antd'
import moment from 'moment'

class MeetingForm extends React.Component {

  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: '-1',
      name: 'logo.png',
      status: 'done',
      url: '',
    }],
  }

  // 提交检验
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success('Information submitted successfully')
        this.props.form.resetFields()
      } else {
        message.warning('Please complete your information')
      }
    })
  }
 
  validatePhoneNumber = (rule, value, callback) => {
    let phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    if (phoneReg.test(parseInt(value))) {
      // callback return parameter error, callback no return parameter
      callback()
    } else {
      if (value !== undefined) {
        callback('Please input the correct mobile phone number')
      } else {
        callback()
      }
    }
  }

  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  range = (start, end) => {
    const result = []
    for (let i = start; i < end; i++) {
      result.push(i)
    }
    return result
  }
  
  disabledDateTime = () => {
    return {
      disabledHours: () => this.range(0, 24).splice(4, 20),
      disabledMinutes: () => this.range(30, 60),
      disabledSeconds: () => [55, 56],
    }
  }

  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day')
  }
  
  disabledDateTime = () => {
    return {
      disabledHours: () => this.range(0, 24).splice(4, 20),
      disabledMinutes: () => this.range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const config = {rules: [{ type: 'object', required: true, message: 'Please select time!' }]} // 验证规则
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const { RangePicker } = DatePicker
    return (
      <div className={styles.meetingBox}>
        <div className={styles.meetingBoxs}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="First Name">
              {getFieldDecorator('firstName', {
                rules: [{ required: true, message: 'Please input your first name!' }],
              })(
                <Input placeholder="Please input your first name" />
              )}
            </Form.Item>
            <Form.Item label="Last Name">
              {getFieldDecorator('lastName', {
                rules: [{ required: true, message: 'Please input your last name!' }],
              })(
                <Input placeholder="Please input your last name" />
              )}
            </Form.Item>
            <Form.Item label="Phone Number">
              {getFieldDecorator('phoneNumber', {
                rules: [{ required: true, message: 'Please input your phone number!' }, { validator: this.validatePhoneNumber }],
              })(
                <Input placeholder="Please input your phone number" />
              )}
            </Form.Item>
            <Form.Item label="Conference Date" style={{ textAlign: 'left' }}>
              {getFieldDecorator('date-picker', config)(
                <RangePicker
                  disabledDate={this.disabledDate}
                  disabledTime={this.disabledRangeTime}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                  }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )}
            </Form.Item>
            <Form.Item label="Upload Image">
              {getFieldDecorator('uploadImage', {
                rules: [{ required: true, message: 'Please select upload image file!' }],
              })(
                <div className="clearfix">
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
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