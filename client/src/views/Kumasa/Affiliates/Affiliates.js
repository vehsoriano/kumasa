import React from "react";

import Table from "../../../containers/Table";
import ReactTooltip from "react-tooltip";
import { ReactComponent as IconDelete } from "../../../assets/img/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../../assets/img/icon-edit.svg";

const data = [
  {
    branch_name: "Mcdonalds",
    address: "Angeles City",
    contact: "8001",
    total_items: "21"
  },
  {
    branch_name: "Jollibee",
    address: "Angeles City",
    contact: "7000",
    total_items: "18"
  }
];

const columns = [
  {
    Header: "Branch Name",
    accessor: "branch_name" // String-based value accessors!
  },
  {
    Header: "Address",
    accessor: "address" // String-based value accessors!
  },
  {
    Header: "Contact",
    accessor: "contact"
  },
  {
    Header: "Total Item",
    accessor: "total_items"
  },
  {
    Header: "Actions",
    sortable: false,
    // filterable: false,
    Cell: row => (
      <div className="button-wrapper">
        <div className="button-holder">
          <button
            className="btn-icon"
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
            <span className="icon-holder">
              <IconEdit className="icon-actions" data-tip data-for="edit" />
            </span>
          </button>
          <ReactTooltip id="edit" type="warning" effect="solid">
            <span>Edit</span>
          </ReactTooltip>
        </div>
        <div className="button-holder">
          <button
            className="btn-icon"
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
            <span className="icon-holder">
              <IconDelete className="icon-actions" data-tip data-for="delete" />
            </span>
          </button>
          <ReactTooltip id="delete" type="warning" effect="solid">
            <span>Delete</span>
          </ReactTooltip>
        </div>
      </div>
    )
  }
];

function Affiliates() {
  return (
    <>
      <Table data={data} columns={columns} />
    </>
  );
}

export default Affiliates;
