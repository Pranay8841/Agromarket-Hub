import React from 'react'
import { toast } from "react-hot-toast"
import { apiConnector } from '../apiconnector';
import { categoryPageData } from '../apis';

export const getCategoryPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("POST", categoryPageData.CATEGORYPAGEDATA_API,
      { categoryId: categoryId, });

    if (!response?.data?.success)
      throw new Error("Could not Fetch Category page data");

    result = response?.data;

  }
  catch (error) {
    // console.log("CATEGORY PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}

