module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: "GET",
      path: "/products/:id/build",
      handler: "product.build",
    },
  ],
};
