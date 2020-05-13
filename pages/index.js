import Head from 'next/head';
import './sass/index.scss';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Fuddy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="cover">
          <h1>¿Que tal? <br />
            Somos <span>Fuddy</span> <br />
            Amantes de la innovación y apasionados porlas frutas y verduras</h1>
          <img src="/images/logo.png" alt="" />
        </section>
        <section className="invitation" >
          <img src="/images/chica.png" alt="" />
          <div>
            <h1>
              Con <span>Fuddy</span> ayudas a agricultores a
              vender sus productos en tu
              comunidad y generas ingresos.
              Entérate como convirtiéndote en:
            </h1>
            <button className="button-primary" >Fuddy hero</button>
          </div>
        </section>
      </main>
    </div>
  )
}
