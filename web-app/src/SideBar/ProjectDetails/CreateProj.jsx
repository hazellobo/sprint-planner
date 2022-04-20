import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
//import "./Form.scss";

require("react-bootstrap/ModalHeader")

class CreateTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            ProjectName: '', 
            ProjectDescription: '',
            GithubURL: '',
            AddTeammates: []
    };        
      }
 
      openModal = () => this.setState({ isOpen: true });
      closeModal = () => this.setState({ isOpen: false });

/*
      addTask = async () =>{
        const { ProjectName, ProjectDescription, GithubURL, AddTeammates } = this.state
        const payload = { ProjectName, ProjectDescription, GithubURL, AddTeammates}
        await createProject(payload).then(res => {
            this.setState({
                ProjectName: '', 
                ProjectDescription: '',
                GithubURL: '',
                AddTeammates: [],
                isOpen: false
            })
        })
        }*/

        handleChange(event) {
            const target = event.target;
            const value = target.value;
            const name = target.name;

            this.setState({
              [name]: value.split(",") }); 
              console.log(this.state.AddTeammates);
             }
      


render(){
    return (
        <div className="App">
        <div class="container p-5">
            
             
             <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
             User Login
             </button>
            
             <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                   <h5 class="modal-title text-danger" id="exampleModalLabel">Create Project</h5>
                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div class="modal-body">
                   <form>
                      <div class="mb-3">
                         <label for="ProjectName" class="form-label">Project Name</label>
                         <input type="text" name="ProjectName" value={this.state.ProjectName} onChange={(event)=> this.handleChange(event)} class="form-control" id="ProjectName" aria-describedby="emailHelp" />
                      </div>
                      <div class="mb-3">
                         <label for="ProjectDescription" class="form-label">Description</label>
                         <textarea class="form-control" name="ProjectDescription" id="ProjectDescription" value={this.state.ProjectDescription} onChange={(event)=> this.handleChange(event)} aria-describedby="emailHelp"/>                        
                      </div>
                      <div class="mb-3">
                         <label for="GithubURL" class="form-label">Github URL</label>
                         <input type="text" class="form-control" name="GithubURL" id="GithubURL" value={this.state.GithubURL} onChange={(event)=> this.handleChange(event)}  aria-describedby="emailHelp" />
                      </div>
                      <div class="mb-3">
                         <label for="AddTeammates" class="form-label">Add Teammates</label>
                         <textarea class="form-control" name="AddTeammates" id="AddTeammates" value={this.state.AddTeammates} onChange={(event)=> this.handleChange(event)} aria-describedby="emailHelp"/>
                         <label class="form-label">separate teammates by ","</label>                        
                      </div>
                   </form>
                   </div>
                   <div class="modal-footer">
                   <button type="submit" class="btn btn-primary">Add</button>
                   <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                   </div>
                </div>
             </div>
             </div>
             </div>
          
        </div>
      );
}
  }

  export default CreateTask;
