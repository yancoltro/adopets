import React from 'react'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            pass: '',
            rp_pass:'',

            isLoaded: false,
            error: null
        }
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePass = this.handlePass.bind(this)
        this.handleRpPass = this.handleRpPass.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleName(event) {this.setState({ name: event.target.value })}

    handleEmail(event) {this.setState({ email: event.target.value })}

    handlePass(event) {this.setState({ pass: event.target.value })}

    handleRpPass(event) {this.setState({ rp_pass: event.target.value })}

    handleSubmit(event) {
        alert('Um nome foi enviado: ' + this.state.name);
        event.preventDefault();
      }

    componentDidMount() { }

    componentWillMount() { }

    render() {
        return (
            <React.Fragment>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text"
                            value={this.state.name}
                            onChange={this.handleName} />
                    </label>
                    <label>
                        Email:
                        <input type="email"
                            value={this.state.email}
                            onChange={this.handleEmail} />
                    </label>
                    <label>
                        Password:
                        <input type="password"
                            value={this.state.pass}
                            onChange={this.handlePass} />
                    </label>
                    <label>
                        Repeat Password:
                        <input type="password"
                            value={this.state.rp_pass}
                            onChange={this.handleRpPass} />
                    </label>
                    <input type="submit" value="Register" />
                </form>

            </React.Fragment>

        )
    }

}

export default Register