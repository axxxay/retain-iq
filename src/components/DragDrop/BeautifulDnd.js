import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import Item from "./Item.js";

const imageUrl = 'https://rukminim2.flixcart.com/image/612/612/xif0q/fabric/k/5/n/yes-2-m-unstitched-2-m-2-5-m-md-dm1-149-anand-original-imagsqmgnqkktvnd.jpeg?q=70';

function BeautifulDnd() {
    const [data, setData] = useState([
        { key: 1, filter: 'John Brown sr.', variant1: { imageUrl: imageUrl, label: "Single image product something" }, variant2: { imageUrl: imageUrl, label: "image" } },
        { key: 2, filter: 'Jim Green sr.', variant1: { imageUrl: imageUrl, label: "image" }, variant2: { imageUrl: imageUrl, label: "image" } },
        { key: 3, filter: 'Joe Black sr.', variant1: { imageUrl: imageUrl, label: "image" }, variant2: { imageUrl: imageUrl, label: "image" } },
        { key: 4, filter: 'Jim Red sr.', variant1: { imageUrl: '', label: "" }, variant2: { imageUrl: imageUrl, label: "image" } },
        { key: 5, filter: 'Jake White sr.', variant1: { imageUrl: imageUrl, label: "image" }, variant2: { imageUrl: imageUrl, label: "image" } },
    ]);

    const [columns, setColumns] = useState([
        { key: 'variant1', label: 'Primary Variant' },
        { key: 'variant2', label: 'Variant 2' }
    ]);

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

            setColumns(updatedColumns);
            setData(updatedData);
        }
    };

    const addRow = () => {
        const newKey = data.length + 1;
        let newRow = { key: newKey, filter: '' };
        columns.forEach(column => {
            newRow[column.key] = { imageUrl: '', label: '' };
        });

        setData([...data, newRow]);
    };

    const deleteRow = (rowKey) => {
        setData(data.filter(item => item.key !== rowKey));
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
            <table className="border-[1px] border-[#d0d0d0] mx-[50px] my-[5%] p-[30px] rounded-xl border-separate border-spacing-0 w-[91%]">
                <thead>
                    <tr>
                        <th className='py-[20px] text-[#6B757E] font-[500]'></th>
                        <th className='py-[20px] text-[#6B757E] font-[500] w-[400px] text-[14px]'>Product Filter</th>
                        {columns.map((column) => (
                            <th key={column.key} className='py-[20px] text-[#6B757E] font-[500] text-[14px]'>
                                <div className='w-[170px] flex flex-row items-center justify-between'>
                                    <span>{column.label}</span>
                                    <BsThreeDotsVertical
                                        className='text-[#6B757E] text-[20px] cursor-pointer w-[25px] p-[2px] h-[25px] rounded-[50%] hover:bg-[#c3c8cc]'
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
                                        <Item
                                            innerRef={provided.innerRef}
                                            dp={provided.draggableProps}
                                            dragHandleProps={provided.dragHandleProps}
                                            rule={item}
                                            index={index}
                                            columns={columns}
                                            addColumn={addColumn}
                                            deleteRow={deleteRow}
                                            handleAddProductFilter={handleAddProductFilter}
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
                        <td>
                            <button className='p-[10px] rounded-md border-[1px] border-[#d0d0d0] flex items-center justify-center hover:bg-blue-50 ml-3' onClick={addRow}>
                                <FaPlus className='text-black text-[16px]' />
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </DragDropContext>
    );
}

export default BeautifulDnd;
