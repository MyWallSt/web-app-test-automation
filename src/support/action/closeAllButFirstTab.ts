/**
 * Close all but the first tab
 */
export default async () => {
	/**
	 * Get all the window handles
	 * @type {Object}
	 */
	const windowHandles = await browser.getWindowHandles();

	// Close all tabs but the first one
	windowHandles.reverse();

	for (const [index, handle] of Object.entries(windowHandles)) {
		await browser.switchToWindow(handle);

		if (parseInt(index, 10) < windowHandles.length - 1) {
			await browser.closeWindow();
		}
	}
};
