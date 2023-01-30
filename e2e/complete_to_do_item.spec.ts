import { test, expect } from '@playwright/test';
import { assert } from 'console';
import { e2e_utils } from '../utils/e2e_utils'

test('Complete a todo item in the list', async ({ page }) => {

  //e2e utils const
  // const utils = new e2e_utils();

  // BEFORE -- Open the target Web App
  await page.goto('https://todomvc.com/examples/react/#/');
  await expect(page).toHaveTitle('React • TodoMVC');



  // Given I have created a todo item
  const new_todo = await page.getByPlaceholder("What needs to be done?");
  await new_todo.type('todo 1');
  await page.keyboard.press('Enter');


  //When I mark a todo item as completed
  await page.locator("//ul[@class='todo-list']/li[1]/div/input[@type='checkbox']").click();

  //Then it is marked with a green check mark
  const todo_1_checkbox = await page.locator("//li[1]/div/label[contains(text(),'"+ "todo 1" +"')]");
  const todo_1_checkbox_decorator_bh_img = await todo_1_checkbox.evaluate((ele) => {
    return window.getComputedStyle(ele).getPropertyValue('background-image');
  });
  await expect(todo_1_checkbox_decorator_bh_img).toContain("path");

  //And it is crossed off my todo list with a Strikethrough
  const todo_1 = await page.locator("//li[1]/div/label[contains(text(),'"+ "todo 1" +"')]");
  const todo_1_decorator_line = await todo_1.evaluate((ele) => {
    return window.getComputedStyle(ele).getPropertyValue('text-decoration-line');
  });

  await expect(page.locator("//li[1]/div/label[contains(text(),'"+ "todo 1" +"')]")).toHaveCount(1);
  await expect(todo_1_decorator_line).toEqual("line-through");
  

});

