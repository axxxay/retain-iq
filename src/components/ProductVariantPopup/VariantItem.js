import { useState } from "react";

export const VariantItem = ({ image, changeVariant, selectedRow, selectedColumn }) => {
    const [hoverBtn, setHoverBtn] = useState(false);
    return (
        <li className='w-[32%] md:w-[24%] h-[110px] md:h-[150px] rounded-[5px] flex flex-col items-center justify-center my-[5px] md:my-[10px] relative' onMouseOver={() => setHoverBtn(true)} onMouseOut={() => setHoverBtn(false)}>
            <img src={image.imageUrl} alt={image.label} className='w-[100%] h-[90px] md:h-[130px] min-h-[90px] max-h-[90px] md:min-h-[130px] md:max-h-[130px] object-fill rounded-[5px]' />
            <span className='text-[11px] md:text-[12px] flex-wrap font-[500] mt-[3px] md:mt-[5px] overflow-hidden overflow-ellipsis'>{image.label}</span>
            { hoverBtn &&
                <button className='absolute top-[30%] left-[26%] bg-white py-1 md:py-2 px-2 md:px-3 rounded-[5px] hover:bg-[#dee5f9] text-[12px] md:text-[15px] font-[500]' onClick={() => changeVariant(selectedRow, selectedColumn, image)}>Insert</button>
            }
        </li>
    );
};