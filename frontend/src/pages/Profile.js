

function Profile() {
    return (
      <div>
        <p>Profile</p>
        <form action="http://localhost:3000/api/logout" method="get">
        <input type="submit" value="Logout"/>
        </form>
      </div>
    );
  }
  
  export default Profile;