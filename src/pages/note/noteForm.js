import React from 'react'
import { Form, Input, DatePicker, Select, Button } from 'antd'

class noteForm extends React.Component {
  // 子组件调用父组件方法

  componentWillMount () {
    // decide this is new form or edit old form
    if (this.props.editArray) {
     this.state.newList.push(this.props.editArray)
    }
  }

  state = {
    newList: [], // 新建表单
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 判断localStorage 是否有值
        if(localStorage.getItem('noteList')) {
          let listArray = JSON.parse(localStorage.getItem('noteList'))
          listArray.push(values)
          localStorage.setItem('noteList', JSON.stringify(listArray))
        } else {
          this.state.newList.push(values)
          localStorage.setItem('noteList', JSON.stringify(this.state.newList))
        }
        // 调用父组件方法
        this.props.clearForm()
        // 重置表单
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
    // 验证规则
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
              <Option value="1"> A </Option>
              <Option value="2"> B </Option>
              <Option value="3"> C </Option>
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