import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "gtcqm3y1", // public id at the end
  dataset: "production",
  token: process.env.SANITY_READ,
  useCdn: true,
  apiVersion: '2021-05-10'
});