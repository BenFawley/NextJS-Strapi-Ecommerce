"use strict";

const stripe = require("stripe")(process.env.STRIPE_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  //add check to see if product has variations then search variations else search product
  async create(ctx) {
    const products = ctx.request.body;

    const lineItems = await Promise.all(
      products.map(async (product) => {
        if (product.isVariation) {
          const item = await strapi
            .service("api::variation.variation")
            .findOne(product.id);

          return {
            price_data: {
              currency: "gbp",
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.quantity,
          };
        } else {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);

          return {
            price_data: {
              currency: "gbp",
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.quantity,
          };
        }
      })
    );

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}?cancel`,
        payment_method_types: ["card"],
      });

      await strapi.service("api::order.order").create({
        data: {
          products,
          stripeId: session.id,
        },
      });

      return { stripeSession: session };
    } catch (err) {
      console.log(err);
      ctx.response.status = 500;
      return err;
    }
  },

  // set up stripe webhook when hosted to send emails
  // async sendmail(ctx) {
  //   console.log(ctx.request.body);
  //   ctx.status = 200;
  //   ctx.body = "Ok";
  // },

  // async update(ctx) {},
}));
