import { Header } from '@components/commons/Header';
import { NavMenu } from '@components/commons/NavMenu';

export default function Page() {
  return (
    <>
      <Header title="Hello World" emoji="😎" />

      {/* page container */}
      <article className="prose max-w-full w-screen h-screen flex flex-col">
        <NavMenu />
        <div className="flex-1 p-4">Hello World</div>
      </article>
    </>
  );
}
