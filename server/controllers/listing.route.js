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
      bedroom,
      furnished,
      parking,
      type,
      offer,
      image,
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
      image
    );
    const newListing = await listingService.addListing(
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
      req.user
    );
    if (!newListing) {
      throw new CustomAPIError("Listing not created", 400);
    }
    return res.status(201).json({ listing: newListing });
  });
}

const listingController = new ListingController();
export default listingController;
