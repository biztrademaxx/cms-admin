import imageCompression from "browser-image-compression";

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    initialQuality: 0.9,
    useWebWorker: true,
  };

  return await imageCompression(file, options);
};

export const uploadImageToCloud = async (file: File) => {
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "maxpo_cms_preset");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/drymzsktn/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  if (!data.secure_url) return;

  const optimizedURL = data.secure_url.replace(
    "/upload/",
    "/upload/f_auto,q_auto/"
  );

  return optimizedURL;
};


export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function base64ToFile(base64String: string, filename = "image.jpg"): File {
  const arr = base64String.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) throw new Error("Invalid base64 string");

  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], filename, { type: mime });
}

export function isBase64(str: string): boolean {
  return /^data:image\/[a-z]+;base64,/.test(str);
}