import axios from 'axios';

const API_URL = 'https://api.chec.io/v1/products/';

// GET ALL PRODUCTS
const getAllProducts = async () => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.get(API_URL, config);

  return res.data.data;
};

// GET SINGLE PRODUCT
const getProduct = async (productId) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.get(API_URL + productId, config);

  return res.data;
};

// GET PRODUCT VARIANTS
const getProductVariants = async (productId) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.get(
    `https://api.chec.io/v1/products/${productId}/variants`,
    config
  );

  return res.data.data;
};

// ADD PRODUCT
const addProduct = async (productInfo) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.post(
    API_URL,
    {
      product: {
        name: productInfo.name,
        price: productInfo.price,
        description: productInfo.description,
        meta: [{ createdBy: productInfo.createdBy }],
      },
    },
    config
  );

  postImagesToChec(res.data.id, productInfo.imageArray);
  postCategoriesToChec(res.data.id, productInfo.categories);
  postVariantGroupsToChec(res.data.id, productInfo.variants);

  return res.data;
};

//   Posts new image(s) to chec asset library
const postImagesToChec = async (id, imageArray) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  imageArray &&
    (await imageArray.map((asset) =>
      axios
        .post(
          'https://api.chec.io/v1/assets',
          {
            filename: asset.original_filename + '.' + asset.format,
            file_extension: asset.format,
            url: asset.url,
            meta: [id],
          },
          config
        )
        .then((res) => setImagesToPost(id))
    ));
};

// Save images to post
const setImagesToPost = async (productId) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  //   Get all assets
  const allAssets = await axios.get('https://api.chec.io/v1/assets', config);

  const currentAssetsArray = allAssets.data.data.filter(
    (asset) => asset.meta[0] === productId
  );

  const temp = [];
  await currentAssetsArray.forEach((asset) => {
    temp.push({
      id: asset.id,
      url: asset.url,
      filename: asset.filename,
      file_extension: asset.file_extension,
    });
  });

  await axios.put(
    `https://api.chec.io/v1/products/${productId}/assets`,
    {
      assets: temp,
    },
    config
  );
};

// Save categories to post
const postCategoriesToChec = async (productId, catArray) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  await axios.put(
    `https://api.chec.io/v1/products/${productId}`,
    {
      categories: catArray,
    },
    config
  );
};

// Post variant groups with options array to product
const postVariantGroupsToChec = async (productId, varGroupsArray) => {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  //   await varGroupsArray.forEach((arr) => {
  //     axios.post(
  //       `https://api.chec.io/v1/products/${productId}/variant_groups`,
  //       arr,
  //       config
  //     );
  //   });

  await varGroupsArray.map((arr) =>
    axios.post(
      `https://api.chec.io/v1/products/${productId}/variant_groups`,
      arr,
      config
    )
  );

  if (varGroupsArray.length > 1) {
    await postVariantsToChec(productId);
  }
};

// Generate variants
const postVariantsToChec = async (productId) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  // Get product info
  const res = await axios.get(API_URL + productId, config);

  const varArray = [];

  const numOptions1 = res.data.variant_groups[0].options.length;
  const numOptions2 = res.data.variant_groups[1].options.length;

  for (let opt1x = 0; opt1x < numOptions1; opt1x++) {
    for (let opt2x = 0; opt2x < numOptions2; opt2x++) {
      let opt1 = res.data.variant_groups[0].options[opt1x].id;
      let opt2 = res.data.variant_groups[1].options[opt2x].id;
      varArray.push([opt1, opt2]);
    }
  }

  //   console.log(varArray);

  await varArray.forEach((variant) => {
    axios.post(
      `https://api.chec.io/v1/products/${productId}/variants`,
      { options: variant },
      config
    );
  });
};

const productService = {
  getAllProducts,
  getProduct,
  addProduct,
  getProductVariants,
};

export default productService;
