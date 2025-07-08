import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome | GoHajjUmrah</title>
        <meta name="description" content="Welcome to GoHajjUmrah - Your trusted partner for Umrah and Hajj packages" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
        <h1 className="text-4xl font-bold text-green-600">Welcome to GoHajjUmrah</h1>
        <p className="mt-4 text-lg text-gray-700">
          A sacred journey should start with peace, not panic.
        </p>
      </main>
    </>
  );
}
