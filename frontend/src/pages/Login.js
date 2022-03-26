

function Login() {
    return (
      <div>
        <p>Login</p>
        <form action="http://localhost:5000/api/signin" method="post">
        <label for="email">Email</label><br/>
        <input type="email" id="email" name="email"/><br/>
        <label for="password">Password</label><br/>
        <input type="password" id="password" name="password"></input><br/><br/>
        <input type="submit" value="Login"/>
      </form>
      </div>
    );
  }
  
  export default Login;