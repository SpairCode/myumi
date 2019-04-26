import React from 'react'
import { Form, Input, DatePicker, Select, Button } from 'antd'
import { connect } from 'dva'

@connect(({ note }) => ({ note }))

class noteForm extends React.Component {
  // Child components transfer parent components methods

  componentWillMount () {
    // 1. new Form
    // 2. validate Form
    // 3. will be value pass by  @connect save in noteList array
    console.log(this.props.editArray)
  }

  state = {
    newList: [], // new Form Array
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // success
        const { dispatch } = this.props
        dispatch({
          type: 'note/addCompleteList',
          payload: { 
            values: values
          }
        })
        // tranfer parent components methods
        this.props.clearForm()
        // reset Form
        this.props.form.resetFields()
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { RangePicker } = DatePicker
    const { TextArea } = Input
    const { Option } = Select
    const dateFormat = 'YYYY/MM/DD'
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    // validate rule
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    }
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ width: 'auto' }}>
        <Form.Item label="标题">
        {getFieldDecorator('title', {
            rules: [{
              type: 'string', message: 'The input is your work title !',
            }, {
              required: true, message: 'Please input your work title!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="日期">
          {getFieldDecorator('range-picker', rangeConfig)(
            <RangePicker format={dateFormat} />
          )}
        </Form.Item>
        <Form.Item label="工作任务">
          {getFieldDecorator('textarea', {
            rules: [{
              required: true, message: 'Please input your work task!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <TextArea />
          )}
        </Form.Item>
        <Form.Item label="工作权重" hasFeedback>
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: 'Please select work significance!' },
            ],
          })(
            <Select placeholder="Please select work significance">
              <Option value={1}> A </Option>
              <Option value={2}> B </Option>
              <Option value={3}> C </Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
          <Button type="primary" htmlType="submit"> 提交 </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(noteForm)