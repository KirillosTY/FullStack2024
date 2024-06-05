const { test, expect, beforeEach, describe } = require('@playwright/test')

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

    await page.getByRole('button', { name: 'login' }).click()

    await page.getByTestId('username').fill('Steinway')
    await page.getByTestId('password').fill('secretu')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()


  })

  test('Login is unsuccessful with wrong credentials', async ({ page }) => {

   
    const  textInputs = await page.getByRole('textbox').all()

    await page.getByTestId('username').fill('Steinway')
    await page.getByTestId('falsePass').fill('secretu')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Albert Einstein logged in')).not.toBeVisible()
    await expect(page.getByText('Log in to application', {exact:false})).toBeVisible()


  })

  test('a new blog can be created', async ({ page }) => {
    
    await page.getByTestId('username').fill('Steinway')
    await page.getByTestId('password').fill('secretu')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Albert Einstein logged in')).toBeVisible()

    await page.getByRole('button', { name: 'New blog' }).click()

    const  blogCreationInputs = await page.getByRole('textbox').all()

    await page.getByTestId('title').fill('titletuu')
    await page.getByTestId('author').fill('authorituu')
    await page.getByTestId('url').fill('secretu.urluu')

    await page.getByRole('button', { name: 'Create' }).click()
    
    await expect(page.getByText('titletuu')).toBeVisible()

  })
})