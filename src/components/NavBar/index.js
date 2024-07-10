import { IoArrowBackSharp } from "react-icons/io5";

const NavBar = () => {
    return (
        <nav className="flex flex-row items-center justify-between md:p-[15px] p-[8px] my-[8px] md:my-[15px] md:mx-[20px] mx-[10px]">
            <div className="flex flex-row items-center">
                <IoArrowBackSharp className="text-[20px] md:text-[30px] cursor-pointer" />
                <div className="ml-2 md:ml-3">
                    <h3 className="font-['Recoleta'] font-[600] md:text-[30px] text-[18px] ml-1 md:ml-3">Rules Creation</h3>
                    <hr className="border-[black] border-[0.px] md:w-[450px] w-[130%]" />
                </div>
            </div>
            <button className="bg-[#04B058] p-[8px] md:p-[12px] rounded-md text-white md:text-[12px] text-[11px]">Publish Feed</button>
        </nav>
    );
};

export default NavBar;