import { Request, Response } from "express";

export function setSuccess<T>(res: Response, data?: T): void {
  res.status(200).json({
    status: "success",
    data: data
      ? {
          data: data,
        }
      : {},
  });
}

export function tryAndCatchIt(res: Response, callback: () => void) {
  try {
    callback();
  } catch {
    res.status(500).json({
      error: "Internal server error",
    });
  }
}
