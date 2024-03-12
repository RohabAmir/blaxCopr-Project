interface Transaction {
    price: string;
    category: string;
}
  
  interface CategoryFee {
    [key: string]: number;
}
  
  interface FeeStructure {
    min: number;
    max: number;
    baseFee: number;
    percentageFee: number;
    categoryFees: CategoryFee;
}
  
  interface TransactionSummary {
    subTotal: number;
    buyerPrice: number;
    escrowFee: number;
    shippingFee: number;
}


export function calculateTransactionSummary(
    transactions: Transaction[],
    shippingCostInput: string,
    collectionServiceUpgrade: boolean,
    lienHolderUpgrade: boolean,
    escrowFeePaidBy: string
  ): TransactionSummary {
    const categoryFee: CategoryFee = {
        "Real Estate": 0.0075,
        "Legal Services": 0.035,
        "Financial Services": 0.0075,
        "Loan Disbursement": 0.0125,
        "Freelancing Platforms": 0.03,
        "Payment Processors": 0.025,
        "Insurance Services": 0.015,
        "Construction Services": 0.0125,
        "Healthcare Services": 0.02,
        "Education Services": 0.01,
        "Retail and eCommerce": 0.0175,
        "Transportation Services": 0.025,
        "Utilities Services": 0.0125,
        "Government Services": 0.0225,
        "Non-Profit Organizations": 0.0125,
        "Hospitality and Tourism": 0.035,
        "Technology Services": 0.02,
        "Entertainment Industry": 0.035,
        "Manufacturing Sector": 0.02,
        "Agriculture Services": 0.0175,
        "General Goods": 0.015,
        "Luxury Items": 0.0225,
        Automobiles: 0.0125,
        "Marine Vehicles": 0.02,
        Aircraft: 0.015,
        " Jewelry": 0.025,
    };
  
    const feeStructures: FeeStructure[] = [
        {
            min: 1.0,
            max: 9999.99,
            baseFee: 100.0,
            percentageFee: 0.008,
            categoryFees: categoryFee,
          },
      
          {
            min: 10000.0,
            max: 49999.99,
            baseFee: 150.0,
            percentageFee: 0.006,
            categoryFees: categoryFee,
          },
      
          {
            min: 50000.0,
            max: 99999.99,
            baseFee: 200.0,
            percentageFee: 0.005,
            categoryFees: categoryFee,
          },
      
          {
            min: 100000.0,
            max: 249999.99,
            baseFee: 250.0,
            percentageFee: 0.004,
            categoryFees: categoryFee,
          },
      
          {
            min: 250000.0,
            max: 499999.99,
            baseFee: 300.0,
            percentageFee: 0.003,
            categoryFees: categoryFee,
          },
      
          {
            min: 500000.0,
            max: 999999.99,
            baseFee: 350.0,
            percentageFee: 0.0025,
            categoryFees: categoryFee,
          },
       
    ];
  
    let totalTransactionAmount = 0;
    let totalCategoryFee = 0;
    let percentageFee = 0;
    const wirefeeTransfer = 25;
  
    transactions.forEach(({ price, category }) => {
      const priceNumber = parseFloat(price) || 0;
      const categoryFeePercentage = categoryFee[category] || 0;
      totalTransactionAmount += priceNumber;
      totalCategoryFee += priceNumber * categoryFeePercentage;
    });
  
    let baseFee = 0;
    feeStructures.forEach(fs => {
      if (totalTransactionAmount >= fs.min && totalTransactionAmount <= fs.max) {
        baseFee = fs.baseFee;
        percentageFee += totalTransactionAmount * fs.percentageFee;
      }
    });
  
    const shippingCost = parseFloat(shippingCostInput) || 0;
    const serviceUpgradeCost = (collectionServiceUpgrade ? 60 : 0) + (lienHolderUpgrade ? 60 : 0);
    const dynamicEscrowFee = baseFee + percentageFee + totalCategoryFee + wirefeeTransfer;
    const dynamicSubTotal = totalTransactionAmount + shippingCost + serviceUpgradeCost;
    const dynamicBuyerPrice = dynamicSubTotal + (escrowFeePaidBy === "BUYER" ? dynamicEscrowFee : 0);
  
    return { subTotal: dynamicSubTotal, buyerPrice: dynamicBuyerPrice, escrowFee: dynamicEscrowFee, shippingFee: shippingCost };
  }
  
  