import { ethers } from 'ethers'

/**
 * Format a number of wei to ether
 * @param {string|number} wei Amount in wei
 * @returns {string} Formatted ether value
 */
export const formatEther = (wei) => {
  try {
    return ethers.formatEther(wei)
  } catch (error) {
    console.error('Error formatting ether:', error)
    return '0'
  }
}

/**
 * Format a number of ether to wei
 * @param {string|number} ether Amount in ether
 * @returns {string} Formatted wei value
 */
export const parseEther = (ether) => {
  try {
    return ethers.parseEther(ether.toString()).toString()
  } catch (error) {
    console.error('Error parsing ether:', error)
    return '0'
  }
}

/**
 * Truncate an Ethereum address
 * @param {string} address Ethereum address
 * @param {number} startLength Number of characters to show at the start
 * @param {number} endLength Number of characters to show at the end
 * @returns {string} Truncated address
 */
export const truncateAddress = (address, startLength = 6, endLength = 4) => {
  if (!address) return ''
  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`
}

/**
 * Format a date to a readable string
 * @param {number} timestamp Unix timestamp in milliseconds
 * @returns {string} Formatted date string
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}

/**
 * Generate a random ID
 * @returns {string} Random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
