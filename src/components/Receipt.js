import axios from 'axios';
import ReactDOM from 'react-dom';

const API_BASE = "http://localhost:8000"

function getAllNotes() {

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
          <p>
            {block.data_string}
          </p>
        ))}
      </div>
      );
  
      ReactDOM.render(element, document.getElementById('receiptInfo'));
  
  
      }).catch((error) => {
        console.log("Error in the GET all notes call");
      //setResponse("error");
      })
    }

const Receipt = () => {
    return (
        <div id="receiptInfo" >
            <input type="button" style={{width:400,height:400, border:2}} onClick={getAllNotes} />
        </div>
    )
}

export default Receipt