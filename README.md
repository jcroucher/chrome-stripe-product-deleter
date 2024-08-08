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

