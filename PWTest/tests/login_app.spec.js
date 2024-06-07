const { test, expect, beforeEach, describe } = require('@playwright/test')
import testHelper, { loginWith } from './helper'

describe('Blog page', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('/')
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Albert Einstein',
        username: 'Steinway',
        password: 'secretu'
      }
    })

    await request.post('/api/users', {
      data: {
        name: 'Isaac Newton',
        username: 'newton',
        password: 'secretu'
      }
    })
  })



  test('Login form is shown', async ({ page }) => {

    const locator = await page.getByText('Log in to application', {exact:false})
    const loginUsername = await page.getByText('Username:', {exact:false})
    const loginPassword = await page.getByText('Password:', {exact:false})
    const loginButton = await page.getByText('login', {exact:false})

    
    expect(locator).toBeVisible()
    expect(loginUsername).toBeVisible()
    expect(loginPassword).toBeVisible()
    expect(loginButton).toBeVisible()
    
  })


  test('Login is successful with right credentials', async ({ page }) => {
    await page.getByText('Username:',{exact:false}).waitFor()

    loginWith(page,'Steinway','secretu')

    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()


  })

  test('Login is unsuccessful with wrong credentials', async ({ page }) => {

   
    const  textInputs = await page.getByRole('textbox').all()

    loginWith(page,'Steinway','falsePass')
    
    await expect(page.getByText('Albert Einstein logged in')).not.toBeVisible()
    await expect(page.getByText('Log in to application', {exact:false})).toBeVisible()


  })

  test('a new blog can be created', async ({ page }) => {

    loginWith(page,'Steinway','secretu')


    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()

    const  blogCreationInputs = await page.getByRole('textbox').all()

    await page.getByTestId('title').fill('titletuu')
    await page.getByTestId('author').fill('authorituu')
    await page.getByTestId('url').fill('secretu.urluu')

    await page.getByRole('button', { name: 'Create' }).click()
    
    await expect(page.getByText('titletuu view')).toBeVisible({ timeout: 6100 })
    await expect(page.getByRole('button', { name: 'view' })).toBeVisible()

  })

  test('a blog can be liked', async ({ page }) => {
    loginWith(page,'Steinway','secretu')


    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()

    await page.getByTestId('title').fill('titletuu')
    await page.getByTestId('author').fill('authorituu')
    await page.getByTestId('url').fill('secretu.urluu')

    await page.getByRole('button', { name: 'Create' }).click()
    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByText('Likes: 0 vote')).toBeVisible()

    await page.getByRole('button', { name: 'vote' }).click()
    await expect(page.getByText('Likes: 1 vote')).toBeVisible()

  })

  test('a blog can be removed', async ({ page }) => {

    loginWith(page,'Steinway','secretu')


    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()

    const  blogCreationInputs = await page.getByRole('textbox').all()

    await page.getByTestId('title').fill('titletuu')
    await page.getByTestId('author').fill('authorituu')
    await page.getByTestId('url').fill('secretu.urluu')

    await page.getByRole('button', { name: 'Create' }).click()
    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'remove' }).click()
   
    await expect(page.getByText('Title:titletuu view')).not.toBeVisible({ timeout: 6100 })
    await expect(page.getByRole('button', { name: 'view' })).not.toBeVisible()


  })

  
  test('a blog can be removed only by owner', async ({ page }) => {

    loginWith(page,'Steinway','secretu')


    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()

    await page.getByTestId('title').fill('titletuu')
    await page.getByTestId('author').fill('NotAnAuthor')
    await page.getByTestId('url').fill('secretu.urluu')

    await page.getByRole('button', { name: 'Create' }).click()
    await expect(page.getByText('titletuu view')).toBeVisible({ timeout: 6100 })
    await expect(page.getByRole('button', { name: 'view' })).toBeVisible()

    await page.getByRole('button', { name: 'logout' }).click()

    loginWith(page,'newton','secretu')


    await expect(page.getByText('Isaac Newton logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()


    await page.getByTestId('title').fill('titletuuIsaac')
    await page.getByTestId('author').fill('authorituuIsaac')
    await page.getByTestId('url').fill('secretu.urluuIsaac')

    await page.getByRole('button', { name: 'Create' }).click()
  
    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'view' }).click()

    expect(await page.getByTestId('blog')
    .filter({hasText:"Author: NotAnAuthor"})
    .getByRole('button', {name:'remove'}))
    .not.toBeVisible()

    expect(await page.getByTestId('blog')
    .filter({hasText:"Author: authorituuIsaac"})
    .getByRole('button', {name:'remove'}))
    .toBeVisible()

  })


  test.only('a bloglist sorts by most votes', async ({ page }) => {

    loginWith(page,'Steinway','secretu')

    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()

    await page.getByTestId('title').fill('titletuu')
    await page.getByTestId('author').fill('NotAnAuthor')
    await page.getByTestId('url').fill('secretu.urluu')

    await page.getByRole('button', { name: 'Create' }).click()
    await expect(page.getByText('titletuu view')).toBeVisible({ timeout: 6100 })
    await expect(page.getByRole('button', { name: 'view' })).toBeVisible()

    await page.getByRole('button', { name: 'logout' }).click()

    loginWith(page,'newton','secretu')


    await expect(page.getByText('Isaac Newton logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()


    await page.getByTestId('title').fill('Isaac')
    await page.getByTestId('author').fill('authorituuIsaac')
    await page.getByTestId('url').fill('secretu.urluuIsaac')

    await page.getByRole('button', { name: 'Create' }).click()

    await page.getByTestId('title').fill('ThirdIsac')
    await page.getByTestId('author').fill('Isaac')
    await page.getByTestId('url').fill('secretu.urluu')

    await page.getByRole('button', { name: 'Create' }).click()

    await page.getByTestId('blog')
    .filter({hasText:"titletuu view"})
    .getByRole('button', {name:'view'}).click()

    await page.getByTestId('blog')
    .filter({hasText:"Isaac view"})
    .getByRole('button', {name:'view'}).click()

    await page.getByTestId('blog')
    .filter({hasText:"ThirdIsac view"})
    .getByRole('button', {name:'view'}).click()

  
    await expect(page.getByTestId('blog').getByRole('button', {name:'vote'})).toHaveCount(3)

    const isaac = await page.getByTestId('blog')
    .filter({hasText:"Author: Isaac"})
    .getByRole('button', {name:'vote'})

    await isaac.click()
  
    const notAuthorBlog = await page.getByTestId('blog')
    .filter({hasText:"Author: NotAnAuthor"})
    .getByRole('button', {name:'vote'})
    
    await notAuthorBlog.click()
    await notAuthorBlog.click()

    const authorIsaac = await page.getByTestId('blog')
    .filter({hasText:"Author: authorituuIsaac"})
    .getByRole('button', {name:'vote'})

    await authorIsaac.click()
    await authorIsaac.click()
    await authorIsaac.click()


    const blogs = await page.getByTestId('blog').all()
    

    await expect(blogs[0]).toHaveText("Author: authorituuIsaac")
    await expect(blogs[1]).toHaveText("Author: NotAnAuthor")
    await expect(blogs[2]).toHaveText("Author: Isaac")



    await expect(page.getByTestId('blog')
    .filter({hasText:"Author: Isaac"})
    .getByText('Likes: 1 vote')).toBeVisible()
    await expect(page.getByTestId('blog')
    .filter({hasText:"Author: NotAnAuthor"})
    .getByText('Likes: 2 vote')).toBeVisible()
    await expect(page.getByTestId('blog')
    .filter({hasText:"Author: authorituuIsaac"})
    .getByText('Likes: 3 vote')).toBeVisible()
    

  })
  
})