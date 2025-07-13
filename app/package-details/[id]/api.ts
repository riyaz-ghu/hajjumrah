export const fetchPackages = async (packageId: string) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hd2hzdW9ubmFvdnJiaWppcXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyODc2MjEsImV4cCI6MjA0ODg2MzYyMX0.iWOgZO1du6yHemVdBjAZt2nVJdPAKjCIXsIcRbK6yeo";

  return fetch(
    `https://nawhsuonnaovrbijiqqv.functions.supabase.co/getPackageDetails?slug=${packageId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let packages = data.package;
      return data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};
