import { useState } from "react";

const usePreviewImage = () => {
	const [preview, setPreview] = useState(null);

	function previewUpload(e) {
		return new Promise((resolve, reject) => {
			const imageFile = e.target.files[0];

			const reader = new FileReader();

			reader.readAsDataURL(imageFile);

			reader.addEventListener("load", e => {
				setPreview(reader.result);
				resolve('done set preview');
			});
		});
	}

	return { preview, previewUpload };
};

export default usePreviewImage;
