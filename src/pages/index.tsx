import Head from 'next/head';
import {GetServerSideProps} from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import styles from '../styles/pages/Index.module.css';

import IndexBox from '../components/IndexBox';

interface HomeProps {
  githubUsername: string ;
  level: string;
  challenges: string;
  exp: string;
}

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);  
  }, [to]);

  return null;
}

export default function Index(props : HomeProps) { 

  if (props.githubUsername !== "undefined") {
    return <Redirect to="/home" />
  }

  const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `https://${process.env.VERCEL_URL}`;

  return (
    <div className={styles.container}>
      <Head>
        <title>Move.it</title>
        <meta name="description" content="Junte-se a mim no move.it, um site com o objetivo de ajudar pessoas que precisam usar computadores por tempos prolongados." />

        <meta property="og:site_name" content="Move.it" />

        <meta property="og:title" content="Avancei para o próximo nível" />
        <meta property="og:description" content="Junte-se a mim no move.it, um site com o objetivo de ajudar pessoas que precisam usar computadores por tempos prolongados." />

        <meta property="og:url" content={`${baseUrl}/login`}/>

        <meta property="og:image" content={`${baseUrl}/api/thumbnail.png?level=${props.level}&challenges=${props.challenges}&exp=${props.exp}`} />
        <meta property="og:image:type" content="image/png" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Avancei para o próximo nível" />
        <meta name="twitter:description" content="Junte-se a mim no move.it, um site com o objetivo de ajudar pessoas que precisam usar computadores por tempos prolongados." />

        <meta name="twitter:image" content={`${baseUrl}/api/thumbnail.png?level=${props.level}&challenges=${props.challenges}&exp=${props.exp}`} />
      </Head>
      
      <IndexBox />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {githubUsername} = ctx.req.cookies;

  const level = String(ctx.query.level);
  const challenges = String(ctx.query.challenges);
  const exp = String(ctx.query.exp);

  return {
    props: {
      githubUsername: String(githubUsername),
      level: String(level),
      challenges: String(challenges),
      exp: String(exp)
    }
  }
}


