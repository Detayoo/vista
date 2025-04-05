import { ethers } from "ethers";

export const formatEther = (wei) => {
  try {
    return ethers.formatEther(wei);
  } catch (error) {
    console.error("Error formatting ether:", error);
    return "0";
  }
};

export const parseEther = (ether) => {
  try {
    return ethers.parseEther(ether.toString()).toString();
  } catch (error) {
    console.error("Error parsing ether:", error);
    return "0";
  }
};

export const truncateAddress = (address, startLength = 6, endLength = 4) => {
  if (!address) return "";
  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength
  )}`;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export const generateId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
