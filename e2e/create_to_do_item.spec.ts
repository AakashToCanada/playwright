import { test, expect } from '@playwright/test';
import { assert } from 'console';
import { e2e_utils } from '../utils/e2e_utils'

test('Create a new todo item', async ({ page }) => {

  // BEFORE -- Open the target Web App
  await page.goto('https://todomvc.com/examples/react/#/');
  await expect(page).toHaveTitle('React • TodoMVC');

  //Given I am a user
  console.log("A user opened the web app");

  //We are creating three different todo items in the todo list to check if it appears last in the list

  //  When I create a new todo item
  const new_todo = await page.getByPlaceholder("What needs to be done?");
  await new_todo.type('todo 1');
  await page.keyboard.press('Enter');
  // Then it appears last on my todo list
  await expect(page.locator("//li[1]/div/label[contains(text(),'"+ "todo 1" +"')]")).toHaveCount(1);

  //  When I create a new todo item
  await new_todo.type('todo 2');
  await page.keyboard.press('Enter');
  // Then it appears last on my todo list
  await expect(page.locator("//li[2]/div/label[contains(text(),'"+ "todo 2" +"')]")).toHaveCount(1);

  //  When I create a new todo item
  await new_todo.type('todo 3');
  await page.keyboard.press('Enter');
  // Then it appears last on my todo list
  await expect(page.locator("//li[3]/div/label[contains(text(),'"+ "todo 3" +"')]")).toHaveCount(1);

});

