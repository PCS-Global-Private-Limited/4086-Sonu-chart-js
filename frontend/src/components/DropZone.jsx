import { useDroppable } from '@dnd-kit/core';

function DropZone({ children }) {
    const { setNodeRef } = useDroppable({ id: "drop-zone" });

    return (
        <div
            ref={setNodeRef}
            className="w-full h-[81vh] border-4 border-dashed border-blue-500 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center"
        >
            {children ? children : <p className="text-gray-400">Drop a chart here</p>}
        </div>
    );
}

export default DropZone