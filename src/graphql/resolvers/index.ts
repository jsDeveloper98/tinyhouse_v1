import { listingResolvers } from "./listing/index";
import { merge } from "lodash";

export const resolvers = merge(listingResolvers);
