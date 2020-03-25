import React from 'react'
import { StyledButton } from '../assets/StyledComponents'

class  DownloadStories extends React.Component {

  download = async () => {
    const element = document.createElement("a")

    let rawData = await fetch(`https://asterism-api.herokuapp.com/authors/${localStorage.user_id}`, {
      method: "GET",
      headers: {
        "Authorization": localStorage.token,
        "Content-Type": "application/json"
            }}) 
    let data = await rawData.json()
    let stringifiedData = await JSON.stringify(data)
    const file = new Blob([stringifiedData], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click()
  }
  
  render() {
    return (
      <div>
        <StyledButton onClick={this.download} style={{ margin: "15px", fontSize: "18px"}}>Download Work</StyledButton>
      </div>
    );
  }
}
  export default DownloadStories

