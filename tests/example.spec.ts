import { test, expect } from '@playwright/test';

test.describe('Playwright portfolio smoke tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Automation Portfolio App</title>
      </head>
      <body>
        <header>
          <h1>Automation Portfolio Dashboard</h1>
        </header>
        <main>
          <form aria-label="newsletter form">
            <label for="email">Email</label>
            <input id="email" type="email" />
            <button type="button" id="subscribe">Subscribe</button>
          </form>
          <p id="status" aria-live="polite"></p>
          <section aria-label="task list">
            <button type="button" id="add-task">Add task</button>
            <ul id="tasks"></ul>
          </section>
        </main>
        <script>
          const status = document.getElementById('status');
          const email = document.getElementById('email');
          document.getElementById('subscribe').addEventListener('click', () => {
            status.textContent = email.value.includes('@') ? 'Subscribed successfully' : 'Enter a valid email';
          });

          let taskCount = 0;
          document.getElementById('add-task').addEventListener('click', () => {
            taskCount += 1;
            const li = document.createElement('li');
            li.textContent = 'Task #' + taskCount;
            document.getElementById('tasks').appendChild(li);
          });
        </script>
      </body>
      </html>
    `);
  });

  test('landing page renders core content', async ({ page }) => {
    await expect(page).toHaveTitle(/Automation Portfolio App/);
    await expect(page.getByRole('heading', { name: 'Automation Portfolio Dashboard' })).toBeVisible();
  });

  test('form validation updates live status', async ({ page }) => {
    await page.getByLabel('Email').fill('not-an-email');
    await page.getByRole('button', { name: 'Subscribe' }).click();
    await expect(page.getByText('Enter a valid email')).toBeVisible();

    await page.getByLabel('Email').fill('user@example.com');
    await page.getByRole('button', { name: 'Subscribe' }).click();
    await expect(page.getByText('Subscribed successfully')).toBeVisible();
  });

  test('adding tasks updates list items', async ({ page }) => {
    await page.getByRole('button', { name: 'Add task' }).click();
    await page.getByRole('button', { name: 'Add task' }).click();
    await expect(page.locator('#tasks li')).toHaveCount(2);
    await expect(page.locator('#tasks li').last()).toHaveText('Task #2');
  });
});
