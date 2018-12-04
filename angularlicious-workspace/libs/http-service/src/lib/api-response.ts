export abstract class ApiResponse<T> {
    IsSuccess: boolean;
    Message: string;
    StatusCode: number;
    Timestamp: Date;
  }
  