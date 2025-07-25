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
    name: "360 Survey",
    description: "An employee feedback program whereby an employee is rated by surveys distributed to his or her co-workers, customers, and managers. HR departments may use this feedback to help develop an individual's skill or they may integrate it into performance management programs."
  },
  {
    id: "2",
    name: "401(k) Plan",
    description: "An employer-sponsored retirement plan that has become an expected benefit and is therefore important in attracting and retaining employees. A 401(k) plan allows employees to defer taxes as they save for retirement by placing before-tax dollars directly into an investment account. Employers also contribute to the plan tax-free, for instance by matching contributions. Some plans enable employees to direct their own investments. These plans can be expensive and complex to manage. It is common for companies to outsource all or part of their plan."
  },
  {
    id: "3",
    name: "Absenteeism Policy",
    description: "A policy about attendance requirements, scheduled and unscheduled time off, and measures for dealing with workplace absenteeism. Repeated absenteeism can lead to termination."
  }
];