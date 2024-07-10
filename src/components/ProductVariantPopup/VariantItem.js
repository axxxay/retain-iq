import { useState } from "react";

export const VariantItem = ({ image, changeVariant, selectedRow, selectedColumn }) => {
    const [hoverBtn, setHoverBtn] = useState(false);
    return (
        <li className='w-[24%] h-[150px] rounded-[5px] flex flex-col items-center justify-center my-[10px] relative' onMouseOver={() => setHoverBtn(true)} onMouseOut={() => setHoverBtn(false)}>
            <img src={image.imageUrl} alt={image.label} className='w-[100%] h-[130px] min-h-[130px] max-h-[130px] object-fill rounded-[5px]' />
            <span className='text-[12px] font-[500] mt-[5px] overflow-hidden overflow-ellipsis'>{image.label}</span>
            { hoverBtn &&
                <button className='absolute top-[30%] left-[26%] bg-white py-2 px-3 rounded-[5px] hover:bg-[#dee5f9] text-[15px] font-[500]' onClick={() => changeVariant(selectedRow, selectedColumn, image)}>Insert</button>
            }
        </li>
    );
};