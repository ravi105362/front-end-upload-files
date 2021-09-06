import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const API_BASE = "http://localhost:8000"

function App() {

 const [file, setFile] = useState(null);
 var content=null;

 function uploadWithFormData(e){
  setFile(e.target.files[0]);
  
  window.fileReader = new FileReader();
  window.fileReader.onloadend = handleFileRead;
  window.fileReader.readAsText(e.target.files[0]);

  const formData = new FormData();
 
  formData.append("file", e.target.files[0]);
  submitForm("multipart/form-data", formData, (msg) => console.log(msg));
  }

  const handleFileRead = (e) => {
    content= window.fileReader.result;
    const element = (
      <div>
        <p>
          {content}
        </p>
    </div>
    );

    ReactDOM.render(element, document.getElementById('receiptData'));
  }

  function submitForm(contentType, data, setResponse) {

    axios({
      url: `${API_BASE}/receipts/`,
      method: 'DELETE',
      data: data,
      headers: {
      'Content-Type': contentType
      }
      }).then((response) => {
      setResponse(response.data);

        axios({
        url: `${API_BASE}/receipts/`,
        method: 'POST',
        data: data,
        headers: {
        'Content-Type': contentType
        }
        }).then((response) => {
        setResponse(response.data);

        axios({
          url: `${API_BASE}/receipts/`,
          method: 'GET',
          headers: {
            'Content-Type': "multipart/form-data"
            }
          }).then((response) => {
          //setResponse(response.data);
          console.log(response.data);
          const allNotes = response.data;
          const element = (
            <div>
            {response.data.items.map(block => (
              <p style={{border:"2px solid red"}}>
                {block.data_string}
              </p>
            ))}
          </div>
          );
      
          ReactDOM.render(element, document.getElementById('receiptData'));
      
  
      }).catch((error) => {
        console.log("Error in the GET all notes call");
      //setResponse("error");
      })

    }).catch((error) => {
    setResponse("error");
    })

  }).catch((error) => {
    console.log("Error in the GET all notes call");
  //setResponse("error");
  })
  }

   const boxStyle = {
    border : "2px solid black",
    padding: "10px",
    fontFamily: "Arial",
    height:"600px",
    width:"500px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const buttonStyle = {
    padding: "10px",
    fontFamily: "Arial",
    marginLeft: "auto",
    marginRight: "auto",
    display:"block",
  };

  return (
  <div className="App" id="App">
    <Container fluid>
      <form>
      <div id="receiptData" style={boxStyle} />
      <input type="file" style={buttonStyle} accept=".txt" onChange={uploadWithFormData} />
      </form>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" accept=".txt" onChange={uploadWithFormData} />
      </Form.Group>

    </Container>
  </div>
  );

}

export default App;