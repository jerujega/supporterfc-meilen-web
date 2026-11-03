const { createClient } = require('next-sanity');
const client = createClient({ projectId: 'eqe2jz7p', dataset: 'production', apiVersion: '2024-01-01', useCdn: false });
client.fetch('*[_type == "galleryItem"]{title, _id, "imagesCount": count(images), images[]{asset->{url}}}').then((data) => {
    console.log(JSON.stringify(data, null, 2));
}).catch(console.error);
