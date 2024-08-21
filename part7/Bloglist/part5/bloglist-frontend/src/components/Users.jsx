import { useState } from "react";
import styles from '.././styles/userList.css'
import { Table } from 'react-bootstrap'
import {BrowserRouter as Router,
    Routes,Route,Link,
    useMatch,
    useNavigate
  } from 'react-router-dom'

const User =({users}) => {
  
    return (
            <div> 
                <Table striped>
               <table>
            <thead>
                <tr>
                <th>Users</th>
                <th>Blogs created</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                <tr key={user.id}>
                    <td><Link to={`/users/${user.id}`} className="username">{user.name}</Link></td>
                    <td>{user.blogs.length}</td>
                </tr>
                ))}
            </tbody>
            </table>
            </Table>


    </div>)



}

export default User