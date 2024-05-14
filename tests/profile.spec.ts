import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('https://pc214.ee.ntu.edu.tw/website/profile/12/overview');
	await page.getByRole('img', { name: 'Diary 11' }).click();
	await page.getByRole('button', { name: 'Back' }).click();
	await page.getByRole('img', { name: 'Diary 10' }).click();
	await page.getByRole('button', { name: 'Back' }).click();
	await page.getByRole('link', { name: '我的收藏' }).click();
});
