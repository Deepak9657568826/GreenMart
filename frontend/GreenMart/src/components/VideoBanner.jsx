import one from "../assets/videophoto1.png";
import two from "../assets/videobannerVideo.mp4";
import { useNavigate } from "react-router-dom";


export default function VideoBanner() {

const nevigate = useNavigate();

const handleShopNow = () => {
    nevigate("/product")
}
    return (
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src={two} type="video/mp4" />
        </video>
  
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  
        {/* Content */}
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white p-6">
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fresh & Healthy Groceries!
          </h1>
          <p className="text-lg md:text-xl mb-6">
            "Stock your kitchen with love and freshness. Shop now!"
          </p>
          <button onClick={handleShopNow} className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>
    );
  }
  