import { gql } from '@apollo/client'

export const ALL_Authors = gql`
  query {
    allAuthors { 
      name
      bookCount
      born
      id
    }
  }
`

export const ALL_BOOKS= gql`
  query {
    allBooks { 
      title
      published
      author {
        name
      } 
      genres
      id
    }
  }
`

export const FAVOURITE_GENRE= gql`
  query {
    favouriteGenre
  }
`

export const NEW_BOOK = gql`
mutation addBook($title:String!, 
  $published:Int!,
  $author:String!, 
  $genres:[String!]){
  addBook(
  title: $title
  published: $published
  author: $author
  genres: $genres
  ){
  title
  published
  author {
    name
  }
  genres
  id
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name:String!, 
  $born:Int!){
  editAuthor(
      name:$name
      setBornTo:$born 
  ){
    name
    bookCount
    born
    id
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password:String!){
    login(username:$username, password:$password){
      value
    }
  }
`

export const BOOK_SAVED = gql`
  subscription {
    addedBook {
      title
      published
      author {
        name
      } 
      genres
      id
    }
  }
`