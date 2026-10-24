
import slowDown from "express-slow-down";

export const apiSlowDown = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,           
  delayMs: (used) => Math.min((used - 50) * 150, 2000),
  maxDelayMs: 2000,         
});
