document.getElementById('deleteButton').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: mainDeleteFunction
        });
    });
});

function mainDeleteFunction() {
    let intervalId;
    let linkNotFoundCount = 0;
    const maxAttempts = 3;
    const intervalDelay = 2000;
    const timeout = 400;

    function clickModalButton() {
        setTimeout(() => {
            // Find and click the "Delete product" modal button
            const button = Array.from(document.querySelectorAll('button.UnstyledLink'))
                                .find(btn => btn.textContent.includes("Delete product"));
            if (button) {
                button.click();
                console.log('Button clicked.');
            } else {
                console.log('Button not found.');
            }
        }, timeout);
    }

    function performActions() {
        // Find and click the "..." button
        const link = document.querySelector('a.row-actions-trigger');

        if (link) {
            linkNotFoundCount = 0; // Reset the counter if link is found
            link.click();

            setTimeout(() => {
                // Find and click the delete product menu item
                const menuItem = Array.from(document.querySelectorAll('div[role="menuitem"]'))
                                      .find(item => item.textContent.includes("Delete product"));
                if (menuItem) {
                    menuItem.click();
                    clickModalButton();
                } else {
                    console.log('Menu item not found.');
                }
            }, timeout);
        } else {
            console.error('Link not found');
            linkNotFoundCount++;
            if (linkNotFoundCount >= maxAttempts) {
                console.error(`Failed to find link ${maxAttempts} times, stopping the interval.`);
                clearInterval(intervalId);
            }
        }
    }

    intervalId = setInterval(performActions, intervalDelay); // Trigger actions every 2 seconds
}