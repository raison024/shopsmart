import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import SideBar from '../../components/Admin SideBar/SideBar';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Stores.css';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Axios from 'axios';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 1; // Number of items to show per page

  useEffect(() => {
    Axios.get('http://localhost:3002/api/read_customers')
      .then(res => {
        console.log(res);
        setCustomers(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  function handlePageChange({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  function handleDelete(cid) {
    console.log("Customer id : " + cid)
    Axios.post('http://localhost:3002/api/delete_customers', { cid: cid })
      .then(res => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch(err => console.log(err));
  }

  const offset = currentPage * itemsPerPage;
  const currentPageItems = customers.slice(offset, offset + itemsPerPage);

  return (
    <div className='Admin'>
      <SideBar />
      <div class="AdminStores-container">
        <div className='Customers-right mt-4'>
          <table className="table table-hover mt-3 table-bordered ">
            <thead>
              <tr className='table-dark'>
                <th scope="col">Customer ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Gender</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPageItems.map((customer) => {
                const dob = new Date(customer.dob);
                const formattedDate = dob.toLocaleDateString();

                return (
                  <tr key={customer.cid}>
                    <td>{customer.cid}</td>
                    <td>{customer.cname}</td>
                    <td>{customer.cemail}</td>
                    <td>{customer.cphone}</td>
                    <td>{customer.gender}</td>
                    <td>{formattedDate}</td>
                    <td className='d-flex justify-content-between'>
                      <button className='btn'><PageviewOutlinedIcon /></button>
                      <button className='btn' onClick={() => handleDelete(customer.cid)}><DeleteIcon /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ReactPaginate
            pageCount={Math.ceil(customers.length / itemsPerPage)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </div>
  )
}

export default Customers;
