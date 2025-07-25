export interface ErObject {
  id: string;
  name: string;
  description: string;
}

export interface Term {
  id: string;
  name: string;
  description: string;
}

export const sampleErObjects: ErObject[] = [
  {
    id: "1",
    name: "Customer",
    description: "Primary entity representing individual or organizational customers with comprehensive profile information including demographics, preferences, and transaction history."
  },
  {
    id: "2",
    name: "Product",
    description: "Core business entity defining items or services offered, including specifications, pricing, inventory levels, and categorization details."
  },
  {
    id: "3",
    name: "Order",
    description: "Transactional entity capturing customer purchase requests with detailed line items, pricing, status tracking, and fulfillment information."
  },
  {
    id: "4",
    name: "Invoice",
    description: "Financial document entity representing billing statements with itemized charges, payment terms, tax calculations, and account reconciliation data."
  },
  {
    id: "5",
    name: "Supplier",
    description: "External business partner entity providing goods or services, including contact information, performance metrics, and contract details."
  },
  {
    id: "6",
    name: "Employee",
    description: "Human resource entity containing personnel information, role assignments, performance data, and organizational hierarchy relationships."
  },
  {
    id: "7",
    name: "Warehouse",
    description: "Physical location entity for inventory storage and distribution, including capacity, location coordinates, and operational characteristics."
  },
  {
    id: "8",
    name: "Payment",
    description: "Financial transaction entity recording monetary exchanges with method details, authorization status, and reconciliation information."
  }
];

export const sampleTerms: Term[] = [
  {
    id: "1",
    name: "Customer Lifetime Value (CLV)",
    description: "A predictive metric that calculates the total net profit a company can expect to earn from a customer throughout their entire business relationship."
  },
  {
    id: "2",
    name: "Data Governance",
    description: "The overall management framework for ensuring data quality, security, privacy, and compliance across the organization's data assets."
  },
  {
    id: "3",
    name: "Master Data Management (MDM)",
    description: "A comprehensive method of defining and managing critical business data to provide a single point of reference for consistent, accurate information."
  },
  {
    id: "4",
    name: "Data Lineage",
    description: "The complete journey and transformation path of data from its origin through various processing stages to its final destination and usage."
  },
  {
    id: "5",
    name: "Business Intelligence (BI)",
    description: "Technology-driven process for analyzing business data and presenting actionable insights to help executives, managers, and workers make informed decisions."
  },
  {
    id: "6",
    name: "Extract, Transform, Load (ETL)",
    description: "Data integration process that extracts data from source systems, transforms it to match target schema requirements, and loads it into destination systems."
  },
  {
    id: "7",
    name: "Data Quality Metrics",
    description: "Quantitative measures used to assess data accuracy, completeness, consistency, timeliness, validity, and uniqueness across datasets."
  },
  {
    id: "8",
    name: "Artificial Intelligence (AI)",
    description: "Computer systems designed to perform tasks that typically require human intelligence, including learning, reasoning, perception, and decision-making."
  },
  {
    id: "9",
    name: "Machine Learning (ML)",
    description: "Subset of artificial intelligence that enables systems to automatically learn and improve performance from experience without being explicitly programmed."
  },
  {
    id: "10",
    name: "Data Classification",
    description: "The process of organizing and categorizing data based on sensitivity levels, regulatory requirements, and business value to ensure appropriate protection and handling."
  }
];