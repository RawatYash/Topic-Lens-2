// API Response Types

/**
 * Standard error response format for all API endpoints
 */
export interface APIErrorResponse {
  error: string
}

/**
 * Represents a topic cluster identified by the analysis
 */
export interface Topic {
  id: number
  name: string
  count: number
  percentage: number
  summary: string      // Brief one-line summary
  description: string  // Detailed multi-line description
}

/**
 * Represents a single data point in the cluster visualization
 */
export interface ClusterPoint {
  id: number
  x: number
  y: number
  topic: number
  text: string
}

/**
 * Response format for cluster processing endpoint
 */
export interface ProcessClusterResponse {
  success: boolean
  data?: {
    id: string
    topics: Topic[]
    clusterData: ClusterPoint[]
  }
  error?: string
}

/**
 * Parameters for cluster analysis request
 */
export interface ClusterRequestParams {
  clusterCount: number
  columns: string[]
}

/**
 * Reserved for future analysis features
 */
export interface ExtendedAnalysisData {
  // Reserved for future additional analysis data
  // Example: metadata?: Record<string, unknown>
}

/**
 * Core session data structure
 * This represents the complete state of a user's analysis session
 */
export interface SessionData {
  /** Unique identifier for the session */
  id: string
  
  /** User-provided name for the session */
  name: string
  
  /** Timestamp when the session was created */
  createdAt: Date
  
  /** Current step in the analysis workflow (1-4) */
  currentStep: number
  
  /** Information about the uploaded file */
  file?: {
    name: string
    size: number
    /** Consider how to store/retrieve the actual file content */
  }
  
  /** All available columns from the uploaded file */
  columns?: string[]
  
  /** Columns selected by the user for analysis */
  selectedColumns?: string[]
  
  /** Number of clusters configured by the user */
  clusterCount?: number
  
  /** Results from the cluster analysis */
  results?: ProcessClusterResponse
}

export interface SessionAPI {
  /**
   * GET /api/sessions
   * Retrieves all sessions for the current user
   * 
   * Implementation Requirements:
   * - Sort by most recently created/updated
   */
  getSessions(): Promise<SessionData[]>
  
  /**
   * GET /api/sessions/:id
   * Retrieves complete data for a specific session
   * 
   * Implementation Requirements:
   * - Include all session state (file info, columns, results)
   * - Handle file content retrieval strategy
   */
  getSessionData(id: string): Promise<SessionData>
  
  /**
   * POST /api/sessions
   * Creates a new analysis session
   * 
   * Implementation Requirements:
   * - Generate unique session ID
   * - Initialize with step 1
   */
  createSession(name: string): Promise<SessionData>
  
  /**
   * DELETE /api/sessions/:id
   * Removes a session and all associated data
   * 
   * Implementation Requirements:
   * - Clean up any stored files
   * - Remove all associated analysis results
   */
  deleteSession(id: string): Promise<void>
  
  /**
   * PUT /api/sessions/:id/data
   * Updates session data, including step progress and analysis state
   * 
   * Implementation Requirements:
   * - Validate current step transition
   * - Handle file updates if provided

   */
  updateSessionData(id: string, data: Partial<SessionData>): Promise<SessionData>
} 