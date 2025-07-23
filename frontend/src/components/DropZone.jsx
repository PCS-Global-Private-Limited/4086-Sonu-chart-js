import { useDroppable } from "@dnd-kit/core";

function DropZone({ id, children }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className="w-full h-[81vh] border-4 border-dashed border-blue-500 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
            {children || <p className="text-gray-400">Drop chart here</p>}
        </div>
    );
}

export default DropZone;
