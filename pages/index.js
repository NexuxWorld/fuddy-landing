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
            <div className="somos-fuddy" ><p>Somos</p> <img className="logo-text" src="/images/logo-txt.png" alt=""/> <br /></div>
            Amantes de la buena comida y apasionados por las frutas y verduras
          </h1>
          <img className="logo" src="/images/fuddynamico.png" alt="" />
        </section>
        <section className="invitation" >
          <img src="/images/chica.png" alt="" />
          <div>
            <h1>
              Con Fuddy ayudas a agricultores a
              vender sus productos en tu
              comunidad y genera<span>$</span> ingreso<span>$</span>.
              Entérate como, convirtiéndote en:
            </h1>
            <button className="button-primary" >Fuddy hero</button>
          </div>
        </section>
      </main>
    </div>
  )
}
