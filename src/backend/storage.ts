import { getClient } from "./supabase"

const IMAGE_BUCKET = "images";

export const getImageUrl =  (url : string)  => {
    const client = getClient();
    const { data : { publicUrl } } = client.storage.from(IMAGE_BUCKET).getPublicUrl(url);
    return publicUrl;
}