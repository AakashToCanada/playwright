import { test, expect } from '@playwright/test';
import { assert } from 'console';
import { e2e_utils } from '../utils/e2e_utils'

test('Delete a todo item in the list', async ({ page }) => {

  //e2e utils const
  // const utils = new e2e_utils();

  // BEFORE -- Open the target Web App
  await page.goto('https://todomvc.com/examples/react/#/');
  await expect(page).toHaveTitle('React • TodoMVC');



  // Given I have created a todo item
  const new_todo = await page.getByPlaceholder("What needs to be done?");
  await new_todo.type('todo 1');
  await page.keyboard.press('Enter');


  //When I delete a todo item using the red X
  await page.hover("//li[1]/div/label[contains(text(),'"+ "todo 1" +"')]");
  await expect(page.locator("//ul[@class='todo-list']/li[1]/div/button")).toBeVisible();
  await page.locator("//ul[@class='todo-list']/li[1]/div/button").click();

  //Then the todo item is removed from my todo list
  await expect(page.locator("//li[1]/div/label[contains(text(),'"+ "todo 1" +"')]")).toHaveCount(0);
  
  

});

