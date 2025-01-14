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

  async deleteListing(listingId, userId) {
    const listing = await Listing.findByIdAndUpdate(
      listingId,
      {
        isDeleted: true,
      },
      { new: true }
    );
    if (!listing) {
      throw new CustomAPIError("Listing not found", 404);
    }
    return listing;
  }

  async updateListing(listingId, userId, update) {
    const listing = await Listing.findByIdAndUpdate(listingId, update, {
      new: true,
    });
    if (!listing) {
      throw new CustomAPIError("Listing not found", 404);
    }
    return listing;
  }
}

const listingService = new ListingService();

export default listingService;
