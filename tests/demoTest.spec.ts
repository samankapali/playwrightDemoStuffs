import {test, expect} from '@playwright/test'

test.describe('The test suite', ()=>{
  test('The demo test', async({page})=>{
    await page.goto('https://demo.playwright.dev/todomvc')
    const taskInputField = await page.getByPlaceholder('What needs to be done?')

    taskInputField.fill('Demo Task C')
    taskInputField.press('Enter')
    taskInputField.fill('Demo Task B')
    taskInputField.press('Enter')
    taskInputField.fill('Demo Task A')
    taskInputField.press('Enter')

    const allTask = await page.locator('.todo-list')
    await expect(allTask).toContainText('Demo Task A')

    const taskToDelete = await page.locator('.todo-list li').filter({hasText: 'Demo Task A'})
    const taskToCheck = await page.locator('.todo-list li').filter({hasText:'Demo Task C'})
    const nonTask = await page.locator('.todo-list li').filter({hasText:'Demo Task B'})
    
    await taskToDelete.hover()
    await taskToDelete.locator('.destroy').click()
    await expect(taskToDelete).toHaveCount(0)

    await taskToCheck.locator('.toggle').click()
    await expect(taskToCheck).toHaveClass('completed')
    // await expect(nonTask).toHaveClass('completed')
  })
})

test.describe('Testing the basics',()=>{
  test('Testing the dropdown', async({page})=>{
    await page.goto('https://www.salesforce.com/au/form/signup/sales-ee/?d=topnav2-btn-ft')
    const employeeCountDropdown = await page.locator('//select[contains(@id,"CompanyEmployees")]')
    employeeCountDropdown.selectOption('150')
    await page.waitForTimeout(5000)
    await expect(employeeCountDropdown).toHaveValue('150')
    employeeCountDropdown.selectOption({ label: '2000+ employees' })
    await page.waitForTimeout(5000)
    await expect(employeeCountDropdown).toHaveValue('2500')
  })
})