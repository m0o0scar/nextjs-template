import { Header } from '@components/commons/Header';
import { Navbar } from '@components/commons/Navbar';

export default function Page() {
  return (
    <>
      <Header title="Hello World" emoji="😎" />

      {/* page container */}
      <article className="prose max-w-full w-screen h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 p-4">Hello World</div>
      </article>
    </>
  );
}
