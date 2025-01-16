import { Listing } from "../models/index.js";

class ListingService {
  async addListing(
    name,
    description,
    address,
    regularPrice,
    discountPrice,
    baths,
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
      bathroom: baths,
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

  async getListing(listingId) {
    const listing = await Listing.findById(listingId).populate("user").lean();
    if (!listing) {
      throw new CustomAPIError("Listing not found", 404);
    }
    return listing;
  }

  async getListings(
    limit,
    startIndex,
    offer,
    furnished,
    parking,
    type,
    searchTerm,
    sort,
    order
  ) {
    console.log(!offer, furnished, parking);

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
      isDeleted: false,
    })
      .sort({ [sort]: order }) //sort not working, please fix: sort: { sort: order }
      .limit(limit)
      .skip(startIndex)
      .lean();
    return listings;
  }
}

const listingService = new ListingService();

export default listingService;
