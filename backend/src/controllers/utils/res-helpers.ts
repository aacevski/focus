import { Request, Response } from "express";

export interface Requester {
  (): void;
}

export function setSuccess<T>(res: Response, data: T): void {
  res.status(200).json({
    status: "success",
    data: {
      data,
    },
  });
}

export function tryAndCatchIt(res: Response, requester: Requester) {
  try {
    requester();
  } catch {
    res.status(500).json({
      error: "Internal server error",
    });
  }
}
