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
    id: "678",
    name: "13F_Filings_QtrEnd",
    description: "Quarterly filing entity for 13F forms containing institutional investment manager holdings and portfolio disclosures required by SEC regulations."
  },
  {
    id: "1200",
    name: "AcqBroker",
    description: "Acquisition broker entity representing intermediary financial professionals facilitating merger and acquisition transactions between buyers and sellers."
  },
  {
    id: "1253",
    name: "AcqTaNum",
    description: "Acquisition transaction number entity providing unique identification for M&A deals and related financial transactions throughout the acquisition process."
  },
  {
    id: "1141",
    name: "AcqTradeDate",
    description: "Acquisition trade date entity capturing the specific date when acquisition transactions are executed and ownership transfers occur."
  },
  {
    id: "897",
    name: "AcqTranType",
    description: "Acquisition transaction type entity defining categories and classifications of different merger and acquisition transaction structures and methodologies."
  },
  {
    id: "922",
    name: "ActiveAmort",
    description: "Active amortization entity tracking ongoing debt repayment schedules and principal reduction calculations for outstanding financial obligations."
  },
  {
    id: "1225",
    name: "ActiveDate",
    description: "Active date entity representing effective dates when financial instruments, contracts, or business relationships become operational and enforceable."
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