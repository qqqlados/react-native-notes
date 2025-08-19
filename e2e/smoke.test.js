describe("Notes App Smoke Test", () => {
	it("should complete full app flow from welcome to note management", async () => {
		// Welcome screen
		await expect(element(by.text("Welcome to Notes"))).toBeVisible();
		await expect(
			element(by.text("Capture your thoughts, ideas, and memories"))
		).toBeVisible();

		// Go to My Notes
		await element(by.id("start-button")).tap();
		await expect(element(by.text("My Notes"))).toBeVisible();

		// Check empty state
		await expect(element(by.text("No notes"))).toBeVisible();

		// Go to Create Note
		await element(by.text("Create Note")).tap();
		await expect(element(by.text("Create note"))).toBeVisible();

		// Create a note
		const noteTitle = `Test Note ${Date.now()}`;
		const noteText = "This is a test note created by Detox";

		await element(by.placeholder("Title")).typeText(noteTitle);
		await element(
			by.placeholder("Your beautiful note description...")
		).typeText(noteText);
		await element(by.text("Create")).tap();

		// Check note was created
		await expect(element(by.text(noteTitle))).toBeVisible();
		await expect(element(by.text(noteText))).toBeVisible();
		await expect(element(by.text("Created:"))).toBeVisible();

		// Edit the note
		await element(by.id("pencil")).tap();
		await expect(element(by.text("Edit note"))).toBeVisible();

		const editedTitle = `${noteTitle} - Edited`;
		await element(by.placeholder("Title")).clearText();
		await element(by.placeholder("Title")).typeText(editedTitle);
		await element(by.text("Save")).tap();

		// Check edit was saved
		await expect(element(by.text(editedTitle))).toBeVisible();

		// Delete the note
		await element(by.id("trash")).tap();
		await expect(
			element(by.text("Are you sure you want to delete the note?"))
		).toBeVisible();
		await element(by.text("Delete")).tap();

		// Go back and check note is gone
		await element(by.text("Back")).tap();
		await expect(element(by.text("My Notes"))).toBeVisible();
		await expect(element(by.text(editedTitle))).not.toBeVisible();
		await expect(element(by.text("No notes"))).toBeVisible();
	});

	it("should handle language switching", async () => {
		// Check welcome screen
		await expect(element(by.text("Welcome to Notes"))).toBeVisible();

		// Switch to French
		await element(by.id("lang-fr")).tap();
		await expect(element(by.text("Bienvenue dans Notes"))).toBeVisible();

		// Switch to Italian
		await element(by.id("lang-it")).tap();
		await expect(element(by.text("Benvenuto in Notes"))).toBeVisible();

		// Back to English
		await element(by.id("lang-en")).tap();
		await expect(element(by.text("Welcome to Notes"))).toBeVisible();
	});

	it("should validate form inputs", async () => {
		// Go to create note
		await element(by.id("start-button")).tap();
		await element(by.text("Create Note")).tap();

		// Try without title
		await element(
			by.placeholder("Your beautiful note description...")
		).typeText("Some text");
		await expect(element(by.text("Create"))).toBeDisabled();

		// Try without text
		await element(by.placeholder("Title")).typeText("Some title");
		await element(
			by.placeholder("Your beautiful note description...")
		).clearText();
		await expect(element(by.text("Create"))).toBeDisabled();

		// Fill both fields
		await element(
			by.placeholder("Your beautiful note description...")
		).typeText("Some text");
		await expect(element(by.text("Create"))).toBeEnabled();
	});
});
