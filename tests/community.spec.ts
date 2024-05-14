import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('https://pc214.ee.ntu.edu.tw/website/community/overview');
});
