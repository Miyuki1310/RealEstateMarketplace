import { Listing } from "../models/index.js";

class ListingService {
  async addListing(
    name,
    description,
    address,
    regularPrice,
    discountPrice,
    bedroom,
    furnished,
    parking,
    type,
    offer,
    image,
    user
  ) {
    const newListing = await Listing.create({
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bedroom,
      furnished,
      parking,
      type,
      offer,
      image,
      user,
    });
    if (!newListing) {
      throw new CustomAPIError("Listing not created", 400);
    }
    return newListing;
  }
}

const listingService = new ListingService();

export default listingService;
