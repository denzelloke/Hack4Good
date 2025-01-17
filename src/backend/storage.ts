import { getClient } from "./supabase"
import { v4 as uuid } from 'uuid';

const IMAGE_BUCKET = "images";

export const getImageUrl =  (url : string)  => {
    const client = getClient();
    const { data : { publicUrl } } = client.storage.from(IMAGE_BUCKET).getPublicUrl(url);
    return publicUrl;
}

export const uploadImage = async (file : File, path: string) => {
    const client = getClient();
    const { error } = await client.storage.from(IMAGE_BUCKET).upload(path, file);   
    if (error) throw error;
}

export const generateFilePath = (file : File) => {
    const randomString = uuid();
    const mimeType = file.type;

    if (mimeType.includes("image/jpeg")){
        return randomString + ".jpg";
    }
    else if (mimeType.includes("image/png")){
        return randomString + ".png";
    }
    else{
        throw new Error("Invalid file type.")
    }
}