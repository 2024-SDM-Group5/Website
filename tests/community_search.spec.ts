import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('https://pc214.ee.ntu.edu.tw/website/community/search');
	await page.getByPlaceholder('Search...').click();
	await page.getByPlaceholder('Search...').fill('雞排');
	await page.getByRole('img', { name: 'Diary' }).click();
	await page.getByRole('button', { name: 'Back' }).click();
	await page.getByRole('tab', { name: '帳號' }).click();
	await page.getByPlaceholder('Search...').click();
	await page.getByPlaceholder('Search...').fill('c');
	await page.getByText('Ricky Liu').click();
});
