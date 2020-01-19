import React from 'react'
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'

function Table({data, columns}) {
  return (
    <ReactTable
      data={data}
      columns={columns}
      showPagination={true}
      minRows={0}
    />
  )
}

export default Table
