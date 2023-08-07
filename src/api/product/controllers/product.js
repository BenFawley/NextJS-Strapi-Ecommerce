"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  //add policy to only allow super admins to access this end point
  async build(ctx) {
    // let sanitizedQueryParams = await this.sanitizeQuery(ctx); <- sanitizeQuery from the docs is not returning anything

    let product = await strapi.entityService.findOne(
      "api::product.product",
      ctx.params.id
    );

    const sanitizedResults = await this.sanitizeOutput(product, ctx);

    if (!sanitizedResults.attributes) return;

    console.log(sanitizedResults);

    const cartesian = (sets) => {
      return sets.reduce(
        (acc, curr) => {
          return acc
            .map((x) => {
              return curr.map((y) => {
                return x.concat([y]);
              });
            })
            .flat();
        },
        [[]]
      );
    };

    const capitalize = (s) => {
      if (typeof s !== "string") return "";
      return s
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    const { attributes } = product;

    const variations = cartesian(
      attributes.map(({ name, options }) =>
        options.map(({ value }) => ({ [name]: value }))
      )
    );

    const records = variations.map((variation) => {
      let name = variation.reduce(
        (acc, current) => acc + " " + Object.values(current)[0],
        product.name
      );

      let size = variation.reduce(
        (acc, current) => Object.values(current)[0],
        product.slug
      );

      let slug = variation
        .reduce(
          (acc, current) =>
            acc + "-" + Object.values(current)[0].replace(/ /g, "-"),
          product.slug
        )
        .toLowerCase();

      return {
        product: product._id,
        name: capitalize(name),
        slug: slug,
        price: product.price,
        description: product.description,
        size: size,
      };
    });
    try {
      const createAllRecords = await Promise.all(
        records.map(
          (record) =>
            new Promise(async (resolve, reject) => {
              try {
                const created = await strapi.entityService.create(
                  "api::variation.variation",
                  { data: record }
                );
                resolve(created);
              } catch (err) {
                reject(err);
              }
            })
        )
      );
      ctx.send(createAllRecords);
      //need to add code to connect the variations to the parent item once they have been created
    } catch (err) {
      console.error(err);
    }
  },
}));
