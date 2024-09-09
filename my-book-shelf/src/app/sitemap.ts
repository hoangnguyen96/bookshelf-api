import { MetadataRoute } from "next";
import { ROUTES } from "@app/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}${ROUTES.HOME}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${ROUTES.SEARCH}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${ROUTES.MY_BOOK_SHELF}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${ROUTES.MY_BOOK_SHELF_FAVORITES}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${ROUTES.CONTRIBUTE}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${ROUTES.CONTRIBUTE_LIST}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${ROUTES.CONTRIBUTE_COMPLETE}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${ROUTES.PREVIEW}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${ROUTES.PROFILE}`,
      lastModified: new Date(),
    },
  ];
}
