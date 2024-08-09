# chrome-stripe-product-deleter
Delete Stripe products using a Chrome extension

This was quickly thrown together to delete thousands of Sripe products.
It could be done better, but its hopefully a once off job. I am just putting on Github incase it is of use to anyone else, but consider it unsupported.

The reasoning behind this extension is that the Stripe API does not seem to allow for deleting of products whith prices attached and you can only archive prices using the API.
https://github.com/stripe/stripe-python/issues/658

You can delete these through the website admin though.

Another method is Python and Selenium https://github.com/MilovanTomasevic/stripe-product-deletion

# Installation

- Download the code to a folder
- in Chrome navigate to chrome://extensions/
- Enable Developer Mode
- Select "Load Unpacked", this is where you can then select the folder containing the extension
- Navigate to the Product Catalogue page in Stripe.
- Select the trash icon from the extension bar, click Delete All Products

This will then go through one-by-one deleting each price and product

# Delete using Dashboard

There is also a nodejs script which can use the dashboard for deleting which is a lot faster than the extension but is more difficult to get going.

This script uses a combination of dashboard delete requests for deleting prices with the API product delete

- The first step is to go to your product page, open the network tab and delete a product
- Grab right click on the network request that appears for the delete request
- Copy as curl request
- Update the header section of the dashboard-delete.js with the headers from your curl request
- Install the node stripe and axios modules
- run the script node dashboard-delete.js
