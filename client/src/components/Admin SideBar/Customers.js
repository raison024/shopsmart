
import React ,{useState}from 'react'
import SideBar from './SideBar'


function  Customers() {

    const [rows, setRows] = useState([]);
    const [form, setForm] = useState({ column1: '', column2: '', column3: '' });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setForm({ ...form, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setRows([...rows, form]);
      setForm({ column1: '', column2: '', column3: '' });
    };

  
  return (
    <div class="AdminStores-container">
    <SideBar/>
    <>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.column1}</td>
              <td>{row.column2}</td>
              <td>{row.column3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
    </div>
  )
}

export default Customers


