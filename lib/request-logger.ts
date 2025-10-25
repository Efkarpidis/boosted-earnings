export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(7)}`
}

export function logRequest(requestId: string, method: string, path: string, data?: any) {
  console.log(`[${requestId}] ${method} ${path}`, data ? JSON.stringify(data) : "")
}

export function logResponse(requestId: string, status: number, data?: any) {
  console.log(`[${requestId}] Response ${status}`, data ? JSON.stringify(data) : "")
}

export function logError(requestId: string, error: any) {
  console.error(`[${requestId}] Error:`, error.message || error)
  if (error.stack) {
    console.error(`[${requestId}] Stack:`, error.stack)
  }
}
