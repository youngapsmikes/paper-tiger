render() {
      const { redirect } = this.state;
      if (redirect) {
        const newTo = {
          pathname: "/projects/" + this.state.userID
        }
        return <Redirect to={newTo}/>;
      }
        return (
          <div className="toplevel">
            <Modal.Dialog>
            <Modal.Body>
            <div className="App-body">  
            <img src={paperTigerlogofinal} height="227.2" width="320"/>

            </div>
            <GoogleLogin
              clientId="218437734175-0vhiaomko61rgce732icedd8ehfug697.apps.googleusercontent.com"
              buttonText="Login"
              theme="dark"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
    
            </Modal.Body>
            </Modal.Dialog>
            </div>
        );
      }