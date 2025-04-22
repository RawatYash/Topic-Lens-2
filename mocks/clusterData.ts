import type { ProcessClusterResponse } from '@/types/api'

export const mockClusterResponse: ProcessClusterResponse = {
  success: true,
  data: {
    id: "analysis-123",
    topics: [
      {
        id: 1,
        name: "Payment Processing",
        count: 2502,
        percentage: 33.5,
        summary: "Payment processing and transaction issues.",
        description: "Documents focused on payment processing systems, including transaction delays, payment posting times, and fee structures.Common issues involve payment processing delays, failed transactions, and payment confirmation notifications."
      },
      {
        id: 2,
        name: "Account Management",
        count: 1438,
        percentage: 19.2,
        summary: "Account maintenance and service requests",
        description: "Topics covering general account management, including account updates, service modifications, and maintenance requests. Key themes include address changes, statement preferences, and account settings modifications."
      },
      {
        id: 3,
        name: "Transaction Services",
        count: 1057,
        percentage: 14.1,
        summary: "Banking transactions and processing times",
        description: "Documents related to various banking transactions, including deposits, withdrawals, and transfers. Major focus on processing times, transaction limits, and transaction dispute resolution processes."
      },
      {
        id: 4,
        name: "Regulatory Compliance",
        count: 1002,
        percentage: 13.4,
        summary: "Regulatory requirements and procedures",
        description: "Documentation covering regulatory compliance, including reporting requirements, verification procedures, and compliance guidelines. Emphasis on documentation requirements and regulatory reporting timelines."
      },
      {
        id: 5,
        name: "Fee Structure",
        count: 905,
        percentage: 12.1,
        summary: "Service fees and related policies",
        description: "Comprehensive coverage of fee structures, including service charges, transaction fees, and fee policies. Details about fee schedules, waiver conditions, and fee dispute resolution processes."
      },
      {
        id: 6,
        name: "Credit Services",
        count: 442,
        percentage: 5.9,
        summary: "Credit products and applications",
        description: "Topics related to credit services, including credit applications, product terms, and servicing requests. Includes information about credit terms, application processes, and credit limit modifications."
      },
      {
        id: 7,
        name: "New Accounts",
        count: 136,
        percentage: 1.8,
        summary: "Account opening and enrollment",
        description: "Documentation about new account opening procedures and service enrollment processes. Covers required documentation, processing timelines, and initial setup procedures for various account types."
      }
    ],
    clusterData: Array(50).fill(0).map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      topic: Math.floor(Math.random() * 7) + 1,
      text: `Sample text ${i} discussing a customer concern related to their account.`,
    })),
  }
}

export const mockErrorResponse: ProcessClusterResponse = {
  success: false,
  error: "Failed to process data: Invalid column selection"
} 