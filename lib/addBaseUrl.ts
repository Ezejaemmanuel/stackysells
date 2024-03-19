// export function addBaseURL(url: string): string {
//     const env = process.env.NODE_ENV;

//     if (env === 'development') {
//         return `http://localhost:3000/${url}`;
//     } else {
//         // if (process.env.VERCEL_URL) {
//         return `/${url}`;
//         // }
//     }
// }

export function addBaseURL(url: string): string {
  const env = process.env.NODE_ENV;

  const vercelUrl =
    process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;

  if (env === "development") {
    return `http://localhost:3000/${url}`;
  } else {
    if (vercelUrl) {
      return `${vercelUrl}/${url}`;
    } else {
      throw new Error(
        "VERCEL_URL or NEXT_PUBLIC_VERCEL_URL environment variable is not set",
      );
    }
  }
}
