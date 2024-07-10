import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import toast from 'react-hot-toast';
import ProductRuleItem from "../ProductRuleItem";
import { ProductVariantPopup } from "../ProductVariantPopup";
import './style.css';


function ProductRulesPage() {
    const [data, setData] = useState([
        { key: 1, filter: 'AND Discount Percentage', variant1: { imageUrl: './image10.webp', label: "Single image product" }, variant2: { imageUrl: './image9.webp', label: "Single image product" } },
        { key: 2, filter: 'is empty', variant1: { imageUrl: '/image1.webp', label: "Multi image products" }, variant2: { imageUrl: '/image5.webp', label: "Single image product" } },
        { key: 3, filter: 'contains', variant1: { imageUrl: '/image2.webp', label: "4 images - new arrival" }, variant2: { imageUrl: '/image6.webp', label: "Multi image - on sale" } },
        { key: 4, filter: 'image_list.Product Image 2', variant1: { imageUrl: '', label: "Single image product" }, variant2: { imageUrl: '/image7.webp', label: "Multi image - new arrival" } },
        { key: 5, filter: 'Discount Percentage', variant1: { imageUrl: '/image4.webp', label: "4 images - on sale" }, variant2: { imageUrl: './image8.webp', label: "4 images - new arrival" } },
    ]);

    const [columns, setColumns] = useState([
        { key: 'variant1', label: 'Primary Variant' },
        { key: 'variant2', label: 'Variant 2' }
    ]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState(null);

    const handlePopupOpen = (row, variant) => {
        setSelectedRow(row);
        setSelectedColumn(variant);
        setIsPopupOpen(true);
    };

    const changeVariant = (row, column, image) => {
        setData(data.map(item => {
            if (item.key === row.key) {
                return { ...item, [column.key]: { imageUrl: image.imageUrl, label: image.label } };
            }
            return item;
        }));
        setIsPopupOpen(false);
        toast.success('Variant template updated');
    };

    const addColumn = () => {
        const newColumnKey = `variant${columns.length + 1}`;
        const newColumn = columns.length === 0
            ? { key: newColumnKey, label: 'Primary Variant' }
            : { key: newColumnKey, label: `Variant ${columns.length + 1}` };

        setColumns([...columns, newColumn]);

        setData(data.map(item => ({
            ...item,
            [newColumnKey]: { imageUrl: '', label: '' }
        })));
        toast.success('Variant added');
    };

    const deleteColumn = (columnKey) => {
        const indexToDelete = columns.findIndex(column => column.key === columnKey);
        if (indexToDelete !== -1) {
            const updatedColumns = columns.filter(column => column.key !== columnKey);

            const updatedData = data.map(item => {
                const newItem = { ...item };
                delete newItem[columnKey];
                return newItem;
            });

            for (let i = indexToDelete; i < updatedColumns.length; i++) {
                const oldKey = `variant${i + 2}`;
                const newKey = `variant${i + 1}`;
                updatedData.forEach(item => {
                    if (item[oldKey]) {
                        item[newKey] = item[oldKey];
                        delete item[oldKey];
                    }
                });
                updatedColumns[i] = { key: `variant${i + 1}`, label: `Variant ${i + 1}` };
            }

            if (updatedColumns.length > 0) {
                updatedColumns[0].label = 'Primary Variant';
            }

            setColumns(updatedColumns);
            setData(updatedData);
        }
        toast.success('Variant removed');
    };

    const addRow = () => {
        const newKey = data.length + 1;
        let newRow = { key: newKey, filter: '' };
        columns.forEach(column => {
            newRow[column.key] = { imageUrl: '', label: '' };
        });

        setData([...data, newRow]);
        toast.success('State added');
    };

    const deleteRow = (rowKey) => {
        setData(data.filter(item => item.key !== rowKey));
        toast.success('State removed!');
    };

    const handleAddProductFilter = (productFilter, key) => {
        setData(data.map(item => {
            if (item.key === key) {
                return { ...item, filter: productFilter };
            }
            return item;
        }));
    };

    const handleDragEnd = (results) => {
        if (!results.destination) return;
        const items = Array.from(data);
        const [reorderedItem] = items.splice(results.source.index, 1);
        items.splice(results.destination.index, 0, reorderedItem);
        setData(items);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="overflow-x-auto flex-wrap my-[6%] md:my-[4%] mx-[3%] w-[94%] md:mx-[5%] md:w-[90%] scroll-m-0 product-rules-table">
            <table className="border-[1px] border-[#d0d0d0] p-[15px] md:p-[30px] rounded-xl border-separate border-spacing-0 w-[100%]">
                <thead>
                    <tr>
                        <th className='py-[10px] md:py-[20px] text-[#6B757E] font-[500] w-[40px] max-w-[40px] md:w-[80px] md:max-w-[80px]'></th>
                        <th className='py-[10px] md:py-[20px] text-[#6B757E] font-[500] w-[200px] md:w-[400px] max-w-[200px] md:max-w-[400px] text-[13px] md:text-[14px] border-r-[1px]'>Product Filter</th>
                        {columns.map((column) => (
                            <th key={column.key} className='py-[10px] md:py-[20px] text-[#6B757E] w-[110px] md:w-[210px] max-w-[110px] md:max-w-[210px] font-[500] text-[13px] md:text-[14px] border-r-[1px]'>
                                <div className='w-[90px] md:w-[170px] mx-auto flex flex-row items-center justify-between' title="Delete Column">
                                    <span>{column.label}</span>
                                    <BsThreeDotsVertical
                                        className='text-[#6B757E] text-[14px] md:text-[20px] cursor-pointer w-[20px] md:w-[25px] p-[2px] h-[20px] md:h-[25px] rounded-[50%] hover:bg-[#c3c8cc]'
                                        onClick={() => deleteColumn(column.key)}
                                    />
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <Droppable droppableId="tbody">
                    {(provided) => (
                        <tbody ref={provided.innerRef} {...provided.droppableProps}>
                            {data.map((item, index) => (
                                <Draggable draggableId={item.key.toString()} index={index} key={item.key.toString()}>
                                    {(provided) => (
                                        <ProductRuleItem
                                            innerRef={provided.innerRef}
                                            dp={provided.draggableProps}
                                            dragHandleProps={provided.dragHandleProps}
                                            rule={item}
                                            index={index}
                                            columns={columns}
                                            addColumn={addColumn}
                                            deleteRow={deleteRow}
                                            handleAddProductFilter={handleAddProductFilter}
                                            setIsPopupOpen={setIsPopupOpen}
                                            handlePopupOpen={handlePopupOpen}
                                            selectedColumn={selectedColumn}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </tbody>
                    )}
                </Droppable>
                <tfoot>
                    <tr>
                        <td className="border-r-[1px]">
                            <button className='p-[8px] md:p-[10px] rounded-md border-[1px] border-[#d0d0d0] flex items-center justify-center hover:bg-blue-50 ml-0 mr-3 md:mr-0 md:ml-3' onClick={addRow}>
                                <FaPlus className='text-black text-[13px] md:text-[16px]' />
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
          </div>
          {
            isPopupOpen && <ProductVariantPopup closePopup={() => setIsPopupOpen(false)} selectedRow={selectedRow} selectedColumn={selectedColumn} changeVariant={changeVariant} />
          }
        </DragDropContext>
    );
}

export default ProductRulesPage;