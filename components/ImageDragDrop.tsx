
export const ImageDragDrop = () => {
    return <div className="p-2 shadow-md rounded-sm overflow-hidden">
        <div className="text-center">
            <p className="font-bold ">Drag and drop image uploading</p>
        </div>
        <div className="h-[150px] rounded-sm flex items-center justify-center select-none mt-2">
            <span>Drop images here</span>
            Drag & Drop images here or {" "}
            <span>
                Browse
            </span>
            <input type="file" multiple />
        </div>
        <div>
            <div>

                <span>&times;</span>
            </div>
        </div>
    </div>
}