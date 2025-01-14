import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Listing = () => {
  const { listingId } = useParams();
  const [listing, setListing] = React.useState(null);
  React.useEffect(() => {
    const fetchListing = async (listingId) => {
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      console.log(data.listing);
      setListing(data.listing);
    };
    fetchListing(listingId);
  }, [listingId]);
  console.log(listing);

  return (
    <div className="max-w-7xl mx-auto">
      {listing && (
        <>
          <Swiper navigation modules={[Navigation]}>
            {listing.image.map((image, index) => {
              return (
                <SwiperSlide key={image}>
                  <div
                    className="h-[550px]"
                    style={{
                      background: `url(${image}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default Listing;
