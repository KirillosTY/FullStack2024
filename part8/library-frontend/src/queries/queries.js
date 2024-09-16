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
      author
      published
      id
    }
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
  author
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
