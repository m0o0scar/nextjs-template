import type { NextPage } from 'next';
import { LoginButton } from '../components/commons/LoginButton';

const Home: NextPage = () => {
  return (
    <article className="prose">
      <h1>Hello World</h1>
      <p>This is a NextJS demo</p>
      <p>
        <LoginButton />
      </p>
    </article>
  );
};

export default Home;
