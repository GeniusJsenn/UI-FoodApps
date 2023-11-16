import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';


class FoodSelectionsComponent extends Component {

  constructor() {
    super();
    this.state = {
      selection: null,
      newData: { foodSelection: '' },
      newTableData: [], // Updated state variable name
    };
  }


  //Button Feature
  spinSelection = async () => {
    const dataToSend = {
      foodList: this.state.newTableData,
    };

    console.log(dataToSend.foodList);
    if (dataToSend.foodList.length == 0) {
      console.log("No Data in list");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/food/selection', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      if (!response.ok) {
        throw new Error('Http error! Status : ${response.status}');
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not in Json format');
      }

      const body = await response.json();

      this.setState({ selection: body });

    } catch (error) {
      console.error('Error fetching Data: ', error);
    }
  }


  //Handle Add Data to table
  handleAddData = () => {
    const { newData, newTableData } = this.state;

    if (newData.foodSelection === '') {
      console.log("Missing Data");
      this.setState({
        newData: { foodSelection: '' },
      });
      return;
    } else {
      this.setState({
        newTableData: [...newTableData, newData],
        newData: { foodSelection: '' },
      });
    }
  };

  //Handle Clear table data
  handleClearTable = () => {
    this.setState({ 
      newTableData: [],
      selection : '' 
    });
  };

  

  render() {
    const { selection, newData, newTableData } = this.state;


    return (
      <div>
         <h2>Food Result</h2>

        <div className = "container">
          <Table variant="dark">
            <thead>
              <tr>
              Added Selection
              </tr>
            </thead>
            <tbody>
              {newTableData.map((row) => (
                <tr>
                  <td>{row}</td>
                </tr>
              ))} 
            </tbody>
          </Table>
        </div>


         <input 
          type = "text" 
          name="SelectioName"
          value={newData.foodSelection} 
          autoComplete="off"
          onChange={(e) => this.setState({ newData: e.target.value })}
         />

         <div className = "container">
          <button onClick={this.handleAddData}>Add Selection</button>
          <button onClick={this.spinSelection}>Spin It</button>
          <button onClick={this.handleClearTable}>Clear</button>
         </div>

          {selection && (
            <div>
              <p>API response:</p>
              <ul>
                <li>Decision result : {selection.foodResult}</li>
              </ul>
            </div>
          )}      
      </div>
    );
  }
}

export default FoodSelectionsComponent;