import Link from 'next/link';

export default function Page() {
  return (
    <div className="p-4">
      <h1>Hello World</h1>

      <h2>Pages</h2>
      <ul>
        <li>
          <Link href="/llm">LLM Demo</Link>
        </li>
      </ul>
    </div>
  );
}
