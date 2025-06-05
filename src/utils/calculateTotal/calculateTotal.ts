export function calculateTotal(amounts: string): number {
    const amountArray = amounts
        .split(/[,\n]+/) // Split the input string by commas or newlines
        // + makes the splitting more robust and reduces the need for additional cleanup
        // if (10,,20) will be split into ["10", "", "20"]
        .map(amt => amt.trim()) // Remove any leading or trailing whitespace from each value
        .filter(amt => amt !== "") // Filter out empty strings
        .map(amt => parseFloat(amt)) // Convert each string to a floating-point number
    if (amountArray.some(isNaN)) {
        return 0
    }
    return amountArray.reduce((acc, curr) => acc + curr, 0)
}