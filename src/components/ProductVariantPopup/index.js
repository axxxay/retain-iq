import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import { VariantItem } from "./VariantItem";

const imagesList = [
    { imageUrl: './image1.webp', label: 'Multi image products' },
    { imageUrl: './image2.webp', label: '4 images - new arrival' },
    { imageUrl: './image3.webp', label: '4 images - on sale' },
    { imageUrl: './image4.webp', label: '4 images - on sale' },
    { imageUrl: './image5.webp', label: 'Single image product' },
    { imageUrl: './image6.webp', label: 'Multi image - on sale' },
    { imageUrl: './image7.webp', label: 'Multi image - new arrival' },
    { imageUrl: './image8.webp', label: '4 images - new arrival' },
    { imageUrl: './image9.webp', label: 'Single image product' },
    { imageUrl: './image10.webp', label: 'Single image product' },
    { imageUrl: './image11.webp', label: 'Single image product'},
    { imageUrl: './image12.webp', label: 'Single image product'},
    { imageUrl: './image13.webp', label: 'Single image product'},
    { imageUrl: './image14.webp', label: 'Single image product'},
    { imageUrl: './image15.webp', label: 'Single image product'},
    { imageUrl: './image16.webp', label: 'Single image product'},
];


export const ProductVariantPopup = ({ selectedRow, selectedColumn, closePopup, changeVariant }) => {

  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredImages = imagesList.filter(image => image.label.toLowerCase().includes(searchInput.toLowerCase()));

  return(
    <>
      <div className='fixed top-0 left-0 w-[100%] h-[100vh] bg-black bg-opacity-75 z-0'></div>
      <div className='fixed top-0 left-0 w-[100%] h-[100vh] flex items-center justify-center'>
          <div className='relative min-w-[95%] md:min-w-[500px] max-w-[95%] md:max-w-[600px] w-[100%] h-[500px] bg-white rounded-lg  z-[10]'>
            <div className="p-[10px] md:p-[20px] border-b-[1px]">
              <button className='absolute right-4 top-2 text-[20px] font-[500] text-[#6B757E]' onClick={closePopup}>&times;</button>
              <IoImageOutline className='text-[#0BAB62] text-[20px] md:text-[28px] my-[10px] md:my-[20px] mx-[10px] md:mx-[20px]' />
              <div className='flex items-center justify-between flex-col md:flex-row mb-2 md:mb-0'>
                  <h2 className='text-[15px] md:text-[17px] mb-2 md:mb-0 font-[500]'>Select a design to link</h2>
                  <div className='flex items-center w-[200px] h-[32px] md:h-[36px] border-[2px] border-[#A3B1DD] rounded-[5px]'>
                    <RiSearchLine className='text-[#6B757E] text-[20px] md:text-[25px] mx-2' />
                    <input type='search' className='w-[100%] pr-1 h-[100%] border-[0px] rounded-[5px] text-[13px] md:text-[14px] outline-none' placeholder='Search' onChange={handleSearch} value={searchInput} />
                  </div>
              </div>
            </div>
            <div className="overflow-y-auto h-[348px] md:h-[335px] mt-[20px]">
              <ul className='flex flex-wrap justify-between px-[10px] md:px-[20px] items-start'>
                  {filteredImages.map((image, index) => (
                    <VariantItem key={index} image={image} changeVariant={changeVariant} selectedRow={selectedRow} selectedColumn={selectedColumn} />
                  ))}
              </ul>
            </div>
          </div>
      </div>
    </>
  )
}
