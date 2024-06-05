import PropTypes from 'prop-types'

const LoginForm = ({ username,password,setUsername,setPassword,submit }) => {

  return(<div>
    <h2>Log in to application</h2>
    <form onSubmit={submit}>
      <div>
        Username: <input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={setUsername}
        />
      </div>

      <div>
        Password: <input
          data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={setPassword}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
  )

}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}