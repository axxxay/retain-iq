import React, { useState } from 'react';
import { CgMenuGridO } from "react-icons/cg";
import { LuPenSquare } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

const ProductRuleItem = ({ innerRef, dp, dragHandleProps, rule, index, columns, addColumn, deleteRow, handleAddProductFilter, handlePopupOpen }) => {
    const [showHoverActions, setShowHoverActions] = useState(false);
    const [productFilter, setProductFilter] = useState('');
    const [showFilterInput, setShowFilterInput] = useState(false);

    const handleProductFilter = (e) => {
        setProductFilter(e.target.value);
    };

    const addProductFilter = () => {
        if (productFilter === '') return;
        handleAddProductFilter(productFilter, rule.key);
        setShowFilterInput(false);
    };

    return (
        <tr className='border-b-[1px]' ref={innerRef} {...dp} onMouseOver={() => setShowHoverActions(true)} onMouseOut={() => setShowHoverActions(false)}>
            <td className='border-r-[1px] max-w-[40px] md:max-w-[80px]' {...dragHandleProps}>
                <div className='w-[30px] md:w-[60px] text-[16px] md:text-[24px] flex flex-col justify-center items-center font-bold relative'>
                    { showHoverActions &&
                        <button className='absolute bg-white border-0 outline-none p-0 bottom-7 md:bottom-9' onClick={() => deleteRow(rule.key)}>
                            <RiDeleteBinLine className='text-[20px] md:text-[22px] text-[#ff2361]' />
                        </button>
                    }
                    <div className='flex flex-row items-center'>
                        <span className='text-[20px] md:text-[24px] font-bold'>{index+1}</span>
                        <CgMenuGridO className='text-[19px] md:text-[23px] mt-[4px]' />
                    </div>
                </div>
            </td>
            <td className='w-[200px] max-w-[200px] min-w-[200px] md:w-[400px] md:max-w-[400px] md:min-w-[400px] border-r-[1px]'>
                <div className='w-[170px] max-w-[170px] md:w-[345px] md:max-w-[345px] h-[90px] md:h-[165px] my-2 md:my-4 flex items-center justify-center border-[1px] border-[#d0d0d0] rounded-lg mx-auto'>
                    {rule.filter ? 
                        <p className='text-[10px] md:text-[13px] font-[400] px-2 py-1 flex-wrap text-black rounded-md border-[1px] border-[#d0d0d0]'>{rule.filter}</p>
                        :
                        (showFilterInput ?
                            (<div className='flex items-center justify-center w-[90%] md:w-[80%] h-[30px] md:h-[40px] border-[1px] border-[#d0d0d0] rounded-[5px]' onMouseOut={() => setShowFilterInput(false)}>
                                <input type='text' className='w-[100%] h-[100%] border-none outline-none p-[6px] md:p-[10px] text-[10px] md:text-[14px] rounded-[5px]' placeholder='Enter Filter Name' value={productFilter} onChange={handleProductFilter} />
                                <button className='py-1 px-2 md:py-2 md:px-4 text-[12px] md:text-[15px] border-[0px] flex items-center justify-center hover:bg-blue-50 border-l-[1px] font-[500]' onClick={addProductFilter}>Add</button>
                            </div>)
                            :
                            (<button className='py-1 px-2 md:py-2 md:px-4 rounded-md border-[1px] border-[#d0d0d0] flex items-center justify-center hover:bg-blue-50' onClick={() => setShowFilterInput(true)} onMouseOver={() => setShowFilterInput(true)}>
                                <FaPlus className='text-black text-[12px] md:text-[16px] mr-2' />
                                <span className='text-[11px] md:text-[14px] text-black font-[500]'>Add Product Filters</span>
                            </button>)     
                        )
                    }
                </div>
            </td>
            {columns.map(column => (
                <td key={column.key} className='w-[110px] max-w-[110px] min-w-[110px] md:w-[210px] md:max-w-[210px] md:min-w-[210px] border-r-[1px]'>
                    <div className='relative w-[80px] md:w-[160px] h-[90px] md:h-[165px] mx-auto p-[3px] md:p-[10px] my-2 md:my-4 pt-2 md:pt-4 border-[1px] border-[#d0d0d0] rounded-lg flex flex-col justify-center items-center'>
                        {rule[column.key].imageUrl && rule[column.key].label ? (
                            <>
                                <img src={rule[column.key].imageUrl} alt={rule[column.key].label} className='w-[60px] h-[60px] md:w-[110px] md:h-[110px] rounded-[5px]' />
                                <span className='ml-[0px] overflow-hidden overflow-ellipsis whitespace-nowrap w-[100%] text-[9px] md:text-[13px] font-[500] mt-[2px] md:mt-1 text-center'>{rule[column.key].label}</span>
                                {showHoverActions && <button className='absolute top-[25px] md:top-[50px] right-[30%] md:right-[34.5%] bg-white py-[4px] px-[7px] md:py-[8px] md:px-[14px] rounded-[5px] hover:bg-blue-50' onClick={() => handlePopupOpen(rule, column)}><LuPenSquare className='text-black text-[17px] md:text-[20px]' /></button>}
                            </>
                        ) : (
                            <button className='py-1 px-2 md:py-2 md:px-4 rounded-md border-[1px] border-[#d0d0d0] flex items-center justify-center hover:bg-blue-50' onClick={() => handlePopupOpen(rule, column)}>
                                <FaPlus className='text-black text-[14px] md:text-[16px] mr-1 md:mr-2' />
                                <span className='text-[10px] md:text-[14px] text-black font-[500]'>Add design</span>
                            </button>
                        )}
                    </div>
                </td>
            ))}
            <td>
                <button className='p-[8px] md:p-[10px] rounded-md border-[1px] mx-3 md:mx-6 border-[#d0d0d0] flex items-center justify-center hover:bg-blue-50' onClick={addColumn}>
                    <FaPlus className='text-black text-[13px] md:text-[16px]' />
                </button>
            </td>
        </tr>
    );
};

export default ProductRuleItem;