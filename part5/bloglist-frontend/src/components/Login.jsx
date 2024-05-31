const LoginForm = ({username,password,setUsername,setPassword,submit}) => {

    return(<div>
    <h2>Log in to application</h2>
    <FailureMessage>{failureMessage}</FailureMessage>
    <form onSubmit={submit}>
      <div>
        Username: <input
        type="text"
        value={username}
        name="Username"
        onChange={setUsername}
        />
      </div>

      <div>
        Password: <input
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