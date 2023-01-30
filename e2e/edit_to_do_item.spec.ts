import { test, expect } from '@playwright/test';
import { assert } from 'console';
import { e2e_utils } from '../utils/e2e_utils'

test('Edit a to do item in the list', async ({ page }) => {

  //e2e utils const
  // const utils = new e2e_utils();

  // BEFORE -- Open the target Web App
  await page.goto('https://todomvc.com/examples/react/#/');
  await expect(page).toHaveTitle('React • TodoMVC');



  // Given I have created a todo item
  const new_todo = await page.getByPlaceholder("What needs to be done?");
  await new_todo.type('todo 1');
  await page.keyboard.press('Enter');


  //When I edit a todo item
  await page.click("//li[1]/div/label[contains(text(),'"+ "todo 1" +"')]", { clickCount: 2 });
  await page.keyboard.press('Control+A');
  await page.keyboard.type('todo edited')
  await page.keyboard.press('Enter');

  //Then the todo item gets updated with the new changes
  await expect(page.locator("//li[1]/div/label[contains(text(),'"+ "todo 1" +"')]")).toHaveCount(0);
  await expect(page.locator("//li[1]/div/label[contains(text(),'"+ "todo edited" +"')]")).toHaveCount(1);
  
  

});

