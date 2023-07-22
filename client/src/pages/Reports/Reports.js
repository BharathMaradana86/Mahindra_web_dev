import './Reports.css'
import React, { useEffect, useState } from 'react'

import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import axios from 'axios';  
import DenseTable from './DenseTable';




const names = [
  'Shop-1',
  'Shop-2',
  'Shop-3',
  'Shop-4',
  'Shop-5',
  'Shop-6',
  'Shop-7',
  'Shop-8',
  'Shop-9',
  'Shop-10',
];





const Reports = ( { onTitleChange }) => {

  
  const [reportdata,setreportdata] = useState([])
  const [shopName, setShopName] = React.useState("");

  const handleChangeShopName = (event) => {
    setShopName(
      event.target.value
    );
    console.log(shopName);
  };

  const [lineName, setLineName] = React.useState("");

  const handleChangeLineName = (event) => {
    setLineName(
      event.target.value
    );
  };

  const [stageName, setStageName] = React.useState("");

  const handleChangeStageName = (event) => {
    setStageName(
      event.target.value
    );
  };

  const [detectionType, setDetectionType] = React.useState("");

  const handleChangeDetectionType = (event) => {
    setDetectionType(
      event.target.value
    );
  };

  const [timePeriod, setTimePeriod] = React.useState("");

  const handleChangeTimePeriod = (event) => {
    setTimePeriod(
      event.target.value
    );
  };


  const [fromDate, setFromDate] = React.useState('');
      const [toDate, setToDate] = React.useState('');
      

const handleFromDateChange = (event) =>{
  setFromDate(event.target.value)
}

const handleToDateChange = (event) =>{
  setToDate(event.target.value)
}

const handleReset = () =>{

    setShopName('')
    setStageName('')
    setLineName('')
    setDetectionType('')
    setTimePeriod('')
    setFromDate('')
    setToDate('')
    setSelectedFormat('')
    
}


const [selectedFormat, setSelectedFormat] = React.useState('');

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const handleGenerate = async () => {

        if(1)
        { 
          let csvData = [] 
          let tableData = []
          await axios.post('http://localhost:8083/api/reports/generated',{
               shopename:shopName,
               stageName:stageName,
               lineName:lineName,
               detectionType:detectionType,
                fromDate: fromDate,
                toDate:toDate
     }).then((res) => {{
                 console.log(res.data)
                 setreportdata(res.data)
                 csvData = res.data
                 tableData = res.data
     }})
        if (selectedFormat === 'csv') {
          // Generate CSV file
           
    
          const csvString = Papa.unparse(csvData);
          const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
          saveAs(blob, 'data.csv');
          
        } else if (selectedFormat === 'pdf') {
          const doc = new jsPDF();
          let count=0;
          const sum = tableData.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.object_type), 0);
          tableData.map((item,index) => {item.object_value == 'temp' ? count+=1 : count=count})
          
          doc.autoTable({ head: [['date','zone','timestamp','object_type','object_value']], body: tableData.map((item,index) => ([item.date,item.zone,item.timestamp,item.object_type,item.object_value,item.total_incidents] )) });
          doc.autoTable({head:[['total_incident','total_count']],body: [["temp",count]]})
          doc.save('data.pdf');
        }
      }
      else{
        alert('Please enter all the fields')
      }
  };


  return (
    <div className='containerf'>
      {onTitleChange('Reports')}
      <div className='element'>
        <div className='label'>
      <label htmlFor="shopName" ><h3>Shop Name:</h3></label>
      </div>
      <input id='shopname' className='inputf' type='text' value='D1 Shop' readOnly />
      </div>
       
       <div className='element'>
        <div className='label'>
      <label htmlFor="lineName" ><h3>Line Name:</h3></label>
      </div>
      <Form.Select id="lineName" className='inputf' aria-label="Default select example" value={lineName} onChange={handleChangeLineName} >
        <option>Select</option>
        {names.map((name) => <option key={name} className='option'>{name}</option>)}
      </Form.Select>
      </div>

      <div className='element'>
        <div className='label'>
      <label htmlFor="stageName" ><h3>Stage Name:</h3></label>
      </div>
      <Form.Select id="stageName" className='inputf' aria-label="Default select example" value={stageName} onChange={handleChangeStageName}>
        <option>Select</option>
        {names.map((name) => <option key={name}  className='option'>{name}</option>)}
      </Form.Select>
      </div>

      <div className='element'>
        <div className='label'>
      <label htmlFor="detectionType" ><h3>Detection Type:</h3></label>
      </div>
      <Form.Select id="detectionType" className='inputf' aria-label="Default select example" value={detectionType} onChange={handleChangeDetectionType}>
        <option>Select</option>
        {names.map((name) => <option key={name}  className='option'>{name}</option>)}
      </Form.Select>
      </div>

     

      <div className='element1'>
        <div className='label1'>
            <h3>Format:</h3>
        </div>
        <div className='format' >
          <div className='file'>
            <input type="radio" name="format" value="csv" style={{width:'15px'}} checked={selectedFormat === 'csv'}
          onChange={handleFormatChange}/>
            <h3>Excel</h3>
            </div>
            <div className='file'>
            <input type="radio" name="format" value="pdf" style={{width:'15px'}} checked={selectedFormat === 'pdf'}
          onChange={handleFormatChange}/>
             <h3>PDF</h3>
             </div>
        </div>
      </div>


      <div className='element'>
        <div className='from'>
        <div className='label2'>
            <h3>From:</h3>
        </div>
        <div className='inn'  >
    <input type="date" id="time" name="time" value={fromDate} onChange={handleFromDateChange} className='cal'/>
        </div>
        </div>
        <div className='to'>
        <div className='label2'>
            <h3>To:</h3>
        </div>
        <div  className='inn'>
        <input type="date" id="time1" name="time1" value={toDate} onChange={handleToDateChange} className='cal'/>
        </div>
        </div>
      </div>

      <div className='element2'>
        <div className='gen'>
        <button className='btn' onClick={handleGenerate}>Generate</button>
        </div>
        <div className='res'>
        <button className='btn' onClick={handleReset}>Reset</button>
        </div>
      </div>
        { reportdata ? <DenseTable data={reportdata}/> : null}
    </div>
  )
}

export default Reports
