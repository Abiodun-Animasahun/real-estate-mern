import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import { DarkModeContext } from "../components/DarkModeContext";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { isDarkMode } = useContext(DarkModeContext);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <div className={`${isDarkMode && "dark"}`}>
      <main className="dark:bg-slate-800">
        {loading && (
          <p className="text-center my-7 text-2xl dark:text-gray-100">
            Loading...
          </p>
        )}
        {error && (
          <p
            className="text-center my-7 
      text-2xl dark:text-gray-100"
          >
            Something went wrong!
          </p>
        )}
        {listing && !loading && !error && (
          <div>
            <Swiper navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[550px]"
                    style={{
                      background: `url(${url})
                  center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
              <FaShare
                className="text-slate-500"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 text-slate-900">
                Link copied!
              </p>
            )}
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
              <p className="text-2xl font-semibold dark:text-gray-100">
                {listing.name} - ₦{" "}
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " / year"}
              </p>
              <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm dark:text-gray-100">
                <FaMapMarkerAlt className="text-green-700" />
                {listing.address}
              </p>
              <div className="flex gap-4">
                <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md ">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && (
                  <p className="bg-yellow-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    ₦{+listing.regularPrice - +listing.discountPrice} Off
                  </p>
                )}
              </div>
              <p className="text-slate-800 dark:text-gray-100">
                <span className="font-semibold text-black dark:text-gray-100">
                  Description -{" "}
                </span>
                {listing.description}
              </p>
              <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 dark:text-green-400">
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaBed className="text-lg" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds`
                    : `${listing.bedrooms} bed `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaBath className="text-lg" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths`
                    : `${listing.bathrooms} bath`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaParking className="text-lg" />
                  {listing.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaChair className="text-lg" />
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>
              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3
                     dark:text-gray-100 dark:bg-slate-500 dark:hover:opacity-95"
                  >
                    Contact landlord
                  </button>
                )}
              {contact && <Contact listing={listing} />}
            </div>
          </div>
        )}
      </main>
      </div>
  );
}
