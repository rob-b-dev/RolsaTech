import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NotFound() {
    return (
        <div className={`flex items-center justify-center min-h-screen`}>
            <div className="relative flex flex-col items-start">
                <a className="absolute -inset-x-1/2 top-[-8rem] flex items-center gap-2" href='/'>
                    <FontAwesomeIcon icon={["fas", "arrow-left-long"]} className="text-2xl" />
                    <span className="text-lg font-semibold">Back to Home Page</span>
                </a>
                <div className="flex items-center gap-4">
                    <h1 className="text-6xl">404</h1>
                    <div className={`w-[3px] h-[80px] bg-[#156B56]`}></div>
                    <h1 className="text-3xl">Page Not Found</h1>
                </div>
            </div>
        </div>
    );
}

export default NotFound