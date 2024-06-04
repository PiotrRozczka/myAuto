import { Dispatch, SetStateAction, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

export const ImageDragDrop = ({
  imageState,
}: {
  imageState: [
    images: ImageListType,
    setImages: Dispatch<SetStateAction<ImageListType>>,
  ];
}) => {
  const MAX_IMAGES = 30;
  const [images, setImages] = imageState;

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={MAX_IMAGES}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="flex items-center flex-col">
          <button
            className="h-10 border-2 border-zinc-300 h-32 w-full rounded-md"
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or drop an image
          </button>
          &nbsp;
          <div className="flex items-start w-full gap-2">
            {imageList.map((image, index) => (
              <button key={index} onClick={() => onImageRemove(index)}>
                <div className="image-item">
                  <img src={image["data_url"]} alt="" width="100" />
                </div>
              </button>
            ))}
          </div>
          <button onClick={onImageRemoveAll}>Clear images</button>
        </div>
      )}
    </ImageUploading>
  );
};
