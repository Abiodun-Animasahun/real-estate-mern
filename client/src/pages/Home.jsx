import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { DarkModeContext } from "../components/DarkModeContext";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const { isDarkMode} = useContext(DarkModeContext);
  SwiperCore.use([Navigation]);
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    
    <div className={isDarkMode && 'dark'}>
      {/* top */}
      <div className="dark:bg-slate-800 h-fit">
      <div
        className="flex flex-col gap-6 p-28 px-5 max-w-6xl
        mx-auto"
      >
        <h1
          className="text-slate-700 font-bold text-3xl
          lg:text-6xl dark:text-gray-200"
        >
          The platform where you can get your <span className="text-indigo-600 dark:text-red-800">perfect</span>
          <br />
          place to seemlessly get your dream shelter
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm dark:text-gray-300">
          Why not subscribe to HumbleH Estate to give you the best experience of home searching.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text blue-800
          font-bold hover:underline dark:text-gray-100 animate-bounce"
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div 
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className="max-w-8xl mx-auto p-4 flex flex-col gap-6 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3 items-center">
              <h2 className="text-2xl font-semibold text-slate-600 dark:text-gray-100">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline dark:text-gray-100"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 dark:text-gray-100">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline dark:text-gray-100"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 dark:text-gray-100">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline dark:text-gray-100"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
