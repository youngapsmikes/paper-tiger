class ProjectTable extends Component {
    render() {
        const loading = this.props.loading;

        const rows = [];

        if (!loading) {
            for (let i = 0; i < this.props.projects.length; i++) {
                let project = this.props.projects[i];
                rows.push(<Project name = {project.name} id={project.id} userID = {this.props.userID}/>);
            }
        }
        
        if (loading) {
            return (
                <React.Fragment>
                <div class="loading">
                <div class="loadingIcon"><ReactLoading color={'grey'} height={'10%'} width={'50%'} /></div>
                </div>
                </React.Fragment>
                );
        } else {
            return (
                <div class ="ProjectTable">
                <ul class="projectList">
                {rows}
                </ul>
                </div>
            );
        }        
    }

}