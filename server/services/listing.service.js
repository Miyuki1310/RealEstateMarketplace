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
    imageUrls,
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
      image: imageUrls,
      user,
    });
    if (!newListing) {
      throw new CustomAPIError("Listing not created", 400);
    }
    return newListing;
  }

  async getUserListings(userId) {
    const listings = await Listing.find({ user: userId });
    return listings;
  }
}

const listingService = new ListingService();

export default listingService;
