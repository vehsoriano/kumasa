import React from 'react'

import Table from '../../../containers/Table'
import ReactTooltip from 'react-tooltip';
import { ReactComponent as IconDelete } from '../../../assets/img/icon-delete.svg';
import { ReactComponent as IconEdit } from '../../../assets/img/icon-edit.svg';


const data = [
  { 
    rider_id: 'KUMASA_RIDER01',
    name: 'Tanner Linsley',
    email: 'tanner@linsley@gmail.com',
    phone_number: '09200000000',
    status: false,
    age: 16,
  },
  {
    rider_id: 'KUMASA_RIDER02',
    name: 'Tanner Linsley',
    email: 'tanner@linsley@gmail.com',
    phone_number: '09200000000',
    status: true,
    age: 26,
  }
]

const columns = [
  {
    Header: 'Rider ID',
    accessor: 'rider_id' // String-based value accessors!
  },
  {
    Header: 'Name',
    accessor: 'name' // String-based value accessors!
  }, {
    Header: 'Email',
    accessor: 'email'
  }, {
    Header: 'Phone Number',
    accessor: 'phone_number'
  }, {
    Header: 'Status',
    id: 'status',
    accessor: d => d.status.toString(),
    Cell: status => (
      <div className='active-holder'>
        {status.original.status ? (
          <span className='table-status-active'>Online</span>
        ) : (
          <span className='table-status-inactive'>Offline</span>
        )}
      </div>
    )
  }, {
    Header: 'Age',
    accessor: 'age',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    Header: 'Actions',
    sortable: false,
    // filterable: false,
    Cell: row => (
      <div className='button-wrapper'>
        <div className='button-holder'>
          <button
            className='btn-icon'
            onClick={() => {
            //   handleShowEdit();
            //   // getData()

            //   /*
            //    * Get data from user datas
            //    */

            //   let datas = [...userData];
            //   console.log({ USERS: datas[row.index] });
            //   let status = datas[row.index].user_status.toString();
            //   let number = datas[row.index].user_phone.toString();

            //   /*
            //    * Initialize CurrentID
            //    */

            //   setCurrentEdit_ID(datas[row.index]._id);

            //   /*
            //    * Add shorthand notation value
            //    */

            //   const {
            //     user_role,
            //     user_first_name,
            //     user_last_name,
            //     // user_phone,
            //     user_email,
            //     // user_password
            //     // user_status
            //   } = datas[row.index];

            //   /*
            //    * Set User Data value to Current Input Fields
            //    */
            //   values.role = user_role;
            //   values.first_name = user_first_name;
            //   values.last_name = user_last_name;
            //   values.phone_number = number;
            //   values.email = user_email;
            //   values.password = '';
            //   values.status = status;
            }}
          >
            <span className='icon-holder'>
              <IconEdit className='icon-actions' data-tip data-for='edit' />
            </span>
          </button>
          <ReactTooltip id='edit' type='warning' effect='solid'>
            <span>Edit</span>
          </ReactTooltip>
        </div>
        <div className='button-holder'>
          <button
            className='btn-icon'
            onClick={() => {
              // let datas = [...userData];

              // console.log(datas[row.index]._id);
              // const deleteID = datas[row.index]._id;

              // Swal.fire({
              //   title: 'Are you sure?',
              //   text: "You won't be able to revert this!",
              //   icon: 'warning',
              //   showCancelButton: true,
              //   confirmButtonColor: '#3085d6',
              //   cancelButtonColor: '#d33',
              //   confirmButtonText: 'Yes, delete it!'
              // }).then(result => {
              //   if (result.value) {
              //     axios.delete(`api/users/${deleteID}`).then(response => {
              //       console.log(response);
              //       getData();
              //     });
              //     let title = 'Deleted!';
              //     let message = 'User has been deleted successfully!';
              //     successNotif(title, message);
              //     // Swal.fire(
              //     //   'Deleted!',
              //     //   'User has been deleted successfully!',
              //     //   'success'
              //     // )
              //   }
              // });
            }}
          >
            <span className='icon-holder'>
              <IconDelete
                className='icon-actions'
                data-tip
                data-for='delete'
              />
            </span>
          </button>
          <ReactTooltip id='delete' type='warning' effect='solid'>
            <span>Delete</span>
          </ReactTooltip>
        </div>
      </div>
    )
  }
]

function Affiliates() {
  return (
    <>
    <Table
      data={data}
      columns={columns}
    />
    <br></br><br></br>
    <Table
      data={data}
      columns={columns}
    />
    <br></br><br></br>
    <Table
      data={data}
      columns={columns}
    />
    </>
  )
}

export default Affiliates
