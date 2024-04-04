import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs";
const f = createUploadthing();

const handleAuth = () => {
  const userId = auth();
  if (!userId) {
    throw new UploadThingError("You are not authorized to upload files");
  }
  return { userId: userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(handleAuth)
    .onUploadComplete(() => console.log("Image uploaded")),
  messageFile: f(["image", "pdf"])
    .middleware(handleAuth)
    .onUploadComplete(() => console.log("Message file uploaded")),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
