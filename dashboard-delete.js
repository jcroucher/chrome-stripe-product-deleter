const stripe = require('stripe')('STRIPE_KEY');
const axios = require('axios');

async function deletePrice(priceId) {
    console.log('Processing price:', priceId);

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://dashboard.stripe.com/v1/prices/${priceId}?include_only%5B%5D=id%2Cdeleted`,
      headers: { 
        'accept': 'application/json', 
        'accept-language': 'en-GB,en-GB,en-US,en', 
        'authorization': '', 
        'cache-control': 'no-cache', 
        'content-type': 'application/x-www-form-urlencoded', 
        'cookie': '', 
        'origin': 'https://dashboard.stripe.com', 
        'pragma': 'no-cache', 
        'priority': 'u=1, i', 
        'referer': 'https://dashboard.stripe.com/products?active=true', 
        'sec-ch-ua': '', 
        'sec-ch-ua-mobile': '?0', 
        'sec-ch-ua-platform': '""', 
        'sec-fetch-dest': 'empty', 
        'sec-fetch-mode': 'cors', 
        'sec-fetch-site': 'same-origin', 
        'stripe-account': '', 
        'stripe-livemode': 'true', 
        'stripe-version': '2023-08-16', 
        'user-agent': '', 
        'x-request-source': 'service="manage-srv"; project="products"; operation="ProductBuilderDeletePriceMutation"; component="<unknown>"', 
        'x-requested-with': 'XMLHttpRequest', 
        'x-stripe-csrf-token': '', 
        'x-stripe-manage-client-revision': ''
      }
    };

    try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return true
    } catch (error) {
        console.error('Error processing price:', priceId);
        return false;
    }
}

async function main() {
    let hasMore = true;
    let startingAfter = null;

    while (hasMore) {
        try {
        
            const productParams = {
                limit: 100
            };
            if (startingAfter) {
                productParams.starting_after = startingAfter;
            }

            // Retrieve all products, paging through if more than 100
            const products = await stripe.products.list(productParams);

            // Process each product
            for (const product of products.data) {
                console.log(`Processing product: ${product.id}`);
                const prices = await stripe.prices.list({ product: product.id });
                let allPricesDeleted = true;

                for (const price of prices.data) {
                    const success = await deletePrice(price.id);
                    if (!success) {
                        allPricesDeleted = false;
                    }
                }

                console.log("All prices deleted:", allPricesDeleted);

                const archivedProduct = await stripe.products.update(product.id, { active: false });
                console.log('Product archived')


                if (allPricesDeleted) {
                    await stripe.products.del(product.id);
                    console.log(`Product ${product.id} deleted.`);
                } else {
                    console.log(`Failed to delete all prices for product ${product.id}. Product not deleted.`);
                }
            }

            hasMore = products.has_more;
            if (hasMore) {
                startingAfter = products.data[products.data.length - 1].id;
            } else {
                startingAfter = null; // Reset startingAfter to prevent empty string error
            }

        console.log('All products have been processed.');
        } catch (error) {
            console.error('Failed to deactivate prices and archive products:', error);
        }
    }
}

main();