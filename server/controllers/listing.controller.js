import { CustomAPIError } from "../error/customError.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import listingService from "../services/listing.service.js";

class ListingController {
  create = asyncWrapper(async (req, res) => {
    const {
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
    } = req.body;
    console.log(
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
      imageUrls
    );
    const newListing = await listingService.addListing(
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
      req.user
    );
    if (!newListing) {
      throw new CustomAPIError("Listing not created", 400);
    }
    return res.status(201).json({ listing: newListing });
  });
  getUserListings = asyncWrapper(async (req, res) => {
    const userId = req.user;
    if (req.params.id === userId) {
      const listings = await listingService.getUserListings(userId);
      return res.status(200).json({ listings });
    } else {
      throw new CustomAPIError("Unauthorized", 401);
    }
  });

  deleteListing = asyncWrapper(async (req, res) => {
    const userId = req.user;
    const listingId = req.params.id;
    const listing = await listingService.deleteListing(listingId, userId);
    return res.status(200).json({ listing });
  });

  updateListing = asyncWrapper(async (req, res) => {
    const listingId = req.params.id;
    const userId = req.user;
    const { user, ...update } = req.body;
    if (user === userId) {
      const listing = await listingService.updateListing(
        listingId,
        userId,
        update
      );
      return res.status(200).json({ listing });
    } else {
      throw new CustomAPIError(
        "You dont have permission or you can try sign in again",
        401
      );
    }
  });

  getListing = asyncWrapper(async (req, res) => {
    const listingId = req.params.id;
    const listing = await listingService.getListing(listingId);
    return res.status(200).json({ listing });
  });
}

const listingController = new ListingController();
export default listingController;
