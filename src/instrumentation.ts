export async function register() {
  process.on("unhandledRejection", (reason: any) => {
    console.error("PDP_UNHANDLED_REJECTION", {
      message: reason?.message ?? String(reason),
      stack: reason?.stack,
      cause: reason?.cause,
    });
  });
  process.on("uncaughtException", (err: any) => {
    console.error("PDP_UNCAUGHT_EXCEPTION", {
      message: err?.message,
      stack: err?.stack,
      cause: err?.cause,
    });
  });
}

