import Togglable from "./Togglable"
import CreateBlog from "./CreateBlog"
import Blog from "./Blog"
import ListGroup from 'react-bootstrap/ListGroup';


const LoggedDefault = ({handleCreation,handleUpvote,deleteBlog,blogMan, user})=>{



    return (<div>
  
        <Togglable buttonLabel="new Blog">
          <CreateBlog handleCreation={handleCreation}></CreateBlog>
        </Togglable>
  
        
        <ListGroup as="ul" flush>
      {blogMan
            .slice()
            .sort((first, second) => second.likes - first.likes)
            .map(blog => (
            <ListGroup.Item as="li" key={blog.id} className="d-flex justify-content-between align-items-center">
                <Blog
                blog={blog}
                updateUpvote={handleUpvote}
                removeBlog={deleteBlog}
                user={user}
                show={false}
                />
            </ListGroup.Item>
            ))}
        </ListGroup>
        </div>)
}

export default LoggedDefault