const { test, expect, beforeEach, describe } = require('@playwright/test')
import testHelper, { loginWith, createBlog, voteFor } from './helper'

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

    await loginWith(page,'Steinway','secretu')

    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()


  })

  test('Login is unsuccessful with wrong credentials', async ({ page }) => {

    await page.getByText('Username:',{exact:false}).waitFor()

    await loginWith(page,'Steinway','falsePass')
    await page.getByText('Username:',{exact:false}).waitFor()

    await expect(page.getByText('Albert Einstein logged in')).not.toBeVisible()
    await expect(page.getByText('Log in to application', {exact:false})).toBeVisible()


  })

  test('a new blog can be created', async ({ page }) => {

    await loginWith(page,'Steinway','secretu')


    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()

    const  blogCreationInputs = await page.getByRole('textbox').all()

    createBlog(page, 'titletuu','authorituu', 'secretu.urluu')
    await expect(page.getByText('titletuu view')).toBeVisible({ timeout: 6100 })
    await expect(page.getByRole('button', { name: 'view' })).toBeVisible()

  })

  test('a blog can be liked', async ({ page }) => {
    await loginWith(page,'Steinway','secretu')


    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()

    await createBlog(page, 'titletuu','authorituu', 'secretu.urluu')

    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByText('Likes: 0 vote')).toBeVisible()

    await voteFor(page, 'blogtitletuuauthorituu',1)
    await expect(page.getByText('Likes: 1 vote')).toBeVisible()

  })

  test('a blog can be removed', async ({ page }) => {

    await loginWith(page,'Steinway','secretu')


    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()


    await createBlog(page, 'titletuu','authorituu', 'secretu.urluu')

    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'remove' }).click()
   
    await expect(page.getByText('Title:titletuu view')).not.toBeVisible({ timeout: 6100 })
    await expect(page.getByRole('button', { name: 'view' })).not.toBeVisible()


  })

  
  test('a blog can be removed only by owner', async ({ page }) => {

    await loginWith(page,'Steinway','secretu')


    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()

    await createBlog(page, 'titletuu','NotAnAuthor', 'secretu.urluu')

    await expect(page.getByText('titletuu view')).toBeVisible({ timeout: 6100 })
    await expect(page.getByRole('button', { name: 'view' })).toBeVisible()

    await page.getByRole('button', { name: 'logout' }).click()

    await loginWith(page,'newton','secretu')


    await expect(page.getByText('Isaac Newton logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()

    await createBlog(page, 'titletuuIsaac','authorituuIsaac', 'secretu.urluuIsaac')
  
    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'view' }).click()

    expect(await page.getByTestId('blogtitletuuNotAnAuthor')
    .getByRole('button', {name:'remove'}))
    .not.toBeVisible()

    expect(await page.getByTestId('blogtitletuuIsaacauthorituuIsaac')
    .getByRole('button', {name:'remove'}))
    .toBeVisible()

  })


  test('a bloglist sorts by most votes', async ({ page }) => {

    await loginWith(page,'Steinway','secretu')

    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()

    await createBlog(page, 'titletuu','NotAnAuthor', 'secretu.urluu')

    await expect(page.getByText('titletuu view')).toBeVisible({ timeout: 6100 })
    await expect(page.getByRole('button', { name: 'view' })).toBeVisible()

    await page.getByRole('button', { name: 'logout' }).click()

    await loginWith(page,'newton','secretu')


    await expect(page.getByText('Isaac Newton logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()

    await createBlog(page, 'titletuuIsaac','authorituuIsaac', 'secretu.urluuIsaac')

    await createBlog(page, 'ThirdIsac','Isaac', 'secretu.urluu')

    await page.getByTestId('blog')
    .filter({hasText:"titletuu view"})
    .getByRole('button', {name:'view'}).click()

    await page.getByTestId('blog')
    .filter({hasText:"Isaac view"})
    .getByRole('button', {name:'view'}).click()

    await page.getByTestId('blog')
    .filter({hasText:"ThirdIsac view"})
    .getByRole('button', {name:'view'}).click()

  
    await expect(page.getByRole('button', {name:'vote'})).toHaveCount(3)

    await voteFor(page, "blogThirdIsacIsaac",1)
    
    let blogs = await page.getByRole('listitem').all()
    
    await expect(blogs[0])
    .toHaveText("Title:ThirdIsac hidelikes: 1 voteAuthor: IsaacUrl: secretu.urluuremove")

    await voteFor(page, "blogtitletuuNotAnAuthor",1)
    await voteFor(page, "blogtitletuuNotAnAuthor",2)
    
    blogs = await page.getByRole('listitem').all()
    await expect(blogs[0])
    .toHaveText("Title:titletuu hidelikes: 2 voteAuthor: NotAnAuthorUrl: secretu.urluuremove")
    await expect(blogs[1])
    .toHaveText("Title:ThirdIsac hidelikes: 1 voteAuthor: IsaacUrl: secretu.urluuremove")


    await voteFor(page, "blogtitletuuIsaacauthorituuIsaac",1)
    await voteFor(page, "blogtitletuuIsaacauthorituuIsaac",2)
    await voteFor(page, "blogtitletuuIsaacauthorituuIsaac",3)

    blogs = await page.getByRole('listitem').all()
    await expect(blogs[0])
    .toHaveText("Title:titletuuIsaac hidelikes: 3 voteAuthor: authorituuIsaacUrl: secretu.urluuIsaacremove")
    await expect(blogs[1])
    .toHaveText("Title:titletuu hidelikes: 2 voteAuthor: NotAnAuthorUrl: secretu.urluuremove")
    await expect(blogs[2])
    .toHaveText("Title:ThirdIsac hidelikes: 1 voteAuthor: IsaacUrl: secretu.urluuremove")


    await expect(page.getByTestId('blogThirdIsacIsaac')
    .filter({hasText:"Author: Isaac"})
    .getByText('Likes: 1 vote')).toBeVisible()
    await expect(page.getByTestId('blogtitletuuNotAnAuthor')
    .filter({hasText:"Author: NotAnAuthor"})
    .getByText('Likes: 2 vote')).toBeVisible()
    await expect(page.getByTestId('blogtitletuuIsaacauthorituuIsaac')
    .filter({hasText:"Author: authorituuIsaac"})
    .getByText('Likes: 3 vote')).toBeVisible()
    

  })
  
})