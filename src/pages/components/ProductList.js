import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, Button } from 'antd'

const ProductList = ({ onDelete, products }) => {
  const product = [{ 
    name: 'antd', 
    id: 1,
    key: 1 
  }, { 
    name: 'antds', 
    id: 2,
    key: 2 }
  ]
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Actions',
    render: (text, record) => {
      return (
        <Popconfirm title="Delete?" onConfirm={() => onDelete(record, record.id)}>
          <Button>Delete</Button>
        </Popconfirm>
      );
    },
  }]
  return (
    <Table
      dataSource={product}
      columns={columns}
    />
  )
}

ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductList