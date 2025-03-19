import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../hooks/useAuth';

function App() {
    const { isAuthenticated } = useAuth()

    return (
        <div className="flex flex-col items-center text-center mt-10 space-y-20">
            {/* Headings */}
            <div className="space-y-8">
                <h2 className="font-bold text-[32px]">
                    Powering your journey to sustainability—<br />
                    explore our eco-friendly solutions.
                </h2>
                <h2 className="font-bold text-[32px]">
                    Embrace a <span className="text-yellow-600 " style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}>brighter</span>,
                    <span className="inline-flex items-center justify-center border-none py-1 px-1 text-white bg-[#156B56] rounded-2xl ml-1">greener
                    </span> future<br /> with sustainable innovation
                </h2>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mb-10">
                <div className="card btn-hover-effect cursor-pointer">
                    <img src="src/assets/static/globe-icon.png" alt="image" className="w-12" />
                    <h3 className="text-white font-semibold text-xl">Calculate Your Carbon Footprint</h3>
                    <p className="text-white font-light">Discover your environmental impact and take steps to reduce it</p>
                </div>
                <div className="card btn-hover-effect cursor-pointer">
                    <FontAwesomeIcon icon={["fas", "bolt"]} className="text-yellow-500 text-4xl" />
                    <h3 className="text-white font-semibold text-xl">Track Your Energy Usage</h3>
                    <p className="text-white font-light">Monitor and optimize your energy consumption to save money and the planet</p>
                </div>
                <div className="card btn-hover-effect cursor-pointer">
                    <img src="src/assets/static/plant-icon.png" alt="image" className="w-12" />
                    <h3 className="text-white font-semibold text-xl">Reduce Your Carbon Footprint</h3>
                    <p className="text-white font-light">Get personalized tips to lower emissions and make sustainable choices</p>
                </div>

            </div>
            {!isAuthenticated && (
                <div className="max-w-[300px] w-full mb-3 md:mb-0">
                    <a href="/register"><button className="w-full h-[60px] p-4 rounded-full bg-[#156B56] text-white text-2xl font-bold btn-hover-effect cursor-pointer max-w-[300px] w-full">Get Started</button></a>
                </div>
            )}
        </div>
    );
}

export default App;
