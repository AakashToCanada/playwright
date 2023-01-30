import { test, expect } from '@playwright/test';
import { assert } from 'console';
import { e2e_utils } from '../utils/e2e_utils'

test('Verify a completed todo item is not shown in active todo items list', async ({ page }) => {

  //e2e utils const
  // const utils = new e2e_utils();

  // BEFORE -- Open the target Web App
  await page.goto('https://todomvc.com/examples/react/#/');
  await expect(page).toHaveTitle('React • TodoMVC');



  // I have marked a todo item as complete
  const new_todo = await page.getByPlaceholder("What needs to be done?");
  await new_todo.type('todo 1');
  await page.keyboard.press('Enter');
  await new_todo.type('todo 2');
  await page.keyboard.press('Enter');

  await page.locator("//ul[@class='todo-list']/li[1]/div/input[@type='checkbox']").click();
  
  //When I view the Active list
  await page.locator("//ul[@class='filters']/li/a[text()='Active']").click();

  //Then only Active (Not Completed) todo items are shown
  await expect(page.locator("//ul[@class='todo-list']/li/div/label")).toHaveCount(1);
  await expect(page.locator("//ul[@class='todo-list']/li/div/label")).toHaveText('todo 2');

});

