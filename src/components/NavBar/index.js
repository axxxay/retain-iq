import { IoArrowBackSharp } from "react-icons/io5";

const NavBar = () => {
    return (
        <nav className="flex flex-row items-center justify-between p-[15px] my-[15px] mx-[20px]">
            <div className="flex flex-row items-center">
                <IoArrowBackSharp className="text-[30px] cursor-pointer" />
                <div className="ml-3">
                    <h3 className="font-['Recoleta'] font-[600] text-[30px] ml-3">Rules Creation</h3>
                    <hr className="border-[black] border-[0.px] w-[450px]" />
                </div>
            </div>
            <button className="bg-[#04B058] p-[12px] rounded-md text-white text-[12px]">Publish Feed</button>
        </nav>
    );
};

export default NavBar;