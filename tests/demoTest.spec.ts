import {test, expect} from '@playwright/test'

test.describe('The test suite', ()=>{
  test('The demo test', async({page})=>{
    await page.goto('https://demo.playwright.dev/todomvc')
    const taskInputField = page.getByPlaceholder('What needs to be done?')

    await taskInputField.fill('Demo Task C')
    await taskInputField.press('Enter')
    await taskInputField.fill('Demo Task B')
    await taskInputField.press('Enter')
    await taskInputField.fill('Demo Task A')
    await taskInputField.press('Enter')

    const allTask = page.locator('.todo-list')
    await expect(allTask).toContainText('Demo Task A')

    const taskToDelete = page.locator('.todo-list li').filter({hasText: 'Demo Task A'})
    const taskToCheck = page.locator('.todo-list li').filter({hasText:'Demo Task C'})
    const nonTask = page.locator('.todo-list li').filter({hasText:'Demo Task B'})
    
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
    const employeeCountDropdown = page.locator('//select[@name="CompanyEmployees"]')
    
    await expect(async () =>{
      await employeeCountDropdown.waitFor({state:'visible', timeout:500})
      await employeeCountDropdown.selectOption('150')
      await expect(employeeCountDropdown).toHaveValue('150')
      await employeeCountDropdown.selectOption({ label: '2000+ employees' })
      await expect(employeeCountDropdown).toHaveValue('2500')
    }).toPass()
    
  })
})