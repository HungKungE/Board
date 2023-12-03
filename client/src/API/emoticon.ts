import { sendMultipartRequest } from "./api";

export interface CreateEmoticon {
  emoticonName: string;
  singleImage: File | null;
  multiImages: File[];
}

export const sendCreateEmoticonRequest = (emoticonInfo: CreateEmoticon) => {
  return sendMultipartRequest(
    "/emoticon",
    emoticonInfo.emoticonName,
    emoticonInfo.singleImage,
    emoticonInfo.multiImages
  );
};
