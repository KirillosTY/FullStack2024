import test from "node:test"


const loginWith = async (page, username, password)  => {
    await page.getByTestId('login', { name: 'login' }).waitFor()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByTestId('login', { name: 'login' }).click()
  }

  const createBlog = async(page, title, author, url) => {
    await page.getByRole('button', { name: 'Create' }).waitFor()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByRole('button', { name: 'Create' }).click()

  }

  const voteFor = async(page, testId, count) => {

    await page.getByTestId(testId).getByRole('button', {name:'vote'}).click()
    await page.getByTestId(testId).getByText(`Likes: ${count} vote`).waitFor()
  }
  
  export { loginWith, createBlog, voteFor }