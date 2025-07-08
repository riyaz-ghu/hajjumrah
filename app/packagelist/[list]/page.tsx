
type Props = {
  params: { list: string };
};

export async function generateStaticParams() {
  return [
    { list: 'economy' },
    { list: 'premium' },
    { list: 'vip' },
  ];
}

export default function PackageListPage({ params }: Props) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-green-600">Packages for {params.list}</h1>
    </main>
  );
}
