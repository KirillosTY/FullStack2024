import Blog from "./Blog"

const UserList = ({matchUserBlogs, blogMan,user})=>{

    return (  <div>
        {matchUserBlogs? blogMan.filter(blog => blog.user.id === matchUserBlogs.params.id)
        .slice()
       .sort((first, second) => second.likes - first.likes)
         .map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              show={false}
              user={user}
            />
           
         )): null}
    
      </div>)
}

export default UserList